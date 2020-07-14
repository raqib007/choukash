import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsSliderComponent } from './components-slider.component';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatSliderModule
  ],
  declarations: [ComponentsSliderComponent],
  exports: [ComponentsSliderComponent]
})
export class ComponentsSliderModule { }
