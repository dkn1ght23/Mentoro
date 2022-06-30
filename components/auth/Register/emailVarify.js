import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import firebase from "firebase";
export default function emailVarify() {
  const onLogout = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    Alert.alert("Registration Needs Varification!");
    onLogout();
  }, []);
  return (
    <View></View>
  );
}