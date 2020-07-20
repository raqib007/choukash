import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { AccountingComponent } from './accounting.component';
import { AccountingRoutingModule } from './accounting.routing';
import { ListModule } from '../../core/list/list.module';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkTableModule} from '@angular/cdk/table';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SortablejsModule } from 'ngx-sortablejs';
import { GeneralComponent } from './general/general.component';
import { SalesComponent } from './sales/sales.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { IntegrationSetupComponent } from './integration-setup/integration-setup.component';
import { RoundingOffComponent } from './rounding-off/rounding-off.component';
import { RoundingOffCreateFormComponent } from './rounding-off/rounding-off-create-form/rounding-off-create-form.component';
import { CostMethodComponent } from './sales/cost-method/cost-method.component';
import { PaymentItemsComponent } from './sales/payment-items/payment-items.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AccountingRoutingModule,
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
		MatAutocompleteModule,
		CdkTableModule,
		ListModule,
		AutocompleteLibModule,
		MatToolbarModule,
		SortablejsModule
	],
	declarations: [
		AccountingComponent,
		GeneralComponent, 
		SalesComponent, 
		AdvancedComponent, 
		IntegrationSetupComponent, 
		RoundingOffComponent, 
		RoundingOffCreateFormComponent, 
		CostMethodComponent, 
		PaymentItemsComponent
	],
	exports: [AccountingComponent],
	entryComponents: [
		RoundingOffCreateFormComponent
	]
})
export class AccountingModule { }
