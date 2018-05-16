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
    this.http.post("http://18.221.222.34/comments", this.commentObj, {headers: {
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
    this.http.get("http://18.221.222.34/comments").subscribe(
      (res: Response) => {
        var filter = _.filter(res.json(), function (results)
        { return results.component === cId && results.contentId === pId })
        this.userComments = filter;
      }
    );
  }







  ngOnInit() {
    this.isAuthenticated(); this.fetchuserComments(); 
  }

}
