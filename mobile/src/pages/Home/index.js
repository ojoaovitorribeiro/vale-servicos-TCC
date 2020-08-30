import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  function handleNavigationToLogin() {
    navigation.navigate("Login");
  }
  function handleNavigationToVisitante() {
    navigation.navigate("Principalll");
  }
  function handleNavigationToLoginContratante() {
    navigation.navigate("loginContratante");
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.description}>
          Bem vindo ao lugar ideal para encontrar prestadores de serviços
          domésticos.
        </Text>
      </View>

      <RectButton style={styles.buttonn} onPress={handleNavigationToVisitante}>
        <View style={styles.buttonIcon}>
          <Text>
            <MaterialCommunityIcons
              name="account-badge-horizontal-outline"
              size={24}
              color="#FFF"
            />
          </Text>
        </View>
        <Text style={styles.buttonText}>Visitante</Text>
      </RectButton>
      <RectButton
        style={styles.button}
        onPress={handleNavigationToLoginContratante}
      >
        <View style={styles.buttonIcon}>
          <Text>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </Text>
        </View>
        <Text style={styles.buttonText}>Entrar como Contratante</Text>
      </RectButton>
      <RectButton style={styles.button} onPress={handleNavigationToLogin}>
        <View style={styles.buttonIcon}>
          <Text>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </Text>
        </View>
        <Text style={styles.buttonText}>Entrar como Prestador</Text>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 25,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },
  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0426B0",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },
  buttonn: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },
  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export default Home;
