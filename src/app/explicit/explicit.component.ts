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

const tags = ["feet"];

@Component({
  selector: 'app-explicit',
  templateUrl: './explicit.component.html',
  styleUrls: ['./explicit.component.css']
})
export class ExplicitComponent implements OnInit {
  public model: any;
  thresholdModel = 1;
  mediaModel = 1;
  pager: any = {};
  pagedItems: any[];
  pageArray = [];
  collectionCnt: number=1;
  currentPage:number=1;
  pageCnt:number=0;
  collectionSize:number=10;
  searchParameters = {
    genre: "Couples",
    threshold: "Low",
    type: "Video"
  };
  resultsArray = [];
  isSearch = false;
  selectedKeyword = "";

  currentTags=[];
  loadTags = function(results){       
   results.forEach(element => {
     if(element.keyword.tag1 == undefined){}
     else{
     if(this.currentTags.indexOf(element.keyword.tag1) > -1)
       {}
     else{this.currentTags.push(element.keyword.tag1)}
      }

      if(element.keyword.tag2 == undefined){}
      else{
      if(this.currentTags.indexOf(element.keyword.tag2) > -1)
        {}
      else{this.currentTags.push(element.keyword.tag2)}
       }

       if(element.keyword.tag3 == undefined){}
       else{
       if(this.currentTags.indexOf(element.keyword.tag3) > -1)
         {}
       else{this.currentTags.push(element.keyword.tag3)}
        }

        if(element.keyword.tag4 == undefined){}
        else{
        if(this.currentTags.indexOf(element.keyword.tag4) > -1)
          {}
        else{this.currentTags.push(element.keyword.tag4)}
         }
   }); 

  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.currentTags.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


        
  constructor(private http: Http, public sanitizer: DomSanitizer) { }

  genres=[];
  loadGenre = function(results){
       
   results.forEach(element => {
     if(element.genre == undefined){}
     else{
     if(this.genres.indexOf(element.genre) > -1)
       {}
     else{this.genres.push(element.genre)}
}
   }); 

  }
  updateSearchParameters = function (filter, value) {
    if (filter == "genre")
    { this.searchParameters.genre = value; this.isSearch = false; }
    else if (filter == "threshold")
    { this.searchParameters.threshold = value; }
    else if (filter == "type")
    { this.searchParameters.type = value; }
    if(this.isSearch == true){this.searchEntries(this.selectedKeyword);}
    else{
    this.fetchResultsData();this.cntResults(this.pageArray);
    }
  }

  searchEntries = function (keyword) {  
    this.resultsArray = [];
    var stage = []; this.isSearch = true; this.selectedKeyword = keyword;
    this.http.get("https://s3.us-east-2.amazonaws.com/v4k-content-provider/explicit.json").subscribe(
      (res: Response) => {
        stage = res.json();
        for (var i in stage) {
          if(stage[i].threshold === this.searchParameters.threshold && stage[i].type === this.searchParameters.type){
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
          console.log(this.resultsArray)
        }
        
        }
        
      }
    );

  }

  fetchResultsData = function(){
  this.http.get("https://s3.us-east-2.amazonaws.com/v4k-content-provider/explicit.json").subscribe(
    (res: Response) => {
      this.resultsArray = res.json(); this.loadTags(this.resultsArray); this.loadGenre(this.resultsArray);this.cntResults(this.resultsArray);
    }
  );
  
}

vidCnt = '';
imgCnt = '';
vrCnt = '';
totalCnt = '';
lowTCnt = '';
medTCnt = '';
hiTCnt = '';

 cntResults = function(element){
  const genre = this.searchParameters.genre;
  const threshold = this.searchParameters.threshold;
  
  var videoFilter = _.filter(element, function (results)
    { return results.genre === genre && results.threshold === threshold && results.type === 'Video'})

  var imageFilter = _.filter(element, function (results)
    { return results.genre === genre && results.threshold === threshold && results.type === 'Images'})

  var vrFilter = _.filter(element, function (results)
    { return results.genre === genre && results.threshold === threshold && results.type === 'VR'})

  var lowTCntFilter = _.filter(element, function (results)
    { return results.genre === genre && results.threshold === 'Low' })

  var medTCntFilter = _.filter(element, function (results)
    { return results.genre === genre && results.threshold === 'Medium'})

  var hiTCntFilter = _.filter(element, function (results)
    { return results.genre === genre && results.threshold === 'High'})

    if(videoFilter.length > 0){ this.vidCnt= videoFilter.length;}
    else{ this.vidCnt = "";} 
    if(imageFilter.length > 0){this.imgCnt = imageFilter.length;}
    else{this.imgCnt = "";}
    if(vrFilter.length > 0){this.vrCnt = vrFilter.length;}
    else{this.vrCnt = "";}
    if(lowTCntFilter.length > 0){ this.lowTCnt = lowTCntFilter.length;}
    else{this.lowTCnt = "";}
    if(medTCntFilter.length > 0) { this.medTCnt = medTCntFilter.length;}
    if(hiTCntFilter.length > 0){ this.hiTCnt = hiTCntFilter.length;}


 }

  get pageResults(){
    const genre = this.searchParameters.genre;
    const threshold = this.searchParameters.threshold;
    const type = this.searchParameters.type;
    if (this.searchParameters.genre === "All") {
      var stageArray =[];
      var filter = _.filter(this.resultsArray, function (results)
      { return results.threshold === threshold && results.type === type})
      this.pageArray = filter;this.collectionSize = this.pageArray.length / 20 * 10; 
      return this.pageArray.slice((this.currentPage-1)*20,this.currentPage*20);
    }
    else {
    var filter = _.filter(this.resultsArray, function (results)
    { return results.genre === genre && results.threshold === threshold && results.type === type})
    this.pageArray = filter; this.collectionSize = this.pageArray.length;
    if(this.resultsArray.length > 0){this.cntResults(this.resultsArray);}
    else{this.cntResults(this.pageArray);}
    return this.pageArray.slice((this.currentPage-1)*10,this.currentPage*20);
    
    }
    
     
  }

  releveantAds=[];
  fetchReleveantAds = function(){
     this.http.get("https://s3.us-east-2.amazonaws.com/v4k-content-provider/ads.json").subscribe(
       (res: Response) => {
         var filter = _.filter(res.json(), function(ads)
         {return ads.type === "site" })
         this.releveantAds= filter; 
       }
     );
   }


  ngOnInit() {
    this.fetchResultsData();
    this.fetchReleveantAds();
     
    
  }
}
