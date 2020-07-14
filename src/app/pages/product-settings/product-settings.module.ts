import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ProductSettingsComponent } from './product-settings.component';
import { ProductSettingsRoutingModule } from './product-settings.routing';
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
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { ProductCatagoryListComponent } from './product-catagory-list/product-catagory-list.component';
import { StockControlComponent } from './stock-control/stock-control.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { ProductCatagoryFormComponent } from './product-catagory-form/product-catagory-form.component';
import { UnitFormComponent } from './unit-form/unit-form.component';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { InventoryTypeComponent } from './inventory-type/inventory-type.component';
import { ProductSubcategoryFormComponent } from './product-subcategory-form/product-subcategory-form.component';
import { ProductSubcategoryListComponent } from './product-subcategory-list/product-subcategory-list.component';

@NgModule({
  	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ProductSettingsRoutingModule,
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
		ListModule
  	],
  	declarations: [
        ProductSettingsComponent,
        ProductDashboardComponent,
        BrandListComponent,
        ProductCatagoryListComponent,
        StockControlComponent,
        UnitListComponent,
        ProductCatagoryFormComponent,
        UnitFormComponent,
        BrandFormComponent,
        InventoryTypeComponent,
        ProductSubcategoryFormComponent,
        ProductSubcategoryListComponent
	],
	exports: [ProductSettingsComponent],
	entryComponents: [
		ProductCatagoryFormComponent,
		ProductSubcategoryFormComponent,
        UnitFormComponent,
        BrandFormComponent
	],
})
export class ProductSettingsModule { }
