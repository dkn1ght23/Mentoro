import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const FeedStack = createStackNavigator();

import FeedScreen from "../DrawerContents/Feed";
import FeedPostScreen from "../DrawerContents/FeedPost";

export default FeedScreenStack = () => {
  return (
    <FeedStack.Navigator initialRouteName="Feed">
      <FeedStack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <FeedStack.Screen
        name="FeedPost"
        component={FeedPostScreen}
        options={{ headerShown: false }}
      />
    </FeedStack.Navigator>
  );
};
