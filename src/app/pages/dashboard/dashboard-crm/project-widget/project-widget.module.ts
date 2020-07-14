import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectWidgetComponent } from './project-widget.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatRippleModule
  ],
  declarations: [ProjectWidgetComponent],
  exports: [ProjectWidgetComponent]
})
export class ProjectWidgetModule { }
