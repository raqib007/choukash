import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule} from '@angular/flex-layout';

import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AgmCoreModule } from '@agm/core';
import { RouteHandlerModule } from './core/route-handler/route-handler.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CdkTableModule} from '@angular/cdk/table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthGuard } from '../app/_guard/index';
import { JwtInterceptor,ErrorInterceptor } from './_helpers';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'elastic-ui' }),
		BrowserAnimationsModule,
		HttpClientModule,
		StoreModule.forRoot(reducers),
		!environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		EffectsModule.forRoot([]),
		AgmCoreModule.forRoot({
		apiKey: environment.googleMapsApiKey
		}),
		AppRoutingModule,
		CoreModule,
		PagesModule,
		RouteHandlerModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		CdkTableModule,
		FlexLayoutModule,
		// MatMultiselectModule
		NgMultiSelectDropDownModule.forRoot()
	],
	providers: [
		AuthGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
	entryComponents: [
	],
})
export class AppModule { }
