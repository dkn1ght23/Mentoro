import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert(error.message);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <KeyboardAvoidingView style={{ height: "5%" }} />

        <KeyboardAvoidingView
          style={{
            flex: 2,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 200 }}
            resizeMode="center"
            source={require("../../../assets/logo-wb.png")}
          />

          <Text style={{ marginHorizontal: 20, fontFamily: "gilroy-light", fontSize: 18 }}>
            Let's sign you in. Welcome back.
          </Text>
          <Text style={{ marginHorizontal: 20, fontFamily: "gilroy-light", fontSize: 18 }}>You've been missed!</Text>

        </KeyboardAvoidingView>

        <KeyboardAvoidingView
          style={{ flex: 4, marginTop: 50, backgroundColor: "transparent" }}
        >
          <Text
            style={{
              marginHorizontal: 35,
              marginTop: 20,
              fontFamily: "gilroy-bold",
            }}
          >
            E-mail
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              borderRadius: 12,
              backgroundColor: "#F1F7FF",
              marginHorizontal: 30,
              height: 50,
              paddingHorizontal: 20,
            }}
            placeholder="enter your email"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
          />

          <Text
            style={{
              marginHorizontal: 35,
              marginTop: 20,
              fontFamily: "gilroy-bold",
            }}
          >
            Password
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              borderRadius: 12,
              backgroundColor: "#F1F7FF",
              marginHorizontal: 30,
              height: 50,
              paddingHorizontal: 20,
            }}
            placeholder="enter your password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#2397D7",
              marginHorizontal: 30,
              borderRadius: 12,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              elevation: 5,
            }}
            onPress={() => this.onSignIn()}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "gilroy-bold",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <KeyboardAvoidingView style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: "transparent",
                marginHorizontal: 30,
                height: 30,
              }}
              onPress={() => this.props.navigation.navigate("ForgetPassword")}
            >
              <Text
                style={{
                  marginTop: 3,
                  color: "black",
                  fontFamily: "gilroy-medium",
                }}
              >
                Forgotten Password?
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>

        <KeyboardAvoidingView style={{ flex: 1 }} />

        <KeyboardAvoidingView style={{ flex: 2 }}>
          <Text
            style={{
              marginHorizontal: 30,
              marginTop: 50,
              fontSize: 14,
              fontFamily: "gilroy-medium",
            }}
          >
            Don't have an account yet?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              marginHorizontal: 30,
              width: 60,
            }}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ marginTop: 3, fontFamily: "gilroy-bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        {/* </ImageBackground> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  nonBlurredContent: {
    borderRadius: 12,
  },
});
