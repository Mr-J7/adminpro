import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard' }},
      { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBars' }},
      { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas' }},
      { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas' }},
      { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs' }},
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account Settings' }},
      { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario' }},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
    },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
