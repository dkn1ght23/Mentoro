import React, { useCallback, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, StatusBar, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import firebase from "firebase";
import { Icon, Feather} from "@expo/vector-icons";

const Calculate_Point = (Point) => {
  Point = Point * (1.0 / 18.0);
  Point = Math.min(Point, 100.0);
  Point = Point.toFixed(2);
  Point = Point.toString();
  return Point;
}

let One = "1", Two = "2";
let senior_cf_link = "http://codeforces.com/api/user.info?handles=";
let junior_cf_link = "http://codeforces.com/api/user.info?handles=";
let overall_cf_link = "http://codeforces.com/api/user.info?handles=";

let senior_cf_link_demo = "http://codeforces.com/api/user.info?handles=";
let junior_cf_link_demo = "http://codeforces.com/api/user.info?handles=";
let overall_cf_link_demo = "http://codeforces.com/api/user.info?handles=";

var senior_cf_handle = [];
var junior_cf_handle = [];
var overall_cf_handle = [];

let firstOverall, secondOverall, thirdOverall;
let firstSenior, secondSenior, thirdSenior;
let firstJunior, secondJunior, thirdJunior;

export default function RankList() {
  const [currentTab, setCurrentTab] = useState(2);
  const [firebaseLoaded, setfirebaseLoaded] = useState(false);
  const [linkCreated, setLinkCreated] = useState(false);
  const [overallDataLoaded, setOverallDataLoaded] = useState(false);
  const [seniorDataLoaded, setSeniorDataLoaded] = useState(false);
  const [juniorDataLoaded, setJuniorDataLoaded] = useState(false);
  const [overallUserData, setOverallUserData] = useState([]);
  const [seniorUserData, setSeniorUserData] = useState([]);
  const [juniorUserData, setJuniorUserData] = useState([]);

  const [networkError, setNetworkError] = useState(false);

  const create_link = useCallback(() => {
    overall_cf_link = overall_cf_link_demo
    senior_cf_link = senior_cf_link_demo
    junior_cf_link = junior_cf_link_demo

    for (let i = 0; i < overall_cf_handle.length; i++) {
      if (i > 0) overall_cf_link = overall_cf_link.concat(";");
      overall_cf_link = overall_cf_link.concat(overall_cf_handle[i]);
    }
    // console.log(overall_cf_link, "Link Created Overall")

    for (let i = 0; i < senior_cf_handle.length; i++) {
      if (i > 0) senior_cf_link = senior_cf_link.concat(";");
      senior_cf_link = senior_cf_link.concat(senior_cf_handle[i]);
    }
    // console.log(senior_cf_link, "Link Created Senior");

    for (let i = 0; i < junior_cf_handle.length; i++) {
      if (i > 0) junior_cf_link = junior_cf_link.concat(";");
      junior_cf_link = junior_cf_link.concat(junior_cf_handle[i]);
    }
    // console.log(junior_cf_link, "Link Created Junior");
    setLinkCreated(true)
  })

  const get_cf_handle = useCallback(() => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          overall_cf_handle.push(documentSnapshot.data().CFHandle);
          let Year = documentSnapshot.data().year;
          let a = Year.localeCompare(One) == 0;
          let b = Year.localeCompare(Two) == 0; 
          // console.log(Year,a,b, documentSnapshot.data().CFHandle );
          if (a) { junior_cf_handle.push(documentSnapshot.data().CFHandle) }
          else if (b) { junior_cf_handle.push(documentSnapshot.data().CFHandle) }
          else { senior_cf_handle.push(documentSnapshot.data().CFHandle) }
        });
        setfirebaseLoaded(true);
      })
      .catch((err) => { console.log(err); setNetworkError(true) });
  })

  const get_overall_user_data = useCallback(() => {
    // console.log(overall_cf_link, "AAA")
    fetch(overall_cf_link)
      .then((res) => res.json())
      .then((res) => res.result)
      .then((res) => {
        // if (typeof res === undefined) console.log("undefined overall")
        // else {
        //   console.log("done overall")
        // }
        setOverallUserData(res);
        // console.log(res);
      })
      .catch((err) => { console.log(err); setNetworkError(true) });
    setOverallDataLoaded(true)
  })

  const get_senior_user_data = useCallback(() => {
    // console.log(senior_cf_link, "AAA")
    fetch(senior_cf_link)
      .then((res) => res.json())
      .then((res) => res.result)
      .then((res) => {
        // if (typeof res === undefined) console.log("undefined senior")
        // else {
        //   console.log("done senior")
        // }
        setSeniorUserData(res);
        // console.log(res);
      })
      .catch((err) => { console.log(err); setNetworkError(true) });
    setSeniorDataLoaded(true)
  })

  const get_junior_user_data = useCallback(() => {
    // console.log(junior_cf_link, "AAA")
    fetch(junior_cf_link)
      .then((res) => res.json())
      .then((res) => res.result)
      .then((res) => {
        // if (typeof res === undefined) console.log("undefined junior")
        // else {
        //   console.log("done junior")
        // }
        setJuniorUserData(res);
        // console.log(res);
      })
      .catch((err) => { console.log(err); setNetworkError(true) });
    setJuniorDataLoaded(true)
  })

  const renderItemOverall = ({ item, index }) => {
    let id = (index + 1).toString();
    let point = Calculate_Point(item.rating);
    let profile_photo_link = item.avatar;
    if (index == 0) {
      firstOverall = item;
      firstOverall.point = point;
    }
    else if (index == 1) {
      secondOverall = item;
      secondOverall.point = point;
    }
    else if (index == 2) {
      thirdOverall = item;
      thirdOverall.point = point;
      return (
        <View>
          <View style={{ flexDirection: "row", backgroundColor: "transparent", marginTop: 20, justifyContent: 'space-evenly', marginHorizontal: 20 }}>
            <TouchableOpacity style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent", marginTop: 20 }}>
              <Text style={{ alignSelf: 'center', color: 'black' }} >2nd</Text>
              <Image style={{ marginTop: 5, borderWidth: 3, borderColor: '#cd7f32', alignSelf: 'center', height: 100, width: 100, borderRadius: 50 }} source={{ uri: secondOverall.avatar }} />
              <Text style={{ marginTop: 5, alignSelf: 'center', color: 'black' }} >{secondOverall.handle}</Text>
              <Text style={{ alignSelf: 'center', color: 'grey' }} >{secondOverall.point}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1.25, flexDirection: "column", backgroundColor: "transparent" }}>
              <Text style={{ alignSelf: 'center', color: 'black' }} >1st</Text>
              <Image style={{ marginTop: 5, borderWidth: 3, borderColor: 'gold', alignSelf: 'center', height: 120, width: 120, borderRadius: 80 }} source={{ uri: firstOverall.avatar }} />
              < Text style={{ marginTop: 5, alignSelf: 'center', color: 'black' }} >{firstOverall.handle} </Text>
              <Text style={{ alignSelf: 'center', color: 'grey' }} >{firstOverall.point}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent", marginTop: 20 }}>
              <Text style={{ alignSelf: 'center', color: 'black', }} >3rd</Text>
              <Image style={{ marginTop: 5, borderWidth: 3, borderColor: 'silver', alignSelf: 'center', height: 100, width: 100, borderRadius: 50 }} source={{ uri: thirdOverall.avatar }} />
              <Text style={{ marginTop: 5, alignSelf: 'center', color: 'black', }} >{thirdOverall.handle}</Text>
              <Text style={{ alignSelf: 'center', color: 'grey', }} >{thirdOverall.point}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: 20, borderBottomWidth: 1, borderColor: 'grey' }} ></View>
        </View>
      )
    }
    else {
      return (
        <TouchableOpacity style={{ borderRadius: 20, backgroundColor: 'transparent', marginHorizontal: 20, marginTop: 5, height: 60 }}>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent', borderRadius: 15 }} >
            <Text style={{ alignSelf: 'center', flex: 0.5, color: 'black' }} >{id}</Text>
            <Image style={{ flex: 1, height: 50, width: 50, borderRadius: 100, borderWidth: 1, borderColor: 'orange' }} source={{ uri: profile_photo_link }} />
            <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }} >
              <Text style={{ marginLeft: 20, color: 'black' }} >{item.handle}</Text>
            </View>
            <Text style={{ alignSelf: 'center', flex: 1, color: 'black' }} >{point}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  const renderItemSenior = ({ item, index }) => {
    let id = (index + 1).toString();
    let point = Calculate_Point(item.rating);
    let profile_photo_link = item.avatar;
    if (index == 0) {
      firstSenior = item;
      firstSenior.point = point;
    }
    else if (index == 1) {
      secondSenior = item;
      secondSenior.point = point;
    }
    else if (index == 2) {
      thirdSenior = item;
      thirdSenior.point = point;
      return (
        <View>
          <View style={{ flexDirection: "row", backgroundColor: "transparent", marginTop: 20, justifyContent: 'space-evenly', marginHorizontal: 20 }}>
            <TouchableOpacity style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent", marginTop: 20 }}>
              <Text style={{ alignSelf: 'center', color: 'black' }} >2nd</Text>
              <Image style={{ marginTop: 5, borderWidth: 3, borderColor: '#cd7f32', alignSelf: 'center', height: 100, width: 100, borderRadius: 50 }} source={{ uri: secondSenior.avatar }} />
              <Text style={{ marginTop: 5, alignSelf: 'center', color: 'black' }} >{secondSenior.handle}</Text>
              <Text style={{ alignSelf: 'center', color: 'grey' }} >{secondSenior.point}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1.25, flexDirection: "column", backgroundColor: "transparent" }}>
              <Text style={{ alignSelf: 'center', color: 'black' }} >1st</Text>
              <Image style={{ marginTop: 5, borderWidth: 3, borderColor: 'gold', alignSelf: 'center', height: 120, width: 120, borderRadius: 80 }} source={{ uri: firstSenior.avatar }} />
              < Text style={{ marginTop: 5, alignSelf: 'center', color: 'black' }} >{firstSenior.handle} </Text>
              <Text style={{ alignSelf: 'center', color: 'grey' }} >{firstSenior.point}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent", marginTop: 20 }}>
              <Text style={{ alignSelf: 'center', color: 'black', }} >3rd</Text>
              <Image style={{ marginTop: 5, borderWidth: 3, borderColor: 'silver', alignSelf: 'center', height: 100, width: 100, borderRadius: 50 }} source={{ uri: thirdSenior.avatar }} />
              <Text style={{ marginTop: 5, alignSelf: 'center', color: 'black', }} >{thirdSenior.handle}</Text>
              <Text style={{ alignSelf: 'center', color: 'grey', }} >{thirdSenior.point}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: 20, borderBottomWidth: 1, borderColor: 'grey' }} ></View>
        </View>
      )
    }
    else {
      return (
        <TouchableOpacity style={{ borderRadius: 20, backgroundColor: 'transparent', marginHorizontal: 20, marginTop: 5, height: 60 }}>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent', borderRadius: 15 }} >
            <Text style={{ alignSelf: 'center', flex: 0.5, color: 'black' }} >{id}</Text>
            <Image style={{ flex: 1, height: 50, width: 50, borderRadius: 100, borderWidth: 1, borderColor: 'orange' }} source={{ uri: profile_photo_link }} />
            <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }} >
              <Text style={{ marginLeft: 20, color: 'black' }} >{item.handle}</Text>
            </View>
            <Text style={{ alignSelf: 'center', flex: 1, color: 'black' }} >{point}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
  const renderItemJunior = ({ item, index }) => {
    let id = (index + 1).toString();
    let point = Calculate_Point(item.rating);
    let profile_photo_link = item.avatar;
    if (index == 0) {
      firstJunior = item;
      firstJunior.point = point;
    }
    else if (index == 1) {
      secondJunior = item;
      secondJunior.point = point;
    }
    else if (index == 2) {
      thirdJunior = item;
      thirdJunior.point = point;
      return (
        <View>
          <View style={{ flexDirection: "row", backgroundColor: "transparent", marginTop: 20, justifyContent: 'space-evenly', marginHorizontal: 20 }}>
            <TouchableOpacity style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent", marginTop: 20 }}>
              <Text style={{ alignSelf: 'center', color: 'black' }} >2nd</Text>
              <Image style={{ marginTop: 5, borderWidth: 3, borderColor: '#cd7f32', alignSelf: 'center', height: 100, width: 100, borderRadius: 50 }} source={{ uri: secondJunior.avatar }} />
              <Text style={{ marginTop: 5, alignSelf: 'center', color: 'black' }} >{secondJunior.handle}</Text>
              <Text style={{ alignSelf: 'center', color: 'grey' }} >{secondJunior.point}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1.25, flexDirection: "column", backgroundColor: "transparent" }}>
              <Text style={{ alignSelf: 'center', color: 'black' }} >1st</Text>
              <Image style={{ marginTop: 5, borderWidth: 3, borderColor: 'gold', alignSelf: 'center', height: 120, width: 120, borderRadius: 80 }} source={{ uri: firstJunior.avatar }} />
              < Text style={{ marginTop: 5, alignSelf: 'center', color: 'black' }} >{firstJunior.handle} </Text>
              <Text style={{ alignSelf: 'center', color: 'grey' }} >{firstJunior.point}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent", marginTop: 20 }}>
              <Text style={{ alignSelf: 'center', color: 'black', }} >3rd</Text>
              <Image style={{ marginTop: 5, borderWidth: 3, borderColor: 'silver', alignSelf: 'center', height: 100, width: 100, borderRadius: 50 }} source={{ uri: thirdJunior.avatar }} />
              <Text style={{ marginTop: 5, alignSelf: 'center', color: 'black', }} >{thirdJunior.handle}</Text>
              <Text style={{ alignSelf: 'center', color: 'grey', }} >{thirdJunior.point}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: 20, borderBottomWidth: 1, borderColor: 'grey' }} ></View>
        </View>
      )
    }
    else {
      return (
        <TouchableOpacity style={{ borderRadius: 20, backgroundColor: 'transparent', marginHorizontal: 20, marginTop: 5, height: 60 }}>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent', borderRadius: 15 }} >
            <Text style={{ alignSelf: 'center', flex: 0.5, color: 'black' }} >{id}</Text>
            <Image style={{ flex: 1, height: 50, width: 50, borderRadius: 100, borderWidth: 1, borderColor: 'orange' }} source={{ uri: profile_photo_link }} />
            <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }} >
              <Text style={{ marginLeft: 20, color: 'black' }} >{item.handle}</Text>
            </View>
            <Text style={{ alignSelf: 'center', flex: 1, color: 'black' }} >{point}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }


  if (firebaseLoaded && linkCreated && overallDataLoaded && seniorDataLoaded && juniorDataLoaded) {
    overallUserData.sort((a, b) => (a.rating >= b.rating ? -1 : 1));
    seniorUserData.sort((a, b) => (a.rating >= b.rating ? -1 : 1));
    juniorUserData.sort((a, b) => (a.rating >= b.rating ? -1 : 1));
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

  if (!firebaseLoaded) {
    get_cf_handle();
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (!linkCreated && firebaseLoaded) {
    create_link();
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (linkCreated && firebaseLoaded && !overallDataLoaded) {
    get_overall_user_data();
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (linkCreated && firebaseLoaded && overallDataLoaded && !seniorDataLoaded) {
    get_senior_user_data();
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (linkCreated && firebaseLoaded && overallDataLoaded && seniorDataLoaded && !juniorDataLoaded) {
    get_junior_user_data();
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (linkCreated && firebaseLoaded && overallDataLoaded && seniorDataLoaded && juniorDataLoaded) {

    if (currentTab == 1) {
      return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <StatusBar
            animated={true}
            backgroundColor="transparent"
            barStyle='dark-content'
          />
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: 'black' }}>
              Leaderboard
            </Text>
          </View>
          <View
            style={{ marginTop: 10, marginHorizontal: 20, flexDirection: "row" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: currentTab == 1 ? "skyblue" : "transparent",
                height: 30,
                width: 115,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                marginTop: 5,
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
                margin: 5,
              }}
              onPress={() => setCurrentTab(3)}
            >
              <Text style={{ color: "grey" }}>Senior</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={juniorUserData}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => renderItemJunior({ item, index })}
            keyExtractor={item => item.handle}
          />

          <View style={{ marginTop: 20 }} ></View>
        </View>
      );
    }
    else if (currentTab === 2) {
      return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <StatusBar
            animated={true}
            backgroundColor="transparent"
            barStyle='dark-content'
          />

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: 'black' }}>
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
                marginTop: 5,
              }}
              onPress={() => setCurrentTab(1)}
            >
              <Text style={{ color: "grey", }}>Junior</Text>
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
              <Text style={{ color: "white" }}>Overall</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: currentTab == 3 ? "skyblue" : "transparent",
                height: 30,
                width: 115,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                marginTop: 5,
              }}
              onPress={() => setCurrentTab(3)}
            >
              <Text style={{ color: "grey" }}>Senior</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={overallUserData}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => renderItemOverall({ item, index })}
            keyExtractor={item => item.handle}
          />
          <View style={{ marginTop: 20 }} ></View>
        </View>
      )
    }
    else {
      return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>

          <StatusBar
            animated={true}
            backgroundColor="transparent"
            barStyle='dark-content'
          />

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: 'black' }}>
              Leaderboard
            </Text>
          </View>

          <View
            style={{ marginTop: 10, marginHorizontal: 20, flexDirection: "row" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: currentTab == 1 ? "skyblue" : "transparent",
                height: 30,
                width: 115,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                marginTop: 5,
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
                backgroundColor: currentTab == 3 ? "skyblue" : "transparent",
                height: 30,
                width: 115,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                marginTop: 5,
              }}
              onPress={() => setCurrentTab(3)}
            >
              <Text style={{ color: "white" }}>Senior</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={seniorUserData}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => renderItemSenior({ item, index })}
            keyExtractor={item => item.handle}
          />
          <View style={{ marginTop: 20 }} ></View>
        </View>
      );
    }
  }
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
  }
});