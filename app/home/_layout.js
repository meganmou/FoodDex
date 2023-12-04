import { Stack } from "expo-router";
import { palette } from "../../assets/palette";
import { useState } from "react";
import BadgeContext from "../../BadgeContext";

export default function HomeLayout() {
  // const [mexicoCompleted, setMexicoCompleted] = useState(0);
  // const [indiaCompleted, setIndiaCompleted] = useState(0);
  // const [italyCompleted, setItalyCompleted] = useState(0);
  // const [turkeyCompleted, setTurkeyCompleted] = useState(0);
  // const [japanCompleted, setJapanCompleted] = useState(0);
  return (
    // <BadgeContext.Provider
    //   value={{
    //     mexicoCompleted: [mexicoCompleted, setMexicoCompleted],
    //     indiaCompleted: [indiaCompleted, setIndiaCompleted],
    //     italyCompleted: [italyCompleted, setItalyCompleted],
    //     turkeyCompleted: [turkeyCompleted, setTurkeyCompleted],
    //     japanCompleted: [japanCompleted, setJapanCompleted],
    //   }}
    // >
    <Stack />
    // </BadgeContext.Provider>
  );
}
