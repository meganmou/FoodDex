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
import NewCuisineRecipeListComponent from "../../components/NewCuisineRecipeListComponent";
import { palette } from "../../assets/palette";

export default function NewCuisinePage() {
  const params = useLocalSearchParams();

  [countryRecipeInfo, setCountryRecipeInfo] = useState(null);

  // access all recipes for a country
  const fetchRecipes = async () => {
    const response = await supabase
      .from("Recipes")
      .select("*")
      .eq("cuisine", params.countryName);
    setCountryRecipeInfo(response.data);
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  // filter recipes for a country
  const filterRecipes = async (currentQuery) => {
    const response = await supabase
      .from("Recipes")
      .select("*")
      .eq("cuisine", params.countryName)
      .textSearch(
        "name_description_filters",
        `%${currentQuery.replace(" ", "&")}%`
      );
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
    if (searchQuery === "") {
      await fetchRecipes();
    } else {
      await filterRecipes(searchQuery);
    }
  };

  //console.log(countryRecipeInfo);
  if (countryRecipeInfo) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: params.countryName,
            headerStyle: {
              backgroundColor: palette.white,
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
            placeholder="Search or type filter options"
            onChangeText={onChangeSearch}
            value={searchQuery}
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            inputContainerStyle={{
              backgroundColor: palette.lightGray,
              borderRadius: 10,
            }}
            // onSubmitEditing={handleSubmitSearch}
          />
        </View>
        <Text style={styles.filterTitle}>Filter Options</Text>
        <View style={styles.filterOptions}>
          <Text style={styles.filterText}>Easy | Medium | Hard</Text>
          <Text style={styles.filterText}>Vegan | Vegetarian</Text>
          <Text style={styles.filterText}>
            30 min | Kid friendly | Fan favorite
          </Text>
        </View>
        <FlatList
          data={countryRecipeInfo}
          renderItem={({ item }) => (
            <NewCuisineRecipeListComponent
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
    backgroundColor: palette.white,
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  filterOptions: {
    backgroundColor: palette.lightOrange,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginTop: 5,
    marginBottom: 10,
  },
  filterTitle: {
    fontFamily: "DM Serif Display Regular",
    fontSize: 20,
  },
  filterText: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
    color: palette.darkOrange,
    padding: 3,
  },
});
