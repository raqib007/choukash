import { Component } from '@angular/core';
import { AuthService } from './_services';
import { User} from './_models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	user: User;
	title = 'choukash';
	  
	constructor(private authService: AuthService) {
        this.authService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.authService.logout();
    }
}
