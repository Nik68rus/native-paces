import { ICoords } from './../types/index';

class Place {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  location: ICoords;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: ICoords,
    id?: number
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = id;
  }
}

export { Place };
