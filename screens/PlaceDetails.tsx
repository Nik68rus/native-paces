import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import OutlinedButton from '../components/ui/OutlinedButton';
import { Colors } from '../constants/colors';
import { Place } from '../models/place';
import { RootStackParamList } from '../types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { fetchPlaceDetails } from '../util/database';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetails'>;

SplashScreen.preventAutoHideAsync();

const PlaceDetails = ({ route, navigation }: Props) => {
  const placeId = route.params.placeId;
  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    fetchPlaceDetails(placeId).then((res) => {
      setPlace(res);
      navigation.setOptions({ title: res.title });
    });
  }, [placeId, navigation]);

  useLayoutEffect(() => {
    const hideSplashScreen = async () => {
      if (place) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [place]);

  const showOnMapHandler = () => {
    navigation.navigate('Map', { location: place.location });
  };

  return (
    <>
      {place && (
        <ScrollView>
          <Image style={styles.image} source={{ uri: place.imageUri }} />
          <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
              <Text style={styles.addres}>{place.address}</Text>
            </View>
            <OutlinedButton icon="map" onPress={showOnMapHandler}>
              View on map
            </OutlinedButton>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  addres: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default PlaceDetails;
