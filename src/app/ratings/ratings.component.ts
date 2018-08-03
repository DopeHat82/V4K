import { Component, OnInit, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input() postedArticleId;
  @Input() componentId;
  userData= {};


  isAuthenticated = function(){
    if (document.cookie.split(';').filter(function(item) {
      return item.indexOf('userData=') >= 0
  }).length) {this.userData = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*\=\s*([^;]*).*$)|^.*$/, "$1").replace("[","").replace("]",""));}
  }
  currentRate = 0;
  rateChange = 0;
  ratings=[];
  tally= "No users have rated this yet!";

  fetchRatings = function()
  {
    let r = 0;
    let r1 = 0;
    let r2 = 0;
    let r3 = 0;
    let r4 = 0;
    let r5 = 0;
    let cnt = 0;
    const cId = this.componentId;
    const pId = this.postedArticleId;
    this.http.get("http://v4k-json-service.vanilla4kink.com/ratings").subscribe(
      (res: Response) => {
        var filter = _.filter(res.json(), function (results)
        { return results.component === cId && results.contentId === pId })
        this.ratings = filter;  
        this.ratings.forEach(element => {
          if(element.rating == 1)
          {r1 = r1 + 1}
          else if(element.rating == 2)
          {r2 = r2 + 1}
          else if(element.rating == 3)
          {r3 = r3 + 1}
          else if(element.rating == 4)
            {r4 = r4 + 1}
          else if(element.rating == 5)
            {r5 = r5 + 1}
          
          if((r1 > r2) && (r1 > r3) && (r1 > r4) && (r1 > r5))
            {r = 1; cnt = r1;}
          else if((r2 > r1) && (r2 > r3) && (r2 > r4) && (r2 > r5))
            {r = 2; cnt = r2;}
          else if((r3 > r2) && (r3 > r1) && (r3 > r4) && (r3 > r5))
            {r = 3; cnt = r3;}
          else if ((r4 > r2) && (r4 > r3) && (r4 > r1) && (r4 > r5))
            {r = 4; cnt = r4;}
          else if((r5 > r2) && (r5 > r3) && (r5 > r4) && (r5 > r1))
            {r = 5; cnt = r5;} 
         });
         this.currentRate = r;
         this.tally = "This is currently rated at " + r + " stars by "+ cnt + " user(s)";
      }
    );

    

  }

  

  constructor(private _http:HttpClient, private router: Router, private route: ActivatedRoute, private http:Http) { }

  ratingObj = [];
  addRating = function(e){
   
    this.ratingObj = {
    "userName" : this.userData.userName,
    "component" : this.componentId,
    "contentId" : this.postedArticleId,
    "timestamp" : (new Date).toLocaleDateString().toString() + " " + (new Date).toLocaleTimeString().toString(),
    "rating" : e
    }
    this.http.post("http://v4k-json-service.vanilla4kink.com/ratings", this.ratingObj, {headers: {
      'Content-Type': 'application/json' , 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':'X-Requested-With'	
  }}).subscribe((res:Response) => {
    }) 

  }


  ngOnInit() { this.isAuthenticated(); this.fetchRatings();
  }

}
