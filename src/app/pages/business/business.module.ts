import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BusinessComponent } from './business.component';
import { BusinessRoutingModule } from './business.routing';
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
// import { MatFileUploadModule } from 'angular-material-fileupload';

import { BusinessInformationComponent } from './business-information/business-information.component';
import { OwnerInformationComponent } from './owner-information/owner-information.component';
import { OwnerInfoCreateFormComponent } from './owner-information/owner-info-create-form/owner-info-create-form.component';
import { DefaultAddressComponent } from './owner-information/owner-info-create-form/default-address/default-address.component';
import { InvoiceAddressComponent } from './owner-information/owner-info-create-form/invoice-address/invoice-address.component';
import { ShippingAddressComponent } from './owner-information/owner-info-create-form/shipping-address/shipping-address.component';
import { EditDefaultAddressComponent } from './owner-information/edit-default-address/edit-default-address.component';

@NgModule({
  	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BusinessRoutingModule,
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
		// MatFileUploadModule
  	],
  	declarations: [
        BusinessComponent,
        BusinessInformationComponent,
        OwnerInformationComponent,
        OwnerInfoCreateFormComponent,
        DefaultAddressComponent,
        InvoiceAddressComponent,
        ShippingAddressComponent,
        EditDefaultAddressComponent
	],
	exports: [BusinessComponent],
	entryComponents: [
		OwnerInfoCreateFormComponent
	],
})
export class BusinessModule { }
