import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
	imports: [
		CommonModule,
		AuthModule,
		MatDialogModule,
		MatButtonModule,
		DialogModule
	],
	declarations: [

	],
	entryComponents: [
		
	],
})
export class PagesModule { }
