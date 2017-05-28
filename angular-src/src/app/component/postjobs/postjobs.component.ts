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
    private flashMessagesService: FlashMessagesService
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
      this.flashMessagesService.show('fill all the inputs', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return;
    }

    this.postjobService.postNewJob(job).subscribe(data => {
      // if(data.success){
      //
      // }
    });
  }

  getCompanyId(){
    const user = localStorage.getItem('user');
    try {
      var obj = JSON.parse(user);
      this.company_id = obj.id;
    } catch (ex) {
      console.error(ex);
    }

  }




}
