import { Alert, Button, Image, StyleSheet, View, Text } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  ImagePickerResult,
} from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState<string>();
  const [cameraPermissionsInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionsInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionsInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Not allowed!', 'You need to grant permission to the app!');
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
  };

  let imagePreview = <Text>No image picked yet!</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon="camera">
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default ImagePicker;
