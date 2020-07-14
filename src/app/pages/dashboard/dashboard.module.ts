import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { ScrollbarModule } from '../../core/scrollbar/scrollbar.module';
import { DashboardCrmModule } from './dashboard-crm/dashboard-crm.module';
import { DashboardStatisticsModule } from './dashboard-statistics/dashboard-statistics.module';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    ScrollbarModule,

    // Dashboards
    DashboardCrmModule,
    DashboardStatisticsModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
