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
    baseUrlLocation = "/masterSetup-1.0.0/setup/locations";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
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
    saveLocationGroupData(data : Location) {
        return this.http.post(`${environment.apiUrl}${this.baseUrlLgroup}/save`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    updateLocationGroupData(data : Location) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlLgroup}/update`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    deleteLocationGroup(id: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
                location_group_id : id,
                is_active : false
            }
        };
        return this.http.delete(`${environment.apiUrl}${this.baseUrlLgroup}/delete/`,options)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    /** get all location list including active/inactive */
    getAllLocationType() {
        return this.http.get(`${environment.apiUrl}${this.baseUrlLtype}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    saveAllLocationType(data : any) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlLtype}/update_all`, data)
            .pipe(map(x => {
                return x;
            }),catchError( error => {
                return throwError(error);
            })
        );
    }
    activeInactiveLocationType(data : any) {
        return this.http.put(`${environment.apiUrl}${this.baseUrlLtype}/update`, data)
            .pipe(map(x => {
                return x;
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
    /** just update is_active field as false **/
    deleteLocationType(id: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
                location_type_id:id,
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

    /*** get location data from location list ***/
    getAllLocation() {
        return this.http.get<Location[]>(`${environment.apiUrl}${this.baseUrlLocation}/get/all`).pipe(
            map((res : any) => {
                return res.body;
            }),catchError( error => {
                return throwError(error);
            })
        );
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
}