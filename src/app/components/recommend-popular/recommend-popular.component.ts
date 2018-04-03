import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Hotel} from '../../Models/hotel.model';
import {HotelService} from '../../Services/Hotel/hotel-service.service';

@Component({
  selector: 'app-recommend-popular',
  templateUrl: './recommend-popular.component.html',
  styleUrls: ['./recommend-popular.component.css']
})
export class RecommendPopularComponent implements OnInit {
  stars = [1, 2, 3, 4];
  @Input() components: string[];
  @Input() comp: string;
  recommendedHotels: Hotel[];
  popularHotels: Hotel[];
  image = '/assets/images/Hotels.png';
  latitude: any;
  longitude: any;
  Length: number;
  constructor(private hotelService: HotelService) {
  }

  getRepeater(ratingTotal) {
    return new Array(ratingTotal);
  }

  ngOnInit() {
    this.hotelService.GetRecommendedHotels(this.latitude, this.longitude).subscribe((hotels: Hotel[]) => {
      this.recommendedHotels = hotels;
      this.Length = hotels.length;
    });

    this.hotelService.GetPopularHotels(this.latitude, this.longitude).subscribe((hotels: Hotel[]) => {
      this.popularHotels = hotels;
      this.Length = hotels.length;
    });
  }


}
