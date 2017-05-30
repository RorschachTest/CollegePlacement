import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanydashService {

  constructor(private http: Http){}

  getJobsPosted(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/company/postedjobs', company, {headers: headers})
    .map(res => res.json());
  }

}
