import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiddenComponent } from './hidden.component';

const routes: Routes = [
  { path: '', component: HiddenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiddenRoutingModule { }
