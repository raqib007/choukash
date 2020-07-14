import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,throwError  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { UserGroup } from '../model';
import { User } from '../_models';


@Injectable({ providedIn : 'root' })

export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    baseUrl = "/loginAuth-1.0.0/user/user_group";
    baseUrlUser = "/loginAuth-1.0.0/user/user_info";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('choukashUser')));
        this.user = this.userSubject.asObservable();
    }

    
    public get userValue(): User {
        return this.userSubject.value;
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}${this.baseUrl}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveUserGroupData(data : UserGroup) {
        return this.http.post(`${environment.apiUrl}${this.baseUrl}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
   
    updateUserGroupData(data : UserGroup) {
        return this.http.put(`${environment.apiUrl}${this.baseUrl}/update`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }

    deleteUserGroup(id: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
                user_group_id:id,
                is_active : false
            }
        };
        return this.http.delete(`${environment.apiUrl}${this.baseUrl}/delete/`,options)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }


    getAllUser() {
        return this.http.get<User[]>(`${environment.apiUrl}${this.baseUrlUser}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveUserData(data : User) {
        return this.http.post(`${environment.apiUrl}${this.baseUrlUser}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
   
    updateUserData(data : User) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlUser}/update`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }

    deleteUser(id: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
                user_group_id:id,
                is_active : false
            }
        };
        return this.http.delete(`${environment.apiUrl}${this.baseUrlUser}/delete/`,options)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
}