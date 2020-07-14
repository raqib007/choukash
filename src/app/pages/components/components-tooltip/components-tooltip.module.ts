import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsTooltipComponent } from './components-tooltip.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [ComponentsTooltipComponent],
  exports: [ComponentsTooltipComponent]
})
export class ComponentsTooltipModule { }
