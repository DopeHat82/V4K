import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-member-activity',
  templateUrl: './member-activity.component.html',
  styleUrls: ['./member-activity.component.css']
})
export class MemberActivityComponent implements OnInit {

  constructor(private http: Http) { }

  toggle = "F";
  toggleMsg = "";
  membersList = [];
  newThreads=[];
  getMembers = function()
  {       
    this.http.get("http://v4k-json-service.vanilla4kink.com/users").subscribe(
      (res: Response) => {
        this.membersList = res.json();
      }
    );
  }

  memberSubmissions = [];
getSubmissions = function(){
  this.http.get("http://v4k-json-service.vanilla4kink.com/submissions").subscribe(
    (res: Response) => {
      this.memberSubmissions = res.json(); 
      this.toggle = "F"; 
    }
  );
}

getSubmissionsByUser = function(user)
{
  var filter = _.filter(this.memberSubmissions, function (results)
  { return results.submittedBy === user})
  this.toggle = "T"; this.toggleMsg = "What's " + user + " been up to?";
  return this.memberSubmissions = filter; 

}




  ngOnInit() { this.getMembers(); this.getSubmissions();
  }

}
