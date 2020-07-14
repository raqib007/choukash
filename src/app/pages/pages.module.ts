import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	imports: [
		CommonModule,
		AuthModule,
		MatDialogModule,
		MatButtonModule
	],
	declarations: [ConfirmationDialogComponent],
	entryComponents: [
		ConfirmationDialogComponent
	],
})
export class PagesModule { }
