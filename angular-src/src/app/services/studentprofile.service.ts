import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentprofileService {

  constructor(
    private http: Http
  ) { }

  getStudentId(){
    const user = localStorage.getItem('user');
    try {
      var obj = JSON.parse(user);
      if(obj) return obj.id;
      else return null;
    } catch (ex) {
      console.error(ex);
    }
  }

  getJobs(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('student/jobs', {headers: headers}).map(res => res.json());
  }

  getStudentInfo(student_id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const student = {
      _id: student_id
    }
    return this.http.post('http://localhost:5000/student/profile', student, {headers: headers}).map(res => res.json());
  }
}
