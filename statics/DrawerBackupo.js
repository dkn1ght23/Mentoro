import React from "react";
import { Text, View } from 'react-native'

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

import TabNavigatorScreen from './TabNavigator'
import FavoritesScreenStack from "./FavoritesScreenStack";
import BadgesScreen from "../DrawerContents/Badges";
import FeedScreenStack from "./FeedScreenStack";
import UpcommingContestsScreenStack from "./UpcommingContestScreenStack";
import NotificationScreen from "../DrawerContents/Notification";
import AboutUsScreen from "../DrawerContents/AboutUs";
import { Ionicons } from "@expo/vector-icons";

export default DrawerNavigator = () => {
  return (
      <Drawer.Navigator>
        
        <Drawer.Screen
          name="Home"
          component={TabNavigatorScreen}
          options={{ 
            drawerIcon: () => {
              <Ionicons name='home' />
            }
           }}
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoritesScreenStack}
          options={{ 
            drawerIcon: () => {
              <Ionicons name='home' />
            }
           }}
        />
        <Drawer.Screen
          name="Badges"
          component={BadgesScreen}
          options={{ 
            drawerIcon: () => {
              <Ionicons name='home' style={{fontSize: 30, color: 'blue'}} />
            }
           }}
        />
        <Drawer.Screen
          name="Feed"
          component={FeedScreenStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="UpcommingContests"
          component={UpcommingContestsScreenStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
  );
};
