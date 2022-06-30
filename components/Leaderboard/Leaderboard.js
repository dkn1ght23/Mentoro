import React, { Component, useState } from "react";
import { View, Text, Button, Image, FlatList, StatusBar } from "react-native";

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Ranklist from './Ranklist'


const LB_DATA = [
  {
    id: '4',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '5',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '6',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '7',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '8',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '9',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '10',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '11',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '12',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '13',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '14',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
  {
    id: '15',
    name: 'Abdullah Al Nayem',
    handle: 'whonayem01',
    image: require('../../assets/Person/nayem.jpg'),
    rating: '86.2'
  },
]

export default function CombinedLeaderboard() {
  const [currentTab, setCurrentTab] = useState(2);
  let counter = 0;

  const renderItem = ({ item }) => {
    if (counter > 2) {
      return (
        <TouchableOpacity  style={{borderRadius: 20, backgroundColor: 'transparent', marginHorizontal: 20, marginTop: 5, height: 60}}>
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'transparent', borderRadius: 15}} >
          <Text style={{alignSelf: 'center', flex: 0.5, fontFamily: 'redhatdisplay-bold', color: 'black'}} >{item.id}</Text>
          <Image style={{flex: 1, height: 50, width: 50, borderRadius: 100, borderWidth: 1, borderColor: 'orange'}} source={item.image} />
          <View style={{flex: 4, flexDirection: 'column', justifyContent: 'center'}} >
            <Text style={{marginLeft: 20, fontFamily: 'redhatdisplay-bold', color: 'black'}} >{item.name}</Text>
            <Text style={{marginLeft: 20, fontFamily: 'redhatdisplay-regular', color: 'grey'}} >@{item.handle}</Text>
          </View>
          <Text style={{alignSelf: 'center', flex: 1, fontFamily: 'redhatdisplay-bold', color: 'black'}} >{item.rating}</Text>
      </View>
     </TouchableOpacity>
      )
    }
    else {
      counter++;
    }
  }


  if (currentTab === 1) {
    return (
      <View style={{ marginTop: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: "gilroy-regular", fontSize: 18 }}>
            Leaderboard
          </Text>
        </View>
        <View
          style={{ marginTop: 10, marginHorizontal: 20, flexDirection: "row" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: currentTab == 1 ? "#EB996E" : "transparent",
              height: 30,
              width: 115,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => setCurrentTab(1)}
          >
            <Text style={{ color: "white" }}>Junior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: currentTab == 2 ? "#EB996E" : "transparent",
              height: 30,
              width: 115,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => setCurrentTab(2)}
          >
            <Text style={{ color: "grey" }}>Overall</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: currentTab == 3 ? "#EB996E" : "transparent",
              height: 30,
              width: 115,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => setCurrentTab(3)}
          >
            <Text style={{ color: "grey" }}>Senior</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (currentTab === 2) {
    return (

      <View style={{ backgroundColor: 'white' }}>

        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle='dark-content'
        />

        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={{ fontFamily: "redhatdisplay-bold", fontSize: 18, color: 'black'}}>
            Leaderboard
          </Text>
        </View>
        <View
          style={{ marginTop: 10, marginHorizontal: 20, flexDirection: "row" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: currentTab == 1 ? "lightblue" : "transparent",
              height: 30,
              width: 115,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => setCurrentTab(1)}
          >
            <Text style={{ color: "grey", fontFamily: 'redhatdisplay-bold' }}>Junior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: currentTab == 2 ? "skyblue" : "lightblue",
              height: 30,
              width: 115,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => setCurrentTab(2)}
          >
            <Text style={{ color: "white", fontFamily: 'redhatdisplay-bold'}}>Overall</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: currentTab == 3 ? "skyblue" : "transparent",
              height: 30,
              width: 115,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => setCurrentTab(3)}
          >
            <Text style={{ color: "grey", fontFamily: 'redhatdisplay-bold' }}>Senior</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", backgroundColor: "transparent", marginTop: 20 , justifyContent: 'space-evenly', marginHorizontal: 20 }}>
          
          <View style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent", marginTop: 20 }}>
            <Text style={{alignSelf: 'center', color: 'black', fontFamily: 'redhatdisplay-bold'}} >2nd</Text>
             <Image style={{ marginTop: 5, borderWidth: 3, borderColor: '#cd7f32', alignSelf: 'center', height: 100, width: 100, borderRadius: 50}} source={require("../../assets/Person/nayem.jpg")} />
            <Text style={{marginTop: 5, alignSelf: 'center', color: 'black', fontFamily: 'redhatdisplay-bold'}} >whonayem01</Text>
            <Text style={{alignSelf: 'center', color: 'grey', fontFamily: 'redhatdisplay-bold'}} >327 pts</Text>
          </View>
          <View style={{ flex: 1.25, flexDirection: "column", backgroundColor: "transparent" }}>
            <Text style={{alignSelf: 'center', color: 'black', fontFamily: 'redhatdisplay-bold'}} >1st</Text>
             <Image style={{ marginTop: 5, borderWidth: 3, borderColor: 'gold', alignSelf: 'center', height: 120, width: 120, borderRadius: 80}} source={require("../../assets/Person/nayem.jpg")} />
            <Text style={{ marginTop: 5, alignSelf: 'center', color: 'black', fontFamily: 'redhatdisplay-bold'}} >whonayem01</Text>
            <Text style={{alignSelf: 'center', color: 'grey', fontFamily: 'redhatdisplay-bold'}} >327 pts</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent", marginTop: 20}}>
            <Text style={{alignSelf: 'center', color: 'black', fontFamily: 'redhatdisplay-bold'}} >3rd</Text>
           <Image style={{ marginTop: 5, borderWidth: 3, borderColor: 'silver', alignSelf: 'center', height: 100, width: 100, borderRadius: 50}} source={require("../../assets/Person/nayem.jpg")} />
            <Text style={{ marginTop: 5,alignSelf: 'center', color: 'black', fontFamily: 'redhatdisplay-bold'}} >whonayem01</Text>
            <Text style={{alignSelf: 'center', color: 'grey', fontFamily: 'redhatdisplay-bold'}} >327 pts</Text>
          </View>
        </View>

        <View style={{marginTop: 20, marginHorizontal: 20, borderBottomWidth: 1, borderColor: 'grey'}} ></View>

        <FlatList
          data={LB_DATA}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

      <View style={{marginTop: 20}} ></View>

      </View>
    );
  } else {
    return (
      <View style={{ marginTop: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: "redhatdisplay-regular", fontSize: 18 }}>
            Leaderboard
          </Text>
        </View>
        <View
          style={{ marginTop: 10, marginHorizontal: 20, flexDirection: "row" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: currentTab == 1 ? "#EB996E" : "transparent",
              height: 30,
              width: 115,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => setCurrentTab(1)}
          >
            <Text style={{ color: "#B7B7B7" }}>Junior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: currentTab == 2 ? "#EB996E" : "transparent",
              height: 30,
              width: 115,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => setCurrentTab(2)}
          >
            <Text style={{ color: "#B7B7B7" }}>Overall</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: currentTab == 3 ? "#EB996E" : "transparent",
              height: 30,
              width: 115,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => setCurrentTab(3)}
          >
            <Text style={{ color: "white" }}>Senior</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
