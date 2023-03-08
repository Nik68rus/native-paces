import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';
import PlaceItem from './PlaceItem';

interface Props {
  places: Place[];
}

const PlacesList = ({ places }: Props) => {
  if (!places || !places.length) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet!</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={({ item }) => <PlaceItem item={item} onSelect={() => {}} />}
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
});
