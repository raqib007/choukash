import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesWidgetComponent } from './sales-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UtilsModule } from '../../../../core/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    UtilsModule
  ],
  declarations: [SalesWidgetComponent],
  exports: [SalesWidgetComponent]
})
export class SalesWidgetModule { }
