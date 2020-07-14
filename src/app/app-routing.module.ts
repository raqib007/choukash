import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { authRoutes } from './pages/auth/auth.routing';
import { AuthGuard } from './_guard/index';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		canActivate:[AuthGuard],
		children: [
			{
				path: '',
				loadChildren: () => import('./pages/dashboard/dashboard-statistics/dashboard-statistics.module').then(m => m.DashboardStatisticsModule),
				pathMatch: 'full'
			},
			{
				path: 'dashboard/all-in-one',
				loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'dashboard/crm',
				loadChildren: () => import('./pages/dashboard/dashboard-crm/dashboard-crm.module').then(m => m.DashboardCrmModule)
			},
			{
				path: 'settings',
				loadChildren: () => import('./pages/settings/settings.module').then(m => m.ComponentsModule)
			},
			{
				path: 'inventory',
				loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule)
			},
			{
				path: 'inventory/product',
				loadChildren: () => import('./pages/inventory/product/product.module').then(m => m.InventoryProductModule)
			}
		]
	},
	/*** otherwise redirect to home ***/
	{ path : '**', redirectTo : ' '},
	{ path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
	{ path : 'auth',children: [...authRoutes]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		// initialNavigation: 'enabled',
		// preloadingStrategy: PreloadAllModules,
		scrollPositionRestoration: 'top'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
