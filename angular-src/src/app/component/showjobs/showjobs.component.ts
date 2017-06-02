import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showjobs',
  templateUrl: './showjobs.component.html',
  styleUrls: ['./showjobs.component.css']
})
export class ShowjobsComponent implements OnInit {
  students: any;
  constructor(){}

  ngOnInit(){
    this.students = JSON.parse(localStorage.getItem('students'));
    console.log(this.students);
  }

}
