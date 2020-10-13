import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent},
  { path: 'form', component: FormComponent},
  { path: '**', redirectTo: 'contact', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
