import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from './edit-user.component';
import { AuthGuard } from '../shared';

const routes: Routes = [
   {
       path: "", component:EditUserComponent ,canActivate:[AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserRoutingModule { }
