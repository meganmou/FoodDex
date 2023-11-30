import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { palette } from "../../assets/palette";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TrendingRecipePage() {
  const params = useLocalSearchParams();
  // access recipe info
  [recipeInfo, setRecipeInfo] = useState(null);
  useEffect(() => {
    const fetchRecipeInfo = async () => {
      const response = await supabase
        .from("Recipes")
        .select("*")
        .eq("name", params.recipeName);
      setRecipeInfo(response.data);
    };
    fetchRecipeInfo();
  }, []);

  if (recipeInfo) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: params.recipeName,
            headerStyle: {
              backgroundColor: palette.lightGray,
            },
          }}
        />
        <ScrollView style={styles.scrollviewStyle}>
          <Image
            source={{ uri: recipeInfo[0].photo }}
            style={styles.recipePhoto}
          />
          <View style={styles.recipeHeader}>
            <Text style={styles.recipeTitle}>{recipeInfo[0].name}</Text>
            <Text style={styles.recipeCuisine}>{recipeInfo[0].cuisine}</Text>
          </View>
          <View style={styles.iconsHeader}>
            <View style={styles.icon}>
              <Ionicons name="time" size={35} />
              <Text style={styles.recipeAllInfoText}>
                {recipeInfo[0].cooking_time}
              </Text>
            </View>
            <View style={styles.icon}>
              <Ionicons name="speedometer" size={35} />
              <Text style={styles.recipeAllText}>
                {recipeInfo[0].difficulty}
              </Text>
            </View>
            <View style={styles.icon}>
              <Ionicons name="people" size={35} />
              <Text style={styles.recipeAllText}>{recipeInfo[0].servings}</Text>
            </View>
          </View>
          <Text style={styles.recipeAllInfoHeader}>Ingredients</Text>
          <Text style={styles.recipeAllInfoText}>
            {recipeInfo[0].ingredients}
          </Text>
          <Text style={styles.recipeAllInfoHeader}>Instructions</Text>
          <Text style={styles.recipeAllInfoText}>
            {recipeInfo[0].instructions}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  recipePhoto: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeHeader: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    alignItems: "center",
    width: windowWidth * 0.2,
    //backgroundColor: "green",
  },
  recipeTitle: {
    fontFamily: "DM Serif Display Regular",
    fontSize: 35,
  },
  recipeCuisine: {
    fontFamily: "Nunito Regular",
    fontSize: 20,
  },
  recipeAllInfoText: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
  },
  recipeAllInfoHeader: {
    fontFamily: "Nunito Bold",
    fontSize: 25,
    marginBottom: 10,
    marginTop: 10,
  },
  scrollviewStyle: {
    //flexDirection: "column",
    width: windowWidth * 0.9,
  },
});
