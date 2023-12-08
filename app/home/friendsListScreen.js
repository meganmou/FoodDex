import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { palette } from "../../assets/palette";
import supabase from "../../Supabase";
import { router, Link, useLocalSearchParams, Stack } from "expo-router";
import FriendListComponent from "../../components/FriendListComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function FriendsListPage() {
  // access friends data
  [friendsData, setFriendsData] = useState(null);
  useEffect(() => {
    const fetchFriendsData = async () => {
      const response = await supabase.from("User Profiles").select("*");
      setFriendsData(response.data);
    };
    fetchFriendsData();
  }, []);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Friends",
          headerStyle: {
            backgroundColor: palette.white,
          },
        }}
      />
      <Text style={styles.titleText}>My Friends</Text>
      <View style={styles.listStyle}>
        <FlatList
          data={friendsData}
          renderItem={({ item }) => (
            <FriendListComponent
              name={item.name}
              photo={item.profile_photo}
              badges={item.num_badges}
              posts={item.num_posts}
              friends={item.num_friends}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: windowWidth * 0.065,
    backgroundColor: palette.white,
  },
  titleText: {
    fontFamily: "Dongle Regular",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 5,
  },
  listStyle: {
    alignSelf: "center",
    flexDirection: "column",
  },
});
