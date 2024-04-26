import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserComponent } from './components/user/user/user.component';
import { ActivateDashBoardRoute, ActivateLoginAndRegisterRoute, ActivateAdminRoute } from './utils/auth.util';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardSecurityComponent } from './components/dashboard/dashboard-security/dashboard-security.component';
import { DashboardNotificationComponent } from './components/dashboard/dashboard-notification/dashboard-notification.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserControlsComponent } from './components/admin-panel/user-controls/user-controls.component';
import { SmtpControlsComponent } from './components/admin-panel/smtp-controls/smtp-controls.component';

const routes: Routes = [
  { path:"home", title:"Home", component:HomeComponent},
  { path:"login", title:"Login", component:LoginComponent, canActivate:[ActivateLoginAndRegisterRoute]},
  { path:"register", title:"Register", component:RegisterComponent, canActivate:[ActivateLoginAndRegisterRoute]},
  { path:"logout", title:"Logout", component:LogoutComponent },
  { path:"dashboard", title:"Dashboard", component:DashboardComponent, canActivate:[ActivateDashBoardRoute],
    children: [
      { path:'', redirectTo:'home', pathMatch: 'full' },
      { path:'home', component: DashboardHomeComponent },
      { path:'profile', component: ProfileComponent },
      { path:'security', component: DashboardSecurityComponent },
      { path:'notifications', component: DashboardNotificationComponent },
      { path:'admin-console', component: AdminPanelComponent, 
      children:[
          { path:'', redirectTo:'users', pathMatch: 'full' },
          { path:'users', component: UserControlsComponent },
          { path:'smtp', component: SmtpControlsComponent }
        ]},
      { path:'super-admin-console', component: AdminPanelComponent }
    ]
  },
  { path:"about", title:"About", component:AboutComponent},
  { path:"contact", title:"Contact", component:ContactComponent},
  { path:"user/:id", title:"User Details", component:UserComponent, canActivate:[ActivateAdminRoute]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
