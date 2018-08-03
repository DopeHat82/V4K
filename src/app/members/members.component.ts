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
newBlogSuccess: "Submit a new Blog or Article";
newSexActSuccess : "Submit a new Sex Act";
  constructor(private http: Http) { }

  populateTitles = function(){
    this.newBlogSuccess= "Submit a new Blog or Article";
    this.newSexActSuccess= "Submit a new Sex Act";

  }

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
    
    this.http.get("http://v4k-json-service.vanilla4kink.com/users").subscribe(
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
    this.http.post("http://v4k-json-service.vanilla4kink.com/applicants", this.applicantObj, {headers: {
      'Content-Type': 'application/json' , 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':'X-Requested-With'	
  }}).subscribe((res:Response) => {
      this.isAdded = true; this.success = '1';

    }) 
  }

  releveantAds=[];
  fetchReleveantAds = function(){
     this.http.get("https://s3.us-east-2.amazonaws.com/v4k-content-provider/ads.json").subscribe(
       (res: Response) => {
         var filter = _.filter(res.json(), function(ads)
         {return ads.genre === "General" && ads.type === "coupons"})
         this.releveantAds= filter; 
         this.mediaSwitch = "true"; 
       }
     );
   }

   recentActivity=[];
   fetchRecentActivity = function(){
      this.http.get("http://v4k-json-service.vanilla4kink.com/recentactivity").subscribe(
        (res: Response) => {
          this.recentActivity= res.json(); 
          this.mediaSwitch = "true"; 
        }
      );
    }

    addActivityObj:object = {};
    addActivity = function(appData){
      
      this.addActivityObj = {
      "description" : appData.newActivity 
      }
      this.http.post("http://v4k-json-service.vanilla4kink.com/recentactivity", this.addActivityObj, {headers: {
        'Content-Type': 'application/json' , 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':'X-Requested-With'	
    }}).subscribe((res:Response) => {
        this.isAdded = true; 
  
      }) 
    }



    theNews=[];
    fetchNews = function(){
       this.http.get("http://v4k-json-service.vanilla4kink.com/news").subscribe(
         (res: Response) => {
           this.theNews= res.json(); 
           this.mediaSwitch = "true"; 
         }
       );
     }
 
     addNewsObj:object = {};
     addNews = function(appData){
       
       this.addNewsObj = {
       "title" : appData.newTitle,
       "description" : appData.newArticle,
       "timestamp" : (new Date).toLocaleDateString().toString()
       }
       this.http.post("http://v4k-json-service.vanilla4kink.com/news", this.addNewsObj, {headers: {
         'Content-Type': 'application/json' , 
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
         'Access-Control-Allow-Headers':'X-Requested-With'	
     }}).subscribe((res:Response) => {
         this.isAdded = true; 
   
       }) 
     }

     addNewBlogObj:object = {};
     addNewBlog = function(appData){
       
       this.addNewBlogObj = {
       "type" : 'blog',
       "submittedBy" : this.userData.userName,
       "title" : appData.newBlogTitle,
       "description" : appData.newBlogArticle,
       "timestamp" : (new Date).toLocaleDateString().toString()
       }
       this.http.post("http://v4k-json-service.vanilla4kink.com/submissions", this.addNewBlogObj, {headers: {
         'Content-Type': 'application/json' , 
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
         'Access-Control-Allow-Headers':'X-Requested-With'	
     }}).subscribe((res:Response) => {
         this.isAdded = true; this.newBlogSuccess = 'Thank you! Your submission will be reviewed and we will notify you of its acceptance status.';
   
       }) 
     }

     addNewSexActObj:object = {};
     addNewSexAct = function(appData){
       
       this.addNewBlogObj = {
       "type" : "sexAct",
       "submittedBy" : this.userData.userName,
       "title" : appData.newSexActTitle,
       "description" : appData.newSexActArticle,
       "timestamp" : (new Date).toLocaleDateString().toString()
       }
       this.http.post("http://v4k-json-service.vanilla4kink.com/submissions", this.addNewBlogObj, {headers: {
         'Content-Type': 'application/json' , 
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
         'Access-Control-Allow-Headers':'X-Requested-With'	
     }}).subscribe((res:Response) => {
         this.isAdded = true; this.newSexActSuccess = 'Thank you! Your submission will be reviewed and we will notify you of its acceptance status.';
   
       }) 
     }



  ngOnInit() {
    this.isAuthenticated(); this.fetchReleveantAds(); this.fetchRecentActivity(); this.fetchNews();this.populateTitles();
  }

}
