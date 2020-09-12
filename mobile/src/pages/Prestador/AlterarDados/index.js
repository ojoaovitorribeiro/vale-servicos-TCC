import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather as Icon } from "@expo/vector-icons";
import api from "../../../services/api";

const AlterarDados = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [prestadores, setPrestadores] = useState([]);
  // console.log(prestadores);
  const prestador = route.params.prestador;
  // console.log(route.params.prestador);

  function handleNavigateToDadosPessoais() {
    navigation.navigate("DadosPessoais");
  }

  const [nome, setNome] = useState(prestador.nome);
  const [email, setEmail] = useState(prestador.email);
  const [cpf, setCpf] = useState(prestador.cpf);
  const [senha, setSenha] = useState(prestador.senha);
  const [telefone, setTelefone] = useState(prestador.telefone);
  const [city, setCity] = useState(prestador.city);
  const [referencia, setReferencia] = useState(prestador.referencia);
  const [sobre, setSobre] = useState(prestador.sobre);

  const prestadorCpf = route.params.prestador.cpf;
  // console.log(prestadorCpf);

  useEffect(() => {
    api
      .get(`profile/${prestadorCpf}`, {
        headers: {
          Authorization: prestadorCpf,
        },
      })
      .then((response) => {
        setPrestadores(response.data);
      });
  }, [prestadores]);

  async function handleAlterar() {
    try {
      const data = {
        nome,
        email,
        telefone,
        senha,
        city,
        referencia,
        sobre,
        img: "fé pra todo lado",
      };
      const response = await api.put(`editarprestador/${prestadorCpf}`, data);
      return handleNavigateToDadosPessoais();
    } catch (err) {
      Alert(erroAlterar());
    }
  }
  const erroAlterar = () =>
    Alert.alert("Erro ao Alterar Dados", "Tente novamente!", [
      {
        text: "Ok",
        onPress: () => console.log("Erro"),
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
        {prestadores.map((prestador) => (
          <View keyExtractor={(prestador) => String(prestador.id)}>
            <Text style={styles.textText}>Nome:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              autoCorrect={false}
              placeholder={prestador.nome}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              placeholder={prestador.email}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>CPF:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={setCpf}
              placeholder={prestador.cpf}
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
              placeholder={prestador.telefone}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>Cidade:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCity}
              autoCorrect={false}
              placeholder={prestador.city}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>Referência:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setReferencia}
              autoCorrect={false}
              placeholder={prestador.referencia}
              placeholderTextColor="#000"
            />
            <Text style={styles.textText}>Fale sobre você:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setSobre}
              placeholder={prestador.sobre}
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
export default AlterarDados;
