import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from "../_guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate:[AuthGuard] },
  { path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
