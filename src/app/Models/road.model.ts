
export class Road {
  Name: string;
  Price: string;
  Company: string;
  Source: string;
  Destination: string;
  TotalSeats: number;
  AvailableSeats: number;
  Date: string;
  Time: string;


  constructor(Name: string, Price: string, Company: string, Source: string, Destination: string, TotalSeats: number, AvailableSeats: number, Date: string, Time: string) {
    this.Name = Name;
    this.Price = Price;
    this.Company = Company;
    this.Source = Source;
    this.Destination = Destination;
    this.TotalSeats = TotalSeats;
    this.AvailableSeats = AvailableSeats;
    this.Date = Date;
    this.Time = Time;
  }
}
