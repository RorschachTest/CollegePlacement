import { Component, OnInit } from '@angular/core';
import { StudentauthService } from '../../services/studentauth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-studentdashboard',
	templateUrl: './studentdashboard.component.html',
	styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {

	constructor(
		private studentauthService: StudentauthService,
		private router: Router,
  		private flashMessage: FlashMessagesService
	){}

	ngOnInit(){
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
