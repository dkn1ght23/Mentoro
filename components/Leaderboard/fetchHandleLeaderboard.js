import React, { useState } from "react";

import ShowRankList from "./ShowLeaderboard";

import firebase from "firebase";
import { View, Text } from "react-native";

var cfhandle = [];
let link = "http://codeforces.com/api/user.info?handles=";

export default function RankList() {
  const [loaded, setLoaded] = useState(false);

  function Data() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          cfhandle.push(documentSnapshot.data().CFHandle);
        });
        setLoaded(true);
      });
    console.log(cfhandle);

    if (cfhandle.length) link = link.concat(cfhandle[0]);
    for (let i = 1; i < cfhandle.length; i++) {
      link = link.concat(";");
      link = link.concat(cfhandle[i]);
    }
    console.log(link);
  }

  Data();

  if (cfhandle.length == 0) {
    return (
      <View>
        <Text>Loading......</Text>
      </View>
    );
  }
  return <ShowRankList link={link} />;
}