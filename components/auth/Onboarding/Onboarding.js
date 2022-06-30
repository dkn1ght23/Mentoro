import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import slides from "../../../statics/slides";
import NextButton from "./NextButton";
import OnboardItems from "./OnboardItems";
import Paginator from "./Paginator";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default Onboarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("Splash");
    }
  };

  
  return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: 'white' }}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 30,
          // backgroundColor: "orange",
          justifyContent: "flex-start",
        }}
      >
        <Paginator data={slides} scrollX={scrollX} />
        {/* <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides.length)}
        /> */}
        {
          currentIndex < slides.length - 1 ? (
            <TouchableOpacity
            onPress={scrollTo}
            style={styles.button}
          >
            <Icon name="arrow-right" size={32} color="#fff" />
          </TouchableOpacity>
          ) : (
            <TouchableOpacity
          onPress={scrollTo}
          style={styles.getbutton}
        >
          <Text style={{color: 'white', fontFamily: 'gilroy-bold', fontSize: 15}} >Get Started</Text>
        </TouchableOpacity>
          )
        }
      </View>
      <View style={{height: 10}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: 'absolute',
    backgroundColor: "black",
    borderRadius: 100,
    height: 60,
    width: 60,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: ((windowWidth - 40) * 80 / 100)
  },
  getbutton: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "black",
    borderRadius: 100,
    height: 60,
    width: (windowWidth * 40 / 100),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: ((windowWidth - 40) * 50 / 100)
  },
});
