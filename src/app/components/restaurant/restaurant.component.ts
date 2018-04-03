import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  public ImageValue;
  public images: string[] ;
  public headings: string[] ;
  public texts: string[] ;
  stars = [1, 2, 3, 4];
  component = 'Restaurants';
  restaurant = ['/assets/images/r1.jpg', '/assets/images/r2.jpg', '/assets/images/r3.jpg'];
  constructor() {
    this.ImageValue = '/assets/images/Restaurants.jpg';
  }

  ngOnInit() {
    this.images = ['assets/images/eat.png', 'assets/images/review.png', 'assets/images/reserved.png'];
    this.headings = ['Find the best places to eat', 'See the latest reviews', 'Reserve a table'];
    this.texts = [' 4.3 million restaurants - everything from street food to fine dining', 'Millions of restaurant reviews and photos from our global travel community', 'Use FlyScore to compare flights, then book the one that is right for you'];
  }

}
