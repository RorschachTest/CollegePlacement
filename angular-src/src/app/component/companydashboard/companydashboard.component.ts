import { Component, OnInit } from '@angular/core';
import { CompanydashService } from '../../services/companydash.service';
import { CompanyauthService } from '../../services/companyauth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
	selector: 'app-companydashboard',
	templateUrl: './companydashboard.component.html',
	styleUrls: ['./companydashboard.component.css']
})
export class CompanydashboardComponent implements OnInit {
	company_id: any;
	jobs_posted: [Object];

	constructor(
		private companyauthService: CompanyauthService,
		private companydashService: CompanydashService,
		private flashMessage: FlashMessagesService,
		private router: Router
	){}

	ngOnInit() {
		this.company_id = this.companyauthService.getCompanyId();

		const company = {
			_id: this.company_id
		}

		this.companydashService.getJobsPosted(company).subscribe(data => {
			console.log('data', data);
			if(data.success){
				this.flashMessage.show(
					'successful query',
					{cssClass: 'alert-success', timeout: 3000}
				);
				this.jobs_posted = data.jobs;
			}
			else{
				this.flashMessage.show(
					'something went wrong',
					{cssClass : 'alert-danger', timeout: 3000}
				);
			}
		});
	}

	showAppliedStudent(job_id){
		this.companyauthService.getStudentApplied(job_id).subscribe(data => {
			console.log(data);
			if(data.success){
				localStorage.setItem('students', JSON.stringify(data.students));
				this.router.navigate(['/company/showjobs']);
			}
		});
	}

}
