import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { HighlightDirective } from './highlight.directive';
import { CountUpModule } from 'countup.js-angular2';

@NgModule({
  imports: [
    CommonModule,
    CountUpModule
  ],
  declarations: [
    ClickOutsideDirective,
    HighlightDirective
  ],
  exports: [
    ClickOutsideDirective,
    HighlightDirective,
    CountUpModule
  ]
})
export class UtilsModule { }
