import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsGridlistComponent } from './components-gridlist.component';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule
  ],
  declarations: [ComponentsGridlistComponent],
  exports: [ComponentsGridlistComponent]
})
export class ComponentsGridlistModule { }
