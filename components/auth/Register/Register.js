import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Alert,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      username: "",
      gender: "male",
      CFHandle: "",
      CCHandle: "",
      year: "1",
      agree: 0,
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const {
      name,
      email,
      password,
      username,
      gender,
      CFHandle,
      CCHandle,
      year,
    } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .sendEmailVerification()
          .then(() => {
            console.log("verification email sent");
          })
          .catch((e) => {
            console.log("unable to send verification email");
            console.log(e);
          });
      })
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            password,
            username,
            gender,
            CFHandle,
            CCHandle,
            year,
          });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
      // this.props.navigation.navigate('DrawerNavigator')
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar
            animated={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />

          <View style={{ marginHorizontal: 20, marginTop: 5 }}>
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
              {/* Register Yourself */}
            </Text>
          </View>

          <View
            style={{
              flex: 3,
              marginTop: -50,
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 200, width: 200 }}
              source={require("../../../assets/logo-wb.png")}
            />
            <Text
              style={{
                marginBottom: 10,
                fontFamily: "mont-bold",
                fontSize: 28,
              }}
            >
              Register Yourself.
            </Text>
            <Text
              style={{
                marginBottom: 30,
                fontFamily: "gilroy-regular",
                fontSize: 16,
                opacity: 0.4,
              }}
            >
              Unleash your potential with Mentoro!
            </Text>
          </View>

          <View style={{ flex: 4, backgroundColor: "transparent" }}>
            <Text style={{ marginHorizontal: 35, fontFamily: "gilroy-bold" }}>
              Full Name
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
              placeholder="enter your full name"
              onChangeText={(name) => this.setState({ name })}
            />

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
              placeholder="yourname@example.com"
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
              placeholder="choose a password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />

            {this.state.password.length == 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 45,
                  opacity: 0.2,
                  marginTop: 10,
                }}
              >
                <Ionicons name="information-circle" size={16} />
                <Text style={{ marginLeft: 10 }}>
                  Password should be 8-14 characters long
                </Text>
              </View>
            ) : null}

            {(this.state.password.length !== 0 &&
              this.state.password.length < 8) ||
            this.state.password.length > 14 ? (
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 45,
                  marginTop: 10,
                }}
              >
                <Feather name="x-octagon" size={16} color="red" />
                <Text style={{ marginLeft: 10, color: "red" }}>
                  Password should be 8-14 characters long
                </Text>
              </View>
            ) : null}

            {this.state.password.length >= 8 &&
            this.state.password.length <= 14 ? (
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 45,
                  marginTop: 10,
                }}
              >
                <Feather name="check-circle" size={16} color="green" />
                <Text style={{ marginLeft: 10, color: "green" }}>
                  Password should be 8-14 characters long
                </Text>
              </View>
            ) : null}

            <Text
              style={{
                marginHorizontal: 35,
                marginTop: 20,
                fontFamily: "gilroy-bold",
              }}
            >
              Username
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
              placeholder="choose a username"
              onChangeText={(username) => this.setState({ username })}
            />

            <Text
              style={{
                marginHorizontal: 35,
                marginTop: 20,
                fontFamily: "gilroy-bold",
              }}
            >
              Gender
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor:
                    this.state.gender === "male" ? "#2397D7" : "#F1F7FF",
                  width: "30%",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => this.setState({ ...this, gender: "male" })}
              >
                <Text
                  style={{
                    color: this.state.gender === "male" ? "white" : "black",
                  }}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor:
                    this.state.gender === "female" ? "#2397D7" : "#F1F7FF",
                  width: "30%",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "5%",
                }}
                onPress={() => this.setState({ ...this, gender: "female" })}
              >
                <Text
                  style={{
                    color: this.state.gender === "female" ? "white" : "black",
                  }}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                marginHorizontal: 35,
                marginTop: 20,
                fontFamily: "gilroy-bold",
              }}
            >
              Codeforces
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
              placeholder="enter your handle"
              onChangeText={(CFHandle) => this.setState({ CFHandle })}
            />

            <Text
              style={{
                marginHorizontal: 35,
                marginTop: 20,
                fontFamily: "gilroy-bold",
              }}
            >
              Codechef
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
              placeholder="enter your handle"
              onChangeText={(CCHandle) => this.setState({ CCHandle })}
            />

            <Text
              style={{
                marginHorizontal: 35,
                marginTop: 20,
                fontFamily: "gilroy-bold",
              }}
            >
              Academic Year
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor:
                    this.state.year === "1" ? "#2397D7" : "#F1F7FF",
                  width: "15%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => this.setState({ ...this, year: "1" })}
              >
                <Text
                  style={{
                    color: this.state.year === "1" ? "white" : "black",
                  }}
                >
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor:
                    this.state.year === "2" ? "#2397D7" : "#F1F7FF",
                  width: "15%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "5%",
                }}
                onPress={() => this.setState({ ...this, year: "2" })}
              >
                <Text
                  style={{
                    color: this.state.year === "2" ? "white" : "black",
                  }}
                >
                  2
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor:
                    this.state.year === "3" ? "#2397D7" : "#F1F7FF",
                  width: "15%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "5%",
                }}
                onPress={() => this.setState({ ...this, year: "3" })}
              >
                <Text
                  style={{
                    color: this.state.year === "3" ? "white" : "black",
                  }}
                >
                  3
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor:
                    this.state.year === "4" ? "#2397D7" : "#F1F7FF",
                  width: "15%",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "5%",
                }}
                onPress={() => this.setState({ ...this, year: "4" })}
              >
                <Text
                  style={{
                    color: this.state.year === "4" ? "white" : "black",
                  }}
                >
                  4
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 35,
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.state.agree === 1
                    ? this.setState({ ...this, agree: 0 })
                    : this.setState({ ...this, agree: 1 })
                }
              >
                {this.state.agree == 1 ? (
                  <Feather name="check-square" size={16} color="green" />
                ) : (
                  <Feather name="square" size={16} color="black" />
                )}
              </TouchableOpacity>
              <Text style={{ marginLeft: 10 }}>
                I do agree to the terms and conditions
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#2397D7",
                marginHorizontal: 30,
                borderRadius: 12,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                elevation: 5,
              }}
              onPress={() =>
                this.state.agree == 1 &&
                this.state.password.length >= 8 &&
                this.state.password.length <= 14
                  ? this.onSignUp()
                  : this.state.agree === 0
                  ? Alert.alert("You must agree to our terms and conditions.")
                  : Alert.alert("Password should be 8-14 characters long.")
              }
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "gilroy-bold",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}></View>

          <View
            style={{
              flex: 2,
              marginHorizontal: 30,
              marginTop: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, fontFamily: "gilroy-regular" }}>
                Already have an account?
              </Text>
              <TouchableOpacity
                // style={{
                //   backgroundColor: "transparent",
                //   // marginHorizontal: 30,
                //   // width: 60,
                // }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text style={{ marginLeft: 5, fontFamily: "gilroy-bold" }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                marginTop: 5,
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.4,
              }}
            >
              <Text style={{ fontFamily: "gilroy-medium" }}>
                Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    );
  }
}
export default Register;

const styles = StyleSheet.create({
  nonBlurredContent: {
    borderRadius: 12,
  },
});
