import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogRoutingModule } from './dialog.routing';
import { DialogComponent } from './dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LocationTypeDialogComponent } from './location-type-dialog/location-type-dialog.component';
import { LocationModule } from '../location/location.module';
import { ContactTypeDialogComponent } from './contact-type-dialog/contact-type-dialog.component';
import { ContactSubgroupDialogComponent } from './contact-subgroup-dialog/contact-subgroup-dialog.component';
import { ContactsModule } from '../contacts/contacts.module';

@NgModule({
	imports: [
		CommonModule,
		DialogRoutingModule,
		MatDialogModule,
		MatButtonModule,
		LocationModule,
		ContactsModule
	],
	declarations: [
		DialogComponent,
		ConfirmationDialogComponent,
		LocationTypeDialogComponent,
		ContactTypeDialogComponent,
		ContactSubgroupDialogComponent
	],
	entryComponents: [
		ConfirmationDialogComponent,
		LocationTypeDialogComponent,
		ContactTypeDialogComponent,
		ContactSubgroupDialogComponent
	],
})
export class DialogModule { }
