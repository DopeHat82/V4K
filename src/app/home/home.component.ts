import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import{ ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('t') t;
  
  section: string;

  constructor(private route: ActivatedRoute, private cdRef : ChangeDetectorRef) { 
    this.route.queryParams.subscribe(params => {
        this.section = params['section'];
    });
  }

  ngOnInit() {
    
  }
  
  detectIncomingTabRef = function(){
    if(this.section){
      this.t.select(this.section);
      this.cdRef.detectChanges(); 
    }
  }

  ngAfterViewInit()
  {
    this.detectIncomingTabRef();

  }

}
