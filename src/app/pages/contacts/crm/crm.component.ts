import { Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExampleHttpDatabase } from './table-http-service';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, of as observableOf} from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ContactService, NotificationService } from 'src/app/_services';
import { ContactSubGroupCreateFormComponent } from '../contact-sub-group-create-form/contact-sub-group-create-form.component';
import { ListColumn } from 'src/app/core/list/list-column.model';

@Component({
	selector: 'erp-contact-crm',
	templateUrl: './crm.component.html',
	styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements AfterViewInit {
	displayedColumns: string[] = ['created', 'state', 'number', 'title'];
	exampleDatabase: ExampleHttpDatabase | null;
	data: any = [];

	@Input()
	columns: ListColumn[] = [
		{ name: 'Created', property: 'created_at', visible: true, isModelProperty: true ,width:'50%'},
		{ name: 'State', property: 'state', visible: true, isModelProperty: true ,width:'40%'},
		{ name: 'Number', property: 'number', visible: true, isModelProperty: true ,width:'40%'},
		{ name: 'Title', property: 'title', visible: true, isModelProperty: true ,width:'40%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 30;
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
  
	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: false}) sort: MatSort;
  
	constructor(
		private _httpClient: HttpClient,
		private dialog: MatDialog,
		private contactService : ContactService,
		private notifyService : NotificationService
	) {}

	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}

	ngAfterViewInit() {
		this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

		merge(this.sort.sortChange, this.paginator.page)
		.pipe(
			startWith({}),
			switchMap(() => {
			this.isLoadingResults = true;
			return this.exampleDatabase!.getRepoIssues(
				this.sort.active, this.sort.direction, this.paginator.pageIndex);
			}),
			map(data => {
			// Flip flag to show that loading has finished.
			this.isLoadingResults = false;
			this.isRateLimitReached = false;
			this.resultsLength = data.total_count;

			return data.items;
			}),
			catchError(() => {
			this.isLoadingResults = false;
			// Catch if the GitHub API has reached its rate limit. Return empty data.
			this.isRateLimitReached = true;
			return observableOf([]);
			})
		).subscribe(data => this.data = data);
	}

	/* Add and Edit Funtion For Contact Group */
	editGroup(contact){
		
	}
	/* Delete Funtion For Contact Group */
	deleteGroup(row){
		
	}

	onFilterChange(value) {
		if (!this.data) {
			return;
		}
		this.data.filter = value;
	}
}