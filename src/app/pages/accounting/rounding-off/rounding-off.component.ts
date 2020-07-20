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
import { RoundingOff } from 'src/app/model';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { RoundingOffCreateFormComponent } from './rounding-off-create-form/rounding-off-create-form.component';

export interface PeriodicElement {
	product: string;
	code: string;
	note: string;
	uom: string;
	ucost: string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
	{product: '', code: '', note: '', uom: '', ucost: ''},
	{product: '', code: '', note: '', uom: '', ucost: ''},
	{product: '', code: '', note: '', uom: '', ucost: ''},
	{product: '', code: '', note: '', uom: '', ucost: ''}
];

@Component({
	selector: 'accounting-rounding-off',
	templateUrl: './rounding-off.component.html',
	styleUrls: ['./rounding-off.component.scss']
})
export class RoundingOffComponent implements List<RoundingOff>, OnInit, OnDestroy {
	displayedColumns: string[] = ['product', 'code', 'note', 'uom', 'ucost'];
	dataSource2 = ELEMENT_DATA;
	formData = {
		name: '',
		precision: '',
		strategy: '',
		method: '',
		account: '',
		adjusment_account: ''
	};
	locationGroup = [
		{id:1,name:'Standard Cost'},
		{id:2,name:'FIFO Cost'},
		{id:3,name:'Last Purchased Cost'},
		{id:4,name:'Average Cost'}
	];
	unitList = ['Kg','Each','Liter','Bottle','Gram'];


	subject$: ReplaySubject<RoundingOff[]> = new ReplaySubject<RoundingOff[]>(1);
	data$: Observable<RoundingOff[]>;
	roundingData: RoundingOff[];

	@Input()
	columns: ListColumn[] = [
		{ name: 'Rounding Off Name', property: 'name', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Rounding Precision', property: 'precision', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Rounding Strategy', property: 'strategy', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Rounding Method', property: 'method', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Rounding Account', property: 'account', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Select Adjusment Account', property: 'adjusment_account', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<RoundingOff> | null;
	database: ListDatabase<RoundingOff>;

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
		this.database = new ListDatabase<RoundingOff>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<RoundingOff[]>(Boolean)
		).subscribe((userGroup) => {
			this.roundingData = userGroup;
			this.database.dataChange.next(userGroup);
			this.resultsLength = userGroup.length;
		});
		this.dataSource = new ListDataSource<RoundingOff>(this.database, this.sort, this.paginator, this.columns);
	}
	/* Add or Edit Funtion For User */
	editUser(row){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '60vw';
		dialogConfig.data = row;
		const dialogRef = this.dialog.open(RoundingOffCreateFormComponent,dialogConfig);
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