import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather as Icon } from "@expo/vector-icons";
import api from "../../../services/api";

const AlterarDadoss = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [contratantes, setContratantes] = useState([]);
  // console.log(contratantes);
  const contratante = route.params.contratante;
  // console.log(route.params.contratante);
  const contratanteCpf = route.params.contratante.cpf;
  // console.log(contratanteCpf);
  const contratanteId = route.params.contratante.id;
  // console.log(contratanteId);

  function handleNavigateToDadosPessoais() {
    navigation.navigate("DadosPessoaiss");
  }

  const [nome, setNome] = useState(contratante.nome);
  const [email, setEmail] = useState(contratante.email);
  const [cpf, setCpf] = useState(contratante.cpf);
  const [senha, setSenha] = useState(contratante.senha);
  const [telefone, setTelefone] = useState(contratante.telefone);
  const [city, setCity] = useState(contratante.city);

  useEffect(() => {
    api
      .get(`profilec/${contratanteCpf}`, {
        headers: {
          Authorization: contratanteCpf,
        },
      })
      .then((response) => {
        setContratantes(response.data);
      });
  }, [contratantes]);

  async function handleAlterar() {
    try {
      const data = {
        nome,
        email,
        telefone,
        senha,
        city,
      };
      const response = await api.put(
        `editarcontratantes/${contratanteId}`,
        data
      );
      return handleNavigateToDadosPessoais();
    } catch (err) {
      Alert(erroAlterar());
    }
  }
  const erroAlterar = () =>
    Alert.alert("Erro ao Alterar Dados", "Tente novamente!", [
      {
        text: "Ok",
        onPress: () => console.log(),
      },
    ]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <Text
          style={[styles.header, { marginLeft: 10, marginStart: 10 }]}
          onPress={handleNavigateToDadosPessoais}
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
        <Text style={styles.text}>Editar Dados</Text>
        <Text
          style={[
            // styles.description,
            {
              textAlign: "center",
              backgroundColor: "rgba(4, 38, 176, 0.3)",
              marginBottom: 13,
              // marginTop: 5,
              marginLeft: 20,
              marginRight: 20,
              fontSize: 4,
            },
          ]}
        ></Text>
        {contratantes.map((contratante) => (
          <View keyExtractor={(contratante) => String(contratante.id)}>
            <Text style={styles.textText}>Nome:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              autoCorrect={false}
              placeholder={contratante.nome}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              placeholder={contratante.email}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>CPF:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={setCpf}
              placeholder={contratante.cpf}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={setSenha}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>Telefone:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={setTelefone}
              placeholder={contratante.telefone}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>Cidade:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCity}
              autoCorrect={false}
              placeholder={contratante.city}
              placeholderTextColor="#000"
            />
          </View>
        ))}
        <BaseButton style={styles.button} onPress={handleAlterar}>
          <Text style={styles.buttonText}>Alterar</Text>
        </BaseButton>
        <BaseButton
          style={styles.button}
          onPress={handleNavigateToDadosPessoais}
        >
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
  textText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
    height: 55,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0426B0",
    height: 55,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  link: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 16,
    marginTop: 10,
  },
  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },
});
export default AlterarDadoss;
