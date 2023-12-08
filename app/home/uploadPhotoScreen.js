import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "expo-router";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { palette } from "../../assets/palette";
import BadgeContext from "../../BadgeContext";
import supabase from "../../Supabase";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function uploadPhotoPage() {
  const params = useLocalSearchParams();

  // access camera roll photos
  [completedPhotos, setPhotoList] = useState(null);
  useEffect(() => {
    const fetchPhotoList = async () => {
      const response = await supabase.from("Recipes").select("completed_photo");
      setPhotoList(response.data);
    };
    fetchPhotoList();
  }, []);

  let photoUrl = "";

  if (completedPhotos) {
    photoUrl = completedPhotos[Math.floor(Math.random() * 14)].completed_photo;
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "",
            headerStyle: {
              backgroundColor: palette.white,
            },
          }}
        />
        <Text style={styles.infoText}>Uploaded From Camera Roll</Text>
        <Image source={{ uri: photoUrl }} style={styles.recipePhoto} />
        <View style={styles.takePhoto}>
          <Link
            href={{
              pathname: "home/makeUploadedPostScreen",
              params: {
                postPhoto: photoUrl,
              },
            }}
            asChild
          >
            <Pressable>
              <Image
                source={require("../../assets/check-mark.png")}
                style={styles.buttonPic}
              />
            </Pressable>
          </Link>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: windowWidth * 0.065,
    backgroundColor: palette.white,
  },
  infoText: {
    fontFamily: "Nunito Bold",
    fontSize: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  recipePhoto: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.57,
    marginBottom: 20,
  },
  takePhoto: {
    alignItems: "center",
  },
  buttonPic: {
    resizeMode: "contain",
    height: 55,
    width: 55,
    marginTop: 5,
  },
});
