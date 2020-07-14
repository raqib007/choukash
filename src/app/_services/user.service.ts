import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    saveData(data : UserGroup) {
        return this.http.post(`${environment.apiUrl}${this.baseUrl}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
   
    updateData(data : UserGroup) {
        return this.http.put(`${environment.apiUrl}${this.baseUrl}/update`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
}