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

	// Register new Company
	registerCompany(company){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('company/register', company, {headers: headers}).map(res => res.json());
	}

	// Authenticate login for existing user
	authenticateCompany(company){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('company/authenticate', company, {headers: headers}).map(res => res.json());
	}

	// Store jwt value in local Storage
	storeCompanyData(company, token){
		localStorage.clear();
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(company)); // company and student both will be
		// stored as user as we ccan't determine what type of user it is before asking for user var
		this.authToken = token;
		this.company = company;
	}

	getStudentApplied(job_id){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const job = {
			_id: job_id
		}
		return this.http.post('company/showjobs', job, {headers: headers}).map(res => res.json());
	}

	getCompanyId(){
    const user = localStorage.getItem('user');
    try {
      var obj = JSON.parse(user);
      if(obj) return obj.id;
      else return null;
    } catch (ex) {
      console.error(ex);
    }
  }

	companyLogout(){
		this.authToken = null;
		this.company = null;
		localStorage.clear();
	}


}
