import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const FavoritesStack = createStackNavigator();

import FavoriteScreen from '../DrawerContents/Favorites'
import StackProfileScreen from '../Profile/StalkProfile'

export default FavoriteScreenStack = () => {
  return (
    <FavoritesStack.Navigator initialRouteName="Favorites">
      <FavoritesStack.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{ headerShown: false }}
      />
      <FavoritesStack.Screen
        name="StackProfile"
        component={StackProfileScreen}
        options={{ headerShown: false }}
      />
    </FavoritesStack.Navigator>
  );
};
