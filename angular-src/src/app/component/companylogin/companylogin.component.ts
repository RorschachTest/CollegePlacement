import { Component, OnInit } from '@angular/core';
import { CompanyauthService } from '../../services/companyauth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-companylogin',
	templateUrl: './companylogin.component.html',
	styleUrls: ['./companylogin.component.css']
})
export class CompanyloginComponent implements OnInit {
	email: String;
	password: String;

  	constructor(
  		private companyauthService: CompanyauthService,
  		private router: Router,
  		private flashMessage: FlashMessagesService
  	){}

	ngOnInit(){
	}

	onCompanyLogin(){
		const company = {
			email: this.email,
			password: this.password
		}
		console.log(company);

		// Authenticate
		this.companyauthService.authenticateCompany(company).subscribe(data => {
			console.log(data);
			
			if(data.success){
				this.companyauthService.storeCompanyData(data.company, data.jwt);
				this.flashMessage.show('login successful', {cssClass: 'alert-success', timeout: 3000});
				this.router.navigate(['/company/dashboard']);
			}
			else{
				this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
				this.router.navigate(['/company/login']);
			}
		});
	}

}
