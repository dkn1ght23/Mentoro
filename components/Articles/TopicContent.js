import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import {Ionicons, Feather, FontAwesome} from 'react-native-vector-icons'

export default class TopicContent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          bookmarked: false
        };
      }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <StatusBar animated={true} backgroundColor="transparent" barStyle="dark-content" />
                <View style={{ flex: 0.1, marginHorizontal: 20, marginBottom: 30}}>
                    <Ionicons name="chevron-back" size={24} color='black' onPress={()=> this.props.navigation.goBack()} />
                    <Text style={{ position: "absolute", alignSelf: "center", fontFamily: "gilroy-bold", fontSize: 18, }}>Competitive Programming</Text>
                </View>
                <View style={{flex: 0.1, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}} >
                    <View>
                        <Text style={{fontFamily: 'gilroy-regular', fontSize: 14}} >Chapter 1</Text>
                        <Text style={{fontFamily: 'gilroy-bold', fontSize: 16}} >Introduction to Competitive Programming</Text>
                    </View>
                    {
                        this.state.bookmarked === true ? 
                        <Ionicons name='bookmark' size={30} color='#FF3636' onPress={()=> this.setState({bookmarked: false})} /> : 
                        <Ionicons name='bookmark' size={30} color='black' onPress={()=> this.setState({bookmarked: true})} />
                    }
                </View>
                <ScrollView style={{flex: 0.6, marginTop: 20, marginHorizontal: 20}} showsVerticalScrollIndicator={false} >
                    <Text style={{fontFamily: 'poppins-regular', fontSize: 16, opacity: 0.6}} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                    <Text style={{fontFamily: 'poppins-regular', fontSize: 16, opacity: 0.6}} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                    <Text style={{fontFamily: 'poppins-regular', fontSize: 16, opacity: 0.6}} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                    <Text style={{fontFamily: 'poppins-regular', fontSize: 16, opacity: 0.6}} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                    <Text style={{fontFamily: 'poppins-regular', fontSize: 16, opacity: 0.6}} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                </ScrollView>
                <View style={{flex: 0.15, flexDirection: 'row', marginHorizontal: 20, marginBottom: 20, alignItems: 'flex-end'}} >
                    <TouchableOpacity style={{flexDirection: 'row', height: 60, width: 150, backgroundColor: '#D2DFFF', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}} onPress={()=> this.props.navigation.goBack()} >
                        <Ionicons name='list' size={24} />
                        <Text style={{fontFamily: 'gilroy-bold', fontSize: 16, marginLeft: 3}} >Chapters</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
