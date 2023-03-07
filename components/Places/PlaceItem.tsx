import { Image, View, Text, Pressable, StyleSheet } from 'react-native';
import { Place } from '../../models/place';

interface Props {
  item: Place;
  onSelect: () => void;
}

const PlaceItem = ({ item, onSelect }: Props) => {
  return (
    <Pressable onPress={onSelect}>
      <View>
        <Image source={{ uri: item.imageUrl }} />
        <View>
          <Text>{item.title}</Text>
          <Text>{item.address}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
