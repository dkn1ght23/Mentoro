import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert, StatusBar } from "react-native";
import firebase from "firebase";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      verifyPassword: "",
      username: "",
      CFHandle: "",
      CCHandle: "",
    };
    this.onUpdate = this.onUpdate.bind(this);
  }

  async componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          this.setState({
            name: snapshot.data().name,
            username: snapshot.data().username,
            CFHandle: snapshot.data().CFHandle,
            CCHandle: snapshot.data().CCHandle,
            firebaseData: true,
          });
        }
      });
  }

  onUpdate() {
    const { name, CFHandle, CCHandle, username } = this.state;
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        name,
        username,
        CFHandle,
        CCHandle,
      });
    
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{ flexDirection: 'row', width: 360, marginHorizontal: 20, backgroundColor: "white",}}>
           <Ionicons name="chevron-back" size={24} style={{alignSelf: 'flex-start'}} onPress={() => this.props.navigation.goBack()} />
           <Text style={{alignSelf: 'center', fontFamily: "gilroy-bold", fontSize: 18, marginLeft: 110, marginBottom: 20}}>Edit Profile</Text>
        </View>

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
          value={this.state.name}
          onChangeText={(name) => this.setState({ name })}
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

        {(this.state.password.length !== 0 && this.state.password.length < 8) ||
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

        {this.state.password.length >= 8 && this.state.password.length <= 14 ? (
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
          Verify Password
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
          onChangeText={(verifyPassword) => this.setState({ verifyPassword })}
        />

        {this.state.password.length > 0 &&
        this.state.password === this.state.verifyPassword ? (
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 45,
              marginTop: 10,
            }}
          >
            <Feather name="check-circle" size={16} color="green" />
            <Text style={{ marginLeft: 10, color: "green" }}>
              Password matched!
            </Text>
          </View>
        ) : null}

        {this.state.verifyPassword.length > 0 &&
        this.state.password !== this.state.verifyPassword ? (
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 45,
              marginTop: 10,
            }}
          >
            <Feather name="x-octagon" size={16} color="red" />
            <Text style={{ marginLeft: 10, color: "red" }}>
              Password doesn't match!
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
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        />

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
          value={this.state.CFHandle}
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
          value={this.state.CCHandle}
          onChangeText={(CCHandle) => this.setState({ CCHandle })}
        />

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
            this.state.password.length >= 8 &&
            this.state.password.length <= 14 &&
            this.state.password === this.state.verifyPassword
              ? (this.onUpdate(), this.props.navigation.goBack())
              : this.state.password !== this.state.verifyPassword
              ? Alert.alert("Password doesn't Matched!")
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
            Update
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
