import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  FlatList,
  Button,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Title } from "react-native-paper";

import Deck from "../Deck";
import Cards from "../Cards";
import Buttons from "../Buttons";

const DATA = [
  {
    id: "1",
    title1: "Warm-Up",
    image1: require("../../assets/icon/warm-up.png"),
    title2: "Geometry",
    image2: require("../../assets/icon/geometry.png"),
  },
  {
    id: "2",
    title1: "Fast And Fourier",
    image1: require("../../assets/icon/fft.png"),
    title2: "Data Structure",
    image2: require("../../assets/icon/data-structure.png"),
  },
  {
    id: "3",
    title1: "Matrix",
    image1: require("../../assets/icon/matrix.png"),
    title2: "Recursion",
    image2: require("../../assets/icon/recursion.png"),
  },
  {
    id: "4",
    title1: "Game Theory",
    image1: require("../../assets/icon/game-theory.png"),
    title2: "Mathematics",
    image2: require("../../assets/icon/math1.png"),
  },
  {
    id: "5",
    title1: "Searching",
    image1: require("../../assets/icon/search.png"),
    title2: "Math",
    image2: require("../../assets/icon/math.png"),
  },
];

const DATAContests = [
  {
    id: 1,
    title: "CODEFORCES",
    number: "1 838 456",
  },
  {
    id: 2,
    title: "CODECHEF",
    number: "1 29 863",
  },
  {
    id: 3,
    title: "LightOJ",
    number: "838 456",
  },
];

const Item = ({ item }) => (
  <View style={{ flexDirection: "row", marginTop: 20 }}>
    <TouchableOpacity style={{ height: 200, width: 150 }}>
      <Image source={item.image1} />
    </TouchableOpacity>
    <TouchableOpacity style={{ height: 200, width: 150, marginLeft: 20 }}>
      <Image style={{}} source={item.image2} />
    </TouchableOpacity>
  </View>
);

const renderCard = ({ item }) => {
  return (
    <View key={item.id} style={styles.cardContainer}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Icon
            name="ios-remove"
            size={40}
            color="red"
            style={{ marginTop: 25 }}
          />
          <Text style={styles.number}>{item.number}</Text>
        </View>
        <View style={{ marginLeft: 150 }}>
          <Icon name="md-options" size={24} color="#FFF" />
          <Text style={styles.textCovid}>Codeforces</Text>
        </View>
      </View>
    </View>
  );
};

const renderNoMoreCards = () => {
  return (
    <View title="All Domne!">
      <Text style={styles.noCard}>NO MORE CARDS HERE</Text>
      <Button backgroundColor="#03A9F4" title="Get more!" />
    </View>
  );
};

