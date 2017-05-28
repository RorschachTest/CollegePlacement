import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class StudentauthGuard implements CanActivate{
  user_type: String;

  constructor(
    private router: Router
  ){}

  canActivate(){
    this.getUserType();

    if(this.isLoggedIn()){
      if(this.user_type == 'student'){
        return true;
      }
      else{
        this.router.navigate(['/company/dashboard']);
        return false;
      }
    }
    else{
      this.router.navigate(['/student/login']);
      return false;
    }
  }

  getUserType(){
    const user = localStorage.getItem('user');
    try {
      var obj = JSON.parse(user);
      if(obj) this.user_type = obj.user_type;
      else this.user_type = null;
    } catch (ex) {
      console.error(ex);
    }
  }

  isLoggedIn(){
		return tokenNotExpired('id_token');
	}

}
