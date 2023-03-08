import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  Region,
} from 'react-native-maps';
import { Alert, StyleSheet } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { RootStackParamList } from '../types';
import IconButton from '../components/ui/IconButton';

type Props = NativeStackScreenProps<RootStackParamList>;

const Map = ({ navigation }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng>();
  const region: Region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e: MapPressEvent) => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'Please, tap on map to choose location!'
      );
      return;
    }

    navigation.navigate('AddPlace', { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
export default Map;
