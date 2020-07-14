import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { DialogRoutingModule } from './confirmation-dialog.routing';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		DialogRoutingModule,
		FlexLayoutModule,
		MatRippleModule,
		MatListModule,
		MatButtonModule,
		MatButtonToggleModule
  	],
  	declarations: [
		ConfirmationDialogComponent
	],
	exports: [ConfirmationDialogComponent],
	entryComponents: [
	],
})
export class DialogModule { }
