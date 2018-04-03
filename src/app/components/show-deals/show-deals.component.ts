import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-show-deals',
  templateUrl: './show-deals.component.html',
  styleUrls: ['./show-deals.component.css']
})
export class ShowDealsComponent implements OnInit {
  public isSelect = false;
  public isCol = false;
  public Name;
  step = 0;
  someRange = [ 0, 15000];
  max = 15000;
  min = 0;
  fiveStarFilter = false;
  fourStarFilter = false;
  threeStarFilter = false;

  dbtimeslots = [];
  collection = [
    {'name': 'Rose Palace', 'Price': 5000, 'Class': '3'},
    {'name': 'Pearl Continental', 'Price': 15000, 'Class': '5'},
    {'name': 'Avari', 'Price': 10000, 'Class': '4'},
    {'name': 'Luxus Grand', 'Price': 2000, 'Class': '3'}
  ];
  p = 1;

  constructor(private router: ActivatedRoute) {
    this.dbtimeslots = this.collection;
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      console.log(params.get('name'));
      this.Name = params.get('name');
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('Iwidth is' + event.target.innerWidth);
    console.log('Owidth is' + event.target.outerWidth);
    if (event.target.outerWidth <= 1300) {
      this.isSelect = true;
    } else {
      this.isSelect = false;
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onChange(value) {
    console.log('Value of slider changed to', value);
    this.max = value[1];
    this.min = value[0];
    const coll = [];
    for (let i = 0; i < this.dbtimeslots.length; i++) {
      if (this.dbtimeslots[i].Price > this.min && this.dbtimeslots[i].Price < this.max) {
        coll.push(this.dbtimeslots[i]);
      }
    }
    if (this.max === 15000 && this.min === 0) {
      this.dbtimeslots = this.collection;
    } else {
      this.dbtimeslots = coll;
    }
  }
  onFiveFilterChange(eve: any) {
    this.fiveStarFilter = !this.fiveStarFilter;
    this.check();
  }
  onFourFilterChange(eve: any) {
    this.fourStarFilter = !this.fourStarFilter;
    this.check();
  }
  onThreeFilterChange(eve: any) {
    this.threeStarFilter = !this.threeStarFilter;
    this.check();
  }
  check() {
    if ( this.fiveStarFilter === false && this.fourStarFilter === false && this.threeStarFilter === false ||
      this.fiveStarFilter === true && this.fourStarFilter === true && this.threeStarFilter === true) {
      this.dbtimeslots = this.collection;
    } else {
      if (this.fiveStarFilter === true && this.fourStarFilter === true) {
        this.dispose();
        this.add('5');
        this.add('4');
      } else if (this.fiveStarFilter === true && this.threeStarFilter === true) {
        this.dispose();
        this.add('5');
        this.add('3');
      } else if (this.threeStarFilter === true && this.fourStarFilter === true) {
        this.dispose();
        this.add('3');
        this.add('4');
      } else if (this.fiveStarFilter === true ) {
        this.dispose();
        this.add('5');
      } else if (this.fourStarFilter === true ) {
        this.dispose();
        this.add('4');
      } else if (this.threeStarFilter === true ) {
        this.dispose();
        this.add('3');
      }
    }
  }
  add(str) {
    for (let i = 0; i < this.collection.length; i++) {
      if (this.collection[i].Class === str) {
        this.dbtimeslots.push(this.collection[i]);
      }
    }
  }
  dispose() {
    this.dbtimeslots = [];
  }
}
