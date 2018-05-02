import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const tags = ['solo girl', 'footjob', 'feet', 'fisting', 'masturbation', 'blowjob', 'anal', 'analingus', 'couples', 'lesbian', 'toy', 'piss', 'pee', 'female', 'male', 'speculum', 'girl on girl', 'oral'];

@Component({
  selector: 'app-explicit',
  templateUrl: './explicit.component.html',
  styleUrls: ['./explicit.component.css']
})
export class ExplicitComponent implements OnInit {
  public model: any;


  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : tags.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  constructor(private http: Http, public sanitizer: DomSanitizer) { }


  updateSearchParameters = function (filter, value) {
    if (filter == "genre")
    { this.searchParameters.genre = value; }
    else if (filter == "threshold")
    { this.searchParameters.threshold = value; }
    else if (filter == "type")
    { this.searchParameters.type = value; }
    this.fetchResultsData();
  }

 

  
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  searchParameters = {
    genre: "All",
    threshold: "Low",
    type: "Video"
  };
  resultsArray = [];

 
  searchEntries = function (keyword) {
    this.resultsArray = [];
    var stage = [];
    this.http.get("./assets/json/explicit.json").subscribe(
      (res: Response) => {
        stage = res.json();
        for (var i in stage) {
          if (stage[i].keyword.tag1 === keyword) {
            this.resultsArray.push(stage[i]);
          }
          if (stage[i].keyword.tag2 === keyword) {
            this.resultsArray.push(stage[i]);
          }
          if (stage[i].keyword.tag3 === keyword) {
            this.resultsArray.push(stage[i]);
          }
          if (stage[i].keyword.tag4 === keyword) {
            this.resultsArray.push(stage[i]);
          }
          if (stage[i].keyword.tag5 === keyword) {
            this.resultsArray.push(stage[i]);
          }
        }
      }
    );

  }

  fetchResultsDatas = function () {
    const genre = this.searchParameters.genre;
    const threshold = this.searchParameters.threshold;
    const type = this.searchParameters.type;
    /*Gets all results */
    if (this.searchParameters.genre === "All") {
      this.http.get("./assets/json/explicit.json").subscribe(
        (res: Response) => {
          this.resultsArray = res.json();
        }
      );
    }
    else {
      /*Filters results*/
      this.http.get("./assets/json/explicit.json").subscribe(
        (res: Response) => {
          var filter = _.filter(res.json(), function (results)
          { return results.genre === genre && results.threshold === threshold && results.type === type })
          this.resultsArray = filter;
        }
      );
    }
  }

  fetchResultsData = function(){
  this.http.get("./assets/json/explicit.json").subscribe(
    (res: Response) => {
      this.resultsArray = res.json();
    }
  );

}

  pageArray = [];
  collectionCnt: number=1;
  currentPage:number=1;
  pageCnt:number=0;
  collectionSize:number=10;
  

  get pageResults(){
    const genre = this.searchParameters.genre;
    const threshold = this.searchParameters.threshold;
    const type = this.searchParameters.type;
    if (this.searchParameters.genre === "All") {
      this.pageArray = this.resultsArray; this.collectionSize = this.pageArray.length / 20 * 10;
      return this.pageArray.slice((this.currentPage-1)*20,this.currentPage*20);
    }
    else {
    var filter = _.filter(this.resultsArray, function (results)
    { return results.genre === genre && results.threshold === threshold && results.type === type})
    this.pageArray = filter; this.collectionSize = this.pageArray.length;
    return this.pageArray.slice((this.currentPage-1)*10,this.currentPage*20);
    }
    
     
  }

  releveantAds=[];
  fetchReleveantAds = function(){
     this.http.get("./assets/json/ads.json").subscribe(
       (res: Response) => {
         var filter = _.filter(res.json(), function(ads)
         {return ads.type === "site" })
         this.releveantAds= filter; 
       }
     );
   }

  ngOnInit() {
    
    this.fetchReleveantAds();
    this.fetchResultsData(); 
  }
}
