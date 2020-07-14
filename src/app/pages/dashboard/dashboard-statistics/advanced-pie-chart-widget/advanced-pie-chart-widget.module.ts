import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedPieChartWidgetComponent } from './advanced-pie-chart-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollbarModule } from '../../../../core/scrollbar/scrollbar.module';
import { AdvancedPieChartComponent } from './advanced-pie-chart/advanced-pie-chart.component';
import { UtilsModule } from '../../../../core/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    ScrollbarModule,
    UtilsModule
  ],
  declarations: [
    AdvancedPieChartWidgetComponent,
    AdvancedPieChartComponent
  ],
  exports: [
    AdvancedPieChartWidgetComponent
  ]
})
export class AdvancedPieChartWidgetModule { }
