import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable,throwError  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models';

interface AuthResponse{
    name:string;
    refreshToken:string;
    expiredID:string;
    localId:string;
}
const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
const body = { title: 'Angular POST Request Example' };

@Injectable({ providedIn : 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('choukashUser')));
        this.user = this.userSubject.asObservable();
    }

    baseUrl = "/loginAuth-1.0.0/user/user_info";
    userUrl = "/GononetUserCreationService/api/v1";
    authUrl = "/GononetAuthService/oauth";
    
    public get userValue(): User {
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
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post<any>(`${environment.apiUrlAWSAuth}${this.authUrl}/token`,data, {headers: headers }).pipe(
                map((user : any) => {
                    console.log('in login = ',user);
                    let user_data = {
                        id:user.headers.get('userid'),
                        first_name:user.headers.get('firstname'),
                        last_name:user.headers.get('lastname'),
                        user_name:user.headers.get('firstname')+' '+user.headers.get('lastname'),
                        email:user.headers.get('authorization'),
                        password:user.headers.get('authorization'),
                        passwordConfirm:user.headers.get('authorization'),
                        token:user.headers.get('authorization'),
                        expires:user.headers.get('expires')
                    }
                    // this.userSubject.next(user_data);
                    localStorage.setItem('choukashUser', JSON.stringify(user_data));
                    return user;
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

    passwordReset(email : string){
        return this.http.post(`${environment.apiUrl}${this.baseUrl}/password_reset_request`, {email}).pipe(
            map((res : any) => {
                return res;
            }),catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        );
    }

    passwordChanged(password,token){
        return this.http.post(`${environment.apiUrl}${this.baseUrl}/password_reset`, {password:password,token:token}).pipe(
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
                if (id == this.userValue.userId) {
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
                if (id == this.userValue.userId) {
                    this.logout();
                }
                return x;
            }));
    }
}