import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,throwError  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Bussiness } from '../model';

@Injectable({ providedIn : 'root' })

export class BusinessService {

    baseUrl = "/masterSetup-1.0.0/setup";
    baseUrlCompany = "/masterSetup-1.0.0/setup";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    getBusinessInfo() {
        return this.http.get<Bussiness>(`${environment.apiUrl}${this.baseUrl}/company/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveUserGroupData(data : Bussiness) {
        return this.http.post(`${environment.apiUrl}${this.baseUrl}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
   
    updateUserGroupData(data : Bussiness) {
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
}