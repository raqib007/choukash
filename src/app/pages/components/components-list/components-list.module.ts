import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsListComponent } from './components-list.component';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatListModule
  ],
  declarations: [ComponentsListComponent],
  exports: [ComponentsListComponent]
})
export class ComponentsListModule { }
