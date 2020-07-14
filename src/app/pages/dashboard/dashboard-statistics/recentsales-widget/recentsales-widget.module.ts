import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentsalesWidgetComponent } from './recentsales-widget.component';
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
  declarations: [RecentsalesWidgetComponent],
  exports: [RecentsalesWidgetComponent]
})
export class RecentsalesWidgetModule { }
