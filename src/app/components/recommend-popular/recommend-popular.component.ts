import {OnChanges, Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Hotel} from '../../Models/hotel.model';
import {HotelService} from '../../Services/Hotel/hotel-service.service';

@Component({
  selector: 'app-recommend-popular',
  templateUrl: './recommend-popular.component.html',
  styleUrls: ['./recommend-popular.component.css']
})
export class RecommendPopularComponent implements OnInit, OnChanges{
  @Input() comp: string;
  @Input() recommended: string;
  @Input() popular: string;
  recommendedFlag = false;
  popularFlag = false;
  constructor() {
  }

  getRepeater(ratingTotal) {
    return new Array(ratingTotal);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('Recommended', this.recommended);
    if (this.recommended.length > 0 ) {
      console.log('this.recommended');
      this.recommendedFlag = true;
    }
    if (this.popular.length > 0 ) {
      console.log('this.recommended');
      this.popularFlag = true;
    }
  }
}
