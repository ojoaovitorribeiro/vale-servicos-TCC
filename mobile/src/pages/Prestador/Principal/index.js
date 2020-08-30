import React from "react";
import { View, StyleSheet, Text, Image, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Principal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const prestador = route.params.prestador;
  // console.log(route.params.prestador);

  function handleNavigateToDadosPessoais(prestador) {
    navigation.navigate("DadosPessoais", { prestador });
  }
  function handleNavigateToServicos(prestador) {
    navigation.navigate("ListaServicos", { prestador });
  }
  function handleNavigateToAdServicos(prestador) {
    navigation.navigate("AdServicos", { prestador });
  }
  function handleNavigateToHome() {
    navigation.navigate("Home");
  }
  const createAlert = () =>
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log(),
        },
        {
          text: "Sair",
          onPress: () => {
            return handleNavigateToHome();
          },
        },
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={require("../../../assets/background.png")} />
        <Text style={styles.title}>Olá, {prestador.nome}</Text>
      </View>

      <View style={styles.menu}>
        <Text
          style={styles.menuIcon}
          onPress={() => handleNavigateToDadosPessoais(prestador)}
        >
          <MaterialCommunityIcons
            name="account-badge-horizontal-outline"
            size={32}
            color="white"
          />
        </Text>
        <Text
          style={styles.menuIcon}
          onPress={() => handleNavigateToServicos(prestador)}
        >
          <FontAwesome5 name="tools" size={30} color="white" />
        </Text>
        <Text
          style={styles.menuIcon}
          onPress={() => handleNavigateToAdServicos(prestador)}
        >
          <Feather name="plus-circle" size={34} color="white" />
        </Text>
        <Text style={styles.menuIcon} onPress={createAlert}>
          <Entypo name="log-out" size={30} color="white" />
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    flex: 0.1,
    backgroundColor: "#0426B0",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  menuIcon: {
    marginBottom: "auto",
    marginTop: "auto",
    paddingEnd: 30,
    paddingStart: 30,
  },
  image: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    marginBottom: 15,
    color: "#13131a",
    // fontWeight: "bold",
    textAlign: "center",
  },
});
export default Principal;
