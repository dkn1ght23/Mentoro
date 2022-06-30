import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, ActivityIndicator } from 'react-native';
import Icon from "@expo/vector-icons/Ionicons";

import colors from '../../../statics/colors';
import { AntDesign } from '@expo/vector-icons';
import Contests from './Contests';
import AddContest from './AddContest';

const convertTime = (date) => {
  let time;
  let AMorPM = "AM";
  if (date.getHours() > 12) AMorPM = "PM";
  let hour = (date.getHours() % 12).toString();
  let minute = date.getMinutes().toString();
  let second = date.getSeconds().toString();
  if (hour.length === 1) hour = "0" + hour;
  if (minute.length === 1) minute = "0" + minute;
  if (second.length === 1) second = "0" + second;
  time = hour;
  time += ":"
  time += minute;
  time += " ";
  time += AMorPM;
  return time;
}

export default function ContestReminder() {

  const [addTodoVisible, setAddTodoVisible] = useState(false);

  const [contestList, setContestList] = useState([]);
  const [contestListLoaded, setContestListLoaded] = useState(false);
  const [contestListcalled, setContestListCalled] = useState(false);

  const [futureContestList, setFutureContestList] = useState([]);
  const [futureContestListLoaded, setFutureContestListLoaded] = useState(false);
  const [futureContestListCalled, setFutureContestListCalled] = useState(false);

  const toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
  }

  // const renderList = list => {
  //   return <Contests list={list} />;
  // }

  const renderCard = (item) => {
    let date = new Date(item.startTimeSeconds * 1000);
    let time = convertTime(date);
    return (
      <View key={item.id} style={styles.cardContainer}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>Starts at {time}</Text>
            <Icon
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

  const get_contest_list = useCallback(() => {
    let link = "https://codeforces.com/api/contest.list";
    fetch(link)
      .then((res) => res.json())
      .then((res) => res.result)
      .then((res) => {
        setContestList(res);
        setContestListLoaded(true)
      })
      .catch((err) => console.log(err));
  })

  const get_future_contest_link = useCallback(() => {
    let i = 0;
    let tempArr = [];
    let ok = false;
    for (i = 0; i < contestList.length; i++) {
      if (contestList[i].phase.localeCompare("BEFORE") === 0) {
        tempArr.push(contestList[i]);
      }
      else {
        ok = true;
        break;
      }
    }
    if (ok || i == contestList.length) {
      setFutureContestList(tempArr);
      setFutureContestListLoaded(true);
    }
  })

  if (!contestListLoaded) {
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
  if (contestListLoaded && !futureContestListLoaded) {
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

  if (contestListLoaded && futureContestListLoaded) {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={addTodoVisible}
          onRequestClose={() => toggleAddTodoModal()}
        >
          <AddContest closeModal={() => toggleAddTodoModal()} />
        </Modal>

        <View style={{ height: '5%', backgroundColor: 'orange' }} ></View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Contest <Text style={{ fontFamily: 'redhatdisplay-bold', color: 'skyblue' }}>Reminder</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.addList} onPress={() => toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add Contest</Text>
        </View>

        <View style={{ flex: 1, height: 275, width: '90%' }}>
          <FlatList
            data={futureContestList}
            keyExtractor={item => item.name.toString()}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderCard(item)}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 2,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    paddingHorizontal: 15,
    fontFamily: 'redhatdisplay-regular',
    fontSize: 38,
    color: colors.balck,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
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
  cardContainer: {
    height: 150,
    width: 320,
    alignSelf: "center",
    backgroundColor: "#6A706E",
    borderRadius: 30,
    marginBottom: 15,
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
    marginLeft: 20,
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
});