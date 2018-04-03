
export class Flight {
  Name: string;
  Price: string;
  Source: string;
  Destination: string;
  Class: string;
  TotalSeats: number;
  AvailableSeats: number;
  Date: string;
  Time: string;


  constructor(Name: string, Price: string, Source: string, Destination: string, Class: string, TotalSeats: number, AvailableSeats: number, Date: string, Time: string) {
    this.Name = Name;
    this.Price = Price;
    this.Source = Source;
    this.Destination = Destination;
    this.Class = Class;
    this.TotalSeats = TotalSeats;
    this.AvailableSeats = AvailableSeats;
    this.Date = Date;
    this.Time = Time;
  }
}
