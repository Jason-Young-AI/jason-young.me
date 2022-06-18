import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material.module';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicationsComponent } from './publications/publications.component';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProfileComponent,
    PublicationsComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
  ]
})
export class MainModule { }
