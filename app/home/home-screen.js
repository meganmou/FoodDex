import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import supabase from "../../Supabase";
import { palette } from "../../assets/palette";

import { Link } from "expo-router";

export default function Page() {
  const [data, setData] = useState(null);
  const router = useRouter();

  /*useEffect(() => {
    // Fetch data on initial load
    const fetchData = async () => {
      const response = await supabase.from("Recipes").select("*");
      setData(response.data);
    };
    fetchData();
  }, []);

  console.log(data[0].name);*/

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FoodDex</Text>
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
      <View style={styles.trending}></View>
      <View style={styles.new}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: palette.lightGray,
  },
  title: {
    fontFamily: "DM Serif Display Regular",
    fontSize: 40,
    color: palette.lightGreen,
  },
  header: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  trending: {},
  new: {},
  myProfilePic: {
    resizeMode: "contain",
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
