import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { StudentloginComponent } from './component/studentlogin/studentlogin.component';
import { StudentregisterComponent } from './component/studentregister/studentregister.component';
import { StudentdashboardComponent } from './component/studentdashboard/studentdashboard.component';
import { CompanyloginComponent } from './component/companylogin/companylogin.component';
import { CompanyregisterComponent } from './component/companyregister/companyregister.component';
import { CompanydashboardComponent } from './component/companydashboard/companydashboard.component';
 
import { CompanyvalidateService } from './services/companyvalidate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CompanyauthService } from './services/companyauth.service';

import { StudentvalidateService } from './services/studentvalidate.service';
import { StudentauthService } from './services/studentauth.service';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'student', component: StudentdashboardComponent},
  {path:'student/login', component: StudentloginComponent},
  {path:'student/register', component: StudentregisterComponent},
  {path:'student/dashboard', component: StudentdashboardComponent},
  {path:'company', component: CompanydashboardComponent},
  {path:'company/login', component: CompanyloginComponent},
  {path:'company/register', component: CompanyregisterComponent},
  {path:'company/dashboard', component: CompanydashboardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StudentloginComponent,
    StudentregisterComponent,
    StudentdashboardComponent,
    CompanyloginComponent,
    CompanyregisterComponent,
    CompanydashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [
    CompanyvalidateService, 
    CompanyauthService, 
    StudentvalidateService,
    StudentauthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}