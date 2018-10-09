import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthGuard } from "./_guards/auth.guard";
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: 'users', component: UserComponent, canActivate:[AuthGuard] },
  { path: 'edit-user', component: EditUserComponent, canActivate:[AuthGuard]},
  { path: 'user-detail', component:UserDetailComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
