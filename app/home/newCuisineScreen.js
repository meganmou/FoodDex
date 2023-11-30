import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import RecipeListComponent from "../../components/RecipeListComponent";

export default function NewCuisinePage() {
  const params = useLocalSearchParams();
  // access all recipes for a country
  [countryRecipeInfo, setCountryRecipeInfo] = useState(null);
  useEffect(() => {
    const fetchCountryRecipeInfo = async () => {
      const response = await supabase
        .from("Recipes")
        .select("*")
        .eq("cuisine", params.countryName);
      setCountryRecipeInfo(response.data);
    };
    fetchCountryRecipeInfo();
  }, []);

  if (countryRecipeInfo) {
    //console.log(countryRecipeInfo);
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: params.countryName,
          }}
        />
        <View style={styles.countryHeader}>
          <Text style={styles.countryTitle}>{params.countryName}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: params.flagImage }}
              style={styles.flagPhoto}
            />
          </View>
        </View>
        <FlatList
          data={countryRecipeInfo}
          renderItem={({ item }) => (
            <RecipeListComponent
              name={item.name}
              photo={item.photo}
              description={item.description}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
  },
  scrollviewStyle: {
    //flexDirection: "column",
    width: windowWidth * 0.9,
  },
  countryHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  countryTitle: {
    fontFamily: "DM Serif Display Regular",
    fontSize: 40,
    marginLeft: 10,
  },
  imageContainer: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.05,
    // paddingLeft: 5,
    //backgroundColor: "green",
    justifyContent: "flex-start",
    marginBottom: 15,
    marginRight: 10,
  },
  flagPhoto: {
    // resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
});
