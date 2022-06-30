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
import firebase from "firebase";
import Constants from "expo-constants";
import Svg, { G, Circle, Rect } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Donut from "./Donut";

const data = [
  {
    percentage: 85,
    color: "skyblue",
    max: 100,
  },
];

let Heart = [];
let Handle, Rating;

class Profile extends Component  {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [CFHandle, setCFHandle] = useState("");
  const [CCHandle, setCCHandle] = useState("");

  const [userData, setUserData] = useState([]);

  const onSignOut = () => {
    firebase.auth().signOut();
  };

  const user = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data().name);
          setUsername(snapshot.data().username);
          setEmail(snapshot.data().email);
          setCFHandle(snapshot.data().CFHandle);
          setCCHandle(snapshot.data().CCHandle);
        } else console.log("Not Exist");
      });
  };

  async fetchAPI = () => {
    let link = "http://codeforces.com/api/user.info?handles={handle}";
    link = link.replace("{handle}", CFHandle);
    await fetch(link)
      .then((res) => res.json())
      .then((res) => res.result)
      .then((res) => setUserData(res));
    Handle = userData[0].handle;
    Rating = userData[0].rating;
    console.log(userData);
  };

  useEffect(() => {
    user();
    fetchAPI();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name="chevron-back-outline" size={24} color="#52575D" />
          <Ionicons name="create-outline" size={24} color="#52575D" />
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              style={styles.image}
              source={require("../../assets/Person/nayem.jpg")}
              resizeMode="cover"
            />
          </View>
          <View style={styles.dm}>
            <MaterialIcons name="chat" size={18} color="#DFD8C8" />
          </View>
          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 0, marginLeft: 4 }}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            {Handle}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            {Rating}
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

          {data.map((p, i) => {
            return (
              <Donut
                key={i}
                percentage={p.percentage}
                color={p.color}
                delay={500 + 100 * i}
                max={p.max}
              />
            );
          })}

          {/* {LB_DATA.foreach((val, index) => {
            if (index > 2) 
            console.log(index);
        })} */}

          <View
            style={[styles.OJContainer, { marginTop: 0, marginHorizontal: 20 }]}
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
              <Text style={[styles.text, { fontWeight: "200" }]}>Codechef</Text>
            </View>
          </View>
        </View>
        <Button title="Sign Out" onPress={() => onSignOut()} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "gilroy-regular",
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
    marginTop: 10,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
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
    left: 10,
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
