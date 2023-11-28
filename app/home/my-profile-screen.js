import { StyleSheet, Text, View, Image } from "react-native";

import { router, Link, useLocalSearchParams, Stack } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "My Profile",
        }}
      />
      <View style={styles.nameHeader}>
        <Text style={styles.nameText}>James Landay</Text>
        <View style={styles.profileHeader}>
          <Image
            source={require("../../assets/my-profile-pic.png")}
            style={styles.myProfilePic}
          />
          <View style={styles.profileInfo}></View>
          <View style={styles.pictureSeparator}>
            <View style={styles.pictureGrid}></View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  nameHeader: {
    justifyContent: "center",
  },
  nameText: {
    fontFamily: "DM Serif Display Regular",
    fontSize: 30,
    fontWeight: "bold",
  },
  myProfilePic: {
    resizeMode: "contain",
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  profileHeader: {},
  profileInfo: {},
  pictureSeparator: {},
  pictureGrid: {},
});
