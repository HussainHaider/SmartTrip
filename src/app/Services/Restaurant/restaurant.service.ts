import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Restaurant} from '../../Models/restaurant.model';

@Injectable()
export class RestaurantService {
  private Restaurants: Restaurant[] = [];
  private transformedRestaurants: Restaurant[] = [];

  constructor(public http: Http) { }
  GetRecommendedRestaurants(latitude, longitude) {
    return this.http.get('http://localhost:3000/app/restaurants/Lahore/5')
      .map((response: Response) => {
        const getRestaurant = response.json().obj;
        console.log(getRestaurant);

        for (const restaurant of getRestaurant) {
          this.transformedRestaurants.push(new Restaurant(restaurant.Name, restaurant.ImpThings, restaurant.Rating, restaurant.Location, restaurant.Image));
        }
        this.Restaurants = this.transformedRestaurants;
        return this.transformedRestaurants;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetPopularRestaurants(latitude, longitude) {
    return this.http.get('http://localhost:3000/app/restaurants/Lahore/5/popular')
      .map((response: Response) => {
        const getRestaurant = response.json().obj;
        console.log(getRestaurant);

        for (const restaurant of getRestaurant) {
          this.transformedRestaurants.push(new Restaurant(restaurant.Name, restaurant.ImpThings, restaurant.Rating, restaurant.Location, restaurant.Image));
        }
        this.Restaurants = this.transformedRestaurants;
        return this.transformedRestaurants;
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
