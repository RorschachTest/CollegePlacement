import { Component, OnInit } from '@angular/core';
import { CompanydashService } from '../../services/companydash.service';
import { CompanyauthService } from '../../services/companyauth.service';

@Component({
	selector: 'app-companydashboard',
	templateUrl: './companydashboard.component.html',
	styleUrls: ['./companydashboard.component.css']
})
export class CompanydashboardComponent implements OnInit {
	company_id: any;
	jos_posted: [Object];

	constructor(
		private companyauthService: CompanyauthService,
		private companydashService: CompanydashService
	){}

	ngOnInit() {
		this.company_id = this.companyauthService.getCompanyId();

		const company = {
			_id: this.company_id
		}

		this.companydashService.getJobsPosted(company).subscribe(data => {
			console.log(data);
		});
	}

}
