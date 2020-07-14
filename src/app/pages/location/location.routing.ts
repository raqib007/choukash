import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: LocationComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LocationRoutingModule { }
