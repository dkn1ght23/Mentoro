import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const HomeStack = createStackNavigator();

import HomeScreen from "../DrawerContents/Home";
import TopicScreen from '../Articles/Topic';
import TopicContentScreen from '../Articles/TopicContent'
import SearchScreen from '../Search';
import StalkProfileScreen from '../Profile/StalkProfile'
import MessagesScreen from '..//Messages/MessagesScreen'
import ChatScreen from '..//Messages/ChatScreen'

export default HomeScreenStack = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Topic"
        component={TopicScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="TopicContent"
        component={TopicContentScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="StalkProfile"
        component={StalkProfileScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
