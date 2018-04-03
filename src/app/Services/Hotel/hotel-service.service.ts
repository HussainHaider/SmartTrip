import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Hotel } from '../../Models/hotel.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HotelService {
  private hotels: Hotel[] = [];
  private Stars = [];

  constructor(public http: Http) { }
  GetRecommendedHotels(latitude, longitude) {
    return this.http.get('http://localhost:3000/app/hotels/Lahore/5')
      .map((response: Response) => {
        const hotels = response.json().obj;
        console.log(hotels);
        const transformedhotels: Hotel[] = [];
        for (const hotel of hotels) {
          transformedhotels.push(new Hotel(hotel.Name, hotel.Price, hotel.Rating, hotel.Location, hotel.TotalRooms, hotel.FreeRooms, hotel.Image));
        }
        this.hotels = transformedhotels;
        return transformedhotels;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetPopularHotels(latitude, longitude) {
    return this.http.get('http://localhost:3000/app/hotels/Lahore/5/popular')
      .map((response: Response) => {
        const hotels = response.json().obj;
        console.log(hotels);
        const transformedhotels: Hotel[] = [];
        for (const hotel of hotels) {
          transformedhotels.push(new Hotel(hotel.Name, hotel.Price, hotel.Rating, hotel.Location, hotel.TotalRooms, hotel.FreeRooms, hotel.Image));
        }
        this.hotels = transformedhotels;
        return transformedhotels;
      })
      .catch((error: Response) => Observable.throw(error));
  }
















  getCoords(latitude, longitude) {
    console.log('Coords2');
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=latitude,longitude&key=AIzaSyAUUhsO9ZW-SEloNRc8lU69bOscTwnD1I4')
      .map((response: Response) => {
        console.log('Coords3');
        const location = response.json().obj;
        console.log(location);
      })
      .catch((error: Response) => Observable.throw(error));
  }
}
