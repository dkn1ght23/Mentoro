import React, { useState, useEffect, Component } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
import firebase from "firebase";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { render } from "react-dom";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react";

require("firebase/firestore");
require("firebase/firebase-storage");
export default function PickImage({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
       setImage(result.uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <View />;
  }
  if (hasGalleryPermission === false) {
    return <Text>No access to Pick Image</Text>;
  }

  const uploadImage = async () => {
    const uri = image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log(childPath);
    const response = await fetch(uri);

    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snaphot) => {
      console.log(snaphot);
    };
    task.on("state_changed ", taskProgress, taskError, taskCompleted);
  };
  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .set({
        downloadURL,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        navigation.popToTop();
      });
  };
  
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity
            style={{
              height: 30,
              marginTop: 5,
              marginBottom: 30,
              flexDirection: "row",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 8,
              position: "absolute",
              alignSelf: "center",
              fontFamily: "gilroy-bold",
              fontSize: 18,
            }}
          >
            Change Profile Picture
          </Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                flex: 3,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 0.5,
                borderColor: "grey",
                height: 50,
                borderRadius: 12,
                backgroundColor: "#F1F7FF",
              }}
              onPress={() => pickImage()}
            >
              <Text style={{ fontFamily: "gilroy-medium", fontSize: 16, opacity: 0.4 }}>
                Choose a file
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                // borderWidth: 1,
                // borderColor: "black",
                height: 50,
                borderRadius: 12,
                marginLeft: 3,
                backgroundColor: "#2397D7",
              }}
              onPress={() => uploadImage()}
            >
              <Text
                style={{
                  fontFamily: "gilroy-medium",
                  fontSize: 16,
                  color: "white",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
          {image !== null ? (
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 10,
                flexDirection: "row",
              }}
            >
              <Feather name="check-circle" size={16} color="green" />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "gilroy-medium",
                  fontSize: 15,
                }}
              >
                File selected!
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});