import { Component, OnInit } from '@angular/core';
import { CompanyvalidateService } from '../../services/companyvalidate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CompanyauthService } from '../../services/companyauth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-companyregister',
	templateUrl: './companyregister.component.html',
	styleUrls: ['./companyregister.component.css']
})
export class CompanyregisterComponent implements OnInit {
	name: String;
	email: String;
	password: String;

	constructor(
		private companyvalidateService: CompanyvalidateService,
		private flashMessage: FlashMessagesService,
		private companyauthService: CompanyauthService,
		private router: Router
	){}

	ngOnInit() {
	}

	onCompanyRegister(){
		const company = {
			name : this.name,
			email : this.email,
			password : this.password
		}

		// Required field
		if(!this.companyvalidateService.validateRegister(company)){
			this.flashMessage.show('Fill in all field', {cssClass: 'alert-danger', timeout: 3000});
			return false;
		}

		// Validate email address
		if(!this.companyvalidateService.validateEmail(company.email)){
			this.flashMessage.show('invalid email address', {cssClass: 'alert-danger', timout: 3000});
			return false;
		}

		// Register company
		this.companyauthService.registerCompany(company).subscribe(data => {
			if(data.success){
				this.flashMessage.show('You have been registered. Login now to access your account', {cssClass: 'alert-success', timeout: 3000});
				this.router.navigate(['/company/login']);// Change to company dashboard when jwt local storage is done
			}
			else{
				this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
				this.router.navigate(['/company/register']);
			}
		});
	}

}
