import PostComponent from "../../components/PostComponent";
import { palette } from "../../assets/palette";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import { useState, useContext } from "react";
import CommentComponent from "../../components/CommentComponent";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function FeedPostPage() {
  const params = useLocalSearchParams();

  // like button
  const unlikedHeart = "heart-dislike";
  const likedHeart = "heart";
  const [liked, setLike] = useState(false);

  const changeLike = () => {
    setLike(!liked);
  };

  // add comment functionality
  const [commenting, setCommenting] = useState(false);
  const addComment = () => {
    setCommenting(true);
  };

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([params.photo_comments]);
  //console.log(comments);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: params.profile_name,
          headerStyle: {
            backgroundColor: palette.white,
          },
        }}
      />
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: params.profile_photo }}
          style={styles.profilePhoto}
        />
        <Text style={styles.profileName}>{params.profile_name}</Text>
      </View>
      <Image source={{ uri: params.photo_pic }} style={styles.postPhoto} />
      <View style={styles.postActions}>
        <View style={styles.actionButton}>
          <Pressable onPress={changeLike}>
            <Image
              source={
                liked
                  ? require("../../assets/like_regular_light.png")
                  : require("../../assets/like_solid_light.png")
              }
              style={{ height: 20, width: 20 }}
            />
          </Pressable>
          <Text style={styles.actionText}>Like</Text>
        </View>
        <Pressable onPress={addComment}>
          <View style={styles.actionButton}>
            <Image
              source={require("../../assets/comment.png")}
              style={{ height: 18, width: 20 }}
            />
            <Text style={styles.actionText}>Comment</Text>
          </View>
        </Pressable>
      </View>

      <Text style={styles.postCaption}>{params.photo_caption}</Text>
      <View style={styles.commentsList}>
        <FlatList
          data={comments}
          renderItem={({ item }) => <CommentComponent commentInfo={item} />}
          keyExtractor={(item) => item}
        />
      </View>

      {commenting && (
        <View>
          <TextInput
            style={styles.input}
            value={newComment}
            placeholder="Add a comment and press enter"
            onChangeText={(text) => setNewComment(text)}
            onSubmitEditing={() => {
              const updatedComments = [
                ...comments,
                "James Landay," + newComment,
              ];
              setComments(updatedComments);
              setNewComment(""); // Clear the input after submitting
              setCommenting(false); // Close the comment input after submitting
            }}
            returnKeyType="done"
          />
        </View>
      )}
    </View>
  );
}
//<Text style={styles.postComments}>{params.photo_comments}</Text>
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    flex: 1,
    padding: 24,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
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
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    aspectRatio: 1,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontFamily: "Nunito Regular",
    fontSize: 17,
    marginLeft: 5,
  },
  postCaption: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: windowWidth * 0.875,
    borderRadius: 10,
    borderColor: palette.darkGray,
    alignSelf: "center",
  },
  commentsList: {
    width: windowWidth * 0.8,
    flex: 1,
  },
});
