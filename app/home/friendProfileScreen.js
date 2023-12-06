import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import { palette } from "../../assets/palette";
import supabase from "../../Supabase";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import { useState, useEffect } from "react";
import PostListComponent from "../../components/PostListComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function FriendProfilePage() {
  const params = useLocalSearchParams();
  // access post  data
  [postData, setPostData] = useState(null);
  useEffect(() => {
    const fetchPostData = async () => {
      const response = await supabase
        .from("Posts")
        .select("*")
        .eq("profile_name", params.friendName);
      setPostData(response.data);
    };
    fetchPostData();
  }, []);
  if (postData) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Friend Profile",
            headerStyle: {
              backgroundColor: palette.white,
            },
          }}
        />
        <View style={styles.profileHeader}>
          <Text style={styles.nameText}>{params.friendName}</Text>
          <View style={styles.infoHeader}>
            <Image
              source={{ uri: params.friendPhoto }}
              style={styles.myProfilePic}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>{params.numPosts}</Text>
              <Text style={styles.profileText}>Posts</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>{params.numFriends}</Text>
              <Text style={styles.profileText}>Friends</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>{params.numBadges}</Text>
              <Text style={styles.profileText}>Badges</Text>
            </View>
          </View>
        </View>
        <View style={styles.postView}>
          <FlatList
            data={postData}
            horizontal
            renderItem={({ item }) => (
              <PostListComponent
                profileName={item.profile_name}
                photoPic={item.photo}
                photoCaption={item.caption}
                photoComments={item.comments}
                profilePhoto={item.profile_photo}
              />
            )}
            keyExtractor={(item) => item.caption}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    backgroundColor: palette.white,
    //padding: 24,
  },
  profileHeader: {
    alignItems: "center",
    width: windowWidth,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "center",
    padding: 12,
    paddingBottom: 20,
  },
  nameText: {
    fontFamily: "Dongle Regular",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 15,
  },
  myProfilePic: {
    resizeMode: "contain",
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 5,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileText: {
    fontFamily: "Nunito Bold",
    fontSize: 15,
  },
  postView: {
    width: windowWidth,
    height: windowHeight * 0.15,
    //backgroundColor: "green",
    justifyContent: "center",
    //alignItems: "center",
    //alignSelf: "flex-start",
  },
});
