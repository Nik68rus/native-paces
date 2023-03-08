import { LatLng } from 'react-native-maps';

export interface IPlace {
  id: string;
  title: string;
}

export interface ICoords {
  lat: number;
  lng: number;
}

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: { pickedLocation: LatLng };
  PlaceDetails: undefined;
  Map: undefined;
};
