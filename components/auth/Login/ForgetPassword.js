import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  Alert,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

import Ionicons from "react-native-vector-icons/Ionicons";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.onForgetPassword = this.onForgetPassword.bind(this);
  }
  onForgetPassword = () => {
    const { email } = this.state;
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert("Password reset email hase been sent.");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 2, backgroundColor: "white" }}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity
            style={{
              height: 30,
              marginTop: 5,
              marginBottom: 30,
              flexDirection: "row",
            }}
            onPress={() => this.props.navigation.goBack()}
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
            Reset Your Password
          </Text>
        </View>
        <View style={{marginHorizontal: 20}} >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontFamily: "gilroy-regular" }}>
            Check your email for the password reset link.
          </Text>
          <Text style={{ textAlign: "center", fontFamily: "gilroy-regular" }}>
            Then follow the link to reset password.
          </Text>
        </View>
        <TextInput
          placeholder="enter your email"
          style={{
            borderRadius: 12,
            marginTop: 20,
            backgroundColor: "#F1F7FF",
            height: 50,
            paddingHorizontal: 20,
          }}
          onChangeText={(email) => this.setState({ email })}
        />
        {/* <Button
          onPress={() => this.onForgetPassword()}
          title="Reset Password"
        /> */}
        <TouchableOpacity
          style={{
            backgroundColor: "#2397D7",
            borderRadius: 12,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            elevation: 50,
          }}
          onPress={() => this.onForgetPassword()}
        >
          <Text
            style={{ color: "white", fontSize: 16, fontFamily: "gilroy-bold" }}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
