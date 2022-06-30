import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const ProfileStack = createStackNavigator();

import ProfileScreen from "../Profile/Profile";
import EditProfileScreen from "../Profile/EditProfile";
import PickImageScreen from "../Profile/PickImage";

export default ProfileScreenStack = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="PickImage"
        component={PickImageScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};
