import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import {Ionicons, Feather}  from "react-native-vector-icons";

export default class FeedPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
            <Text style={{ fontFamily: "poppins-medium" }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer} >
          <Image source={require('../../assets/Person/nayem.jpg')} style={styles.avatar} />
          <TextInput 
            autoFocus={true}
            placeholder='Anything on mind to share?'
            multiline={true}
            numberOfLines={5}
            style={{flex: 1, backgroundColor: '#F1F7FF', padding: 10, borderRadius: 8}}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
        </View>

        <TouchableOpacity style={styles.photo} >
          
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: 'grey',
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 16
  }
});
