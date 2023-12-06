import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";
import NewCuisineRecipeListComponent from "../../components/NewCuisineRecipeListComponent";
import { palette } from "../../assets/palette";
import BadgeContext from "../../BadgeContext";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function NewCuisinePage() {
  const params = useLocalSearchParams();

  let [recipesCompleted, setRecipesCompleted] = useState(0);
  const badgeContext = useContext(BadgeContext);

  // useContext
  if (params.countryName === "Mexico") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.mexicoCompleted;
  } else if (params.countryName === "India") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.indiaCompleted;
  } else if (params.countryName === "Italy") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.italyCompleted;
  } else if (params.countryName === "Turkey") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.turkeyCompleted;
  } else if (params.countryName === "Japan") {
    [recipesCompleted, setRecipesCompleted] = badgeContext.japanCompleted;
  }

  let flagUrl = params.regularFlag;
  let badgeLevel = "";
  let badgeColor = palette.black;
  let badgeBorderColor = "gray";
  let badgeBorderWidth = StyleSheet.hairlineWidth;
  if (recipesCompleted === 1) {
    flagUrl = params.bronzeFlag;
    badgeLevel = "Bronze";
    badgeColor = palette.bronze;
    badgeBorderWidth = 0;
  } else if (recipesCompleted === 2) {
    flagUrl = params.silverFlag;
    badgeLevel = "Silver";
    badgeColor = palette.silver;
    badgeBorderWidth = 0;
  } else if (recipesCompleted === 3) {
    flagUrl = params.goldFlag;
    badgeLevel = "Gold";
    badgeColor = palette.gold;
    badgeBorderWidth = 0;
  }

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
    //alignItems: "center",
    justifyContent: "space-between",
    // borderBottomColor: "gray",
    // borderBottomWidth: 1,
    //backgroundColor: "red",
  },
  countryTitle: {
    fontFamily: "Dongle Regular",
    fontSize: 50,
    marginLeft: 10,
  },
  imageContainer: {
    width: windowWidth * 0.17,
    height: windowHeight * 0.07,
    // paddingLeft: 5,
    //backgroundColor: "green",
    justifyContent: "flex-start",
    //marginBottom: 15,
  },
  flagPhoto: {
    // resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    aspectRatio: 1,
  },
  searchBar: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
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
    fontFamily: "Dongle Regular",
    fontSize: 30,
  },
  filterText: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
    color: palette.darkOrange,
    padding: 3,
  },
});
