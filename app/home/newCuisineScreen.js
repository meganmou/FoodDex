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
import { SearchBar } from "react-native-elements";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import RecipeListComponent from "../../components/RecipeListComponent";
import { palette } from "../../assets/palette";

export default function NewCuisinePage() {
  const params = useLocalSearchParams();

  [countryRecipeInfo, setCountryRecipeInfo] = useState(null);

  // access all recipes for a country
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await supabase
        .from("Recipes")
        .select("*")
        .eq("cuisine", params.countryName);
      setCountryRecipeInfo(response.data);
    };
    fetchRecipes();
  }, []);

  // filter recipes for a country
  const filterRecipes = async (currentQuery) => {
    const response = await supabase
      .from("Recipes")
      .select("*")
      .eq("cuisine", params.countryName)
      .textSearch("name", `%${currentQuery.replace(" ", "&")}%`);
    // no support in database for looking for partial text
    // would need a column of partial strings to search for that
    // if search query is empty string, then display the original instead of displaying the filtered version
    //   .or(
    //     `name:ilike: %${currentQuery}%`,
    //     `description:ilike: %${currentQuery}%`
    //   );
    setCountryRecipeInfo(response.data);
  };

  // search bar functionality
  const [searchQuery, setSearchQuery] = useState("");

  //   const handleSubmitSearch = async () => {
  //     await filterRecipes(searchQuery);
  //   };

  const onChangeSearch = async (searchQuery) => {
    setSearchQuery(searchQuery);
    console.log(searchQuery);
    await filterRecipes(searchQuery);
    console.log("hi");
  };

  //console.log(countryRecipeInfo);
  if (countryRecipeInfo) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: params.countryName,
            headerStyle: {
              backgroundColor: palette.lightGray,
            },
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
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search for a cuisine, recipe, etc..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            inputContainerStyle={{ backgroundColor: "white", borderRadius: 10 }}
            // onSubmitEditing={handleSubmitSearch}
          />
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
  searchBar: {
    width: "100%",
    padding: 10,
  },
});
