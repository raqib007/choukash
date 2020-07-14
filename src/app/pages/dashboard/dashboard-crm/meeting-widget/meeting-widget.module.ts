import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingWidgetComponent } from './meeting-widget.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule
  ],
  declarations: [MeetingWidgetComponent],
  exports: [MeetingWidgetComponent]
})
export class MeetingWidgetModule { }
