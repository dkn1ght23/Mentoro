import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

import HomeStackScreen from "./HomeScreenStack";
import FeedStackScreen from "../Navigators/FeedScreenStack";
import LeaderboardScreen from "../Leaderboard/Ranklist";
import ProfileStackScreen from "./ProfileScreenStack";

export default TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#41444B",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedStackScreen}
        options={{
          tabBarLabel: "Feed",
          tabBarColor: "#41444B",
          tabBarIcon: ({ color }) => (
            <Icon name="rss-box" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: "Leaderboard",
          tabBarColor: "#41444B",
          tabBarIcon: ({ color }) => (
            <Icon name="trophy" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#41444B",
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
