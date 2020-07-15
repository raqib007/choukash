import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /* add auth header with jwt if user is logged in and request is to the api url */
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (this.isHeaderNeeded(request.url) && isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${user.token}`
                }
            });
        }
        return next.handle(request);
    }

    isHeaderNeeded(url: string) {
        if (url.split('/')[3] == 'loginAuth-1.0.0') {
            return true;
        } else {
            return false;
        }
    }
}