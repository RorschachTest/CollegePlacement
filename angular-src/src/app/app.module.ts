import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { StudentloginComponent } from './component/studentlogin/studentlogin.component';
import { StudentregisterComponent } from './component/studentregister/studentregister.component';
import { StudentdashboardComponent } from './component/studentdashboard/studentdashboard.component';
import { CompanyloginComponent } from './component/companylogin/companylogin.component';
import { CompanyregisterComponent } from './component/companyregister/companyregister.component';
import { CompanydashboardComponent } from './component/companydashboard/companydashboard.component';
import { PostjobsComponent } from './component/postjobs/postjobs.component';

import { CompanyvalidateService } from './services/companyvalidate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CompanyauthService } from './services/companyauth.service';
import { PostjobService } from './services/postjob.service';

import { StudentvalidateService } from './services/studentvalidate.service';
import { StudentauthService } from './services/studentauth.service';
import { CompanynavbarComponent } from './component/companynavbar/companynavbar.component';

import { CompanyauthGuard } from './guards/companyauth.guard';
import { StudentauthGuard } from './guards/studentauth.guard';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'student/login', component: StudentloginComponent},
  {path:'student/register', component: StudentregisterComponent},
  {path:'student/dashboard', component: StudentdashboardComponent, canActivate:[StudentauthGuard]},
  {path:'company/login', component: CompanyloginComponent},
  {path:'company/register', component: CompanyregisterComponent},
  {path:'company/dashboard', component: CompanydashboardComponent, canActivate:[CompanyauthGuard]},
  {path:'company/jobs', component: PostjobsComponent, canActivate:[CompanyauthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentloginComponent,
    StudentregisterComponent,
    StudentdashboardComponent,
    CompanyloginComponent,
    CompanyregisterComponent,
    CompanydashboardComponent,
    PostjobsComponent,
    CompanynavbarComponent
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
    CompanyauthGuard,
    PostjobService,
    StudentvalidateService,
    StudentauthService,
    StudentauthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
