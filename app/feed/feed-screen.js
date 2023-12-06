import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { router, Link, useNavigation } from "expo-router";
import { palette } from "../../assets/palette";
import PostComponent from "../../components/PostComponent";
import supabase from "../../Supabase";
import { SearchBar } from "react-native-elements";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function FeedPage() {
  // hide header bar
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // access post data
  [postData, setPostData] = useState(null);
  useEffect(() => {
    const fetchPostData = async () => {
      const response = await supabase.from("Posts").select("*");
      setPostData(response.data);
    };
    fetchPostData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>My Feed</Text>
      <View style={styles.postsList}>
        <FlatList
          data={postData}
          renderItem={({ item }) => (
            <PostComponent
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingLeft: 24,
    paddingRight: 24,
    //marginTop: 50,
    backgroundColor: "white",
  },
  titleText: {
    fontFamily: "Dongle Regular",
    fontSize: 40,
    color: palette.black,
    marginBottom: 10,
  },
  postsList: {
    width: windowWidth * 0.9,
    alignSelf: "center",
    //backgroundColor: "red",
    flexDirection: "column",
    marginBottom: 60,
  },
});
