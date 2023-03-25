import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserInputComponent } from './user-input/user-input.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-builder',
    pathMatch: 'full',
  },

  {
    path: 'form-builder',
    component: FormBuilderComponent,
  },
  {
    path: 'user-form',
    component: UserFormComponent,
  },

  {
    path: 'user-input',
    component: UserInputComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
