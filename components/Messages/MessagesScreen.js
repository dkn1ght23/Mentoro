import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';

import { Ionicons } from 'react-native-vector-icons'

import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../../styles/MessageStyles';

const Messages = [
  {
    id: '1',
    userName: 'Nayem',
    userImg: require('../../assets/Person/nayem.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Bhai, free asoin ni?',
  },
  {
    id: '2',
    userName: 'Hridoy',
    userImg: require('../../assets/Person/hridoy.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Bagbari Mess o seat ase ni bhai?',
  },
  {
    id: '3',
    userName: 'Wasim',
    userImg: require('../../assets/Person/wasim.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Kalke bikale free takba ni bhai?',
  },
  {
    id: '4',
    userName: 'Mujammal',
    userImg: require('../../assets/Person/mujammal.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Bhai, ektu dorkar asil',
  },
  {
    id: '5',
    userName: 'Kamonasish',
    userImg: require('../../assets/Person/kamona.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Ou equation ta jana ase ni afnr?',
  },
  {
    id: '6',
    userName: 'Shakib',
    userImg: require('../../assets/Person/shakib.jpg'),
    messageTime: '3 days ago',
    messageText:
      'Heaven o khela ase bhai, aiba ni?',
  },
];

const MessagesScreen = ({navigation}) => {
    return (
      <Container>
        <StatusBar animated={true} backgroundColor="transparent" barStyle="dark-content" />
        <View style={{ flexDirection: 'row', width: 360, marginHorizontal: 20, backgroundColor: "white",}}>
           <Ionicons name="chevron-back" size={24} style={{alignSelf: 'flex-start'}} onPress={() => navigation.goBack()} />
           <Text style={{alignSelf: 'center', fontFamily: "gilroy-bold", fontSize: 18, marginLeft: 110}}>Messages</Text>
        </View>
        <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});