import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CveDetailsComponent } from './cve-details/cve-details.component';

const routes: Routes = [
  { path: 'cve/:id', component: CveDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
