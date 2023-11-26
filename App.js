import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";

//SplashScreen.preventAutoHideAsync();

export default function App() {
  console.log("Hello");
  /*const [fontsLoaded] = useFonts({
    "DM Sans Light": require("./assets/fonts/DMSans-Light.ttf"),
    "DM Sans Regular": require("./assets/fonts/DMSans-Regular.ttf"),
    "DM Sans Semibold": require("./assets/fonts/DMSans-SemiBold.ttf"),
    "DM Serif Display Regular": require("./assets/fonts/DMSerifDisplay-Regular.ttf"),
    "Nunito Light": require("./assets/fonts/Nunito-Light.ttf"),
    "Nunito Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "Nunito Bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  console.log("Fonts Loaded:", fontsLoaded);*/

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
