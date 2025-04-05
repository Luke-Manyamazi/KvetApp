import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Importing ImagePicker for selecting images and videos
import * as AudioRecorder from "expo-av"; // For recording audio
import * as Location from "expo-location"; // For getting the user's location
import { firebase } from "../config/firebase";

function FileUploadScreen({ navigation }) {
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null); // image, video, or audio
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [recording, setRecording] = useState(null);

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
      setMediaType("image");
    }
  };

  // Function to pick a video
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
      setMediaType("video");
    }
  };

  // Function to record audio
  const startRecording = async () => {
    try {
      const { status } = await AudioRecorder.Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to record audio is required!");
        return;
      }

      const { recording } = await AudioRecorder.Recording.createAsync(
        AudioRecorder.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      recording.startAsync();
    } catch (error) {
      console.error("Error starting audio recording:", error);
    }
  };

  // Function to stop audio recording
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setMediaUri(uri);
      setMediaType("audio");
    } catch (error) {
      console.error("Error stopping audio recording:", error);
    }
  };

  // Function to get the user's location
  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location is required!");
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation.coords);
  };

  // Function to upload the media file (image, video, or audio) to Firebase
  const uploadMedia = async () => {
    if (!mediaUri || !description || !location) {
      alert("Please provide a media file, description, and location.");
      return;
    }

    const response = await fetch(mediaUri);
    const blob = await response.blob();
    const filename = mediaUri.split("/").pop();
    const storageRef = firebase
      .storage()
      .ref()
      .child("uploads/" + filename);

    try {
      await storageRef.put(blob);
      const downloadURL = await storageRef.getDownloadURL();

      // Save the media details to Firestore
      await firebase.firestore().collection("uploads").add({
        mediaUrl: downloadURL,
        description: description,
        location: location,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        mediaType: mediaType,
      });

      alert("Upload successful!");
      navigation.navigate("Welcome"); // Redirect after upload
    } catch (error) {
      console.error("Error uploading media: ", error);
      alert("Error uploading media.");
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/backgroundTwo.jpg")}
      blurRadius={3}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/kvet-logo.png")}
        />
        <Text style={styles.title}>Upload Media</Text>

        {/* Media Selection Buttons */}
        <TouchableOpacity onPress={pickImage} style={styles.mediaButton}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickVideo} style={styles.mediaButton}>
          <Text style={styles.buttonText}>Pick a Video</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={startRecording} style={styles.mediaButton}>
          <Text style={styles.buttonText}>Record Audio</Text>
        </TouchableOpacity>
        {mediaUri && mediaType === "image" && (
          <Image source={{ uri: mediaUri }} style={styles.selectedMedia} />
        )}
        {mediaUri && mediaType === "video" && (
          <Text style={styles.selectedMedia}>Video Selected</Text>
        )}
        {mediaUri && mediaType === "audio" && (
          <Text style={styles.selectedMedia}>Audio Recorded</Text>
        )}

        {/* Input for description */}
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />

        {/* Location Button */}
        <TouchableOpacity onPress={getLocation} style={styles.mediaButton}>
          <Text style={styles.buttonText}>Get Location</Text>
        </TouchableOpacity>
        {location && (
          <Text style={styles.locationText}>
            Location: Latitude {location.latitude}, Longitude{" "}
            {location.longitude}
          </Text>
        )}

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton} onPress={uploadMedia}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "darkblue",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  mediaButton: {
    backgroundColor: "#21409a",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedMedia: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "beige",
    width: "100%",
  },
  uploadButton: {
    backgroundColor: "#21409a",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
    color: "darkgreen",
  },
});

export default FileUploadScreen;
