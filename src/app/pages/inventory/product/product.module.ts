import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product.routing';
import { PageHeaderModule } from '../../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';
import { UtilsModule } from '../../../core/utils/utils.module';
import { ListModule } from '../../../core/list/list.module';

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { CdkTableModule} from '@angular/cdk/table';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SortablejsModule } from 'ngx-sortablejs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { GeneralComponent } from './general/general.component';
import { UomComponent } from './uom/uom.component';
import { VariantComponent } from './variant/variant.component';
import { DimensionComponent } from './dimension/dimension.component';
import { LocationsComponent } from './locations/locations.component';
import { VendorInformationComponent } from './vendor-information/vendor-information.component';
import { ReplenishmentComponent } from './replenishment/replenishment.component';
import { CostingComponent } from './costing/costing.component';
import { PricingComponent } from './pricing/pricing.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { AddInitialInventoryComponent } from './add-initial-inventory/add-initial-inventory.component';
import { MoveInventoryComponent } from './move-inventory/move-inventory.component';

@NgModule({
	imports: [
		CommonModule,
		ProductRoutingModule,
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
		MatToolbarModule,
		CdkTableModule,
		MatMenuModule,
		ListModule,
		AutocompleteLibModule,
		SortablejsModule,
		NgMultiSelectDropDownModule.forRoot()
	],
	declarations: [
        ProductComponent,
        GeneralComponent,
        UomComponent,
        VariantComponent,
        DimensionComponent,
        LocationsComponent,
        VendorInformationComponent,
        ReplenishmentComponent,
        CostingComponent,
        PricingComponent,
        AccountInformationComponent,
        AddInitialInventoryComponent,
        MoveInventoryComponent
    ],
	entryComponents: []
})
export class InventoryProductModule { }
