import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage, Alert } from 'react-native';
import { BaseButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather as Icon } from '@expo/vector-icons';
import api from "../../../services/api";

const RecuperarAcessoo = () => {
  const navigation = useNavigation();

  function handleNavigateToHome() {
    navigation.navigate("Home");
  }
  function handleNavigateToBack() {
    navigation.goBack();
  }
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  async function handleRecuperar() {
    const response = await api.post("sessioncontratante", { cpf });
    if (!response.data.cpf) {
      Alert(erroRecuperar())
    } else {
      const data = { senha };
      try {
        const response = await api.put(`editarcontratantes/${cpf}`, data);
        navigation.navigate("loginContratante");
      } catch (err) {
        alert("Erro ao recuperar acesso, tente novamente.");
      }
    }
  }
  const erroRecuperar = () =>
    Alert.alert("Erro ao Recuperar Acesso", "Dados incorretos, tente novamente!", [
      {
        text: "Ok",
        onPress: () => console.log(),
      },
    ]);

  return (
    <View style={styles.container}>
      <Text
        style={[{ marginLeft: 10, marginStart: 10 }]}
        onPress={handleNavigateToBack}
      >
        <Text>
          <Icon name="arrow-left" size={30} color="#0426B0" />
        </Text>
      </Text>
      <View style={styles.buttonIcon}>
        <Text>
          <FontAwesome5 name="user-circle" size={70} color="#0426B0" />
        </Text>
      </View>
      <Text style={styles.text}>Recuperar Acesso</Text>
      <Text
        style={[
          styles.description,
          {
            textAlign: "center",
            backgroundColor: "rgba(4, 38, 176, 0.3)",
            marginBottom: 19,
            // marginTop: 5,
            marginLeft: 20,
            marginRight: 20,
            fontSize: 4,
          },
        ]}
      ></Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        maxLength={11}
        keyboardType="number-pad"
        autoCorrect={false}
        placeholder="Digite o seu CPF"
      />
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        autoCorrect={false}
        placeholder="Digite uma nova senha"
      />
      <BaseButton style={styles.button} onPress={handleRecuperar}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </BaseButton>
      <BaseButton style={styles.button} onPress={handleNavigateToHome}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </BaseButton>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  text: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 20,
  },
  buttonIcon: {
    alignItems: "center",
    marginBottom: 7,
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
  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
});
export default RecuperarAcessoo;