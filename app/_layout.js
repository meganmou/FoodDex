import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
} from "react-native";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { palette } from "../assets/palette";
import { useState, useContext } from "react";
import BadgeContext from "../BadgeContext";
import PostContext from "../PostContext";

//hide header; two headers because tab navigator AND stack navigator
export default function AppLayout() {
  // badgeContext
  const [mexicoCompleted, setMexicoCompleted] = useState(0);
  const [indiaCompleted, setIndiaCompleted] = useState(0);
  const [italyCompleted, setItalyCompleted] = useState(0);
  const [turkeyCompleted, setTurkeyCompleted] = useState(0);
  const [japanCompleted, setJapanCompleted] = useState(0);

  // postContext
  const [postInfo, setPostInfo] = useState([]);

  return (
    <BadgeContext.Provider
      value={{
        mexicoCompleted: [mexicoCompleted, setMexicoCompleted],
        indiaCompleted: [indiaCompleted, setIndiaCompleted],
        italyCompleted: [italyCompleted, setItalyCompleted],
        turkeyCompleted: [turkeyCompleted, setTurkeyCompleted],
        japanCompleted: [japanCompleted, setJapanCompleted],
      }}
    >
      <PostContext.Provider value={[postInfo, setPostInfo]}>
        <Tabs
          initialRouteName="home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: palette.olympicGreen,
            tabBarInactiveTintColor: palette.white,
            tabBarActiveBackgroundColor: "#C2E1C1",
            tabBarInactiveBackgroundColor: "#C2E1C1",
            tabBarStyle: {
              height: 78, // TODO: this is hardcoded (:
              backgroundColor: "#C2E1C1",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="passport"
            options={{
              tabBarLabel: "Passport",
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="map" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="feed"
            options={{
              tabBarLabel: "Feed",
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="images" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </PostContext.Provider>
    </BadgeContext.Provider>
  );
}
