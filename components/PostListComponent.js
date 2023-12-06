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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PostListComponent = ({
  profileName,
  photoPic,
  photoCaption,
  photoComments,
  profilePhoto,
}) => {
  return (
    <Link
      href={{
        pathname: "home/profilePostScreen",
        params: {
          test: "hi",
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
        <View style={styles.imageContainer}>
          <Image source={{ uri: photoPic }} style={styles.postPhoto} />
        </View>
      </Pressable>
    </Link>
  );
};

export default PostListComponent;

const styles = StyleSheet.create({
  imageContainer: {
    //width: windowWidth * 0.3,
    //height: windowHeight * 0.2,
    // paddingLeft: 5,
    //backgroundColor: "green",
    width: "100%",
    justifyContent: "flex-start",
    aspectRatio: 1,
    //borderWidth: 1,
    //borderColor: "red",
    flex: 1,
    marginRight: 3,
  },
  postPhoto: {
    // resizeMode: "contain",
    //height: "100%",
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    // alignSelf: "center",
  },
});
