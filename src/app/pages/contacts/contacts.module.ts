import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts.routing';
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

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactListCreateFormComponent } from './contact-list-create-form/contact-list-create-form.component';
import { ContactSubgroupListComponent } from './contact-subgroup-list/contact-subgroup-list.component';
import { ContactTypeComponent } from './contact-type/contact-type.component';
import { ContactSubGroupCreateFormComponent } from './contact-sub-group-create-form/contact-sub-group-create-form.component';
import { ContactTypeCreateFormComponent } from './contact-type/contact-type-create-form/contact-type-create-form.component';


@NgModule({
  	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ContactsRoutingModule,
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
        ContactsComponent,
        ContactListComponent,
        ContactListCreateFormComponent,
        ContactSubgroupListComponent,
		ContactSubGroupCreateFormComponent,
        ContactTypeComponent,
        ContactTypeCreateFormComponent
	],
	exports: [ContactsComponent],
	entryComponents: [
		ContactListCreateFormComponent,
		ContactSubGroupCreateFormComponent,
		ContactTypeCreateFormComponent
	],
})
export class ContactsModule { }
