
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserCreateFormComponent} from '../create-user/user-create-form/user-create-form.component';
import { ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { List } from '../../../core/list/list.interface';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../../../model/user';
import { UserData } from '../../../dummy-data/user';
import { componentDestroyed } from '../../../core/utils/component-destroyed';

@Component({
    selector: 'choukash-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements List<User>, OnInit, OnDestroy {

	subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
	data$: Observable<User[]>;
	users: User[];

	formData = {
		id : -1,
		fname : '',
		lname : '',
		uname: '',
		description: '',
		ltype: '',
		lgroup: '',
		mobile: '',
		email: '',
		uid: '',
		password: '',
		ugroupid: ''
	};

    @Input()
	columns: ListColumn[] = [
		{ name: 'ID', property: 'id', visible: true, isModelProperty: true,width:'5%' },
		{ name: 'First Name', property: 'fname', visible: true, isModelProperty: true ,width:'7%'},
		{ name: 'Last Name', property: 'lname', visible: true, isModelProperty: true ,width:'7%'},
		{ name: 'User Name', property: 'uname', visible: true, isModelProperty: true,width:'5%' },
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true ,width:'9%'},
		{ name: 'Location Type', property: 'ltype', visible: true, isModelProperty: true ,width:'9%'},
		{ name: 'Location', property: 'lgroup', visible: true, isModelProperty: true,width:'9%' },
		{ name: 'Mobile', property: 'mobile', visible: true, isModelProperty: true ,width:'8%'},
		{ name: 'Email', property: 'email', visible: true, isModelProperty: true ,width:'8%'},
		{ name: 'User ID', property: 'uid', visible: true, isModelProperty: true,width:'8%' },
		{ name: 'Password', property: 'password', visible: true, isModelProperty: true ,width:'9%'},
		{ name: 'User Group', property: 'ugroupid', visible: true, isModelProperty: true ,width:'8%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<User> | null;
	database: ListDatabase<User>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	  
	constructor(public dialog: MatDialog) {}

	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
	ngOnInit() {
		this.users = UserData.map(l => new User(l));
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
	editUser(row){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '750px';
		dialogConfig.data = {
			id: row.id,
			fname : row.fname,
			lname : row.lname,
			uname: row.uname,
			description: row.description,
			ltype: row.ltype,
			lgroup: row.lgroup,
			mobile: row.mobile,
			email: row.email,
			uid: row.uid,
			password: row.password,
			ugroupid: row.ugroupid,
			title : (row.id > -1)?'Edit User':'Create New User'
		};
		const dialogRef = this.dialog.open(UserCreateFormComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
            val => console.log("Dialog output:", val)
        );
	}
	deleteUser(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
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