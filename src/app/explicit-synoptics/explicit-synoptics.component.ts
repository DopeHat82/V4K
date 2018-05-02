import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-explicit-synoptics',
  templateUrl: './explicit-synoptics.component.html',
  styleUrls: ['./explicit-synoptics.component.css']
})
export class ExplicitSynopticsComponent implements OnInit {

  constructor(private http: Http, public sanitizer: DomSanitizer) { }
  
  mediaContent = [];
  
    fetchData = function(){
      this.http.get("./assets/json/explicitSynoptics.json").subscribe(
        (res: Response) => {
          this.mediaContent= res.json().mediaContent;
          
        }
      );
    }
  ngOnInit() {
    this.fetchData();
  }

}
