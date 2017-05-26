import { Injectable } from '@angular/core';

@Injectable()
export class StudentvalidateService {

	constructor() { }

	validateRegister(student){
	  	if(
	  		student.name == undefined || 
	  		student.enrollment_no == undefined || 
	  		student.cgpa ==undefined ||
	  		student.email_address == undefined || 
	  		student.password == undefined
	  	){
	  		return false;
	  	}
	  	else return true;
	}

  	validateEmail(email){
	    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
}
