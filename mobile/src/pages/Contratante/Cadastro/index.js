import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather as Icon } from "@expo/vector-icons";
import api from "../../../services/api";

const cadastroContratante = () => {
  const navigation = useNavigation();

  function handleNavigateToLoginContratante() {
    navigation.navigate("loginContratante");
  }
  function handleNavigateToHome() {
    navigation.navigate("Home");
  }

  async function handleRegister() {
    const data = {
      cpf,
      nome,
      email,
      senha,
      telefone,
      city,
      uf,
    };

    try {
      const response = await api.post("contratantes", data);
      navigation.navigate("loginContratante");
    } catch (err) {
      alert("Erro no cadastro, tente novamente.");
    }
  }

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <Text onPress={handleNavigateToLoginContratante}>
          <Text>
            <Icon name="arrow-left" size={30} color="#0426B0" />
          </Text>
        </Text>
        <View style={styles.buttonIcon}>
          <Text>
            <FontAwesome5 name="user-circle" size={70} color="#0426B0" />
          </Text>
        </View>
        <Text style={styles.text}>Cadastro do Contratante</Text>
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
          value={nome}
          onChangeText={setNome}
          autoCorrect={false}
          placeholder="Nome completo"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
        />
        <TextInput
          style={styles.input}
          value={cpf}
          keyboardType="number-pad"
          maxLength={11}
          onChangeText={setCpf}
          placeholder="Digite seu CPF"
        />
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
          placeholder="Digite sua senha"
        />
        <TextInput
          style={styles.input}
          value={telefone}
          maxLength={11}
          keyboardType="number-pad"
          onChangeText={setTelefone}
          placeholder="Ex.:(67)99999-9999"
        />
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          autoCorrect={false}
          placeholder="Digite sua cidade"
        />

        <BaseButton style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Finalizar cadastro</Text>
        </BaseButton>
        <BaseButton style={styles.button} onPress={handleNavigateToHome}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </BaseButton>
      </ScrollView>
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
export default cadastroContratante;
