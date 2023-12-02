import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const NewCuisine = ({ country, flag }) => {
  return (
    <Link
      href={{
        pathname: "home/newCuisineScreen",
        params: {
          countryName: country,
          flagImage: flag,
        },
      }}
      asChild
    >
      <Pressable>
        <View style={styles.cuisineContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: flag }} style={styles.flagPhoto} />
          </View>
          <Text style={styles.countryText}>{country}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default NewCuisine;

const styles = StyleSheet.create({
  cuisineContainer: {
    //do windowWidth
    width: windowWidth * 0.2,
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 20,
    // borderColor: "red",
    // borderWidth: 2,
  },
  recipeInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "orange",
  },
  imageContainer: {
    width: "100%",
    height: windowHeight * 0.075,
    // paddingLeft: 5,
    //backgroundColor: "green",
    justifyContent: "flex-start",
  },
  flagPhoto: {
    // resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  countryText: {
    fontFamily: "Nunito Bold",
    fontSize: 15,
    marginTop: 5,
  },
});
