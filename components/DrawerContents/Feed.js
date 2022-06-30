import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  Modal,
  TextInput,
  MaskedViewComponent,
  ActivityIndicator,
  Alert
} from "react-native";

import firebase from "firebase";
import { Ionicons, Feather } from "react-native-vector-icons";
import moment from "moment";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import FeedPostScreen from "./FeedPost";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react";

require("firebase/firestore");
require("firebase/firebase-storage");

let posts = [
  {
    id: "1",
    name: "Abdullah Al Nayem",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/nayem.jpg"),
    image: require("../../assets/Person/nayem.jpg"),
  },
  {
    id: "2",
    name: "Jahirul Islam Hridoy",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/hridoy.jpg"),
    image: require("../../assets/Person/hridoy.jpg"),
  },
  {
    id: "3",
    name: "Abir Sadat Wasim",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/wasim.jpg"),
    image: require("../../assets/Person/wasim.jpg"),
  },
  {
    id: "4",
    name: "Mujammal Ahmed",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/mujammal.jpg"),
    image: require("../../assets/Person/mujammal.jpg"),
  },
  {
    id: "5",
    name: "Kamonasish Roy",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/kamona.jpg"),
    image: require("../../assets/Person/kamona.jpg"),
  },
  {
    id: "6",
    name: "Humayun Kibria Shakib",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/shakib.jpg"),
    image: require("../../assets/Person/shakib.jpg"),
  },
  {
    id: "7",
    name: "Mahfuj Ahmed",
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    timestamp: 1569109273726,
    avatar: require("../../assets/Person/mahfuj.jpg"),
    image: require("../../assets/Person/mahfuj.jpg"),
  },
];

var allUserPost = [];
let postNo = 0;

const getMonthName = monthIndex => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return months[monthIndex];
};

const convertTime = (date) => {
  let time;
  let AMorPM = "AM";
  if (date.getHours() > 12) AMorPM = "PM";
  let hour = (date.getHours() % 12).toString();
  let minute = date.getMinutes().toString();
  let second = date.getSeconds().toString();
  if (hour.length === 1) hour = "0" + hour;
  if(hour.localeCompare("00") === 0) hour = "12";
  if (minute.length === 1) minute = "0" + minute;
  if (second.length === 1) second = "0" + second;
  time = hour;
  time += ":"
  time += minute;
  time += ":"
  time += second;
  time += " ";
  time += AMorPM;
  return time;
}


