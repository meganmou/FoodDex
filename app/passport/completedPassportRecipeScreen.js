import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { palette } from "../../assets/palette";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function completedPassportRecipePage() {
  const params = useLocalSearchParams();
  console.log("name");
  console.log(params.name);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Take A Photo!",
          headerStyle: {
            backgroundColor: palette.black,
          },
          headerTintColor: palette.white,
        }}
      />
      <Image source={{ uri: params.photo }} style={styles.recipePhoto} />
      <View style={styles.takePhoto}>
        <Link
          href={{
            pathname: "home/home-screen",
          }}
          asChild
        >
          <Pressable>
            <Image
              source={require("../../assets/camera-button-2.png")}
              style={styles.buttonPic}
            />
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
    backgroundColor: palette.black,
  },
  recipePhoto: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.65,
  },
  takePhoto: {
    alignItems: "center",
  },
  buttonPic: {
    resizeMode: "contain",
    height: 120,
    width: 120,
  },
});
