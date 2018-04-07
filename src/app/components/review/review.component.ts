import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';
import {DataService} from '../../Services/Data/data.service';
import {UserService} from '../../Services/User/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Review} from '../../Models/review.model';
import {ReviewService} from '../../Services/Review/review.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ReviewComponent implements OnInit {
  stars = [1, 2, 3, 4];
  closeResult: string;
  private collectionReview = [];
  private reviewsNumbers = 0;
  private avgRating = 0;
  private calculateFiveStars = 0;
  private calculateFourStars = 0;
  private calculateThreeStars = 0;
  Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private calculateTwoStars = 0;
  private calculateOneStars = 0;
  constructor(private modalService: NgbModal, private dataService: DataService, private userService: UserService, private router: ActivatedRoute, private route: Router, private reviewService: ReviewService) { }

  ngOnInit() {
    this.collectionReview = this.dataService.data_things['obj'];
    console.log('Reviews', this.collectionReview);
    this.reviewsNumbers = this.collectionReview.length;
    let sum = 0;
    for (let i = 0; i < this.reviewsNumbers; i++ ) {
      if (this.collectionReview[i].Rating === 5) {
        this.calculateFiveStars++;
      } else if (this.collectionReview[i].Rating === 4) {
        this.calculateFourStars++;
      } else if (this.collectionReview[i].Rating === 3) {
        this.calculateThreeStars++;
      } else if (this.collectionReview[i].Rating === 2) {
        this.calculateTwoStars++;
      } else if (this.collectionReview[i].Rating === 1) {
        this.calculateOneStars++;
      }
      sum += this.collectionReview[i].Rating;

    }
    const num = (sum / this.reviewsNumbers).toFixed( 1 );
    this.avgRating =  parseFloat(num);
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  getRepeater(ratingTotal) {
    console.log('Rating', ratingTotal);
    return new Array(ratingTotal);
  }
  getAvgRating(num) {
    if (num === 0) {
      return new Array(Math.floor( this.avgRating ));
    } else {
      return new Array(5 - Math.floor( this.avgRating ));
    }
  }
  submit(f) {
    let objId;
    console.log('Review Values', f.value);
    const userId = JSON.stringify(localStorage.getItem('userId'));
    console.log('userId', userId);
    const currentDate = new Date();
    const date = this.Months[currentDate.getMonth()] + ',' + currentDate.getDate() + ',' + currentDate.getFullYear();
    console.log('Date', date);
    this.router.paramMap.subscribe(params => {
      console.log('PARAMS:', params.get('objID'));
      objId = params.get('name');
    });
    if (objId) {
      const review = new Review(objId, userId, f.value.rating, f.value.title, f.value.description, date);
      this.reviewService.postReviews(review)
        .subscribe(
          data => {
            this.dataService.data_things = JSON.stringify(data);
            this.reviewService.GetReviewsById(objId);
          },
          error => console.error(error)
        );
    }
  }
  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

}
