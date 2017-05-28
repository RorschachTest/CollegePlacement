import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostjobService {

  constructor(private http: Http){}

  validateForm(job){
    if(
      job.company_id == undefined ||
      job.title == undefined ||
      job.location == undefined ||
      job.description == undefined ||
      job.expected_CTC == undefined
    ){
      return false;
    }
    else return true;
  }

  postNewJob(job){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/company/jobs', job, {headers: headers}).map(res => res.json());
  }
}
