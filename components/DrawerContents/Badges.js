import React, { useCallback, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";

import { Ionicons } from 'react-native-vector-icons'

import firebase from 'firebase';

const getSubmissions = (submissions, verdict) =>
  submissions.filter((submission) => submission.verdict === verdict);

const isSameProblem = (p1, p2) =>
  p1.name === p2.name && Math.abs(p1.contestId - p2.contestId) <= 1;

const removeDuplicateProblems = (submissions) => {
  submissions.sort((a, b) =>
    a.problem.name === b.problem.name
      ? a.problem.contestId - b.problem.contestId
      : a.problem.name < b.problem.name
        ? -1
        : 1
  );
  return submissions.filter(
    ({ problem }, index) =>
      !index || !isSameProblem(submissions[index - 1].problem, problem)
  );
};

const getProblems = (submissions) => {
  const ac = getSubmissions(submissions, "OK");
  return removeDuplicateProblems(ac);
};

let BadgesData = [
  {
    id: "1",
    title: "1500+",
    description: 'Solved 1500 problems!',
    icon: require('../../assets/badges/1500.jpg'),
    status: "false",
  },
  {
    id: "2",
    title: "1000+",
    description: 'Solved 1000 problems!',
    icon: require("../../assets/badges/1000.jpg"),
    status: "false",
  },
  {
    id: "3",
    title: "800+",
    description: 'Solved 800 problems!',
    icon: require("../../assets/badges/800.jpg"),
    status: "false",
  },
  {
    id: "4",
    title: "500+",
    description: 'Solved 500 problems!',
    icon: require("../../assets/badges/500.jpg"),
    status: "false",
  },
  {
    id: "5",
    title: "250+",
    description: 'Solved 250 problems!',
    icon: require("../../assets/badges/250.png"),
    status: "false",
  },
  {
    id: "6",
    title: "100+",
    description: 'Solved 100 problems!',
    icon: require("../../assets/badges/100.png"),
    status: "false",
  },
];

let finalBadges = [];

export default function Badges({navigation}) {

  const [CFHandle, setCFHandle] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [cfUserStatusLoaded, setCfUserStatusLoaded] = useState(false);
  const [cfUserStatusCalled, setCfUserStatusCalled] = useState(false);

  const [firebaseLoaded1, setfirebaseLoaded1] = useState(false);
  const [firebaseCalled1, setfirebaseCalled1] = useState(false);

  const [badgesLoaded, setBadgesLoaded] = useState(false);
  const [badgesCalled, setBadgesCalled] = useState(false);

  const [networkError, setNetworkError] = useState(false);

  const get_codeforces_data = useCallback(() => {
    let link = "https://codeforces.com/api/user.status?handle={handle}";
    link = link.replace("{handle}", CFHandle);
    fetch(link)
      .then((res) => res.json())
      .then((res) => res.result)
      .then((res) => {
        setSubmissions(res);
        setCfUserStatusLoaded(true);
      })
      .catch((err) => { console.log(err); setNetworkError(true) });
  })

  const current_user_data = useCallback(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        setCFHandle(snapshot.data().CFHandle);
        setfirebaseLoaded1(true);
      })
      .catch((err) => { console.log(err); setNetworkError(true) });
  })

  const make_badges_list = useCallback(() => {
    const ac = getProblems(submissions);
    if (ac.length >= 100) { BadgesData[5].status = "true"; }
    if (ac.length >= 250) { BadgesData[4].status = "true"; }
    if (ac.length >= 500) { BadgesData[3].status = "true"; }
    if (ac.length >= 800) { BadgesData[2].status = "true"; }
    if (ac.length >= 1000) { BadgesData[1].status = "true"; }
    if (ac.length >= 1500) { BadgesData[0].status = "true"; }
    let i = 0;
    for (i = 0; i < 6; i++) {
      if (BadgesData[i].status === "true") {
        finalBadges.push(BadgesData[i]);
      }
    }
    if (i === 6) setBadgesLoaded(true);
  })

  const renderPost = (post) => {
    if(post.status === "false"){
      return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} >
          <Image source={post.icon} style={{ height: 100, width: 100, borderRadius: 100 }} />
          <Text style={{ fontFamily: 'gilroy-bold', fontSize: 15 }} >{post.title}</Text>
          <Text style={{ fontFamily: 'gilroy-medium', fontSize: 12, opacity: 0.4 }} >{post.description}</Text>
        </View>
      );
    }
  };
  const renderEarnedBadges = (post) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} >
        <Image source={post.icon} style={{ height: 100, width: 100, borderRadius: 100, marginTop: 10 }} />
        <Text style={{ fontFamily: 'gilroy-bold', fontSize: 15 }} >{post.title}</Text>
        <Text style={{ fontFamily: 'gilroy-medium', fontSize: 12, opacity: 0.4 }} >{post.description}</Text>
      </View>
    );
  };

  if (!firebaseLoaded1) {
    if (!firebaseCalled1) {
      setfirebaseCalled1(true);
      current_user_data();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if(firebaseLoaded1 && !cfUserStatusLoaded){
    if (!cfUserStatusCalled) {
      setCfUserStatusCalled(true);
      get_codeforces_data();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  
  if(cfUserStatusLoaded && !badgesLoaded){
    if(!badgesCalled){
      setBadgesCalled(true);
      make_badges_list();
    }
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <StatusBar animated={true} backgroundColor="transparent" barStyle="dark-content" />
      <View style={{ flexDirection: 'row', width: 360, marginHorizontal: 20 }}>
        <Ionicons name="chevron-back" size={24} style={{ alignSelf: 'flex-start' }} onPress={() => navigation.navigate('Home')} />
      </View>

      <View>
        <Text style={{ alignSelf: 'center', fontFamily: "gilroy-bold", fontSize: 18, marginTop: 20, marginBottom: 20 }}>My earned badges</Text>
        <FlatList
          style={{ marginHorizontal: 30 }}
          numColumns={2}
          data={finalBadges}
          renderItem={({ item }) => renderEarnedBadges(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{ flex: 1 }} >
        <Text style={{ alignSelf: 'center', fontFamily: "gilroy-bold", fontSize: 18, marginTop: 20, marginBottom: 20 }}>Badges to earn</Text>
        <FlatList
          style={{ marginHorizontal: 30, opacity: 0.4 }}
          numColumns={2}
          data={BadgesData}
          renderItem={({ item }) => renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activitycontainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
})