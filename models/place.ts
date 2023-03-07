import { ICoords } from './../types/index';

class Place {
  id: string;
  title: string;
  imageUrl: string;
  address: string;
  location: ICoords;

  constructor(
    title: string,
    imageUrl: string,
    address: string,
    location: ICoords
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.address = address;
    this.location = location;
    this.id = crypto.randomUUID();
    // this.id = new Date().toString() + Math.random().toString
  }
}

export { Place };
