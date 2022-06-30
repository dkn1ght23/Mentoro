<View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image style={styles.image} source={{ uri: profilePicture }} resizeMode="cover"/>
              </View>
              <View style={styles.dm}>
                <MaterialIcons name="chat" size={18} color="#DFD8C8" />
              </View>
              <View style={styles.active}></View>
              <View style={styles.add}>
                <TouchableOpacity onPress={() => navigation.navigate("PickImage")}>
                  <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 0, marginLeft: 4 }}/>
                </TouchableOpacity>
              </View>
            </View>