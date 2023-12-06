import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { palette } from "../../assets/palette";
import BadgeContext from "../../BadgeContext";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function confirmPassportRecipePage() {
  const params = useLocalSearchParams();
  const badgeContext = useContext(BadgeContext);
  if (params.cuisine === "Mexico") {
    console.log(badgeContext.mexicoCompleted[0]);
  } else if (params.cuisine === "India") {
    console.log(badgeContext.indiaCompleted[0]);
  } else if (params.cuisine === "Italy") {
    console.log(badgeContext.italyCompleted[0]);
  } else if (params.cuisine === "Turkey") {
    console.log(badgeContext.turkeyCompleted[0]);
  } else if (params.cuisine === "Japan") {
    console.log(badgeContext.japanCompleted[0]);
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: palette.white,
          },
        }}
      />
      <View style={styles.messageText}>
        <Text style={styles.congratsText}>Congrats on making</Text>
        <Text style={styles.nameText}>{params.name}</Text>
      </View>

      <Image source={{ uri: params.photo }} style={styles.recipePhoto} />
      <View style={styles.takePhoto}>
        <Link
          href={{
            pathname: "passport/badgeEarnedPassportScreen",
            params: {
              name: params.name,
              photo: params.photo,
              regularFlag: params.regularFlag,
              bronzeFlag: params.bronzeFlag,
              silverFlag: params.silverFlag,
              goldFlag: params.goldFlag,
              cuisine: params.cuisine,
            },
          }}
          asChild
        >
          <Pressable>
            <Image
              source={require("../../assets/check-mark.png")}
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
    backgroundColor: palette.white,
  },
  messageText: {
    alignItems: "center",
    marginBottom: 10,
  },
  congratsText: {
    fontFamily: "Nunito Regular",
    fontSize: 17,
  },
  nameText: {
    fontFamily: "Dongle Regular",
    fontSize: 35,
  },
  recipePhoto: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.57,
  },
  takePhoto: {
    alignItems: "center",
  },
  buttonPic: {
    resizeMode: "contain",
    height: 55,
    width: 55,
    marginTop: 5,
  },
});
