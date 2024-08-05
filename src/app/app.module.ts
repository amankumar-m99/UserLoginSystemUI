import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NetworkIndicatorComponent } from './components/network-indicator/network-indicator.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserComponent } from './components/user/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardSecurityComponent } from './components/dashboard/dashboard-security/dashboard-security.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserControlsComponent } from './components/admin-panel/user-controls/user-controls.component';
import { SmtpControlsComponent } from './components/admin-panel/smtp-controls/smtp-controls.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { RoleControlsComponent } from './components/admin-panel/role-controls/role-controls.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdatePasswordFormComponent } from './components/update-password-form/update-password-form.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { BuildInfoComponent } from './components/build-info/build-info.component';
import { TechStackItemComponent } from './components/tech-stack-item/tech-stack-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    NetworkIndicatorComponent,
    AboutComponent,
    ContactComponent,
    UserComponent,
    ProfileComponent,
    DashboardSecurityComponent,
    AdminPanelComponent,
    UserControlsComponent,
    SmtpControlsComponent,
    RoleControlsComponent,
    ForgotPasswordComponent,
    UpdatePasswordFormComponent,
    UpdatePasswordComponent,
    TechStackComponent,
    BuildInfoComponent,
    TechStackItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
