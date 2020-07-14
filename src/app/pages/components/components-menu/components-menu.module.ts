import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsMenuComponent } from './components-menu.component';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [ComponentsMenuComponent],
  exports: [ComponentsMenuComponent]
})
export class ComponentsMenuModule { }
