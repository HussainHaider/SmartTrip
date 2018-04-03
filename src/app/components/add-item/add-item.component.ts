import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  OptionSelected: any;
  Options = ['Hotel', 'Restaurant', 'Flight', 'Road'];
  restaurantOptions = ['Fast Food', 'Ethnic', 'Fast casual', 'Casual dining'];
  restaurantOptionSelected: any;
  flightOptions = ['Economy class', 'Buniess class', 'First class'];
  flightOptionSelected: any;
  roadOptions = ['Daewoo Express', 'Skyways'];
  roadOptionsSelected: any;
  constructor() { }

  ngOnInit() {
  }

}