export default function Feed() {

  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);

  const [currentUserPostContent, setCurrentUserPostContent] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserProfilePhoto, setCurrentUserProfilePhoto] = useState("https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg");
  const [userNameLoaded, setUserNameLoaded] = useState(false);
  const [ProfilePhotoLoaded, setProfilePhotoLoaded] = useState(false);
  const [allPostLoaded, setAllPostLoaded] = useState(false);
  const [Called, setCalled] = useState(false);
  const[currentUserId , setcurrentUserId] = useState("") ;
  const [networkError, setNetworkError] = useState(false);

  const get_current_user_name = useCallback(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUserName(snapshot.data().name);
          setcurrentUserId(firebase.auth().currentUser.uid);
          setUserNameLoaded(true);
        }
        else {
          setUserNameLoaded(true);
        }
      })
      .catch((err) => { console.log(err); setNetworkError(true) });;
  })

  const get_profile_photo = useCallback(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUserProfilePhoto(snapshot.data().downloadURL);
          setProfilePhotoLoaded(true);
        }
        else {
          setProfilePhotoLoaded(true);
          // console.log("Not Exist profile photo");
        }
      })
      .catch((err) => { console.log(err); setNetworkError(true) });;
  })

  const get_all_user_posts = useCallback(() => {
    // console.log("Calling...")
    setCalled(true);
    firebase
      .firestore()
      .collection("blog")
      .orderBy("creation", 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.id);
          allUserPost.push(documentSnapshot.data());
          allUserPost[postNo].postNo = postNo;
          postNo++;
        });
        //console.log(allUserPost)
        setAllPostLoaded(true);
      })
      .catch((err) => { console.log(err); setNetworkError(true) });;
  })

  const post_that_content = useCallback(() => {
    if (currentUserPostContent.length) {
      firebase
        .firestore()
        .collection("blog")
        .add({
          currentUserName,
          currentUserProfilePhoto,
          currentUserPostContent,
          currentUserId,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch((err) => { console.log(err); setNetworkError(true) });;
    }
  })

  const show_post_alert = useCallback(() => {
    setTimeout(function () {
      Alert.alert("Posted Successfully!")
      allUserPost.length = 0;
      postNo = 0;
      get_all_user_posts();
    }, 1000);
  })

  const action_for_post = useCallback((author) => {
    if (author === currentUserName) {
      console.log("Asce")
      //Do something for deleting and updaing post 
    }
  })

  const clearPastContent = useCallback(() => {
    setCurrentUserPostContent("");
  })

  const renderPost = (post) => {
    // console.log(post);
    let date = new Date(post.creation.seconds * 1000);
    let time = convertTime(date);

    return (
      <View style={styles.feedItem}>
        <Image source={{ uri: post.currentUserProfilePhoto }} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.currentUserName}</Text>
              <Text style={styles.timestamp}>
                {/* {moment(post.creation.seconds).fromNow()} */}
                {getMonthName(date.getMonth())} {date.getDate()}, {date.getFullYear()}  {time}
              </Text>
            </View>

            <Feather name="more-horizontal" size={24} color="#73788B" onPress={() => action_for_post(post.currentUserName)} />
          </View>

          <Text style={styles.posts}>{post.currentUserPostContent}</Text>

          {/* <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          /> */}

          {/* <View style={{ flexDirection: "row" }}>
            <Feather
              name="heart"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
          </View> */}
        </View>
      </View>
    );
  };

  if (networkError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <Feather name='alert-octagon' size={50} color='red' />
        <Text style={{ fontFamily: 'gilroy-bold', fontSize: 24, marginTop: 10 }} >Oops</Text>
        <Text style={{ fontFamily: 'gilroy-bold' }} >Network Error  :(</Text>
      </View>
    )
  }

  if (!userNameLoaded) {
    get_current_user_name();
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (userNameLoaded && !ProfilePhotoLoaded) {
    get_profile_photo();
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (userNameLoaded && ProfilePhotoLoaded && !Called && !allPostLoaded) {
    get_all_user_posts();
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }
  if (userNameLoaded && ProfilePhotoLoaded && Called && !allPostLoaded) {
    return (
      <View style={[styles.activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (userNameLoaded && ProfilePhotoLoaded && Called && allPostLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <Modal visible={modalOpen}>
          <View style={styles.Modalcontainer}>
            <View style={styles.Modalheader}>
              <Feather
                name="arrow-left"
                size={24}
                color="black"
                onPress={() => setModalOpen(false)}
              />
              <Text
                style={{ fontFamily: "poppins-medium" }}
                onPress={() => { setModalOpen(false); post_that_content(); show_post_alert(); }}
              >
                Post
              </Text>
            </View>

            <View style={styles.ModalinputContainer}>
              <Image
                source={{ uri: currentUserProfilePhoto }}
                style={styles.Modalavatar}
              />
              <TextInput
                autoFocus={true}
                placeholder="Anything on mind to share?"
                multiline={true}
                numberOfLines={5}
                style={{
                  flex: 1,
                  backgroundColor: "#F1F7FF",
                  padding: 10,
                  borderRadius: 8,
                }}
                onChangeText={(text) => setCurrentUserPostContent(text)}
                value={currentUserPostContent}
              />
            </View>
           
          </View>
        </Modal>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>

        <TouchableOpacity style={styles.ModalShowcontainer} onPress={() => { clearPastContent(), setModalOpen(true) }} >
          <View style={styles.ModalinputContainer}>
            <Image
              source={{ uri: currentUserProfilePhoto }}
              style={styles.Modalavatar}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: "#F1F7FF",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: 'grey', fontFamily: 'poppins-regular' }} >Anything on mind to share?</Text>
            </View>
          </View>
        </TouchableOpacity>

        <FlatList
          style={styles.feed}
          data={allUserPost}
          renderItem={({ item }) => renderPost(item)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.postNo.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingBottom: 5,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    elevation: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "poppins-medium",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontFamily: "poppins-medium",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    fontFamily: "poppins-medium",
    color: "#C4C6CE",
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
  Modalcontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  ModalShowcontainer: {
    // marginTop: 10,
    // borderRadius: 5,
    // marginHorizontal: 16,
    // backgroundColor: "white",
  },
  Modalheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
  },
  ModalinputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  Modalavatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 16,
  },
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
