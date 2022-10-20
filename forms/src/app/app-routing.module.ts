import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  {path: 'templateForm', component: TemplateFormComponent},
  {path: 'dataForm', component: DataFormComponent},
  {path: '', pathMatch: 'full', redirectTo: 'busca-reativa'},
  {path: 'busca-reativa', loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
