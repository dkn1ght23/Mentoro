import React, { Component } from "react";
import { View, Text, Image, StatusBar, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class Splash extends Component {
  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              height: 40,
              width: 40,
            }}
            source={require("../../assets/logo-wb.png")}
          />
          <Text style={{ fontSize: 28, fontFamily: 'mont-bold' }}>Mentoro</Text>
        </View>
        <Image
          resizeMode="contain"
          style={{
            height: 250,
            marginTop: "25%",
            marginBottom: "10%",
            alignSelf: "center",
          }}
          source={require("../../assets/auth/brain.jpg")}
        />
        <View style={{ marginHorizontal: 30 }}>
          <Text style={{ fontSize: 39, fontFamily: "gilroy-bold" }}>
            Learn New
          </Text>
          <Text style={{ fontSize: 39, fontFamily: "gilroy-bold" }}>
            Ways of Thinking.
          </Text>
        </View>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: "#2397D7",
                height: 60,
                width: (windowWidth * 45) / 100,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => this.props.navigation.navigate('Register')}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "gilroy-medium",
                  color: "white",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 12,
                backgroundColor: "#F1F7FF",
                height: 60,
                width: (windowWidth * 45) / 100,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: -15,
              }}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "gilroy-medium",
                  color: "black",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 10 }} />
      </View>
    );
  }
}

export default Splash;
