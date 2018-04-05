
export class Restaurant {
  Name: string;
  ImpThings: string;
  Rating: number;
  Location: string;
  Image: string;


  constructor(Name: string, ImpThings: string, Rating: number, Location: string, Image: string) {
    this.Name = Name;
    this.ImpThings = ImpThings;
    this.Rating = Rating;
    this.Location = Location;
    this.Image = Image;
  }
}
