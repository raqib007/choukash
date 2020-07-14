import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserGroupCreateFormComponent } from '../create-user-group/user-group-create-form/user-group-create-form.component';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { List } from '../../../core/list/list.interface';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { componentDestroyed } from '../../../core/utils/component-destroyed';
import { filter, takeUntil, first } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { UserGroup } from '../../../model/user-group';
import { UserService,NotificationService } from '../../../_services';

@Component({
	selector: 'chokash-create-user-group',
	templateUrl: './create-user-group.component.html',
	styleUrls: ['./create-user-group.component.scss']
})
export class CreateUserGroupComponent implements List<UserGroup>, OnInit, OnDestroy {
	subject$: ReplaySubject<UserGroup[]> = new ReplaySubject<UserGroup[]>(1);
	data$: Observable<UserGroup[]>;
	locations: UserGroup[];
	usersGroupData = null;
    formData = {
		user_group_id : '',
		user_group_name : '',
		is_active : '',
		note : ''
	};
	@Input()
	columns: ListColumn[] = [
		// { name: 'ID', property: 'user_group_id', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Name', property: 'user_group_name', visible: true, isModelProperty: true ,width:'50%'},
		{ name: 'Description', property: 'note', visible: true, isModelProperty: true ,width:'30%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<UserGroup> | null;
	database: ListDatabase<UserGroup>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	  
	constructor(
		public dialog: MatDialog, 
		private userService: UserService,
		private notifyService : NotificationService
		) {}

	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.userService.getAll()
		// .pipe(first())
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.locations = res.map(l => {
					let data = {
						user_group_id : l.user_group_id,
						user_group_name : l.user_group_name,
						is_active : l.is_active,
						note : l.note
					};
					return new UserGroup(data);
				});
			},
			err => {
				alert('HTTP Error'+err);
				this.notifyService.showError(err, "User Group");
			},
			() => {
				this.prepareData();
			}
		);
	}
	/* prepare data from pagination */
	prepareData(){
		this.subject$.next(this.locations);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<UserGroup>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<UserGroup[]>(Boolean)
		).subscribe((userGroup) => {
			this.locations = userGroup;
			this.database.dataChange.next(userGroup);
			this.resultsLength = userGroup.length;
		});
		this.dataSource = new ListDataSource<UserGroup>(this.database, this.sort, this.paginator, this.columns);
	}
	/* Add or Edit Funtion For User Group */
	editGroup(row){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '750px';
		dialogConfig.data = row;
		const dialogRef = this.dialog.open(UserGroupCreateFormComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(row.user_group_id == ''){
						this.notifyService.showSuccess("User group data has been successfully saved!!", "User Group");
					}else{
						this.notifyService.showSuccess("User group data has been successfully updated!!", "User Group");
					}
					this.ngOnInit();
				}
			}
        );
	}
	/* Delete Funtion For User Group */
	deleteGroup(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == 'yes'){
				this.userService.deleteUserGroup(row.user_group_id).subscribe((res : any) =>{
					console.log(res.code);
					console.log(res.code == 200);
					if(res.code == 200){
						this.notifyService.showSuccess("User group data has been successfully deleted!!", "User Group");
						this.ngOnInit();
					}else{
						this.notifyService.showError(res.message, "User Group");
					}
				});
			}
		});
  	}
  	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
	ngOnDestroy() {}
}
