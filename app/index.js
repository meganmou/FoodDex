import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

import { Link } from "expo-router";

export default function Page() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FoodDex</Text>
        <Link
          href={{
            pathname: "my-profile/my-profile-screen",
          }}
          asChild
        >
          <Pressable>
            <Image
              source={require("../assets/my-profile-pic.png")}
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
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  header: {
    paddingTop: 30,
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
