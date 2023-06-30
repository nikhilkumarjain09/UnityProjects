import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
// import Footer from '../Footer';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const NewScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openCamera = () => {
    // console.log("openCamera")
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0].uri);
// console.log()
     
      }
     
    });
  };

  const openImageLibrary = () => {
    // console.log("openImage")
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openImageLibrary} style={styles.button}>
        <Text style={styles.buttonText}>Open Image Library</Text>
      </TouchableOpacity>
      {selectedImage && selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <View style={styles.content}></View>
     
      {/* <Footer /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default NewScreen;