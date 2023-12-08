import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import {
  router,
  Link,
  useLocalSearchParams,
  Stack,
  useNavigation,
} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostContext from "../../PostContext";
import { palette } from "../../assets/palette";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function trendingPostPage() {
  const params = useLocalSearchParams();

  const [isWriting, setWritingStatus] = useState(true);
  const [caption, setCaption] = useState("");

  // PostContext
  const postContext = useContext(PostContext);
  let [curPosts, setPostArray] = postContext;
  //console.log("Current Posts in makeTrendingPostScreen:", curPosts);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Share Post",
          headerStyle: {
            backgroundColor: palette.white,
          },
        }}
      />
      <Text style={styles.titleText}>New Post</Text>
      <Image source={{ uri: params.postPhoto }} style={styles.recipePhoto} />
      <Text style={styles.captionText}>{caption}</Text>
      {isWriting && (
        <View>
          <TextInput
            style={styles.input}
            value={caption}
            placeholder="Add a caption and press enter"
            onChangeText={(text) => setCaption(text)}
            onSubmitEditing={() => {
              setWritingStatus(false); // Close the comment input after submitting
            }}
            returnKeyType="done"
          />
        </View>
      )}
      <View style={styles.button}>
        <Link
          href={{
            pathname: "home/my-profile-screen",
          }}
          asChild
        >
          <Pressable
            onPress={() => {
              const updatedPosts = [...curPosts, [params.postPhoto, caption]];
              setPostArray(updatedPosts);
            }}
          >
            <Text style={styles.buttonText}>Post</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    paddingTop: 12,
    backgroundColor: palette.white,
    //justifyContent: "center",
  },
  titleText: {
    fontFamily: "Dongle Regular",
    fontSize: 40,
    marginBottom: 10,
  },
  recipePhoto: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.4,
    aspectRatio: 1,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  captionText: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
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
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.olympicGreen,
    width: windowWidth * 0.3,
    height: windowHeight * 0.04,
    borderRadius: 10,
    margin: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: palette.white,
    fontFamily: "Nunito Bold",
    fontSize: 20,
  },
});
