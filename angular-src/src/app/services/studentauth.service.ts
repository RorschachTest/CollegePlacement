import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentauthService {
	authToken: any;
	student: any;

	constructor(
	  	private http: Http
  	){}

	// Register new student
	registerStudent(student){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:5000/student/register', student, {headers: headers}).map(res => res.json());
	}

	// Authenticate login for existing user
	authenticateStudent(student){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:5000/student/authenticate', student, {headers: headers}).map(res => res.json());
	}

	// Store jwt value in local Storage
	storeStudentData(student, token){
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(student)); // company and student both will be 
		// stored as user as we ccan't determine what type of user it is before asking for user var
		this.authToken = token;
		this.student = student;
	}

	studentLogout(){
		this.authToken = null;
		this.student = null;
		localStorage.clear();
	}
}
