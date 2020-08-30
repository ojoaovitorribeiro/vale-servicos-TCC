import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, Image } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import api from "../../../services/api";

const DadosPessoais = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const prestadorCpf = route.params.prestador.cpf;

  const [prestadores, setPrestadores] = useState([]);
  // console.log(prestadsores)

  function handleNavigateToPrincipal() {
    navigation.goBack();
  }
  function handleNavigateToHome() {
    navigation.navigate("Home");
  }
  function handleNavigateToAlterarDados(prestador) {
    navigation.navigate("AlterarDados", { prestador });
  }

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

  const id = route.params.prestador.id;
  async function handleDeleteAccount() {
    try {
      await api.delete(`prestadorApagar/${id}`);
      setPrestadores(prestadores.filter((prestador) => prestador.id !== id));
      return navigation.navigate("Home");
    } catch (err) {
      alert("Erro ao deletar prestador, tente novamente.");
    }
  }

  const createAlert = () =>
    Alert.alert(
      "Excluir",
      "Tem certeza que deseja excluir sua conta?",
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
    <>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <View style={styles.container}>
          <Text
            style={[
              styles.header,
              { marginLeft: 20, marginStart: 20, marginTop: 10 },
            ]}
            onPress={handleNavigateToPrincipal}
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

          <Text style={styles.title}>Dados Pessoais</Text>
          <Text
            style={[
              // styles.description,
              {
                textAlign: "center",
                backgroundColor: "rgba(4, 38, 176, 0.3)",
                marginBottom: 12,
                // marginTop: 5,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 4,
              },
            ]}
          ></Text>

          {prestadores.map((prestador) => (
            <View keyExtractor={(prestador) => String(prestador.id)}>
              <Text style={[styles.data, { marginTop: 0 }]}>Nome</Text>
              <Text style={styles.dataValue}>{prestador.nome}</Text>
              <Text style={styles.data}>E-mail</Text>
              <Text style={styles.dataValue}>{prestador.email}</Text>

              <Text style={styles.data}>CPF</Text>
              <Text style={styles.dataValue}>{prestador.cpf}</Text>

              <Text style={styles.data}>Telefone</Text>
              <Text style={styles.dataValue}>{prestador.telefone}</Text>

              <Text style={styles.data}>Cidade/UF</Text>
              <Text style={styles.dataValue}>{prestador.city}/MS</Text>
              {/* <Text
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
                ]} */}
              {/* ></Text> */}

              <Text style={styles.title}>Dados Gerais</Text>
              <Text
                style={[
                  // styles.description,
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
              <Text style={styles.data}>Sobre você</Text>
              <Text style={styles.dataValue}>{prestador.sobre}</Text>

              <Text style={styles.data}>Referência</Text>
              <Text style={styles.dataValue}>{prestador.referencia}</Text>
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
                <Text style={styles.buttonText} onPress={() => createAlert()}>
                  Excluir conta
                </Text>
                <Text
                  style={styles.buttonText}
                  onPress={() => handleNavigateToAlterarDados(prestador)}
                >
                  Editar
                </Text>
              </BaseButton>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  prestadorImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },
  header: {
    flex: 1,
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
  buttonIcon: {
    alignItems: "center",
    marginBottom: 7,
  },
  data: {
    paddingHorizontal: 24,
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  dataValue: {
    paddingHorizontal: 24,
    fontSize: 16,
    marginBottom: 15,
    color: "black",
  },
  button: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 15,
    marginBottom: 15,
    paddingEnd: 20,
    paddingStart: 20,
  },
  buttonText: {
    width: 130,
    backgroundColor: "#0426B0",
    color: "#FFF",
    fontSize: 16,
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 12,
  },
});
export default DadosPessoais;
