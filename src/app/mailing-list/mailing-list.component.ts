import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-mailing-list',
  templateUrl: './mailing-list.component.html',
  styleUrls: ['./mailing-list.component.css']
})
export class MailingListComponent implements OnInit {

  constructor(private http: Http) { }
  success= 'Join our mailing list';
  addMailingObj:object = {};

  addMailingList = function(appData){
    
    this.addMailingObj = {
    "email" : appData.newEmail
    }
    this.http.post("http://18.221.222.34/mailingList", this.addMailingObj, {headers: {
      'Content-Type': 'application/json' , 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':'X-Requested-With'	
  }}).subscribe((res:Response) => {
      this.isAdded = true; 
    this.success = 'Thank you for joining!';
    }) 
  }
  ngOnInit() {
  }

}
