import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory.routing';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { UtilsModule } from '../../core/utils/utils.module';

import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FlexLayoutModule} from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkTableModule} from '@angular/cdk/table';
import { ListModule } from '../../core/list/list.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SortablejsModule } from 'ngx-sortablejs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { ProductComponent } from './product/product.component';
// import { GeneralComponent } from './product/general/general.component';

@NgModule({
	imports: [
		CommonModule,
		InventoryRoutingModule,
		PageHeaderModule,
		BreadcrumbsModule,
		UtilsModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatRippleModule,
		MatListModule,
		MatIconModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatTooltipModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule,
		MatCheckboxModule,
		MatRadioModule,
		MatSlideToggleModule,
		MatSliderModule,
		MatTabsModule,
		MatCardModule,
		MatTableModule,
		MatDialogModule,
		MatPaginatorModule,
		MatSortModule,
		MatProgressSpinnerModule,
		CdkTableModule,
		MatMenuModule,
		ListModule,
		AutocompleteLibModule,
		SortablejsModule,
		NgMultiSelectDropDownModule.forRoot()
	],
	declarations: [InventoryComponent],
	entryComponents: []
})
export class InventoryModule { }
