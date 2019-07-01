import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CveDetailsComponent } from './cve-details/cve-details.component';
import { CveSearchComponent } from './cve-search/cve-search.component';

const routes: Routes = [
  { path: '', component: CveSearchComponent},
  { path: 'cve/:id', component: CveDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
