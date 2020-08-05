import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,throwError  } from 'rxjs';
import { map,catchError,take } from 'rxjs/operators';
import { Bussiness } from '../model';

@Injectable({ providedIn : 'root' })

export class BusinessService {
    baseUrlCompany = "/masterSetup-1.0.0/setup/company";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    getBusinessInfo() {
        return this.http.get<Bussiness>(`${environment.apiUrl}${this.baseUrlCompany}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveBusinessData(data : Bussiness) {
        return this.http.post(`${environment.apiUrl}${this.baseUrlCompany}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
   
    updateBusinessData(data : Bussiness) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlCompany}/update`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }

    deleteCompany(id: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
                company_id:id,
                is_active : false
            }
        };
        return this.http.delete(`${environment.apiUrl}${this.baseUrlCompany}/delete/`,options)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
}