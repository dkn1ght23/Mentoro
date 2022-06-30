import React, { Component, Profiler, useState, useEffect } from "react";
import {
  Image,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
} from "react-native";
import Constants from "expo-constants";
import Svg, { G, Circle, Rect } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import Donut from "./Donut";
import EditProfileScreen from "./EditProfile";
import LoaderScreen from "../../Loader";

const data = [
  {
    percentage: 85,
    color: "skyblue",
    max: 100,
  },
];

import firebase from "firebase";
// import LottieView from "lottie-react-native";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Abdullah Al Nayem",
      username: "whonayem01",
      email: null,
      CFHandle: null,
      CCHandle: null,
      firebaseData: true,
       profilePicture: "https://www.shutterstock.com/image-vector/vector-man-profile-icon-380655355",
      userData: [],
    };
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
            email: snapshot.data().email,
            CFHandle: snapshot.data().CFHandle,
            CCHandle: snapshot.data().CCHandle,
            firebaseData: true,
            // profilePicture: snapshot.data().downloadURL,
          });
        }
      });
      firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          this.setState({
            firebaseData: true,
            profilePicture: snapshot.data().downloadURL,
          });
        }
      });
  }

  render() {
    const {
      name,
      username,
      email,
      CFHandle,
      CCHandle,
      firebaseData,
      userData,
    } = this.state;

    onLogout = () => {
      console.log("Logged out!");
      firebase.auth().signOut();
      this.props.navigation.navigate("Splash");
    };

    if (!firebaseData) {
      return (
        // <LoaderScreen />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading....</Text>
        </View>
        // <LottieView source={require('../../loader1.json')} autoPlay loop />
      );
    }

    // return(
    //   <View>
    //     <Text>Nayem</Text>
    //   </View>
    // )

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={24} color="#52575D" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("EditProfile")}
            >
              <Feather name="edit" size={24} color="#52575D" />
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                style={styles.image}
                //source={require("../../assets/Person/nayem.jpg")}
                 source={{ uri: this.state.profilePicture }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.dm}>
              <MaterialIcons name="chat" size={18} color="#DFD8C8" />
            </View>
            <View style={styles.active}></View>
            <View style={styles.add}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("PickImage")}
              >
                <Ionicons
                  name="ios-add"
                  size={48}
                  color="#DFD8C8"
                  style={{ marginTop: 0, marginLeft: 4 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {name}
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              {email}
            </Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>14</Text>
              <Text style={[styles.ext, styles.subText]}>last 7 days </Text>
            </View>

            <View
              style={[
                styles.statsBox,
                {
                  borderColor: "#DFD8C8",
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text style={[styles.text, { fontSize: 24 }]}>67</Text>
              <Text style={[styles.ext, styles.subText]}>last 30 days</Text>
            </View>

            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>1258</Text>
              <Text style={[styles.ext, styles.subText]}>total</Text>
            </View>
          </View>
          <View style={styles.pointsBox}>
            <View style={{ flex: 1, marginTop: 15 }}>
              <Text style={[styles.text, { fontSize: 24 }]}>Your Points</Text>
              <Text style={[styles.ext, styles.subText]}>
                +20 since last week
              </Text>
            </View>

            {/* {data.map((p, i) => {
              return ( */}
            <Donut
              key={1}
              percentage={85}
              color={"skyblue"}
              delay={500 + 100 * 1}
              max={100}
            />
            {/* );
            })} */}

            <View
              style={[
                styles.OJContainer,
                { marginTop: 0, marginHorizontal: 20 },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="ellipse" color="skyblue" />
                <Text style={[styles.text, { fontWeight: "200" }]}>
                  Codeforces
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="ellipse" color="darkmagenta" />
                <Text style={[styles.text, { fontWeight: "200" }]}>
                  Codechef
                </Text>
              </View>
            </View>
          </View>
          <Button title="Sign Out" onPress={() => onLogout()} />
             
        </ScrollView>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "redhatdisplay-bold",
    color: "#52575D",
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 10,
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FF89",
    position: "absolute",
    bottom: 28,
    left: 5,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 100,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 25,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  pointsBox: {
    margin: 30,
    backgroundColor: "white",
    height: 270,
    borderRadius: 40,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsBoxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  OJContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  donutText: {
    fontWeight: "900",
    textAlign: "center",
  },
});
