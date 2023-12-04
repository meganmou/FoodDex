import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useState, useContext } from "react";
import { Link } from "expo-router";
import BadgeContext from "../BadgeContext";
import { palette } from "../assets/palette";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const NewCuisine = ({
  country,
  regularFlag,
  bronzeFlag,
  silverFlag,
  goldFlag,
}) => {
  let [recipesCompleted, setRecipesCompleted] = useState(0);
  const badgeContext = useContext(BadgeContext);

  // useContext
  if (country === "Mexico") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.mexicoCompleted;
  } else if (country === "India") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.indiaCompleted;
  } else if (country === "Italy") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.italyCompleted;
  } else if (country === "Turkey") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.turkeyCompleted;
  } else if (country === "Japan") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.japanCompleted;
  }

  let flagUrl = regularFlag;
  let badgeLevel = "";
  let badgeColor = palette.black;
  let badgeBorderColor = "gray";
  let badgeBorderWidth = StyleSheet.hairlineWidth;
  let badgeWidth = windowWidth * 0.2;
  let badgeHeight = windowHeight * 0.075;
  if (recipesCompleted === 1) {
    flagUrl = bronzeFlag;
    badgeLevel = "Bronze";
    badgeColor = palette.bronze;
    badgeBorderWidth = 0;
    badgeWidth = windowWidth * 0.21;
    badgeHeight = windowHeight * 0.079;
  } else if (recipesCompleted === 2) {
    flagUrl = silverFlag;
    badgeLevel = "Silver";
    badgeColor = palette.silver;
    badgeBorderWidth = 0;
    badgeWidth = windowWidth * 0.21;
    badgeHeight = windowHeight * 0.079;
  } else if (recipesCompleted === 3) {
    flagUrl = goldFlag;
    badgeLevel = "Gold";
    badgeColor = palette.gold;
    badgeBorderWidth = 0;
    badgeWidth = windowWidth * 0.21;
    badgeHeight = windowHeight * 0.079;
  }

  return (
    <Link
      href={{
        pathname: "home/newCuisineScreen",
        params: {
          countryName: country,
          regularFlag: regularFlag,
          bronzeFlag: bronzeFlag,
          silverFlag: silverFlag,
          goldFlag: goldFlag,
        },
      }}
      asChild
    >
      <Pressable>
        <View style={[styles.cuisineContainer, { width: badgeWidth }]}>
          <View style={[styles.imageContainer, { height: badgeHeight }]}>
            <Image
              source={{ uri: flagUrl }}
              style={[
                styles.flagPhoto,
                {
                  borderWidth: badgeBorderWidth,
                  borderColor: badgeBorderColor,
                },
              ]}
            />
          </View>
          <Text style={styles.countryText}>{country}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default NewCuisine;

const styles = StyleSheet.create({
  cuisineContainer: {
    //do windowWidth
    width: windowWidth * 0.2,
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 20,
    // borderColor: "red",
    // borderWidth: 2,
  },
  imageContainer: {
    width: "100%",
    height: windowHeight * 0.075,
    // paddingLeft: 5,
    //backgroundColor: "green",
    justifyContent: "flex-start",
  },
  flagPhoto: {
    // resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    aspectRatio: 1,
    alignSelf: "center",
  },
  countryText: {
    fontFamily: "Nunito Bold",
    fontSize: 15,
    marginTop: 5,
    alignSelf: "center",
  },
});
