import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import BadgeContext from "../BadgeContext";
import { useState, useContext } from "react";
import { Link } from "expo-router";
import { palette } from "../assets/palette";
import Ionicons from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PostComponent = ({
  profileName,
  photoPic,
  photoCaption,
  photoComments,
  profilePhoto,
}) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.profileInfo}>
        <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
        <Text style={styles.profileName}>{profileName}</Text>
      </View>
      <Link
        href={{
          pathname: "feed/feedPostScreen",
          params: {
            profile_name: profileName,
            photo_pic: photoPic,
            photo_caption: photoCaption,
            photo_comments: photoComments,
            profile_photo: profilePhoto,
          },
        }}
        asChild
      >
        <Pressable>
          <Image source={{ uri: photoPic }} style={styles.postPhoto} />
        </Pressable>
      </Link>
      <Text style={styles.postCaption}>{photoCaption}</Text>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: palette.white,
    //flex: 1,
    paddingBottom: windowWidth * 0.06,
    //alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: windowWidth * 0.035,
  },
  profileName: {
    fontFamily: "Dongle Regular",
    fontSize: 30,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  postPhoto: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    //aspectRatio: 1,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  postCaption: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});
