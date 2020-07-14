import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsProgressComponent } from './components-progress.component';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSliderModule
  ],
  declarations: [ComponentsProgressComponent],
  exports: [ComponentsProgressComponent]
})
export class ComponentsProgressModule { }
