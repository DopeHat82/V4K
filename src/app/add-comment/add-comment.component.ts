import { Component, OnInit, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() postedArticleId;
  @Input() componentId;
  data:object = {};
  commentObj:object = {};
  userData= {};


  isAdded = false;
  constructor(private _http:HttpClient, private router: Router, private route: ActivatedRoute, private http:Http) { }

  isAuthenticated = function(){
    if (document.cookie.split(';').filter(function(item) {
      return item.indexOf('userData=') >= 0
  }).length) {this.userData = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*\=\s*([^;]*).*$)|^.*$/, "$1").replace("[","").replace("]",""));}
  }

  addComment = function(comment){
    
    this.commentObj = {
    "user" : this.userData.userName,
    "component" : this.componentId,
    "contentId" : this.postedArticleId,
    "timestamp" : (new Date).toLocaleDateString().toString() + " " + (new Date).toLocaleTimeString().toString(),
    "commentorType" : this.userData.type,
    "memberStatus" : this.userData.memberStatus,
    "comment": comment.comment
    }
    this.http.post("http://v4k-json-service.vanilla4kink.com/comments", this.commentObj, {headers: {
      'Content-Type': 'application/json' , 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':'X-Requested-With'	
  }}).subscribe((res:Response) => {
      this.isAdded = true;
      this.userComments.push(this.commentObj);
    }) 
  }
  DisplayDIV = function(id){
    var x = (document.getElementById(id))
    x.style.display = 'block';
  }

  HideDIV = function(id){
    var x = (document.getElementById(id))
    x.style.display = 'none';
  }


  userComments=[];
  fetchuserComments = function()
  {
    const cId = this.componentId;
    const pId = this.postedArticleId;
    this.http.get("http://v4k-json-service.vanilla4kink.com/comments").subscribe(
      (res: Response) => {
        var filter = _.filter(res.json(), function (results)
        { return results.component === cId && results.contentId === pId })
        this.userComments = filter; this.titleToggle(filter.length); 
      }
    );
  }

  titleOpen: '';
  titleClose: '';

  getComponent = function(){
    this.componentTitle = this.componentId;
  }

titleToggle = function(cnt){
  
  var componentTitle = this.componentId;

  if(componentTitle == "Forum"){this.titleOpen = "View all " + cnt + " posts to this thread";}
 
  if(componentTitle == "Blog"){this.titleOpen = "View all " + cnt + " comments";}

  if(componentTitle == "Sexplore"){this.titleOpen = "Show all " + cnt + " Comments and Stories from Contributors and Members";}
   
  if(componentTitle == "Community"){this.titleOpen = "Show all " + cnt + " Comments and Stories from Contributors and Members";}
  
 
    

  if(this.titleOpen === "View all " + cnt + " posts to this thread") {this.titleClose = "Hide all posts to this thread";}

  if(this.titleOpen === "View all " + cnt + " comments"){this.titleClose = "Hide all comments";}

  if(this.titleOpen === "Show all " + cnt + " Comments and Stories from Contributors and Members") {this.titleClose = "Hide Comments and Stories from Contributors and Members";}
  

}

  ngOnInit() {
   this.isAuthenticated(); this.fetchuserComments();
  }

}
