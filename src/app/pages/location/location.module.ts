import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { LocationRoutingModule } from './location.routing';
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

import { LocationListComponent } from './location-list/location-list.component';
import { LocationCreateFormComponent } from './location-create-form/location-create-form.component';
import { LocationGroupListComponent } from './location-group-list/location-group-list.component';
import { LocationGroupCreateFormComponent } from './location-group-create-form/location-group-create-form.component';
import { LocationInvoiceAddressComponent } from './location-create-form/location-invoice-address/location-invoice-address.component';
import { LocationShippingAddressComponent } from './location-create-form/location-shipping-address/location-shipping-address.component';
import { LocationDefaultAddressComponent } from './location-create-form/location-default-address/location-default-address.component';
import { LocationDetailsComponent } from './location-create-form/location-details/location-details.component';
import { LocationWithLocationComponent } from './location-create-form/location-with-location/location-with-location.component';
import { LocationTypeComponent } from './location-type/location-type.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SortablejsModule } from 'ngx-sortablejs';


@NgModule({
  	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		LocationRoutingModule,
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
		MatListModule,
		CdkTableModule,
		MatMenuModule,
		ListModule,
		SortablejsModule
  	],
  	declarations: [
        LocationComponent,
        LocationListComponent,
        LocationCreateFormComponent,
        LocationGroupListComponent,
        LocationGroupCreateFormComponent,
        LocationInvoiceAddressComponent,
        LocationShippingAddressComponent,
        LocationDefaultAddressComponent,
        LocationDetailsComponent,
        LocationWithLocationComponent,
        LocationTypeComponent
	],
	exports: [LocationComponent],
	entryComponents: [
		LocationCreateFormComponent,
		LocationGroupCreateFormComponent
	],
})
export class LocationModule { }
