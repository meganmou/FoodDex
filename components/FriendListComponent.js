import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import { palette } from "../assets/palette";
import Ionicons from "@expo/vector-icons/Ionicons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const FriendListItem = ({ name, photo, badges, posts, friends }) => {
  return (
    <Link
      href={{
        pathname: "home/friendProfileScreen",
        params: {
          friendName: name,
          friendPhoto: photo,
          numBadges: badges,
          numPosts: posts,
          numFriends: friends,
        },
      }}
      asChild
    >
      <Pressable>
        <View style={styles.friendListContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: photo }} style={styles.friendProfilePhoto} />
          </View>
          <View style={styles.friendInfo}>
            <Text style={styles.friendTitle}>{name}</Text>
            <Text style={styles.friendDescription}>{badges} badges earned</Text>
          </View>
          <View>
            <Ionicons name="arrow-forward" size={25} />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default FriendListItem;

const styles = StyleSheet.create({
  friendListContainer: {
    flexDirection: "row",
    width: windowWidth * 0.85,
    height: windowHeight * 0.13,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 15,
    backgroundColor: palette.lightGray,
    borderRadius: 10,
    //borderColor: "red",
    //borderWidth: 2,
    marginBottom: 20,
  },
  imageContainer: {
    width: "25%",
    height: "90%",
    marginRight: 10,
  },
  friendProfilePhoto: {
    // resizeMode: "contain",
    height: "100%",
    width: "100%",
    //borderWidth: 1,
    borderRadius: 50,
  },
  friendInfo: {
    alignItems: "flex-start",
    width: "60%",
    padding: 15,
  },
  friendTitle: {
    fontFamily: "Nunito Bold",
    fontSize: 15,
  },
  friendDescription: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
    color: "gray",
  },
});
