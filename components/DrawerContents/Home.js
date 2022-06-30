import React, { Component, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { Icon, Feather} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Deck from "../Deck";
import Cards from "../Cards";

import firebase from 'firebase'
import Ionicons from "@expo/vector-icons/Ionicons";

const DATA = [
  {
    id: 1,
    time: "Starts at 08:35",
    title: "Codeforces",
    number: "Global Round 532",
  },
  {
    id: 2,
    title: "Codechef",
    time: "Starts at 10:00",
    number: "March Chellenge",
  },
  {
    id: 3,
    title: "LightOJ",
    time: "Starts at 04:00",
    number: "Beginner Contest",
  },
];

const convertTime = (date) => {
  let time;
  let AMorPM = "AM";
  if(date.getHours() > 12) AMorPM = "PM";
  let hour = (date.getHours()%12).toString();
  let minute = date.getMinutes().toString();
  let second = date.getSeconds().toString();
  if(hour.length === 1) hour = "0"+ hour;
  if(minute.length === 1) minute = "0"+ minute;
  if(second.length === 1) second = "0"+ second;
  time = hour;
  time += ":"
  time += minute;
  time += " ";
  time += AMorPM;
  return time;
}


export default function Home({ navigation }) {
  const [userName, setUserName] = useState("Mentorian")
  const [userNameLoaded, setUserNameLoaded] = useState(false);
  const [userNameCalled, setUserNameCalled] = useState(false);

  const [contestList, setContestList] = useState([]);
  const [contestListLoaded, setContestListLoaded] = useState(false);
  const [contestListcalled, setContestListCalled] = useState(false);

  const [futureContestList, setFutureContestList] = useState([]);
  const [futureContestListLoaded, setFutureContestListLoaded] = useState(false);
  const [futureContestListCalled, setFutureContestListCalled] = useState(false);

  const [networkError, setNetworkError] = useState(false);

  const get_user_details = useCallback(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserName(snapshot.data().username);
          setUserNameLoaded(true);
        }
        else{
          setUserNameLoaded(true);
        }
      })
      .catch((err) => { console.log(err); setNetworkError(true) });
  })

  const get_contest_list = useCallback(() => {
    let link = "https://codeforces.com/api/contest.list";
    fetch(link)
      .then((res) => res.json())
      .then((res) => res.result)
      .then((res) => {
        setContestList(res);
        setContestListLoaded(true)
      })
      .catch((err) => { console.log(err); setNetworkError(true) });
  })

  const get_future_contest_link = useCallback(()=>{
    let i = 0;
    let tempArr = [];
    let ok = false;
    for(i = 0; i < contestList.length; i++){
        if(contestList[i].phase.localeCompare("BEFORE") === 0 ){
          tempArr.push(contestList[i]);
        }
        else{
          ok = true;
          break;
        }
    }
    if(ok || i == contestList.length){
        setFutureContestList(tempArr);
        setFutureContestListLoaded(true);
    }
  })

  const renderCard = (item) => {
    let date = new Date(item.startTimeSeconds*1000);
    let time = convertTime(date);
    return (
      <View key={item.id} style={styles.cardContainer}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>Starts at {time}</Text>
            <Ionicons
              name="ios-remove"
              size={40}
              color="red"
              style={{ marginTop: 1 }}
            />
            <Text style={styles.number}>{item.name}</Text>
          </View>
          <View style={{ marginLeft: 150, marginTop: 18 }}>
            <Text style={styles.textCovid}>Codeforces</Text>
          </View>
        </View>
      </View>
    );
  }

  const renderNoMoreCards = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.noCard}>This is all for now.</Text>
      </View>
    );
  }

  if(networkError){
    return(
      <View style={{flex: 1, alignItems : 'center', justifyContent: 'center'}} >
        <Feather name='alert-octagon' size={50} color='red' />
        <Text style={{fontFamily: 'gilroy-bold', fontSize: 24, marginTop: 10}} >Oops</Text>
        <Text style={{fontFamily: 'gilroy-bold'}} >Network Error  :(</Text>
      </View>
    )
  }

  if (!userNameLoaded) {
    if (!userNameCalled) {
      setUserNameCalled(true);
      get_user_details();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  if (userNameLoaded && !contestListLoaded) {
    if (!contestListcalled) {
      setContestListCalled(true);
      get_contest_list();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  if (userNameLoaded && contestListLoaded && !futureContestListLoaded) {
    if (!futureContestListCalled) {
      setFutureContestListCalled(true);
      get_future_contest_link();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  if (userNameLoaded && contestListLoaded && futureContestListLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={{ height: 15 }} />
        <ScrollView
          style={{ backgroundColor: 'transparent' }}
        >
          <View style={styles.col}>
            <View style={{ width: "50%" }}>
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
              >
                <Ionicons name="md-remove" color="black" size={26} />
                <Ionicons
                  name="md-remove"
                  color="black"
                  size={26}
                  style={styles.minusIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.avatarContainer}>
              <Ionicons name="send-outline" color="black" size={26} onPress={() => navigation.navigate('Messages')} />
            </View>
          </View>
          <Text style={styles.textDash}>Hello, {userName}</Text>

          <Deck
            data={futureContestList}
            renderCard={renderCard}
            renderNoMoreCards={renderNoMoreCards}
          />
          
          <View>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 170,
                color: "black",
                fontFamily: "poppins-bold",
                fontSize: 20,
              }}
            >
              Recommeded
            </Text>
            <ScrollView
              style={{ marginTop: 20, backgroundColor: 'transparent' }}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              <Cards bg="red" idx={0} onPress={() => navigation.navigate('Topic')} />
              <Cards bg="red" idx={1} onPress={() => navigation.navigate('Topic')} />
              <Cards bg="red" idx={2} onPress={() => navigation.navigate('Topic')} />
            </ScrollView>

            <Text
              style={{
                marginLeft: 20,
                marginTop: 20,
                color: "black",
                fontFamily: "poppins-bold",
                fontSize: 20,
              }}
            >
              Categories
            </Text>
            <ScrollView
              style={{ marginTop: 20 }}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              <Cards bg="red" idx={3} onPress={() => navigation.navigate('Topic')} />
              <Cards bg="red" idx={4} onPress={() => navigation.navigate('Topic')} />
              <Cards bg="red" idx={5} onPress={() => navigation.navigate('Topic')} />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "lightblue",
    marginBottom: 20,
  },
  cardContainer: {
    height: 150,
    width: 320,
    alignSelf: "center",
    backgroundColor: "#6A706E",
    borderRadius: 30,
  },
  card: {
    height: 150,
    width: 260,
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "#2b3240",
    borderRadius: 30,
    flexDirection: "row",
  },
  title: {
    color: "#6A706E",
    width: 150,
    fontSize: 16,
    fontWeight: "bold",
  },
  number: {
    color: "#FFF",
    width: 200,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -10,
  },
  textCovid: {
    transform: [{ rotate: "-90deg" }],
    color: "#3a4b4f",
    fontSize: 18,
    width: 100,
    marginLeft: -145,
    fontWeight: "bold",
    marginTop: 20,
  },
  noCard: {
    marginBottom: 10,
    color: "black",
    alignSelf: "center",
  },
  map: {
    height: 200,
    paddingTop: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  col: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  minusIcon: {
    marginTop: -20,
    marginLeft: 5,
  },
  avatarContainer: {
    width: "50%",
    alignItems: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textDash: {
    color: "black",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 15,
    fontFamily: "bernhardt-bold",
    marginBottom: 20,
  },
  colContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 40,
    alignItems: "center",
  },
  textGlobal: {
    fontWeight: "bold",
    fontSize: 16,
    color: "red",
  },
  textRussia: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 30,
    color: "#6a706e",
  },
  reloadContainer: {
    backgroundColor: "#FFF",
    elevation: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
  },
  activitycontainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
});
