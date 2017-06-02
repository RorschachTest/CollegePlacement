import { Component, OnInit } from '@angular/core';
import { StudentauthService } from '../../services/studentauth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-studentlogin',
	templateUrl: './studentlogin.component.html',
	styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {
	enrollment_no: String;
	password: String;

  	constructor(
  		private studentauthService: StudentauthService,
  		private router: Router,
  		private flashMessage: FlashMessagesService
  	){}

	ngOnInit(){
	}

	onStudentLogin(){
		const student = {
			enrollment_no: this.enrollment_no,
			password: this.password
		}

		// Authenticate
		this.studentauthService.authenticateStudent(student).subscribe(data => {

			if(data.success){
				this.studentauthService.storeStudentData(data.student, data.jwt);
				this.flashMessage.show('login successful', {cssClass: 'alert-success', timeout: 3000});
				this.router.navigate(['/student/dashboard']);
			}
			else{
				this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
				this.router.navigate(['/student/login']);
			}
		});
	}
}
