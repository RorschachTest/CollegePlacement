import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-companyregister',
	templateUrl: './companyregister.component.html',
	styleUrls: ['./companyregister.component.css']
})
export class CompanyregisterComponent implements OnInit {
	name: String;
	email: String;
	password: String;

	constructor(){}

	ngOnInit() {
	}

	onCompanyRegister(){
		const user = {
			name : this.name,
			email : this.email,
			password : this.password
		}
	}

}
