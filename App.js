import React, { Component, useState } from "react";
import { View, Text } from "react-native";
import * as Font from "expo-font";

import firebase from "firebase";
import LottieView from "lottie-react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfWvQpx0Pzmeaqd_8wztfoUCrUdI5JvZ8",
  authDomain: "mentoro-dminions06-tle.firebaseapp.com",
  databaseURL: "https://mentoro-dminions06-tle-default-rtdb.firebaseio.com",
  projectId: "mentoro-dminions06-tle",
  storageBucket: "mentoro-dminions06-tle.appspot.com",
  messagingSenderId: "682970428924",
  appId: "1:682970428924:web:d37754c38039547494ee79",
  measurementId: "G-WC9NC7FDB3"
};

const Stack = createStackNavigator();

import LoaderScreen from "./statics/Loader";
import HomeDeckScreen from "./src/screens/Home.js";
import Onboarding from "./components/auth/Onboarding/Onboarding";
import SplashScreen from "./components/auth/Splash";
import LoginScreen from "./components/auth/Login/Login";
import ForgetPasswordScreen from "./components/auth/Login/ForgetPassword";
import ForgetPasswordVerificationScreen from "./components/auth/Login/ForgetPasswordVerification";
import SetNewPasswordScreen from "./components/auth/Login/SetNewPassword";
import RegisterScreen from "./components/auth/Register/Register";
import emailVarifyScreen from "./components/auth/Register/emailVarify";
import DrawerNavigatorScreen from "./components/Navigators/DrawerNavigator";
import FeedScreen from "./components/Navigators/FeedScreenStack";

import TopicScreen from './components/Articles/Topic'
import TopicContentScreen from './components/Articles/TopicContent'
import BadgesScreen from './components/DrawerContents/Badges'
import ContestScreen from './components/DrawerContents/ContestReminder/ContestReminder'

import CaroselScreen from "./statics/Carosel";

import PickImageScreen from "./components/Profile/PickImage";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

let customFonts = {
  "gilroy-light": require("./assets/fonts/Gilroy-Light.ttf"),
  "gilroy-regular": require("./assets/fonts/Gilroy-Regular.ttf"),
  "gilroy-medium": require("./assets/fonts/Gilroy-Medium.ttf"),
  "gilroy-bold": require("./assets/fonts/Gilroy-Bold.ttf"),
  "gilroy-heavy": require("./assets/fonts/Gilroy-Heavy.ttf"),

  akaya: require("./assets/fonts/AkayaTelivigala-Regular.ttf"),
  josefin: require("./assets/fonts/JosefinSans.ttf"),
  satisfy: require("./assets/fonts/Satisfy-Regular.ttf"),

  "roboto-thin": require("./assets/fonts/Roboto/Roboto-Thin.ttf"),
  "roboto-light": require("./assets/fonts/Roboto/Roboto-Light.ttf"),
  "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  "roboto-medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  "roboto-black": require("./assets/fonts/Roboto/Roboto-Black.ttf"),

  pm: require("./assets/fonts/PermanentMarker-Regular.ttf"),
  cooper: require("./assets/fonts/Cooper-Black-Regular.ttf"),
  erasbd: require("./assets/fonts/ErasBD.ttf"),
  eras: require("./assets/fonts/ErasBoldITC.ttf"),
  gillsans: require("./assets/fonts/GillSansUltraBold.ttf"),

  "mont-thin": require("./assets/fonts/Montserrat/Montserrat-Thin.ttf"),
  "mont-extralight": require("./assets/fonts/Montserrat/Montserrat-ExtraLight.ttf"),
  "mont-light": require("./assets/fonts/Montserrat/Montserrat-Light.ttf"),
  "mont-regular": require("./assets/fonts/Montserrat/Montserrat-Regular.ttf"),
  "mont-medium": require("./assets/fonts/Montserrat/Montserrat-Regular.ttf"),
  "mont-semibold": require("./assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
  "mont-bold": require("./assets/fonts/Montserrat/Montserrat-Bold.ttf"),
  "mont-extrabold": require("./assets/fonts/Montserrat/Montserrat-ExtraBold.ttf"),
  "mont-black": require("./assets/fonts/Montserrat/Montserrat-Black.ttf"),

  "poppins-thin": require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
  "poppins-extralight": require("./assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
  "poppins-light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
  "poppins-regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
  "poppins-medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
  "poppins-semibold": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  "poppins-bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  "poppins-extrabold": require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
  "poppins-black": require("./assets/fonts/Poppins/Poppins-Black.ttf"),

  "bernhardt-regular": require("./assets/fonts/BernHardt/Bernhardt-Medium.otf"),
  "bernhardt-bold": require("./assets/fonts/BernHardt/Bernhardt-Bold.otf"),

  "redhatdisplay-regular": require("./assets/fonts/RedHatDisplay/RedHatDisplay-Regular.ttf"),
  "redhatdisplay-medium": require("./assets/fonts/RedHatDisplay/RedHatDisplay-Medium.ttf"),
  "redhatdisplay-bold": require("./assets/fonts/RedHatDisplay/RedHatDisplay-Bold.ttf"),
  "redhatdisplay-black": require("./assets/fonts/RedHatDisplay/RedHatDisplay-Black.ttf"),
};

export default class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      fontsLoaded: false,
      userfind: null,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._isMounted = true;

    firebase.auth().onAuthStateChanged((user) => {
      this._loadFontsAsync();
      if (this._isMounted) {
        if (!user) {
          this.setState({
            loggedIn: false,
            loaded: true,
          });
        } else {
          this.setState({
            loggedIn: true,
            userfind: user,
            loaded: true,
          });
        }
      }
      console.log(this.state.loggedIn);

    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { loggedIn, loaded, fontsLoaded, userfind } = this.state;
    if (!loaded || !fontsLoaded) {
      return (
        // <LoaderScreen />
        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
          <Text>Loading....</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PickImage"
              component={PickImageScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigatorScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Carosel"
              component={CaroselScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else if (loggedIn) {
      if (userfind.emailVerified) {
        return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="DrawerNavigator">
              <Stack.Screen
                name="Badges"
                component={BadgesScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgetPassword"
                component={ForgetPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgetPasswordVerification"
                component={ForgetPasswordVerificationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SetNewPassword"
                component={SetNewPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DrawerNavigator"
                component={DrawerNavigatorScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Feed"
                component={FeedScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Carosel"
                component={CaroselScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Topic"
                component={TopicScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TopicContent"
                component={TopicContentScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PickImage"
                component={PickImageScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Contest"
                component={ContestScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        );
      }
      else {
        return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="emailVarify">
              <Stack.Screen
                name="emailVarify"
                component={emailVarifyScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        );
      }
    }
  }
}