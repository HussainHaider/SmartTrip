import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Business} from '../../Models/business.model';
import {DataService} from '../Data/data.service';
import {Hotel} from '../../Models/hotel.model';
import {Review} from '../../Models/review.model';
import {ReviewService} from '../Review/review.service';

@Injectable()
export class BusinessService {
  private transformed: Array<string>;
  private hotels: Hotel[] = [];
  private reviews: Review[] = [];
  collection: any = [];


  constructor(public http: Http, private dataService: DataService, private reviewService: ReviewService) { }

  GetBusinessOptions() {
    console.log('Hello GetBusinessOptions');

     return this.http.get('http://localhost:3000/app/businessOptions')
      .map((response: Response) => {
        const getObjectsID = response.json().obj;
        this.transformed = [];
        for (const objects of getObjectsID) {
          console.log('objects' + objects.Object_id);
          this.GetHotelsByID(objects.Object_id).subscribe(
            data => {
              this.hotels.push(new Hotel(data['obj'][0].Name, data['obj'][0].Location, data['obj'][0].Price, data['obj'][0].Rating,  data['obj'][0].TotalRooms, data['obj'][0].FreeRooms, data['obj'][0].Image, data['obj'][0]._id));
            },
            error => console.error(error)
          );
        }
      })
      .catch((error: Response) => Observable.throw(error));
  }
  GetHotelsByID(ID) {
    const body = JSON.stringify({'ID': ID});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/app/hotelsID', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
  getHotels() {
    return this.hotels;
  }
  getReviews() {
    return this.reviews;
  }
  UpdateObject(business: Business) {
    const body = JSON.stringify(business);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/app/updateBusiness', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  GetBusinessViews(UID) {
    console.log('User ID:' + UID);
    const body = JSON.stringify({'User_id': UID});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/app/business', body, {headers: headers})
      .map((response: Response) => {
        const getObjectsID = response.json().obj;
        this.transformed = [];
        for (const objects of getObjectsID) {
          console.log('objects:' + objects.Object_id);

          const review = new Review(
            objects.Object_id );
          this.reviewService.GetReviewsById(review)
            .subscribe(
              data => {
                this.collection = JSON.stringify(data['obj']);
                for (let i = 0; i < 4; i++) {
                  this.reviews.push(new Review(this.collection['obj'][i].Object_id, this.collection['obj'][i].User_id, this.collection['obj'][i].Rating, this.collection['obj'][i].Title,  this.collection['obj'][i].Date, this.collection['obj'][i]._id));
                }

              },
              error => console.error(error)
            );
        }
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
}