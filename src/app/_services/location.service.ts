import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,throwError  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Location,LocationGroup } from '../model';


@Injectable({ providedIn : 'root' })

export class LocationService {

    baseUrlLtype = "/masterSetup-1.0.0/setup/location_type";
    baseUrlLgroup = "/masterSetup-1.0.0/setup/location_group";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    getAllLocationType() {
        return this.http.get<Location[]>(`${environment.apiUrl}${this.baseUrlLtype}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveLocationTypeData(data : Location) {
        return this.http.post(`${environment.apiUrl}${this.baseUrlLtype}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    updateLocationTypeData(data : Location) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlLtype}/update`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    deleteLocationType(id: string) {
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

    getAllLocationGroup() {
        return this.http.get<LocationGroup[]>(`${environment.apiUrl}${this.baseUrlLgroup}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
}