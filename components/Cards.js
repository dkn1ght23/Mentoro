import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Icon2 from "@expo/vector-icons/MaterialCommunityIcons";
import Icon from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const category_data = [
  {
    id: "1",
    title1: "Warm-Up",
    image1: require("../assets/icon/warm-up.png"),
    title2: "Geometry",
    image2: require("../assets/icon/geometry.png"),
  },
  {
    id: "2",
    title1: "Geometry",
    image1: require("../assets/icon/geometry.png"),
    title2: "Data Structure",
    image2: require("../assets/icon/data-structure.png"),
  },
  {
    id: "3",
    title1: "Matrix",
    image1: require("../assets/icon/matrix.png"),
    title2: "Recursion",
    image2: require("../assets/icon/recursion.png"),
  },
  {
    id: "4",
    title1: "Game Theory",
    image1: require("../assets/icon/game-theory.png"),
    title2: "Mathematics",
    image2: require("../assets/icon/math1.png"),
  },
  {
    id: "5",
    title1: "Searching",
    image1: require("../assets/icon/search.png"),
    title2: "Math",
    image2: require("../assets/icon/math.png"),
  },
  {
    id: "6",
    title1: "Recursion",
    image1: require("../assets/icon/recursion.png"),
    title2: "Math",
    image2: require("../assets/icon/math.png"),
  },
];

export default class Cards extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          height: 200,
          width: 150,
          borderRadius: 30,
          marginLeft: 15,
          // elevation: 100,
        }}
        onPress={this.props.onPress}
      >
        <Image
          style={{
            height: 100,
            width: 75,
            borderRadius: 15,
            resizeMode: "center",
            marginLeft: 35,
            marginTop: 35,
          }}
          source={category_data[this.props.idx].image1}
        />
        <Text
          style={{
            position: "absolute",
            fontFamily: "poppins-bold",
            fontSize: 15,
            marginLeft: 20,
            marginTop: 150,
          }}
        >
          {category_data[this.props.idx].title1}
        </Text>
        <Text
          style={{
            position: "absolute",
            fontFamily: "poppins-light",
            fontSize: 12,
            marginLeft: 20,
            marginTop: 170,
          }}
        >
          23 Articles
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 130,
    borderRadius: 30,
    padding: 15,
    marginLeft: 20,
  },
  col: {
    flexDirection: "row",
  },
  title: {
    marginTop: 90,
    color: "#b8b8aa",
    fontWeight: "bold",
    fontSize: 12,
  },
  number: {
    fontWeight: "bold",
    fontSize: 22,
  },
});
