import { AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {SearchWidget} from '../SearchWidget';
import { Hotel } from '../../Models/hotel.model';
import {Router} from '@angular/router';
import {HotelService} from '../../Services/Hotel/hotel-service.service';
import {DataService} from '../../Services/Data/data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit, OnChanges,  AfterViewInit  {
  @Input() Image: string;
  public searchWidget = new SearchWidget();
  public imageUrl;
  public isHotel ;
  public isRestaurant ;
  public isTravel ;
  public isthingsToDo;
  public Listname;
  options = ['Daewoo Express', 'Skyways'];
  Restaurantoptions = ['Fast Food', 'Ethnic', 'Fast casual', 'Casual dining'];
  Seatsoptions = [1, 2, 3, 4, 5];
  tCompanyOptionSelected: any;
  rest_OptionSelected: any;
  RoadSeatsOptionSelected: any;
  adultOptionSelected: any;
  childOptionSelected: any;
  public No_of_Rooms = 0;
  public mySet = new Set();
  public  dt: any;
  constructor(private router: Router, private hotelService: HotelService, private dataService: DataService) {
    this.No_of_Rooms = 0;
  }
  ngAfterViewInit() {

    const HTML = '<datalist id=\'browsers\'' + '>' + '</datalist>';

    document.getElementById('myForm_1').insertAdjacentHTML( 'beforeend', HTML );
  }

  ngOnInit() {
    this.Listname = 'browsers';
  }
  submitHotels(f) {
    console.log('Print');
    console.log(f.value);
    const hotel = new Hotel(
      f.value.hotelname, f.value.hotelname );
    this.hotelService.GetHotels(hotel)
      .subscribe(
        data => {
          //console.log('DATA GET:', data);
          this.dataService.data_things = JSON.stringify(data);
          this.router.navigate(['/ShowDeals', 'hotel']);
        },
        error => console.error(error)
      );
  }
  ngOnChanges() {
    this.imageUrl = this.Image;
    console.log(this.imageUrl);
    if ( this.imageUrl.includes('Hotels') ) {
      console.log('True');
      this.isHotel = true;
    } else if ( this.imageUrl.includes('Restaurants') ) {
      this.isRestaurant = true;
    } else if ( this.imageUrl.includes('travel') ) {
      this.isTravel = true;
    } else if ( this.imageUrl.includes('things') ) {
      this.isthingsToDo = true;
    } else {
      this.isHotel = false;
      this.isRestaurant = false;
      this.isTravel = false;
      this.isthingsToDo = false;
    }
  }
  onKey(event: any) { // without type info
    document.getElementById('browsers').innerHTML = '';
    console.log('Value is:' + event.target.value);

    const html = this.searchWidget.render(event.target.value);
    if ( html !== undefined) {
      document.getElementById('browsers').insertAdjacentHTML( 'beforeend', html.toString() );
    }
    this.searchWidget.clearSet();
  }
  ModeifyPicker(num) {
    this.No_of_Rooms = this.No_of_Rooms + num ;
    if ( this.No_of_Rooms < 0 ) {
      this.No_of_Rooms = 0;
    }
  }

  onOptionsSelected(event) {
    console.log(event);
  }
}
