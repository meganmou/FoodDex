import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useRouter, useRootNavigationState, Redirect } from "expo-router";

export default function App() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [fontsLoaded] = useFonts({
    "DM Sans Light": require("../assets/fonts/DMSans-Light.ttf"),
    "DM Sans Regular": require("../assets/fonts/DMSans-Regular.ttf"),
    "DM Sans Semibold": require("../assets/fonts/DMSans-SemiBold.ttf"),
    "DM Serif Display Regular": require("../assets/fonts/DMSerifDisplay-Regular.ttf"),
    "Nunito Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Dongle Light": require("../assets/fonts/Dongle-Light.ttf"),
    "Dongle Regular": require("../assets/fonts/Dongle-Regular.ttf"),
    "Dongle Bold": require("../assets/fonts/Dongle-Bold.ttf"),
  });
  if (fontsLoaded) {
    return <Redirect href="/home/home-screen/" />;
  }

  //return router.push("home/home-screen");
}
//put useEffect that routes you to home; call some expo router function
