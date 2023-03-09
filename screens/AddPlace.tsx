import React from 'react';
import PlaceForm from '../components/Places/PlaceForm';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Place } from '../models/place';
import { insertPlace } from '../util/database';

type Props = NativeStackScreenProps<RootStackParamList, 'AddPlace'>;

const AddPlace = ({ navigation }: Props) => {
  const createPlaceHandler = async (place: Place) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
