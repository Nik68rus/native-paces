import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';
import PlaceItem from './PlaceItem';
import { RootStackParamList } from '../../types';

interface Props {
  places: Place[];
}

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PlacesList = ({ places }: Props) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const selectPlaceHandler = (id: number) => {
    navigation.navigate('PlaceDetails', { placeId: id });
  };

  if (!places || !places.length) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet!</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(place) => place.id.toString()}
      renderItem={({ item }) => (
        <PlaceItem item={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  list: {
    margin: 24,
  },
});
