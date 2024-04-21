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

const routes: Routes = [
  { path:"home", title:"Home", component:HomeComponent},
  { path:"login", title:"Login", component:LoginComponent},
  { path:"register", title:"Register", component:RegisterComponent},
  { path:"dashboard", title:"Dashboard", component:DashboardComponent},
  { path:"about", title:"About", component:AboutComponent},
  { path:"contact", title:"Contact", component:ContactComponent},
  { path:"user/:id", title:"User Details", component:UserComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
