import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

//hide header; two headers because tab navigator AND stack navigator
export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
        name="messages"
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
  );
}
