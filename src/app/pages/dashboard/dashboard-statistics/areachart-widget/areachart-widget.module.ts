import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreachartWidgetComponent } from './areachart-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [AreachartWidgetComponent],
  exports: [AreachartWidgetComponent]
})
export class AreachartWidgetModule { }
