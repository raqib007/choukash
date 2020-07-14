import { RouterModule, Routes } from '@angular/router';
import { ProductSettingsComponent } from './product-settings.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: ProductSettingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductSettingsRoutingModule { }
