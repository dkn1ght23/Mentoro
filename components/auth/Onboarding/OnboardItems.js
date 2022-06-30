import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";

export default OnboardItems = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontFamily: 'bernhardt-bold',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center'
  },
  description: {
    fontFamily: 'mont-bold',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64
  }
});
