import { Component, OnInit } from '@angular/core';
import { StudentauthService } from '../../services/studentauth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StudentprofileService } from '../../services/studentprofile.service';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {
  student_id: any;
  name: String;
  enrollment_no: Number;
  cgpa: Number;
  email_address: String;

  constructor(
    private studentauthService: StudentauthService,
		private router: Router,
  	private flashMessage: FlashMessagesService,
    private studentprofileService: StudentprofileService
  ){}

  ngOnInit() {
    this.student_id = this.studentprofileService.getStudentId();

    this.studentprofileService.getStudentInfo(this.student_id).subscribe(data => {
      console.log(data);
      if(data.success){
        this.name = data.student.name;
        this.enrollment_no = data.student.enrollment_no;
        this.cgpa = data.student.cgpa;
        this.email_address = data.student.email_address;
      }
      else{
        this.flashMessage.show('Something went wrong',{
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }

  onStudentLogout(){
		this.studentauthService.studentLogout();
		this.flashMessage.show('You are logged out',{
			cssClass: 'alert-success',
			timeout: 3000
		});
		this.router.navigate(['/']);
		return false;
	}

  onProfileUpdate(){
    console.log('update profile');
  }
}
