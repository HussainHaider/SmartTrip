import {Component, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  public ImageValue;
  GoogleimageUrl = '/assets/images/google-play.png';
  AppleimageUrl = '/assets/images/apple.png';
  stars = [1, 2, 3, 4];
  component = 'Hotels';
  hotels = ['/assets/images/h1.jpg', '/assets/images/h2.jpg', '/assets/images/h3.jpg'];
  public images: string[] ;
  public headings: string[] ;
  public texts: string[] ;

  constructor() {
    this.ImageValue = '/assets/images/Hotels.png';
  }

  ngOnInit() {
    this.images = ['assets/images/trust.png', 'assets/images/service.png', 'assets/images/worldwide.png'];
    this.headings = ['Trusted Online Travel Leader', 'Service You Can Trust', 'Worldwide Coverage'];
    this.texts = ['300 million members & 30 million authentic reviews ', 'One-stop multilingual service & hassle-free trave', 'Over 1,200,000 hotels in more than 200 countries & flights to over 5,000 cities'];
  }
}
