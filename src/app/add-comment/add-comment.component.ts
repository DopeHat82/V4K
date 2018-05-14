import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  data:object = {};
  commentObj:object = {};
  private headers = new Headers({ 'Content-Type': 'application/json' })
  isAdded = false;
  constructor(private _http:HttpClient, private router: Router, private route: ActivatedRoute, private http:Http) { }

  addComment = function(comment){
    this.commentObj = {
    "user" : comment.user,
    "contentId" : comment.contentId,
    "comment": "It works!"
    }
    this.http.post("https://s3.us-east-2.amazonaws.com/v4k-content-provider/comments.json", this.commentObj).subscribe((res:Response) => {
      this.isAdded = true;
    })
  }


  ngOnInit() {
  }

}
