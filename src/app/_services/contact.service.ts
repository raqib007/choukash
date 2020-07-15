import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,throwError  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Contact,ContactGroup } from '../model';


@Injectable({ providedIn : 'root' })

export class ContactService {

    baseUrlLtype = "/masterSetup-1.0.0/setup/contact_type";
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    getAllContactGroup() {
        return this.http.get<ContactGroup[]>(`${environment.apiUrl}${this.baseUrlLtype}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveContactGroupData(data : ContactGroup) {
        return this.http.post(`${environment.apiUrl}${this.baseUrlLtype}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    updateContactGroupData(data : ContactGroup) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlLtype}/update`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    deleteContactGroup(id: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
                user_group_id:id,
                is_active : false
            }
        };
        return this.http.delete(`${environment.apiUrl}${this.baseUrlLtype}/delete/`,options)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
}