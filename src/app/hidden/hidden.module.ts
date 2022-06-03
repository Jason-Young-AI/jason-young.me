import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiddenRoutingModule } from './hidden-routing.module';
import { HiddenComponent } from './hidden.component';


@NgModule({
  declarations: [
    HiddenComponent
  ],
  imports: [
    CommonModule,
    HiddenRoutingModule
  ]
})
export class HiddenModule { }
