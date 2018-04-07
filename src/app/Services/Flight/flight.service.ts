import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Flight } from '../../Models/flight.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class FlightService {

  private flights: Flight[] = [];
  private transformedFlights: Flight[] = [];


  constructor(public http: Http) { }
  GetPopularHotels(latitude, longitude) {
    return this.http.get('http://localhost:3000/app/hotels/Lahore/5')
      .map((response: Response) => {
        const getflights = response.json().obj;
        this.transformedFlights = [];
        console.log(getflights);

        for (const flight of getflights) {
          this.transformedFlights.push(new Flight(flight.Source, flight.Destination, flight.Class, flight.Date, flight.TotalSeats, flight.AvailableSeats, flight.Time, flight.Name, flight.Price, flight.Image));
        }
        this.flights = this.transformedFlights;
        return this.transformedFlights;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetHotels(flight: Flight) {
    const body = JSON.stringify(flight);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/app/hotels', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}