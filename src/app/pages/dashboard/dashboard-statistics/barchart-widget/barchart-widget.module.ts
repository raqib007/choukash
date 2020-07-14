import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarchartWidgetComponent } from './barchart-widget.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [BarchartWidgetComponent],
  exports: [BarchartWidgetComponent]
})
export class BarchartWidgetModule { }
