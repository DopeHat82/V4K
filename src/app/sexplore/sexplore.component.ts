import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sexplore',
  templateUrl: './sexplore.component.html',
  styleUrls: ['./sexplore.component.css']
})
export class SexploreComponent implements OnInit {

  constructor(private http: Http, public sanitizer: DomSanitizer) { }

  selectedFetish:'111';
  addtoSexplore(fet: any): void{
    this.selectedFetish= fet;
  }

  thresholdModel = 1;
  fetishes = [];
  sexActsFilter = {
    vanillaPartner: "",
    kinkPartner: "",
    sexploring: "",
    threshold: "Low"
  };
  sexActsArray = [];
  
  updateSexActsFilter = function(filter, value) {
    if(filter == "vanillaPartner")
    {this.sexActsFilter.vanillaPartner = value;}
    else if(filter == "kinkPartner")
      {this.sexActsFilter.kinkPartner = value;}
    else if(filter == "sexploring")
      {this.sexActsFilter.sexploring = value;}
    else if(filter == "threshold")
      {this.sexActsFilter.threshold = value;}
    this.fetchSexActsResultsData ();
  }

  fetchSexActsResultsData = function() {
    this.selectedSexplore = this.sexActsFilter.sexploring;
    const thresholdFilter = this.sexActsFilter.threshold;
    const vanillaPartner = this.sexActsFilter.vanillaPartner;
    const kinkPartner = this.sexActsFilter.kinkPartner;
    const sexploring = this.sexActsFilter.sexploring;
    this.fetchReleveantAds(sexploring);
    this.fetchRevelantMedia(sexploring, thresholdFilter);
    this.http.get("https://s3.us-east-2.amazonaws.com/v4k-content-provider/sexacts.json").subscribe(
      (res: Response) => {
        var filter = _.filter(res.json(), function(sexacts)
        {return sexacts.threshold === thresholdFilter && sexacts.keyword === sexploring})
        this.sexActsArray = filter;
        
      var lowFilter = _.filter(res.json(), function (results)
      { return results.keyword === sexploring && results.threshold === 'Low'})
      
      var MedFilter = _.filter(res.json(), function (results)
        { return results.keyword === sexploring && results.threshold === 'Medium'})
  
      var highFilter = _.filter(res.json(), function (results)
        { return results.keyword === sexploring && results.threshold === 'High'}) 
  
        if(lowFilter.length > 0){ this.lowTCnt = lowFilter.length;}
        else{this.lowTCnt = "";}
        if(MedFilter.length > 0) { this.medTCnt = MedFilter .length;}
        else{this.medTCnt = "";}
        if(highFilter.length > 0){ this.hiTCnt = highFilter.length;}
        else{this.hiTCnt = "";}

      }
    );
    
  }

  lowTCnt = '';
  medTCnt = '';
  hiTCnt = '';

  
  mediaSwitch: "";
  releveantAds=[];
 fetchReleveantAds = function(selectedGenre){
    this.http.get("https://s3.us-east-2.amazonaws.com/v4k-content-provider/ads.json").subscribe(
      (res: Response) => {
        var filter = _.filter(res.json(), function(ads)
        {return ads.genre === selectedGenre && ads.type === "products"})
        this.releveantAds= filter; 
        this.mediaSwitch = "true"; 
      }
    );
  }
    fetchFestishDropdownData = function(){
      this.http.get("https://s3.us-east-2.amazonaws.com/v4k-content-provider/fetishes.json").subscribe(
        (res: Response) => {
          this.fetishes= res.json().fetishes;
          
        }
      );
    }

    relevantMedia=[];
    fetchRevelantMedia = function(selectedGenre, threshold)
    {
      const thresholdFilter = this.sexActsFilter.threshold;
      this.http.get("https://s3.us-east-2.amazonaws.com/v4k-content-provider/explicit.json").subscribe(
        (res: Response) => {
          var filter = _.filter(res.json(), function (results)
          { return results.genre === selectedGenre && results.threshold === threshold })
          this.relevantMedia = filter;
        }
      );
    }

    userComments=[];
    fetchuserComments = function()
    {
      this.http.get("http://18.221.222.34/comments").subscribe(
        (res: Response) => {
          this.userComments = res.json();
        }
      );
    }

    specificUserComments = [];
    applyUserComments = function(id){
      var filter = _.filter(this.userComments, function(results)
      { return results.contentId === id })
      this.specificUserComments = filter;
    }

    DisplayDIV = function(id){
      var x = (document.getElementById(id))
      x.style.display = 'block';
    }

    HideDIV = function(id){
      var x = (document.getElementById(id))
      x.style.display = 'none';
    }

  ngOnInit() {
    this.fetchFestishDropdownData ();
    this.fetchSexActsResultsData ();
    this.fetchuserComments();
  }

}
