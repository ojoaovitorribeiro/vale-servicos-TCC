import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather as Icon } from "@expo/vector-icons";
import api from "../../../services/api";

const Cadastro = () => {
  const navigation = useNavigation();

  function handleNavigateToLogin() {
    navigation.navigate("Login");
  }
  function handleNavigateToHome() {
    navigation.navigate("Home");
  }

  async function handleRegister() {
    const data = {
      nome,
      email,
      cpf,
      senha,
      telefone,
      city,
      referencia,
      sobre,
      uf,
      img,
    };

    try {
      const response = await api.post("prestadores", data);
      navigation.navigate("Login");
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
  const [referencia, setReferencia] = useState("");
  const [sobre, setSobre] = useState("");
  const [img, setImg] = useState("Não temos ainda");

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <Text onPress={handleNavigateToLogin}>
          <Text>
            <Icon name="arrow-left" size={30} color="#0426B0" />
          </Text>
        </Text>
        <View style={styles.buttonIcon}>
          <Text>
            <FontAwesome5 name="user-circle" size={70} color="#0426B0" />
          </Text>
        </View>
        <Text style={styles.text}>Cadastro do Prestador</Text>
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
          keyboardType="email-address"
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
          placeholder="Senha"
        />
        <TextInput
          style={styles.input}
          value={telefone}
          maxLength={11}
          keyboardType="phone-pad"
          onChangeText={setTelefone}
          placeholder="Whatsapp"
        />
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          autoCorrect={false}
          placeholder="Cidade"
        />
        <TextInput
          style={styles.input}
          value={referencia}
          onChangeText={setReferencia}
          autoCorrect={false}
          placeholder="Referência de trabalhos anteriores"
        />
        <TextInput
          style={styles.input}
          value={sobre}
          onChangeText={setSobre}
          placeholder="Fale sobre você"
        />
        {/* // como arquivo */}

        {/* <TextInput
          style={styles.input}
          value={img}
          onChangeText={setImg}
          placeholder="imagem"
        /> */}
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
export default Cadastro;
