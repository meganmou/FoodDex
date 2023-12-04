import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { palette } from "../assets/palette";
import { useState, useContext } from "react";
import BadgeContext from "../BadgeContext";

//hide header; two headers because tab navigator AND stack navigator
export default function AppLayout() {
  const [mexicoCompleted, setMexicoCompleted] = useState(0);
  const [indiaCompleted, setIndiaCompleted] = useState(0);
  const [italyCompleted, setItalyCompleted] = useState(0);
  const [turkeyCompleted, setTurkeyCompleted] = useState(0);
  const [japanCompleted, setJapanCompleted] = useState(0);
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
      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: palette.olympicGreen,
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
    </BadgeContext.Provider>
  );
}
