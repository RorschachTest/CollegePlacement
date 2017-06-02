import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostjobService {

  constructor(private http: Http){}

  validateForm(job){
    if(
      job.expected_CTC == undefined ||
      isNaN(job.expected_CTC)
    ){
      return false;
    }
    else return true;
  }

  postNewJob(job){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('company/jobs', job, {headers: headers}).map(res => res.json());
  }
}
