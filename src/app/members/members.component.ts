import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {Http, Response, Headers } from '@angular/http';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  userName: '';
userInfo=[];
userData= {};
applicantObj:object = {};
success: '0';

  constructor(private http: Http) { }

  isAuthenticated = function(){
    if (document.cookie.split(';').filter(function(item) {
      return item.indexOf('userData=') >= 0
  }).length) {this.userData = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*\=\s*([^;]*).*$)|^.*$/, "$1").replace("[","").replace("]",""));}
  }

  logout = function()
  {
    document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.userData = {};this.isAuthenticated();
  }

  authUser = function(authData)
  {
    
    this.http.get("http://18.221.222.34/users").subscribe(
      (res: Response) => {
        var filter = _.filter(res.json(), function (results)
        { return results.userName === authData.username && results.password === authData.password })
        this.userInfo= JSON.stringify(filter); document.cookie = "userData=" + JSON.stringify(filter);
        this.isAuthenticated();
      }
    );
  }

  userApply = function(appData){
    
    this.applicantObj = {
    "user" : appData.desiredUsername,
    "password" : appData.desiredPassword,
    "type" : appData.type,
    "about" : appData.aboutyou,
    "email" : appData.email,
    "isApproved" : false
    }
    this.http.post("http://18.221.222.34/applicants", this.applicantObj, {headers: {
      'Content-Type': 'application/json' , 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':'X-Requested-With'	
  }}).subscribe((res:Response) => {
      this.isAdded = true; this.success = '1';

    }) 
  }

  ngOnInit() {
    this.isAuthenticated(); console.log(this.success)
  }

}
