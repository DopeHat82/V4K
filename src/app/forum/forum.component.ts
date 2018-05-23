import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  currentTags=[];
  userData= {};
  resultsArray=[];
  newThreads=[];
  searchResultsArray=[];

  loadTags = function(results){       
    results.forEach(element => {
      if(element.title == undefined){}
      else{
      if(this.currentTags.indexOf(element.title) > -1)
        {}
      else{this.currentTags.push(element.title)}
       } 
       if(element.tag == undefined){}
       else{
       if(this.currentTags.indexOf(element.tag) > -1)
         {}
       else{this.currentTags.push(element.tag)}
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

  searchEntries = function (keyword) {  
    this.searchResultsArray = [];
    var stage = []; this.isSearch = true; this.selectedKeyword = keyword;
    this.http.get("http://18.221.222.34/forum").subscribe(
      (res: Response) => {
        stage = res.json();
        for (var i in stage) {
          if(stage[i].title === keyword)
            {this.searchResultsArray.push(stage[i]);}
          else {
          if (stage[i].tag === keyword) {
            this.searchResultsArray.push(stage[i]);
          }
        }
          
        }
        
        }
        
      
    );

  }

  fetchResultsData = function(){
    this.http.get("http://18.221.222.34/forum").subscribe(
      (res: Response) => {
        this.resultsArray = res.json(); this.loadTags(this.resultsArray);this.fetchNewest(this.resultsArray);
      }
    );

    
  }


  gotoAnchor = function(anchorId){
    var $link = (this);
    window.location.hash = anchorId;
  }

  fetchNewest = function(results){
    this.newThreads.push(results[results.length-1]);
   this.resultsArray.splice(-1);

  }

  isAuthenticated = function(){
    if (document.cookie.split(';').filter(function(item) {
      return item.indexOf('userData=') >= 0
  }).length) {this.userData = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)userData\s*\=\s*([^;]*).*$)|^.*$/, "$1").replace("[","").replace("]",""));}
  }

  addThread = function(thread){
    
    this.threadObj = {
    "author" : this.userData.userName,
    "timestamp" : (new Date).toLocaleDateString().toString() + " " + (new Date).toLocaleTimeString().toString(),
    "authorType" : this.userData.type,
    "memberStatus" : this.userData.memberStatus,
    "thread": thread.post,
    "title" : thread.title,
    "tag": thread.tag
    }
    this.http.post("http://18.221.222.34/forum", this.threadObj, {headers: {
      'Content-Type': 'application/json' , 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':'X-Requested-With'	
  }}).subscribe((res:Response) => {
      this.isAdded = true;
      this.resultsArray.push(this.threadObj);
    }) 
  }

  ngOnInit() {
    this.isAuthenticated(); this.fetchResultsData();
  }

}
