import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { UtilsModule } from '../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { UserModule } from '../user/user.module';
import { LocationModule} from '../location/location.module';
import { BusinessModule } from '../business/business.module';
import { ContactsModule } from '../contacts/contacts.module';
import { AccountingModule } from '../accounting/accounting.module';
import { ProductSettingsModule } from '../product-settings/product-settings.module';
import { from } from 'rxjs';

@NgModule({
	imports: [
		CommonModule,
		SettingsRoutingModule,
		PageHeaderModule,
		BreadcrumbsModule,
		UtilsModule,
		FlexLayoutModule,
		MatRippleModule,
		MatListModule,
		UserModule,
		LocationModule,
		BusinessModule,
		ContactsModule,
		ProductSettingsModule,
		AccountingModule
	],
	declarations: [SettingsComponent],
	entryComponents: [SettingsComponent]
})
export class ComponentsModule { }
