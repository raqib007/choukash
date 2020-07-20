import { RouterModule, Routes } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: AccountingComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountingRoutingModule { }
