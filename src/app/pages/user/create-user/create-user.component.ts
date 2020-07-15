
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserCreateFormComponent} from '../create-user/user-create-form/user-create-form.component';
import { ConfirmationDialogComponent} from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { List } from '../../../core/list/list.interface';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { componentDestroyed } from '../../../core/utils/component-destroyed';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../../../model/user';
import { UserData } from '../../../dummy-data/user';
import { UserService,NotificationService } from '../../../_services';

@Component({
    selector: 'choukash-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements List<User>, OnInit, OnDestroy {

	subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
	data$: Observable<User[]>;
	users: User[];
	formData = new User();

    @Input()
	columns: ListColumn[] = [
		// { name: 'ID', property: 'id', visible: true, isModelProperty: true,width:'5%' },
		{ name: 'First Name', property: 'first_name', visible: true, isModelProperty: true ,width:'7%'},
		{ name: 'Last Name', property: 'last_name', visible: true, isModelProperty: true ,width:'7%'},
		{ name: 'User Name', property: 'user_name', visible: true, isModelProperty: true,width:'5%' },
		{ name: 'Description', property: 'note', visible: true, isModelProperty: true ,width:'9%'},
		{ name: 'Location Type', property: 'location_type_name', visible: true, isModelProperty: true ,width:'9%'},
		{ name: 'Location', property: 'location_group_name', visible: true, isModelProperty: true,width:'9%' },
		{ name: 'Mobile', property: 'mobile', visible: true, isModelProperty: true ,width:'8%'},
		{ name: 'Email', property: 'email', visible: true, isModelProperty: true ,width:'8%'},
		{ name: 'User ID', property: 'user_id', visible: true, isModelProperty: true,width:'8%' },
		{ name: 'Password', property: 'password', visible: true, isModelProperty: true ,width:'9%'},
		{ name: 'User Group', property: 'user_group', visible: true, isModelProperty: true ,width:'8%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<User> | null;
	database: ListDatabase<User>;

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
		this.userService.getAllUser()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.users = res.map(l => {
					let data = {
						first_name : l.first_name,
						last_name : l.last_name,
						user_name : l.user_name,
						note : l.note,
						location_type_id : l.location_type_id,
						location_type_name : l.location_type_name,
						location_group_id : l.location_group_id,
						location_group_name : l.location_group_name,
						mobile : 'No mobile field',
						email : l.email,
						user_id : l.user_id,
						password : l.password,
						user_group : l.user_group,
						is_active: l.is_active
					};
					return new User(data);
				});
			},
			err => {
				this.notifyService.showError(err, "User");
			},
			() => {
				console.log(this.users);
				this.prepareData();
			}
		);
	}
	/* prepare data from pagination */
	prepareData(){
		this.subject$.next(this.users);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<User>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<User[]>(Boolean)
		).subscribe((userGroup) => {
			this.users = userGroup;
			this.database.dataChange.next(userGroup);
			this.resultsLength = userGroup.length;
		});
		this.dataSource = new ListDataSource<User>(this.database, this.sort, this.paginator, this.columns);
	}
	/* Add or Edit Funtion For User */
	editUser(row){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '60vw';
		dialogConfig.data = row;
		const dialogRef = this.dialog.open(UserCreateFormComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(row.user_id == ''){
						this.notifyService.showSuccess("User data has been successfully saved!!", "User");
					}else{
						this.notifyService.showSuccess("User data has been successfully updated!!", "User");
					}
					this.ngOnInit();
				}
			}
		);
	}
	/* Delete Funtion For User */
	deleteUser(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == 'yes'){
				this.userService.deleteUser(row.user_group_id).subscribe((res : any) =>{
					console.log(res.code);
					console.log(res.code == 200);
					if(res.code == 200){
						this.notifyService.showSuccess("User data has been successfully deleted!!", "User");
						this.ngOnInit();
					}else{
						this.notifyService.showError(res.message, "User");
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