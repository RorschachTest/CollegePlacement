import { Component, OnInit } from '@angular/core';
import { PostjobService } from '../../services/postjob.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private router: Router
  ){}

  ngOnInit() {
  }

  postJob(){
    this.getCompanyId();
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

  getCompanyId(){
    const user = localStorage.getItem('user');
    try {
      var obj = JSON.parse(user);
      if(obj) this.company_id = obj.id;
      else this.company_id = null;
    } catch (ex) {
      console.error(ex);
    }

  }




}
