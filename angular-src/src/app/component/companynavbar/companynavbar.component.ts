import { Component, OnInit } from '@angular/core';
import { CompanyauthService } from '../../services/companyauth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-companynavbar',
  templateUrl: './companynavbar.component.html',

  styleUrls: ['./companynavbar.component.css']
})
export class CompanynavbarComponent implements OnInit {

  constructor(
    private companyauthService: CompanyauthService,
		private router: Router,
  	private flashMessage: FlashMessagesService
  ){}

  ngOnInit() {
  }

  onCompanyLogout(){
		this.companyauthService.companyLogout();
		this.flashMessage.show('You are logged out',{
			cssClass: 'alert-success',
			timeout: 3000
		});
		this.router.navigate(['/']);
		return false;
	}

}
