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
import {
  router,
  Link,
  useLocalSearchParams,
  Stack,
  useNavigation,
} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { palette } from "../../assets/palette";
import BadgeContext from "../../BadgeContext";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function badgeEarnedPage() {
  // hide header bar
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const params = useLocalSearchParams();
  let [recipesCompleted, setRecipesCompleted] = useState(0);
  const badgeContext = useContext(BadgeContext);

  // useContext
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

  let flagUrl = params.regularFlag;
  let badgeLevel = "";
  let badgeColor = palette.black;
  if (recipesCompleted === 1) {
    flagUrl = params.bronzeFlag;
    badgeLevel = "Bronze";
    badgeColor = palette.bronze;
  } else if (recipesCompleted === 2) {
    flagUrl = params.silverFlag;
    badgeLevel = "Silver";
    badgeColor = palette.silver;
  } else if (recipesCompleted === 3) {
    flagUrl = params.goldFlag;
    badgeLevel = "Gold";
    badgeColor = palette.gold;
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
      <Text style={styles.earnedText}>You've Earned a Badge!</Text>
      <Image source={{ uri: flagUrl }} style={styles.flagPhoto} />
      <View style={styles.subtextContainer}>
        <Text style={styles.countryText}>{params.cuisine}</Text>
        <Text style={[styles.badgeText, { color: badgeColor }]}>
          {badgeLevel}
        </Text>
      </View>
      <View>
        <View style={styles.buttons}>
          <Link
            href={{
              pathname: "passport/passport-screen",
            }}
            asChild
          >
            <Pressable>
              <Text style={styles.buttonText}>Share Post</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.buttons}>
          <Link
            href={{
              pathname: "passport/passport-screen",
            }}
            asChild
          >
            <Pressable>
              <Text style={styles.buttonText}>Exit</Text>
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
    padding: 24,
    backgroundColor: "#FFFFE0",
    justifyContent: "center",
  },
  messageText: {
    alignItems: "center",
    marginBottom: 10,
  },
  earnedText: {
    fontFamily: "DM Serif Display Regular",
    fontSize: 30,
  },
  subtextContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  countryText: {
    fontFamily: "Nunito Bold",
    fontSize: 25,
  },
  badgeText: {
    fontFamily: "Nunito Bold",
    fontSize: 17,
  },
  flagPhoto: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    borderRadius: 10,
    aspectRatio: 1,
    marginTop: 50,
    marginBottom: 30,
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.olympicGreen,
    width: windowWidth * 0.5,
    height: windowHeight * 0.05,
    borderRadius: 10,
    margin: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: palette.white,
    fontFamily: "Nunito Bold",
    fontSize: 20,
  },
});
