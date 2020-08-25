import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,throwError  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Location,LocationGroup } from '../model';


@Injectable({ providedIn : 'root' })

export class DropdownListService {

    baseUrl = "/masterSetup-1.0.0/setup/";
    baseUrlL = "/locationManagement-1.0.0/location/";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }
    getCountryList() {
        return this.http.get(`https://restcountries.eu/rest/v2/all`).pipe(
            map((res : any) => {
                return res;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    getUserGroup() {
        return this.http.get(`${environment.apiUrl}/loginAuth-1.0.0/user/user_group/get/dropdown_list`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    getLocationGroup() {
        return this.http.get(`${environment.apiUrl}${this.baseUrlL}/location_group/get/dropdown_list`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    getLocationType() {
        return this.http.get(`${environment.apiUrl}${this.baseUrlL}/location_type/get/dropdown_list`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    getContactType() {
        return this.http.get(`${environment.apiUrl}${this.baseUrl}/contact_type/get/dropdown_list`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    getContactGroup() {
        return this.http.get(`${environment.apiUrl}${this.baseUrl}/contact_type_sub_group/get/dropdown_list`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    getBusinessType() {
        return this.http.get(`${environment.apiUrl}${this.baseUrl}/business_type/get/dropdown_list`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    getIndustryType() {
        return this.http.get(`${environment.apiUrl}${this.baseUrl}/industry/get/dropdown_list`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
}