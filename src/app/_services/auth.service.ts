import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable,throwError  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models';

interface AuthResponse{
    token_type:string;
    token:string;
    expires:string;
    jti:string;
    refresh_token:string;
    scope:string;
}
const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
const body = { title: 'Angular POST Request Example' };

@Injectable({ providedIn : 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('choukashUser')));
        this.user = this.userSubject.asObservable();
    }

    baseUrl = "/loginAuth-1.0.0/user/user_info";
    userUrl = "/GononetUserCreationService/api/v1";
    authUrl = "/GononetAuthService/oauth";
    
    public get userValue(): any {
        return this.userSubject.value;
    }

    private tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrlAWS}${this.userUrl}/users`, user).pipe(
            map((res : any) => {
                return res;
            }),catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        );
    }

    verifyEmail(token: string){
        let data = {
            "token": token
        };
        return this.http.post(`${environment.apiUrlAWS}${this.userUrl}/users/confirm-account`,data).pipe(
            map((res : any) => {
                return res;
            }),catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        );
    }

    login(data) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic bXVzdGFmYTptdXN0YWZh'
        });
        const body = new HttpParams()
        .set('grant_type', 'password')
        .set('username', data.username)
        .set('password', data.password);
        
        return this.http.post<any>(`${environment.apiUrlAWSAuth}${this.authUrl}/token`,body, {headers: headers }).pipe(
                map((user : any) => {
                    let userData = {
                        // token_type : user.token_type,
                        // token : user.access_token,
                        // expires : user.expires_in,
                        // jti : user.jti,
                        // refresh_token : user.refresh_token,
                        // scope : user.scope

                        userId: '',
                        firstName: '',
                        lastName: '',
                        userName: '',
                        primaryEmail: '',
                        password: '',
                        passwordConfirm: '',
                        token: user.access_token,
                        token_type: user.token_type,
                        expires: user.expires_in
                    };
                    localStorage.setItem('choukashUser', JSON.stringify(userData));
                    this.userSubject.next(userData);
                    return userData;
                }),catchError( error => {
                    console.log('error ',error);
                    return throwError( 'Something went wrong!' );
                })
            );
    }

    logout() {
        /* remove user from local storage and set current user to null */
        localStorage.removeItem('choukashUser');
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    passwordReset(userName : string){
        return this.http.post(`${environment.apiUrlAWS}${this.userUrl}/users/password/forgot`, {userName}).pipe(
            map((res : any) => {
                return res;
            }),catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        );
    }

    passwordChanged(data){
        return this.http.post(`${environment.apiUrlAWS}${this.userUrl}/users/password/reset`, data).pipe(
            map((res : any) => {
                return res;
            }),catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        );
    }

    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('choukashUser');
        return (authToken !== null) ? true : false;
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/loginAuth-1.0.0/user/user_group/get/all`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                /* update stored user if the logged in user updated their own record */
                if (id == this.userValue) {
                    /* update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    /* publish updated user to subscribers */
                    // this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                /* auto logout if the logged in user deleted their own record */
                // if (id == this.userValue.userId) {
                //     this.logout();
                // }
                return x;
            }));
    }
    getUserDetailByAccessToken() {
        return this.http.get<any>(`${environment.apiUrlAWSAuth}/GononetAuthService/api/v1/users`).pipe(
            map((user : any) => {
                let userData = {
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: '',
                    primaryEmail: user.primaryEmail,
                    token: this.userValue.token,
                    token_type: this.userValue.token_type,
                    expires: this.userValue.expires
                };
                localStorage.setItem('choukashUser', JSON.stringify(userData));
                this.userSubject.next(userData);
                return userData;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }

}