const Home = ({ navigation }) => {
  const { widthD } = useWindowDimensions();

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView>
        <View
          style={{
            marginTOp: 10,
            flexDirection: "row",
            marginHorizontal: 20,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.openDrawer()}
            >
              <Icon name="menu" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={
              {
                // justifyContent: 'flex-end',
                // backgroundColor: 'blue'
              }
            }
          >
            <TouchableOpacity
              style={{
                flex: 1,
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Notification")}
            >
              <Icon name="bell" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10, marginHorizontal: 25 }}>
          <Text style={{ fontFamily: "Montserrat_600SemiBold", fontSize: 30 }}>
            Hello there!
          </Text>
          <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 15 }}>
            What would you like to learn today?
          </Text>

          <Deck
            data={DATAContests}
            renderCard={renderCard}
            renderNoMoreCards={renderNoMoreCards}
          />

          <View
            style={{
              flex: 1,
              marginTop: 20,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 5 }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  flex: 5,
                  borderRadius: 12,
                  justifyContent: "center",
                  backgroundColor: "#FFFBF8",
                  paddingHorizontal: 20,
                }}
                onPress={() => navigation.navigate("Search")}
              >
                <Text style={{ fontFamily: "Montserrat_300Light" }}>
                  Search...
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: "aliceblue",
                  borderRadius: 12,
                  justifyContent: "center",
                  backgroundColor: "#F6633A",
                  elevation: 50,
                }}
                onPress={() => navigation.navigate("Search")}
              >
                <View style={{ marginLeft: 15 }}>
                  <Ionicons name="search-outline" size={23} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginTop: 15,
                marginBottom: 20,
                fontSize: 18,
                fontFamily: "gilroy-bold",
              }}
            >
              Categories
            </Text>

            <View
              style={{
                width: 5,
                height: 5,
                marginTop: 15,
                borderRadius: 5,
                marginHorizontal: 5,
                backgroundColor: "#4f4a4a",
              }}
            ></View>
            <Text
              style={{
                marginTop: 15,
                fontFamily: "poppins-bold",
                fontSize: 9,
                color: "#4f4a4a",
              }}
            >
              Good Quality items
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  elevation: 50,
                  height: 200,
                  width: 150,
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
                onPress={() => console.log("Warm-Up")}
              >
                <Image
                  style={{
                    height: 100,
                    width: 75,
                    borderRadius: 15,
                    resizeMode: "contain",
                    position: "absolute",
                    marginLeft: 35,
                    marginTop: 35,
                  }}
                  source={DATA[0].image1}
                />
                <Text
                  style={{
                    position: "absolute",
                    fontFamily: "gilroy-regular",
                    fontSize: 15,
                    marginLeft: 20,
                    marginTop: 150,
                  }}
                >
                  {DATA[0].title1}
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    fontFamily: "Montserrat_300Light",
                    fontSize: 12,
                    marginLeft: 20,
                    marginTop: 170,
                  }}
                >
                  23 Articles
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                elevation: 50,
                height: 200,
                width: 150,
                marginTop: 20,
                borderRadius: 15,
                marginLeft: 15,
                backgroundColor: "white",
              }}
              onPress={() => console.log("Geometry")}
            >
              <Image
                style={{
                  height: 100,
                  width: 75,
                  borderRadius: 15,
                  resizeMode: "contain",
                  marginLeft: 35,
                  marginTop: 35,
                }}
                source={DATA[0].image2}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 150,
                }}
              >
                {DATA[0].title2}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                  marginLeft: 20,
                  marginTop: 170,
                }}
              >
                23 Articles
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                elevation: 50,
                marginTop: -5,
                height: 200,
                width: 150,
                borderRadius: 15,
                backgroundColor: "white",
              }}
              onPress={() => console.log("Fast And Fourier")}
            >
              <Image
                style={{
                  height: 100,
                  width: 75,
                  borderRadius: 15,
                  resizeMode: "contain",
                  marginLeft: 35,
                  marginTop: 35,
                }}
                source={DATA[1].image1}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 15,
                  marginLeft: 10,
                  marginTop: 150,
                }}
              >
                {DATA[1].title1}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                  marginLeft: 10,
                  marginTop: 170,
                }}
              >
                23 Articles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                elevation: 50,
                height: 200,
                width: 150,
                marginTop: 20,
                borderRadius: 15,
                marginLeft: 15,
                backgroundColor: "white",
              }}
              onPress={() => console.log("Data Structure")}
            >
              <Image
                style={{
                  height: 100,
                  width: 75,
                  borderRadius: 15,
                  resizeMode: "contain",
                  marginLeft: 35,
                  marginTop: 35,
                }}
                source={DATA[1].image2}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 15,
                  marginLeft: 15,
                  marginTop: 150,
                }}
              >
                {DATA[1].title2}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                  marginLeft: 15,
                  marginTop: 170,
                }}
              >
                23 Articles
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                elevation: 50,
                marginTop: -10,
                height: 200,
                width: 150,
                borderRadius: 15,
                backgroundColor: "white",
              }}
              onPress={() => console.log("Matrix")}
            >
              <Image
                style={{
                  height: 100,
                  width: 75,
                  borderRadius: 15,
                  resizeMode: "contain",
                  marginLeft: 35,
                  marginTop: 35,
                }}
                source={DATA[2].image1}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 14,
                  marginLeft: 20,
                  marginTop: 150,
                }}
              >
                {DATA[2].title1}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                  marginLeft: 20,
                  marginTop: 170,
                }}
              >
                23 Articles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                elevation: 50,
                height: 200,
                width: 150,
                marginTop: 20,
                borderRadius: 15,
                marginLeft: 15,
                backgroundColor: "white",
              }}
              onPress={() => console.log("Recursion")}
            >
              <Image
                style={{
                  height: 100,
                  width: 75,
                  borderRadius: 15,
                  resizeMode: "contain",
                  marginLeft: 35,
                  marginTop: 35,
                }}
                source={DATA[2].image2}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 150,
                }}
              >
                {DATA[2].title2}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                  marginLeft: 20,
                  marginTop: 170,
                }}
              >
                23 Articles
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                elevation: 50,
                marginTop: -10,
                height: 200,
                width: 150,
                borderRadius: 15,
                backgroundColor: "white",
              }}
              onPress={() => console.log("Game Theory")}
            >
              <Image
                style={{
                  height: 100,
                  width: 75,
                  borderRadius: 15,
                  resizeMode: "contain",
                  marginLeft: 35,
                  marginTop: 35,
                }}
                source={DATA[3].image1}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 14,
                  marginLeft: 20,
                  marginTop: 150,
                }}
              >
                {DATA[3].title1}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                  marginLeft: 20,
                  marginTop: 170,
                }}
              >
                23 Articles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                elevation: 50,
                height: 200,
                width: 150,
                marginTop: 20,
                borderRadius: 15,
                marginLeft: 15,
                backgroundColor: "white",
              }}
              onPress={() => console.log("Mathematics")}
            >
              <Image
                style={{
                  height: 100,
                  width: 75,
                  borderRadius: 15,
                  resizeMode: "contain",
                  marginLeft: 35,
                  marginTop: 35,
                }}
                source={DATA[3].image2}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 150,
                }}
              >
                {DATA[3].title2}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                  marginLeft: 20,
                  marginTop: 170,
                }}
              >
                23 Articles
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                elevation: 50,
                marginTop: -10,
                height: 200,
                width: 150,
                borderRadius: 15,
                backgroundColor: "white",
              }}
              onPress={() => console.log("Searching")}
            >
              <Image
                style={{
                  height: 100,
                  width: 75,
                  borderRadius: 15,
                  resizeMode: "contain",
                  marginLeft: 35,
                  marginTop: 35,
                }}
                source={DATA[4].image1}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 14,
                  marginLeft: 20,
                  marginTop: 150,
                }}
              >
                {DATA[4].title1}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                  marginLeft: 20,
                  marginTop: 170,
                }}
              >
                23 Articles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                elevation: 50,
                height: 200,
                width: 150,
                marginTop: 20,
                borderRadius: 15,
                marginLeft: 15,
                backgroundColor: "white",
                marginBottom: 20,
              }}
              onPress={() => console.log("Math")}
            >
              <Image
                style={{
                  height: 100,
                  width: 75,
                  borderRadius: 15,
                  resizeMode: "contain",
                  marginLeft: 35,
                  marginTop: 35,
                }}
                source={DATA[4].image2}
              />
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 150,
                }}
              >
                {DATA[4].title2}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                  marginLeft: 20,
                  marginTop: 170,
                }}
              >
                23 Articles
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 42,
  },
});
