import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "expo-router";
import supabase from "../../Supabase";
import { palette } from "../../assets/palette";
import { SearchBar } from "react-native-elements";
import TrendingRecipeComponent from "../../components/TrendingRecipeComponent";
import NewCuisineComponent from "../../components/NewCuisineComponent";
import { Link } from "expo-router";

import PostContext from "../../PostContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomePage() {
  //console.log(PostContext);

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
    <View style={{ flex: 1 }}>
      <View
        style={{ backgroundColor: "#C2E1C1", height: windowHeight * 0.05 }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/croissant.png")}
              style={styles.logoPic}
            />
            <Text style={styles.titleText}>FoodDex</Text>
          </View>
          <View style={styles.topButtons}>
            <Link
              href={{
                pathname: "/home/my-profile-screen",
              }}
              asChild
            >
              <Pressable>
                <Image
                  source={{
                    uri: "https://kvdmzxoxtrgkzrqxxomw.supabase.co/storage/v1/object/sign/profile_photos/james.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX3Bob3Rvcy9qYW1lcy5qcGVnIiwiaWF0IjoxNzAxOTIwMDgxLCJleHAiOjE3MzM0NTYwODF9.5z1qMI8G25oM4gJffaLVdEIycsQ6lbppjRs3d7ImxLE&t=2023-12-07T03%3A34%3A41.674Z",
                  }}
                  style={styles.myProfilePic}
                />
              </Pressable>
            </Link>
          </View>
        </View>
        <View style={styles.trending}>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitleText}>Trending Recipes</Text>
          </View>

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
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitleText}>Top Cuisines for You</Text>
          </View>
          <View style={styles.newCuisineView}>
            <FlatList
              data={new_cuisines}
              renderItem={({ item }) => (
                <NewCuisineComponent
                  country={item.country}
                  regularFlag={item.flag}
                  bronzeFlag={item.bronze_flag}
                  silverFlag={item.silver_flag}
                  goldFlag={item.gold_flag}
                />
              )}
              keyExtractor={(item) => item.country}
              horizontal
            />
          </View>
        </View>
      </View>
    </View>

    // ORIGINAL CODE
    // <View style={styles.container}>
    //   <View style={styles.header}>
    //     <View style={styles.logoContainer}>
    //       <Image
    //         source={require("../../assets/croissant.png")}
    //         style={styles.logoPic}
    //       />
    //       <Text style={styles.titleText}>FoodDex</Text>
    //     </View>
    //     <View style={styles.topButtons}>
    //       <Link
    //         href={{
    //           pathname: "/home/my-profile-screen",
    //         }}
    //         asChild
    //       >
    //         <Pressable>
    //           <Image
    //             source={{
    //               uri: "https://kvdmzxoxtrgkzrqxxomw.supabase.co/storage/v1/object/sign/profile_photos/james.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX3Bob3Rvcy9qYW1lcy5qcGVnIiwiaWF0IjoxNzAxOTIwMDgxLCJleHAiOjE3MzM0NTYwODF9.5z1qMI8G25oM4gJffaLVdEIycsQ6lbppjRs3d7ImxLE&t=2023-12-07T03%3A34%3A41.674Z",
    //             }}
    //             style={styles.myProfilePic}
    //           />
    //         </Pressable>
    //       </Link>
    //     </View>
    //   </View>
    //   <View style={styles.trending}>
    //     <View style={styles.subtitleRow}>
    //       <Text style={styles.subtitleText}>Trending Recipes</Text>
    //     </View>

    //     <FlatList
    //       data={trending_recipes}
    //       renderItem={({ item }) => (
    //         <TrendingRecipeComponent
    //           name={item.name}
    //           cuisine={item.cuisine}
    //           photo={item.photo}
    //         />
    //       )}
    //       keyExtractor={(item) => item.name}
    //       horizontal
    //     />
    //   </View>
    //   <View style={styles.new}>
    //     <View style={styles.subtitleRow}>
    //       <Text style={styles.subtitleText}>Top Cuisines for You</Text>
    //     </View>
    //     <View style={styles.newCuisineView}>
    //       <FlatList
    //         data={new_cuisines}
    //         renderItem={({ item }) => (
    //           <NewCuisineComponent
    //             country={item.country}
    //             regularFlag={item.flag}
    //             bronzeFlag={item.bronze_flag}
    //             silverFlag={item.silver_flag}
    //             goldFlag={item.gold_flag}
    //           />
    //         )}
    //         keyExtractor={(item) => item.country}
    //         horizontal
    //       />
    //     </View>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: palette.white,
    // borderBottomColor: "gray",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    //paddingTop: 50,
  },
  header: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    backgroundColor: "#C2E1C1",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoPic: {
    resizeMode: "contain",
    height: 55,
    width: 55,
    marginBottom: 7,
  },
  titleText: {
    fontFamily: "Dongle Regular",
    //fontFamily: "SF Display Bold",
    fontSize: 55,
    color: palette.olympicGreen,
  },
  topButtons: {
    flexDirection: "row",
  },
  myProfilePic: {
    resizeMode: "contain",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  trending: {
    // flex: 1,
    height: windowHeight * 0.4,
    width: "100%",
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtitleText: {
    fontFamily: "Dongle Regular",
    fontSize: 40,
  },
  subText: {
    fontFamily: "Nunito Regular",
    fontSize: 15,
  },
  new: {
    width: "100%",
    padding: 10,
  },
  newCuisineView: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: palette.lightGray,
    borderRadius: 15,
    marginTop: 10,
  },
});
