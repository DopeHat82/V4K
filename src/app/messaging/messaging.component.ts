import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  public model: any;
  membersArray=[];
  stageArray = [];
  userData= {};
  messageStatus = "New Message";

  loadMembersArray = function(memArray){
           memArray.forEach(element => {
          if(element.userName == undefined){}
          else{this.membersArray.push(element.userName)}
     });
  }

  membersTA = (text$: Observable<string>) =>
  text$
    .debounceTime(200)
    .distinctUntilChanged() 
    .map(term => term.length < 1 ? []
      : this.membersArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  constructor(private http: Http) { }




  loadMembersStagingArray = function(){
    this.http.get("http://v4k-json-service.vanilla4kink.com/users").subscribe(
      (res: Response) => {
        this.stageArray= res.json(); this.loadMembersArray(this.stageArray);        
      }
    );
  }

  sendMessage = function(appData){
    
    this.messageObj = {
    "to" : appData.toMember,
    "from": this.userData.userName,
    "message" : appData.message,
    "timestamp" : (new Date).toLocaleDateString().toString() + " " + (new Date).toLocaleTimeString().toString()
    }
    this.http.post("http://v4k-json-service.vanilla4kink.com/messages", this.messageObj, {headers: {
      'Content-Type': 'application/json' , 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':'X-Requested-With'	
  }}).subscribe((res:Response) => {
      this.messageStatus = 'Your message has been sent!';

    }) 
  }
  isAuthenticated = function(){
    if (document.cookie.split(';').filter(function(item) {
      return item.indexOf('userData=') >= 0
  }).length) {this.userData = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*\=\s*([^;]*).*$)|^.*$/, "$1").replace("[","").replace("]",""));}
  }

  userMessages=[];
  fetchuserMessages = function()
  { var user = this.userData.userName;
    const cId = this.componentId;
    const pId = this.postedArticleId;
    this.http.get("http://v4k-json-service.vanilla4kink.com/messages").subscribe(
      (res: Response) => {
        var filter = _.filter(res.json(), function (results)
        { return results.to === user})
        this.userMessages = filter;
      }
    );

    
  }

  DisplayDIV = function(id){
    var x = (document.getElementById(id))
    x.style.display = 'block';
  }

  HideDIV = function(id){
    var x = (document.getElementById(id))
    x.style.display = 'none';
  }

  ngOnInit() { this.loadMembersStagingArray(); this.isAuthenticated(); this.fetchuserMessages();
  }
}
