import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TrendingRecipe = ({ name, cuisine, photo }) => {
  return (
    <Link
      href={{
        pathname: "home/trendingRecipeScreen",
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
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.cuisineText}>{cuisine}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default TrendingRecipe;

const styles = StyleSheet.create({
  recipeContainer: {
    //do windowWidth
    width: windowWidth * 0.8,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: windowWidth * 0.02,
    //borderColor: "red",
    //borderWidth: 2,
  },
  recipeInfo: {
    //flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "orange",
    marginTop: 5,
  },
  nameText: {
    fontFamily: "Nunito Bold",
    fontSize: 20,
    paddingRight: windowWidth * 0.03,
  },
  cuisineText: {
    fontFamily: "Nunito Regular",
    fontSize: 20,
  },
  imageContainer: {
    width: "100%",
    height: windowHeight * 0.25,
    // paddingLeft: 5,
    //backgroundColor: "green",
    justifyContent: "flex-start",
  },
  recipePhoto: {
    // resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
});
