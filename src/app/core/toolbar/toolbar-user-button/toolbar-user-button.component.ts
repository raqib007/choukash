import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertService,AuthService } from '../../../_services';
import { AuthModule } from 'src/app/pages/auth/auth.module';

@Component({
	selector: 'elastic-toolbar-user-button',
	templateUrl: './toolbar-user-button.component.html',
	styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit, AfterViewInit {
	isOpen: boolean;
	user : any;
	constructor(private authService : AuthService) {
		this.authService.user.subscribe(x => this.user = x);
		this.user = this.authService.userValue;
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	toggleDropdown() {
		this.isOpen = !this.isOpen;
	}

	onClickOutside() {
		this.isOpen = false;
	}
	logout(){
		this.authService.logout();
	}
}
