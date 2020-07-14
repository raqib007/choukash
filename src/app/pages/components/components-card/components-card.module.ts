import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsCardComponent } from './components-card.component';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [ComponentsCardComponent],
  exports: [ComponentsCardComponent]
})
export class ComponentsCardModule { }
