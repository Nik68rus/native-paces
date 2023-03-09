import { LatLng } from 'react-native-maps';
import { Place } from '../models/place';

export interface ICoords {
  lat: number;
  lng: number;
}

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: { pickedLocation: LatLng };
  PlaceDetails: { placeId: number };
  Map: { location: ICoords };
};

export interface IPlace {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
}
