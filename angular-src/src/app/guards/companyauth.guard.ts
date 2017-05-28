import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class CompanyauthGuard implements CanActivate{
  user_type: String;

  constructor(
    private router: Router
  ){}

  canActivate(){
    this.getUserType();
    if(this.isLoggedIn()){
      if(this.user_type == 'company'){
        return true;
      }
      else{
        this.router.navigate(['/student/dashboard']);
        return false;
      }
    }
    else{
      this.router.navigate(['/company/login']);
      return false;
    }
  }

  getUserType(){
    const user = localStorage.getItem('user');
    try {
      var obj = JSON.parse(user);
      if(obj) this.user_type = obj.user_type;
    } catch (ex) {
      console.error(ex);
    }
  }

  isLoggedIn(){
		return tokenNotExpired('id_token');
	}

}
