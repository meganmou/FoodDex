import { useFonts } from "expo-font";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [fontsLoaded] = useFonts({
    "DM Sans Light": require("../assets/fonts/DMSans-Light.ttf"),
    "DM Sans Regular": require("../assets/fonts/DMSans-Regular.ttf"),
    "DM Sans Semibold": require("../assets/fonts/DMSans-SemiBold.ttf"),
    "DM Serif Display Regular": require("../assets/fonts/DMSerifDisplay-Regular.ttf"),
    "Nunito Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito Bold": require("../assets/fonts/Nunito-Bold.ttf"),
  });
}
