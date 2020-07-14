import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavModule } from '../sidenav/sidenav.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { QuickpanelModule } from '../quickpanel/quickpanel.module';
import { RouterModule } from '@angular/router';
import { ScrollbarService } from '../scrollbar/scrollbar.service';
import { SettingsModule } from '../settings/settings.module';
// import { InventoryModule } from '../../pages/inventory/inventory.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    SidenavModule,
    SettingsModule,
    ToolbarModule,
    QuickpanelModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    // InventoryModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  providers: [ScrollbarService]
})
export class LayoutModule { }
