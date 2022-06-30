import React, { Component, useState } from "react";
import { View, Text, Button } from "react-native";

export default function CombinedLeaderboard({ props }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <Button title="Tab1" onPress={() => setCurrentTab(1)} />
        <Button title="Tab2" onPress={() => setCurrentTab(2)} />
        <Button title="Tab3" onPress={() => setCurrentTab(3)} />
      </View>
      <Text>Combined Leaderboard Screen</Text>
    </View>
  );
}
