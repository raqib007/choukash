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
                    // Authorization: `${user.token}`
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWhhbmplcmluQGdtYWlsLmNvbSIsImV4cCI6MTU5NTUwNDAzM30.fRisA5JSEEdcv3dTQ8CmmuMiudhcWJ4u9CUaHdcHUV0`
                }
            });
        }
        return next.handle(request);
    }

    isHeaderNeeded(url: string) {
        if (url.split('/')[3] == 'loginAuth-1.0.0') {
            if(url.split('/')[6] == 'update' || url.split('/')[6] == 'get' || url.split('/')[6] == 'delete' || url.split('/')[5] == 'user_group'){
                return true;
            }else{
                return false;
            }
        } else {
            return false;
        }
    }
}