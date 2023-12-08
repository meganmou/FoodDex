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
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import { useContext } from "react";
import PostListComponent from "../../components/PostListComponent";
import BadgeContext from "../../BadgeContext";
import PostContext from "../../PostContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MyProfilePage() {
  const badgeContext = useContext(BadgeContext);
  const postContext = useContext(PostContext);
  let [curPosts, setPostArray] = postContext;
  let numPosts = curPosts.length;

  let numBadges =
    badgeContext.mexicoCompleted[0] +
    badgeContext.indiaCompleted[0] +
    badgeContext.italyCompleted[0] +
    badgeContext.turkeyCompleted[0] +
    badgeContext.japanCompleted[0];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: palette.white,
          },
        }}
      />
      <View style={styles.profileHeader}>
        <Text style={styles.nameText}>James Landay</Text>
        <View style={styles.infoHeader}>
          <Image
            source={{
              uri: "https://kvdmzxoxtrgkzrqxxomw.supabase.co/storage/v1/object/sign/profile_photos/james.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX3Bob3Rvcy9qYW1lcy5qcGVnIiwiaWF0IjoxNzAxOTIwMDgxLCJleHAiOjE3MzM0NTYwODF9.5z1qMI8G25oM4gJffaLVdEIycsQ6lbppjRs3d7ImxLE&t=2023-12-07T03%3A34%3A41.674Z",
            }}
            style={styles.myProfilePic}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileText}>{numPosts}</Text>
            <Text style={styles.profileText}>Posts</Text>
          </View>
          <Link
            href={{
              pathname: "/home/friendsListScreen",
            }}
            asChild
          >
            <Pressable>
              <View style={styles.profileInfo}>
                <Text style={styles.profileText}>4</Text>
                <Text style={styles.profileText}>Friends</Text>
              </View>
            </Pressable>
          </Link>
          <Link
            href={{
              pathname: "passport/passport-screen",
            }}
            asChild
          >
            <Pressable>
              <View style={styles.profileInfo}>
                <Text style={styles.profileText}>{numBadges}</Text>
                <Text style={styles.profileText}>Badges</Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
      <View style={styles.postView}>
        <FlatList
          data={curPosts}
          numColumns={3}
          // horizontal
          renderItem={({ item }) => (
            <PostListComponent
              profileName="James Landay"
              photoPic={item[0]}
              photoCaption={item[1]}
              photoComments={[]}
              profilePhoto="https://kvdmzxoxtrgkzrqxxomw.supabase.co/storage/v1/object/sign/profile_photos/james.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX3Bob3Rvcy9qYW1lcy5qcGVnIiwiaWF0IjoxNzAxOTIwMDgxLCJleHAiOjE3MzM0NTYwODF9.5z1qMI8G25oM4gJffaLVdEIycsQ6lbppjRs3d7ImxLE&t=2023-12-07T03%3A34%3A41.674Z"
            />
          )}
          keyExtractor={(item) => item[0]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: palette.white,
    padding: 24,
  },
  profileHeader: {
    alignItems: "center",
    width: windowWidth,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    height: windowHeight * 0.6,
    //backgroundColor: "green",
    justifyContent: "center",
    //alignItems: "center",
    //alignSelf: "flex-start",
  },
});
