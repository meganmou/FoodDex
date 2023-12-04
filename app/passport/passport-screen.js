import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { router, Link, useNavigation } from "expo-router";
import { palette } from "../../assets/palette";
import PassportCuisineComponent from "../../components/PassportCuisineComponent";
import supabase from "../../Supabase";
import { SearchBar } from "react-native-elements";

export default function PassportPage() {
  // hide header bar
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // access cuisine data
  [cuisineData, setCuisineData] = useState(null);
  const fetchCuisineData = async () => {
    const response = await supabase.from("Cuisine Flags").select("*");
    setCuisineData(response.data);
  };
  useEffect(() => {
    fetchCuisineData();
  }, []);
  const filterCuisineData = async (currentQuery) => {
    const response = await supabase
      .from("Cuisine Flags")
      .select("*")
      .textSearch("country", `%${currentQuery.replace(" ", "&")}%`);
    setCuisineData(response.data);
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
      //console.log("fetch");
      await fetchCuisineData();
    } else {
      //console.log("filter");
      await filterCuisineData(searchQuery);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>My Passport</Text>
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search"
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
      </View>

      <View style={styles.new}>
        <View style={styles.newCuisineView}>
          <FlatList
            data={cuisineData}
            numColumns={3}
            renderItem={({ item }) => (
              <PassportCuisineComponent
                country={item.country}
                regularFlag={item.flag}
                bronzeFlag={item.bronze_flag}
                silverFlag={item.silver_flag}
                goldFlag={item.gold_flag}
              />
            )}
            key={(item) => item.country}
            keyExtractor={(item) => item.country}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: palette.white,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 50,
  },
  titleText: {
    fontFamily: "DM Serif Display Regular",
    fontSize: 30,
    color: palette.black,
  },
  header: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  searchBar: {
    width: "100%",
    padding: 10,
  },
});
