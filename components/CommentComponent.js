import { useLocalSearchParams, Stack } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useState, useContext } from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CommentComponent = ({ commentInfo }) => {
  // parse existing comments
  let commentStringParts = commentInfo.split(",");
  //console.log(commentStringParts);

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.usernameStyle}>{commentStringParts[0]}</Text>
      <Text style={styles.commentStyle}>{commentStringParts[1]}</Text>
    </View>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({
  commentContainer: {
    // flex: 1,
    width: windowWidth * 0.55,
    flexDirection: "row",
    //alignItems: "center",
    marginTop: 5,
    //marginBottom: 5,
  },
  usernameStyle: {
    fontFamily: "Nunito Bold",
    fontSize: 15,
    marginRight: 5,
    //backgroundColor: "green",
  },
  commentStyle: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
    //backgroundColor: "blue",
  },
});
