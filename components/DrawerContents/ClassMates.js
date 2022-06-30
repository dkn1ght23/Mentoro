import React from 'react'
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";

import { Ionicons } from 'react-native-vector-icons'

let ClassMatesData = [
    {
      id: "1",
      title: "Abdullah Al Nayem",
      icon: require('../../assets/Person/nayem.jpg'),
    },
    {
      id: "2",
      title: "Md Jahirul Islam Hridoy",
      icon: require("../../assets/Person/hridoy.jpg"),
    },
    {
      id: "3",
      title: "Abir Sadat Wasim",
      icon: require("../../assets/Person/wasim.jpg"),
    },
    {
      id: "4",
      title: "Mujammal Ahmed",
      icon: require("../../assets/Person/mujammal.jpg"),
    },
  ];

export default function ClassMates({navigation}) {
    const renderMates = (post) => {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} >
            <Image source={post.icon} style={{ height: 100, width: 100, borderRadius: 100, marginTop: 10 }} />
            <Text style={{ fontFamily: 'gilroy-bold', fontSize: 15 }} >{post.title}</Text>
          </View>
        );
      };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
        <StatusBar animated={true} backgroundColor="transparent" barStyle="dark-content" />
        <View style={{ flexDirection: 'row', width: 360, marginHorizontal: 20 }}>
          <Ionicons name="chevron-back" size={24} style={{ alignSelf: 'flex-start' }} onPress={() => navigation.navigate('Home')} />
        </View>

        <View>
        <Text style={{ fontFamily: 'gilroy-bold', fontSize: 18, alignSelf: 'center', marginBottom: 10, marginTop: 20 }} >Classmates</Text>
          <Text style={{ fontFamily: 'gilroy-medium', fontSize: 13, alignSelf: 'center', opacity: 0.4 }} >All interested in the same field!</Text>
          <Text style={{ fontFamily: 'gilroy-medium', fontSize: 13, alignSelf: 'center', opacity: 0.4 }} >Go on, get social!</Text>
          <FlatList
            style={{ marginHorizontal: 30 }}
            numColumns={2}
            data={ClassMatesData}
            renderItem={({ item }) => renderMates(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    )
}
