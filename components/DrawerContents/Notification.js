import React, { Component } from "react";
import { View, Text } from "react-native";

class Notification extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
        <Text>NotificationScreen</Text>
      </View>
    );
  }
}

export default Notification;
