import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import api from "../../../services/api";
import { FontAwesome5 } from "@expo/vector-icons";

const VerServicos = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const servico = route.params.servico;
  const prestador = route.params.prestador;
  const prestadorCpf = route.params.prestador.cpf;
  const prestadorId = route.params.prestador.id;
  //   const [servicos] = useState([route.params.servico]);
  const [prestadores, setPrestadores] = useState([]);
  //   const [idserv, setIdserv] = useState([]);
  const [servData, setServData] = useState([]);

  function handleNavigateToPrincipal() {
    navigation.navigate("Principal");
  }
  function handleNavigateToListaServicos() {
    navigation.navigate("ListaServicos");
  }
  function handleNavigateToAlterarServicos(servico, prestador) {
    navigation.navigate("AlterarServicos", { servico, prestador });
  }

  useEffect(() => {
    api.get(`servicosId/${servico.servico_id}`).then((res) => {
      setServData(res.data);
      //   console.log(servData);
    });
    // console.log(servicos);
  }, [servData]);

  const id = route.params.servico.id;
  async function handleDeleteAccount() {
    try {
      await api.delete(`removeservico/${id}`, {
        headers: {
          Authorization: prestadorId,
        },
      });
      setPrestadores(prestadores.filter((prestador) => prestador.id !== id));
      return handleNavigateToListaServicos();
    } catch (err) {
      alert("Erro ao excluir serviço, tente novamente.");
    }
  }

  const createAlert = () =>
    Alert.alert(
      "Excluir",
      "Tem certeza que deseja excluir esse serviço?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log(),
        },
        {
          text: "Excluir",
          onPress: () => {
            return handleDeleteAccount();
          },
        },
      ],
      { cancelable: false }
    );

  return (
    <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
      <View style={styles.container}>
        <Text
          style={[
            styles.header,
            { marginLeft: 20, marginStart: 20, marginTop: 10 },
          ]}
          onPress={handleNavigateToListaServicos}
        >
          <Text>
            <Icon name="arrow-left" size={30} color="#0426B0" />
          </Text>
        </Text>

        <Text style={styles.buttonIcon}>
          <FontAwesome5 name="cogs" size={70} color="rgba(4, 38, 176, 0.8)" />
        </Text>
        <Text style={styles.title}>Seu Serviço</Text>

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

        <View style={styles.descriptionContainer}>
          {/* <Text style={[styles.description, {marginTop: 7}]}>Imagem:</Text>
                <Text style={styles.dataValue}>Não tem imagem</Text> */}
          <Text style={[styles.description, { marginTop: 7 }]}>Categoria</Text>

          {servData.map((serv) => (
            <View keyExtractor={(serv) => String(servico.id)}>
              <Text style={styles.dataValue}>{serv.name}</Text>
            </View>
          ))}

          <Text style={styles.description}>Descrição do Serviço</Text>
          <Text style={styles.dataValue}>{servico.descricao}</Text>
        </View>

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
        <BaseButton style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => handleNavigateToAlterarServicos(servico, prestador)}
          >
            Editar
          </Text>
          <Text style={styles.buttonText} onPress={createAlert}>
            Excluir
          </Text>
        </BaseButton>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    color: "#13131a",
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginStart: 10,
    marginEnd: 10,
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginBottom: 15,
    paddingHorizontal: 5,
    color: "#41414d",
    borderRadius: 5,
  },
  description: {
    paddingHorizontal: 10,
    fontSize: 16,
    flexDirection: "row",
    color: "black",
    fontWeight: "bold",
  },
  buttonIcon: {
    alignItems: "center",
    marginBottom: 7,
    textAlign: "center",
  },
  dataValue: {
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    color: "black",
  },
  button: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 15,
    marginBottom: 15,
    paddingEnd: 10,
    paddingStart: 10,
  },
  buttonText: {
    width: 150,
    backgroundColor: "#0426B0",
    color: "#FFF",
    fontSize: 16,
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 12,
  },
});
export default VerServicos;
