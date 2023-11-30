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
import { useNavigation } from "expo-router";
import supabase from "../../Supabase";
import { palette } from "../../assets/palette";
import { Searchbar } from "react-native-paper";
import TrendingRecipeComponent from "../../components/TrendingRecipeComponent";
import NewCuisineComponent from "../../components/NewCuisineComponent";
import { Link } from "expo-router";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomePage() {
  // hide header bar
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // access trending recipe data
  [recipeData, setRecipeData] = useState(null);
  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await supabase.from("Recipes").select("*");
      setRecipeData(response.data);
    };
    fetchRecipeData();
  }, []);
  trending_recipes = [];
  if (recipeData) {
    trending_recipes.push(recipeData[0]);
    trending_recipes.push(recipeData[8]);
    trending_recipes.push(recipeData[13]);
  }
  //console.log("trending recipes");
  //console.log(trending_recipes);

  // access new recipe data
  [cuisineData, setCuisineData] = useState(null);
  useEffect(() => {
    const fetchCuisineData = async () => {
      const response = await supabase.from("Cuisine Flags").select("*");
      setCuisineData(response.data);
    };
    fetchCuisineData();
  }, []);
  new_cuisines = [];
  if (cuisineData) {
    new_cuisines.push(cuisineData[0]);
    new_cuisines.push(cuisineData[1]);
    new_cuisines.push(cuisineData[2]);
  }
  // console.log("new cuisines");
  // console.log(new_cuisines);

  // search bar functionality
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>FoodDex</Text>
        <View style={styles.topButtons}>
          <Pressable>
            <View style={styles.friendsLink}>
              <Text style={styles.friendsText}>4</Text>
              <Text style={styles.friendsText}>friends</Text>
            </View>
          </Pressable>
          <Link
            href={{
              pathname: "/home/my-profile-screen",
            }}
            asChild
          >
            <Pressable>
              <Image
                source={require("../../assets/my-profile-pic.png")}
                style={styles.myProfilePic}
              />
            </Pressable>
          </Link>
        </View>
      </View>
      <View style={styles.searchBar}>
        <Searchbar
          placeholder="Search for a cuisine, recipe, etc..."
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.trending}>
        <Text style={styles.subtitleText}>Trending Recipes</Text>
        <FlatList
          data={trending_recipes}
          renderItem={({ item }) => (
            <TrendingRecipeComponent
              name={item.name}
              cuisine={item.cuisine}
              photo={item.photo}
            />
          )}
          keyExtractor={(item) => item.name}
          horizontal
        />
      </View>
      <View style={styles.new}>
        <Text style={styles.subtitleText}>New Cuisines for You</Text>
        <FlatList
          data={new_cuisines}
          renderItem={({ item }) => (
            <NewCuisineComponent country={item.country} flag={item.flag} />
          )}
          keyExtractor={(item) => item.country}
          horizontal
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: palette.lightGray,
    paddingTop: 50,
  },
  header: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  titleText: {
    fontFamily: "DM Serif Display Regular",
    fontSize: 40,
    color: palette.lightGreen,
  },
  topButtons: {
    flexDirection: "row",
  },
  friendsLink: {
    alignItems: "center",
  },
  friendsText: {
    fontFamily: "Nunito Regular",
    fontSize: 17,
    paddingRight: 5,
  },
  myProfilePic: {
    resizeMode: "contain",
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  searchBar: {
    width: "100%",
    padding: 10,
  },
  trending: {
    // flex: 1,
    height: windowHeight * 0.4,
    width: "100%",
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subtitleText: {
    fontFamily: "DM Serif Display Regular",
    fontSize: 27,
  },
  new: {
    width: "100%",
    padding: 10,
  },
});
