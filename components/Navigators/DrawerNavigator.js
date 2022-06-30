import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import TabNavigatorScreen from "./TabNavigator";
import ProfileStackScreen from "./ProfileScreenStack";
import FavoritesScreenStack from "./FavoritesScreenStack";
import BadgesScreen from "../DrawerContents/Badges";
import FeedScreenStack from "./FeedScreenStack";
import ContestReminderScreen from "../DrawerContents/ContestReminder/ContestReminder";
import NotificationScreen from "../DrawerContents/Notification";
import AboutUsScreen from "../DrawerContents/AboutUs";
import ClassmatesScreen from "../DrawerContents/ClassMates";

import DrawerContentScreen from "./DrawerContent";

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentScreen {...props} />}
    >
      <Drawer.Screen name="Home" component={TabNavigatorScreen} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen
        name="ContestReminder"
        component={ContestReminderScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Favorites" component={FavoritesScreenStack} />
      <Drawer.Screen
        name="Badges"
        component={BadgesScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Feed"
        component={FeedScreenStack}
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
      <Drawer.Screen
        name="Classmates"
        component={ClassmatesScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
