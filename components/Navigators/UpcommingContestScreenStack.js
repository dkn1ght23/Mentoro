import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const UpcommingContestStack = createStackNavigator();

import UpcommingContestScreen from "../DrawerContents/UpcommingContests";
import UpcommingContestPreviewScreen from "../DrawerContents/UpcommingContestPreview";

export default UpcommingContestScreenStack = () => {
  return (
    <UpcommingContestStack.Navigator initialRouteName="UpcommingContest">
      <UpcommingContestStack.Screen
        name="UpcommingContest"
        component={UpcommingContestScreen}
        options={{ headerShown: false }}
      />
      <UpcommingContestStack.Screen
        name="UpcommingContestPreview"
        component={UpcommingContestPreviewScreen}
        options={{ headerShown: false }}
      />
    </UpcommingContestStack.Navigator>
  );
};
