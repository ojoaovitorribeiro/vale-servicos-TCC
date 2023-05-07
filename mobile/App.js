import React from "react";
import { StatusBar, ActivityIndicator, View } from "react-native";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";


import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={{flex:1,
      alignItems:"center",
      justifyContent:"center"}} ><ActivityIndicator size='large' /></View> ;
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Routes />
    </>
  );
}
