import { Component, OnInit } from '@angular/core';
import { SidenavItem } from '../sidenav/sidenav-item/sidenav-item.model';
import * as fromRoot from '../../reducers/index';
import * as fromSidenav from '../sidenav/shared/sidenav.action';
import { SetCurrentlyOpenByRouteAction } from '../sidenav/shared/sidenav.action';
import { Store } from '@ngrx/store';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SelectLayoutAction, SetCardElevationAction } from '../layout/shared/layout.action';

@Component({
  selector: 'erp-route-handler',
  templateUrl: './route-handler.component.html',
  styleUrls: ['./route-handler.component.scss']
})
export class RouteHandlerComponent implements OnInit {

	constructor(
		private store: Store<fromRoot.State>,
		private router: Router,
		private route: ActivatedRoute
	) { }

  	ngOnInit() {
		// Set Sidenav Currently Open on Page load
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.store.dispatch(new SetCurrentlyOpenByRouteAction(event.urlAfterRedirects));
			}
   		 });

		// You can use ?layout=beta to load the page with Layout Beta as default
		// Same with ?elevation=5 (anything from 0 to 24)
		this.route.queryParamMap.subscribe((params) => {
			const layout = params.get('layout');
			switch (layout) {
				case 'alpha': {
					this.store.dispatch(new SelectLayoutAction('alpha'));
					break
				}
				case 'beta': {
					this.store.dispatch(new SelectLayoutAction('beta'));
					break
				}
				case 'gamma': {
					this.store.dispatch(new SelectLayoutAction('gamma'));
					break
				}
			}
			const elevation = params.get('elevation');
			if (elevation) {
				this.store.dispatch(new SetCardElevationAction('card-elevation-z' + elevation))
			}
		});

		/* Define Menu Items here */
		/* Top Level Item (The item to click on so the dropdown opens)*/
		
		const dashboard = new SidenavItem({
			name: 'Dashboard',
			icon: 'dashboard',
			subItems: [ ],
			position: 1
		});
		const auth = new SidenavItem({
			name: 'Auth',
			icon: 'person_pin',
			route: null,
			subItems: [ ],
			position: 1
		});
		const authSubItems = [
			new SidenavItem({
				name: 'Login',
				route: '/auth/login',
				parent: auth,
				subItems: [ ],
				position: 1
			}),
			new SidenavItem({
				name: 'Register',
				route: '/auth/register',
				parent: auth,
				subItems: [ ],
				position: 1
			}),
			new SidenavItem({
				name: 'Forgot Password',
				route: '/auth/forgot-password',
				parent: auth,
				subItems: [ ],
				position: 1
			}),
		];
		auth.subItems.push(...authSubItems);
		const settings = new SidenavItem({
			name: 'Settings',
			icon: 'settings',
			route: '/settings',
			subItems: [ ],
			position: 1
		});
		const inventory = new SidenavItem({
			name: 'Inventory',
			icon: 'assignment',
			route: '/inventory',
			subItems: [],
			position: 1
		});
		const pagesSubItems = [
			new SidenavItem({
				name: 'Inventory',
				route: '/inventory',
				parent: inventory,
				subItems: [],
				position: 1
			}),
			new SidenavItem({
				name: 'Add Product',
				route: '/inventory/product',
				parent: inventory,
				subItems: [],
				position: 2
			})
		];
		inventory.subItems.push(...pagesSubItems);

		/* Send the created Menu structure to Redux/ngrx (you only need to send the Top Level Item, all dropdown items will be added automatically) */
		this.store.dispatch(new fromSidenav.AddSidenavItemAction(dashboard));
		this.store.dispatch(new fromSidenav.AddSidenavItemAction(settings));
		this.store.dispatch(new fromSidenav.AddSidenavItemAction(inventory));
	}

}
