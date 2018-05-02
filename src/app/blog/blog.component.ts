import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private http: Http) { }

  blogEntries = [];
  
    fetchData = function(){
      this.http.get("./assets/json/blog.json").subscribe(
        (res: Response) => {
          this.blogEntries = res.json().blogEntries;
        }
      );
    }
    

  ngOnInit() {
    this.fetchData();
  }

}
