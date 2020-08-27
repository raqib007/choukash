import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';

//noooo
const routes: Routes = [
	{
		path: '',
		component: DialogComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DialogRoutingModule { }
