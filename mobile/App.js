import React from "react";
import { AppLoading } from "expo";
import { StatusBar } from "react-native";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";
import { LogBox } from "react-native";
import { YellowBox } from "react-native";

import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // LogBox.ignoreLogs(['Warning: ...']);
  // LogBox.ignoreAllLogs();
  YellowBox.ignoreWarnings(["Warning: ReactNative.createElement"]);
  console.disableYellowBox = true;
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Routes />
    </>
  );
}
