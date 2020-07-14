import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: BusinessComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BusinessRoutingModule { }
