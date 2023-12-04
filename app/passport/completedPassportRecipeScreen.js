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

export default function completedPassportRecipePage() {
  const params = useLocalSearchParams();
  let [recipesCompleted, setRecipesCompleted] = useState(0);
  const badgeContext = useContext(BadgeContext);
  if (params.cuisine === "Mexico") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.mexicoCompleted;
  } else if (params.cuisine === "India") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.indiaCompleted;
  } else if (params.cuisine === "Italy") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.italyCompleted;
  } else if (params.cuisine === "Turkey") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.turkeyCompleted;
  } else if (params.cuisine === "Japan") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.japanCompleted;
  }
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
            pathname: "passport/confirmPhotoPassportScreen",
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
          <Pressable onPress={() => setRecipesCompleted(recipesCompleted + 1)}>
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
