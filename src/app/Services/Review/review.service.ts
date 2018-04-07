import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Review } from '../../Models/review.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ReviewService {

  constructor(public http: Http) { }

  GetReviewsById(review: Review) {
    const body = JSON.stringify(review);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/app/reviews', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
  postReviews(review: Review) {
    const body = JSON.stringify(review);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/app/postReview', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
