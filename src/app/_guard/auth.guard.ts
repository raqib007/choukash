

import { Injectable } from '@angular/core';
import { AuthService } from '../_services';
import { User } from '../_models';
import { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable() 
export class AuthGuard implements CanActivate {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    
    constructor(private router : Router,private authService: AuthService){
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('choukashUser')));
        this.user = this.userSubject.asObservable();
    }
    private tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        console.log('jwt token expiry = ',expiry);
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(localStorage.getItem('choukashUser')){
            /*** logged in so true true ***/
            console.log('jwt token = ',this.userSubject.value.token);
            let hasExpried = this.tokenExpired(this.userSubject.value.token);
            console.log('token expired = ',hasExpried);
            // if(hasExpried)
            //     return true;
            // else
            //     this.authService.logout();

            return true;
        }

        /*** not logged in so redirect to login page with the return url ***/
        this.router.navigate(['/login'], {queryParams : {returnUrl : state.url}});
        return false;
    }
}