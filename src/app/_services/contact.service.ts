import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,throwError  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Contact,ContactGroup } from '../model';


@Injectable({ providedIn : 'root' })

export class ContactService {

    baseUrlCtype = "/masterSetup-1.0.0/setup/contact_type";
    baseUrlCgroup = "/masterSetup-1.0.0/setup/contact_type_sub_group";
    baseUrlContact = "/contactManagement-1.0.0/setup/contacts";
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }
    getAllContactType() {
        return this.http.get<ContactGroup[]>(`${environment.apiUrl}${this.baseUrlCtype}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveAllContactType(data : any) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlCtype}/update_all`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveContactTypeData(data : any) {
        return this.http.post(`${environment.apiUrl}${this.baseUrlCtype}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    updateContactTypeData(data : any) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlCtype}/update`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    deleteContactType(id: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
                contact_type_id:id,
                is_active : false
            }
        };
        return this.http.delete(`${environment.apiUrl}${this.baseUrlCtype}/delete/`,options)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }


    /*** contact sub group CRUD functionality start ***/
    getAllContactGroup(): Observable<ContactGroup[]> {
        return this.http.get<ContactGroup[]>(`${environment.apiUrl}${this.baseUrlCgroup}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveContactGroupData(data : ContactGroup) {
        return this.http.post(`${environment.apiUrl}${this.baseUrlCgroup}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    updateContactGroupData(data : ContactGroup) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlCgroup}/update`, data)
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
                contact_sub_group_id:id,
                is_active : false
            }
        };
        return this.http.delete(`${environment.apiUrl}${this.baseUrlCgroup}/delete/`,options)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    /*** contact sub group CRUD functionality end ***/


    /*** contact CRUD functionality start ***/
    getAllDefaultContact(): Observable<Contact[]> {
        return this.http.get<Contact[]>(`${environment.apiUrl}${this.baseUrlContact}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveContactData(data : any) {
        return this.http.post(`${environment.apiUrl}${this.baseUrlContact}/save_all`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    updateContactData(data : any) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlContact}/update_all`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    updateSingleContactData(data : any) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlContact}/update`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    deleteContact(id: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
                contact_id:id,
                is_active : false
            }
        };
        return this.http.delete(`${environment.apiUrl}${this.baseUrlContact}/delete/`,options)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    /*** contact CRUD functionality end ***/


    /*** get owner information  ***/
    getAllOwnerInfo(): Observable<Contact[]> {
        return this.http.get<Contact[]>(`${environment.apiUrl}${this.baseUrlContact}/get/active_owner/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
}