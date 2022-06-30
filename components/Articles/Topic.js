import React, { Component } from "react";
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {Ionicons, FontAwesome, Feather} from "react-native-vector-icons";

let posts = [
  {
    id: '1',
    type: '1',
    title: 'Intruduction',
    subtitle: 'Lesson 1',
    time: '14:33'
  },
  {
    id: '2',
    type: '2',
    title: 'Basics of BFS',
    subtitle: 'Lesson 2',
    time: '07:57'
  },
  {
    id: '3',
    type: '1',
    title: 'Breath First Search',
    subtitle: 'Lesson 3',
    time: '37:03'
  },
  {
    id: '4',
    type: '1',
    title: 'Depth First Search',
    subtitle: 'Lesson 4',
    time: '20:33'
  },
  {
    id: '5',
    type: '2',
    title: 'Dijkstras Algorithm',
    subtitle: 'Lesson 5',
    time: '56:33'
  },
  {
    id: '6',
    type: '1',
    title: 'Minimum Spanning Tree',
    subtitle: 'Lesson 6',
    time: '03:23'
  },
];

export default class Topic extends Component {

  renderPost = (post) => {
    return (
      <TouchableOpacity style={{height: 70, backgroundColor: 'white', marginTop: 10, borderRadius: 12, marginHorizontal: 15, justifyContent: 'space-around' }} onPress={()=> this.props.navigation.navigate('TopicContent')} >
        <View style={{marginHorizontal: 10, flexDirection: 'row', alignItems: 'center'}} >
          <View style={{flex: 1, height: 50, width: 50, backgroundColor: '#F1F7FF', alignItems: 'center', justifyContent: 'center', borderRadius: 12}} >
           {post.type == '1' ? 
           <Ionicons name= 'play' size={25} color='dodgerblue' /> : 
           <Ionicons name= 'book' size={25} color='dodgerblue' />
           }
          </View>
          <View style={{flex: 5, marginLeft: 15}} >
            <Text style={{fontFamily: 'gilroy-bold'}} >{post.title}</Text>
            <Text style={{fontFamily: 'gilroy-medium', opacity:0.4}} >{post.subtitle}</Text>
          </View>
          <Text style={{flex: 1, fontFamily: 'gilroy-medium'}} >{post.time}</Text>
         </View>
      </TouchableOpacity>
    )
  };


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F1F7FF" }}>
        <StatusBar animated={true} backgroundColor="transparent" barStyle="dark-content" />
        <View style={{ backgroundColor: "white", borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
          <View style={{ marginHorizontal: 20, marginTop: 5, backgroundColor: "white",}}>
            <TouchableOpacity style={{ height: 30, marginTop: 5, marginBottom: 30, flexDirection: "row", }} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} />
            </TouchableOpacity>
            <Text style={{ marginTop: 8, position: "absolute", alignSelf: "center", fontFamily: "gilroy-bold", fontSize: 18, }}>Graph Theory</Text>
          </View>

          <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: 'space-around', marginBottom: 30}}>
            <View style={{ backgroundColor: "white", justifyContent: "center", marginLeft: "5%", }}>
              <Text style={{fontSize: 20,marginBottom: 5,fontFamily: "gilroy-bold",marginTop: 30,}}>Graph Theory</Text>
              <Text style={{fontSize: 14,fontFamily: "gilroy-medium",opacity: 0.4,}}>Learn graph theory with</Text>
              <Text style={{fontSize: 14,fontFamily: "gilroy-medium",opacity: 0.4,}}>Mentoro - easy</Text>
            </View>
            <View style={{backgroundColor: "white",marginRight: "5%",alignItems: "center",justifyContent: "center"}}>
              <Image
                style={{ height: 150, width: 150 }}
                source={require("../../assets/icon/warm-up.png")}
                resizeMode='cover'
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-around', marginBottom: 30}}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{flexDirection: "row"}} >
                <View style={{height: 50, width: 50, backgroundColor: 'aliceblue', borderRadius: 12, alignItems: 'center', justifyContent: 'center'}} >
                  <Ionicons name="time-outline" size={24} color='dodgerblue' />
                </View>
                <View style={{marginLeft: 10, marginTop: 0, justifyContent: 'center'}} >
                  <Text style={{fontFamily: 'gilroy-bold'}} >54 mins</Text>
                  <Text style={{fontFamily: 'gilroy-medium'}} >Studying Time</Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{flexDirection: "row"}} >
                <View style={{height: 50, width: 50, backgroundColor: 'aliceblue', borderRadius: 12, alignItems: 'center', justifyContent: 'center'}} >
                  <Ionicons name="people" size={24} color='dodgerblue' />
                </View>
                <View style={{marginLeft: 10, marginTop: 0, justifyContent: 'center'}} >
                  <Text style={{fontFamily: 'gilroy-bold'}} >2434</Text>
                  <Text style={{fontFamily: 'gilroy-medium'}} >Students</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text style={{marginTop: 20, fontFamily: 'gilroy-bold', fontSize: 18, marginLeft: 20}} >Lessons</Text>

        {/* <View style={{height: 70, backgroundColor: 'white', marginTop: 10, marginHorizontal: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center'}} >
          <View style={{flex: 1, height: 50, width: 50, backgroundColor: 'aliceblue', alignItems: 'center', justifyContent: 'center', marginLeft: 15, borderRadius: 12}} >
           <Ionicons name='play' size={25} color='dodgerblue' />
          </View>
          <View style={{flex: 5, marginLeft: 15}} >
            <Text style={{fontFamily: 'gilroy-bold'}} >Erater Tag in Berlin</Text>
            <Text style={{fontFamily: 'gilroy-medium', opacity:0.4}} >Lesson 1</Text>
          </View>
          <Text style={{flex: 1, fontFamily: 'gilroy-medium', marginRight: 10}} >14:44</Text>
        </View> */}

        <FlatList
          // style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        
      </View>
    );
  }
}
