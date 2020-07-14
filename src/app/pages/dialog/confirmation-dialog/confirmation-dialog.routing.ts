import { RouterModule, Routes } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: ConfirmationDialogComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DialogRoutingModule { }
