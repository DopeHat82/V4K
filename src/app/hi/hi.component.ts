import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-hi',
  templateUrl: './hi.component.html',
  styleUrls: ['./hi.component.css']
})
export class HiComponent implements OnInit {
  images: Array<string>;
  title: "slide1.png";
  constructor(private _http:HttpClient) { }
  ngOnInit() {
    this._http.get('./assets/json/hiCarousel.json')
    .pipe(map((images: Array<{id: number, filename: string}>) => this._randomImageUrls(images)))
    .subscribe(images => this.images = images);
  }
  
  private _randomImageUrls(images: Array<{id: number, filename: string}>): Array<string> {
    return [0, 1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      const filePayload = JSON.stringify(images[randomId].filename);
      const pathToImageRepo = "../assets/Images/";
      const completePath = pathToImageRepo + filePayload.replace(/['"]+/g, '');
      
      return completePath;
      
    });
  }
}
