import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/app/core/list/list-column.model';
import { ListDataSource } from 'src/app/core/list/list-datasource';
import { ListDatabase } from 'src/app/core/list/list-database';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService, NotificationService } from 'src/app/_services';
import { List } from 'src/app/core/list/list.interface';
import { componentDestroyed } from 'src/app/core/utils/component-destroyed';
import { takeUntil, filter } from 'rxjs/operators';
import { ChartAccount } from 'src/app/model';
import { ConfirmationDialogComponent } from '../../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ChartAccountingCreateFormComponent } from './chart-accounting-create-form/chart-accounting-create-form.component';

@Component({
	selector: 'advanced-chart-of-accounting',
	templateUrl: './chart-of-accounting.component.html',
	styleUrls: ['./chart-of-accounting.component.scss']
})
export class ChartOfAccountingComponent implements List<ChartAccount>, OnInit, OnDestroy {
	formData = {
		name: '',
		precision: '',
		strategy: '',
		method: '',
		account: '',
		adjusment_account: ''
	};
	displayedColumns: string[] = ['name', 'type', 'detail', 'sub_account'];
	subject$: ReplaySubject<ChartAccount[]> = new ReplaySubject<ChartAccount[]>(1);
	data$: Observable<ChartAccount[]>;
	roundingData: ChartAccount[];
	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<ChartAccount> | null;
	database: ListDatabase<ChartAccount>;

	@Input()
	columns: ListColumn[] = [
		{ name: 'Account Name', property: 'name', visible: true, isModelProperty: true ,width:'30%'},
		{ name: 'Account Type', property: 'type', visible: true, isModelProperty: true ,width:'30%'},
		{ name: 'Detail Type', property: 'detail', visible: true, isModelProperty: true,width:'20%' },
		{ name: 'Sub Account Of', property: 'sub_account', visible: true, isModelProperty: true ,width:'12%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	
	constructor(
		public dialog: MatDialog,
		private userService: UserService,
		private notifyService : NotificationService
	) {
		
	}
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}

	ngOnInit() {
		// this.userService.getAllUser()
		// .subscribe(
		// 	res => {
		// 		res = res.filter((item : any) => item.is_active == true);
		// 		this.users = res.map(l => {
		// 			let data = {
		// 				first_name : l.first_name,
		// 				last_name : l.last_name,
		// 				user_name : l.user_name,
		// 				note : l.note,
		// 				location_type_id : l.location_type_id,
		// 				location_type_name : l.location_type_name,
		// 				location_group_id : l.location_group_id,
		// 				location_group_name : l.location_group_name,
		// 				mobile : 'No mobile field',
		// 				email : l.email,
		// 				user_id : l.user_id,
		// 				password : l.password,
		// 				user_group : l.user_group,
		// 				is_active: l.is_active
		// 			};
		// 			return new User(data);
		// 		});
		// 	},
		// 	err => {
		// 		this.notifyService.showError(err, "User");
		// 	},
		// 	() => {
		// 		console.log(this.users);
		// 		this.prepareData();
		// 	}
		// );
		this.roundingData = [];
		this.prepareData();
	}
	/* prepare data from pagination */
	prepareData(){
		this.subject$.next(this.roundingData);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<ChartAccount>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<ChartAccount[]>(Boolean)
		).subscribe((userGroup) => {
			this.roundingData = userGroup;
			this.database.dataChange.next(userGroup);
			this.resultsLength = userGroup.length;
		});
		this.dataSource = new ListDataSource<ChartAccount>(this.database, this.sort, this.paginator, this.columns);
	}
	/* Add or Edit Funtion For User */
	editUser(row){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '40vw';
		dialogConfig.data = row;
		const dialogRef = this.dialog.open(ChartAccountingCreateFormComponent,dialogConfig);
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
					if(res.code == 200){
						this.notifyService.showSuccess("Rounding off data has been successfully deleted!!", "General");
						this.ngOnInit();
					}else{
						this.notifyService.showError(res.message, "General");
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
