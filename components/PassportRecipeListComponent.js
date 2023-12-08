import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import { palette } from "../assets/palette";
import Ionicons from "@expo/vector-icons/Ionicons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RecipeListItem = ({ name, photo, description }) => {
  return (
    <Link
      href={{
        pathname: "passport/passportRecipeScreen",
        params: {
          recipeName: name,
        },
      }}
      asChild
    >
      <Pressable>
        <View style={styles.recipeContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: photo }} style={styles.recipePhoto} />
          </View>
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle}>{name}</Text>
            <Text style={styles.recipeDescription}>{description}</Text>
          </View>
          <View>
            <Ionicons name="arrow-forward" size={25} />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default RecipeListItem;

const styles = StyleSheet.create({
  recipeContainer: {
    flexDirection: "row",
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: windowWidth * 0.035,
    backgroundColor: palette.lightGray,
    borderRadius: 10,
    //borderColor: "red",
    //borderWidth: 2,
    margin: 10,
  },
  imageContainer: {
    width: "30%",
    height: "100%",
    marginRight: 10,
  },
  recipePhoto: {
    // resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  recipeInfo: {
    alignItems: "flex-start",
    width: "60%",
    padding: windowWidth * 0.035,
  },
  recipeTitle: {
    fontFamily: "Nunito Bold",
    fontSize: 15,
  },
  recipeDescription: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
    color: "gray",
  },
});
