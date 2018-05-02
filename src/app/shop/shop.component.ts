import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.shopRedirect();
  }

  public shopRedirect(){
    /*this.router.navigate['http://vanilla4kink.adultshopping.com'];*/
    window.location.href = 'http://vanilla4kink.adultshopping.com';
    console.log('got here');
  }

}
