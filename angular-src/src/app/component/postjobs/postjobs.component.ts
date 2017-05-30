import { Component, OnInit } from '@angular/core';
import { PostjobService } from '../../services/postjob.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CompanyauthService } from '../../services/companyauth.service';

@Component({
  selector: 'app-postjobs',
  templateUrl: './postjobs.component.html',
  styleUrls: ['./postjobs.component.css']
})
export class PostjobsComponent implements OnInit {
  company_id: any;
  title: String;
  location: String;
  description: String;
  expected_CTC: Number;

  constructor(
    private postjobService: PostjobService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private companyauthService: CompanyauthService
  ){}

  ngOnInit() {
  }

  postJob(){
    this.company_id = this.companyauthService.getCompanyId();
    const job = {
      company_id: this.company_id,
      title: this.title,
      location: this.location,
      description: this.description,
      expected_CTC: this.expected_CTC
    }

    if(!this.postjobService.validateForm(job)){
      this.flashMessagesService.show('fill correct inputs', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return;
    }

    this.postjobService.postNewJob(job).subscribe(data => {
      if(data.success){
        this.flashMessagesService.show('job has been posted', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/company/dashboard']);
      }
      else{
        this.flashMessagesService.show('Something went wrong', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }






}
