
export class Hotel {
  Name: string;
  Price: string;
  Rating: number;
  Location: string;
  TotalRooms: number;
  FreeRooms: number;
  Image: string;
  Stars: any;

  constructor(Name: string, Price: string, Rating: number, Location: string, TotalRooms: number, FreeRooms: number, Image: string) {
    this.Name = Name;
    this.Price = Price;
    this.Rating = Rating;
    this.Location = Location;
    this.TotalRooms = TotalRooms;
    this.FreeRooms = FreeRooms;
    this.Image = Image;
  }
}
