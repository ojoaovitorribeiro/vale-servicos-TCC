import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import api from "../../../services/api";
import { AntDesign } from "@expo/vector-icons";

const AlterarServicos = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const servico = route.params.servico;
  const prestadorId = route.params.prestador;
  const [servicos] = useState([route.params.servico]);
  const [prestador, setPrestador] = useState([]);
  const servicoId = route.params.servico.id;
  // console.log(servico)

  function handleNavigateToBack() {
    navigation.goBack();
  }
  function handleNavigateToListaServicos() {
    navigation.navigate("ListaServicos");
  }

  const [tipodeservico, setTipodeservico] = useState("");
  const [descricao, setDescricao] = useState(servico.descricao);
  const [img_url, setImg_url] = useState(servico.img_url);

  useEffect(() => {
    api
      .get(`profile`, {
        headers: {
          Authorization: prestadorId,
        },
      })
      .then((response) => {
        setPrestador(response.data);
      });
  }, [prestador]);

  async function handleAlterar() {
    try {
      const data = {
        img_url,
        descricao,
      };
      const response = await api.put(`alterarservico/${servicoId}`, data);
      return handleNavigateToListaServicos();
    } catch (err) {
      Alert(erroAlterar());
    }
  }
  const erroAlterar = () =>
    Alert.alert("Erro ao Alterar Dados", "Tente novamente!", [
      {
        text: "Ok",
        onPress: () => console.log("Erro alterar"),
      },
    ]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <Text
          style={[styles.header, { marginLeft: 10, marginStart: 10 }]}
          onPress={handleNavigateToBack}
        >
          <Text>
            <Icon name="arrow-left" size={30} color="#0426B0" />
          </Text>
        </Text>

        <Text style={styles.buttonIcon1}>
          <AntDesign name="edit" size={70} color="rgba(4, 38, 176, 0.8)" />
        </Text>
        <Text style={styles.text}>Editar Serviço</Text>

        <Text
          style={[
            // styles.description,
            {
              textAlign: "center",
              backgroundColor: "rgba(4, 38, 176, 0.3)",
              marginBottom: 15,
              // marginTop: 5,
              marginLeft: 20,
              marginRight: 20,
              fontSize: 4,
            },
          ]}
        ></Text>
        {servicos.map((servico) => (
          <View keyExtractor={(servico) => String(servico.id)}>
            <Text style={styles.textText}>Nova descrição do serviço:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDescricao}
              placeholder={servico.descricao}
              placeholderTextColor="#000"
            />
          </View>
        ))}
        <BaseButton style={styles.button} onPress={handleAlterar}>
          <Text style={styles.buttonText}>Alterar</Text>
        </BaseButton>
        <BaseButton style={styles.button} onPress={handleNavigateToBack}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </BaseButton>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textText: {
    marginStart: 12,
    marginBottom: 9,
    fontSize: 16,

    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonIcon: {
    alignItems: "center",
    marginBottom: 7,
  },

  buttonIcon1: {
    alignItems: "center",
    marginBottom: 7,
    textAlign: "center",
  },
  input: {
    marginStart: 10,
    marginEnd: 10,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  button: {
    marginStart: 10,
    marginEnd: 10,
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
export default AlterarServicos;
