import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyauthService {
	authToken: any;
	company: any;

	constructor(
	  	private http: Http
  	){}

	registerCompany(company){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:5000/company/register', company, {headers: headers}).map(res => res.json());
	}
}
