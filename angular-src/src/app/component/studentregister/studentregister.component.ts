import { Component, OnInit } from '@angular/core';
import { StudentvalidateService } from '../../services/studentvalidate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StudentauthService } from '../../services/studentauth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-studentregister',
	templateUrl: './studentregister.component.html',
	styleUrls: ['./studentregister.component.css']
})
export class StudentregisterComponent implements OnInit {
	name: String;
	enrollment_no: Number;
	cgpa: Number;
	email_address: String;
	password: String;

	constructor(
		private studentvalidateService: StudentvalidateService, 
		private flashMessage: FlashMessagesService,
		private studentauthService: StudentauthService,
		private router: Router
	){}

	ngOnInit() {
	}

	onStudentRegister(){
		const student = {
			name : this.name,
			enrollment_no: this.enrollment_no,
			cgpa: this.cgpa,
			email_address : this.email_address,
			password : this.password
		}

		console.log(student);

		// Required field
		if(!this.studentvalidateService.validateRegister(student)){
			this.flashMessage.show('Fill in all field', {cssClass: 'alert-danger', timeout: 3000});
			return false;
		}

		// Validate email address
		if(!this.studentvalidateService.validateEmail(student.email_address)){
			this.flashMessage.show('invalid email address', {cssClass: 'alert-danger', timout: 3000});
			return false;
		}
		
		// Register student
		this.studentauthService.registerStudent(student).subscribe(data => {
			console.log(data);
			if(data.success){
				this.flashMessage.show('You have been registered, Login now to access your account', {cssClass: 'alert-success', timeout: 3000});
				this.router.navigate(['/student/login']);// Change to student dashboard when jwt local storage is done
			}
			else{
				this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
				this.router.navigate(['/student/register']);
			}
		});
	}
}
