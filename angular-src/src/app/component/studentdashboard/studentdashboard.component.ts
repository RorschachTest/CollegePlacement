import { Component, OnInit } from '@angular/core';
import { StudentauthService } from '../../services/studentauth.service';
import { Router } from '@angular/router';
import { StudentprofileService } from '../../services/studentprofile.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-studentdashboard',
	templateUrl: './studentdashboard.component.html',
	styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {
	student_id: String;
	all_jobs: any;
	jobs_applied: any;
	applied = new Set();

	constructor(
		private studentauthService: StudentauthService,
		private studentprofileService: StudentprofileService,
		private router: Router,
  	private flashMessage: FlashMessagesService
	){}

	ngOnInit(){
		this.student_id = this.studentauthService.getStudentId();

		this.studentprofileService.getStudentInfo(this.student_id).subscribe(data =>{
			if(data.success){
				this.jobs_applied = data.student.jobs_applied;

				// this.jobs_applied.forEach(function(job_id){
				// 	this.applied.add(job_id);
				// });
			}
			else{
				this.flashMessage.show('Something went wrong', {
					cssClass: 'alert-danger', timeout: 3000
				});
			}
		});

		this.studentprofileService.getJobs().subscribe(data => {
			if(data.success){
				this.all_jobs = data.jobs;
			}
		});
	}

	applyForJob(job_id){
		this.studentauthService.applyForJob(job_id, this.student_id).subscribe(data => {
			console.log(data);
			if(data.success){
				this.applied.add(job_id);
			}
			else{
				this.flashMessage.show('Something went Wrong', {
					cssClass: 'alert-danger', timeout: 3000
				});
				console.log('Job Applied Error');
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

}
