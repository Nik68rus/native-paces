import { useCallback, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';
import { ICoords } from '../../types';
import Button from '../ui/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

interface Props {
  onCreatePlace: (placeData: Place) => void;
}

const PlaceForm = ({ onCreatePlace }: Props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>();
  const [pickedLocation, setPickedLocation] = useState<ICoords>();
  const [readableAddress, setReadableAddress] = useState<string>();

  const takeImageHandler = useCallback((imageUri: string) => {
    setSelectedImage(imageUri);
  }, []);

  const pickLocationHandler = useCallback(
    (location: ICoords, address: string) => {
      setPickedLocation(location);
      setReadableAddress(address);
    },
    []
  );

  const savePlaceHandler = async () => {
    const place = new Place(
      enteredTitle,
      selectedImage,
      readableAddress,
      pickedLocation
    );
    onCreatePlace(place);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEnteredTitle}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
