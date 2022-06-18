import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  providers: []
})
export class AngularMaterialModule { }
