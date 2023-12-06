import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { palette } from "../../assets/palette";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import { useContext } from "react";
import BadgeContext from "../../BadgeContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MyProfilePage() {
  const badgeContext = useContext(BadgeContext);

  let numBadges =
    badgeContext.mexicoCompleted[0] +
    badgeContext.indiaCompleted[0] +
    badgeContext.italyCompleted[0] +
    badgeContext.turkeyCompleted[0] +
    badgeContext.japanCompleted[0];

  //console.log(numBadges);

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
            source={require("../../assets/my-profile-pic.png")}
            style={styles.myProfilePic}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileText}>0</Text>
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
  pictureSeparator: {},
  pictureGrid: {},
});
