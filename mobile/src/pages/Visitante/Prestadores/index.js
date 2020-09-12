import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import api from "../../../services/api";

const Prestadores = () => {
  const navigation = useNavigation();
  const route = useRoute();

  function handleNavigateToPrincipall() {
    navigation.navigate("Principalll");
  }
  function handleNavigateToDetalhes(prestador) {
    navigation.navigate("Detalhes", { prestador, serv });
  }

  const [prestadores, setPrestadores] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  async function loadPrestadores() {
    if (loading) {
      return;
    }
    if (total > 0 && prestadores.length == total) {
      return;
    }
    setLoading(true);

    const response = await api.get(`servicosPrestadores/${serv.id}`);

    setTotal(response.headers["x-total-count"]);
  }
  useEffect(() => {
    loadPrestadores();
  }, []);

  const serv = route.params.servico;
  // console.log(route.params.servico);

  api.get(`servicosPrestadores/${serv.id}`).then((response) => {
    setPrestadores(response.data);
  });

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.header,
          { marginLeft: 10, marginStart: 10, marginTop: 10 },
        ]}
        onPress={handleNavigateToPrincipall}
      >
        <Text>
          <Icon name="arrow-left" size={30} color="#0426B0" />
        </Text>
      </Text>
      <Text style={[styles.title, { marginStart: 25, marginEnd: 25 }]}>
        Prestadores de Serviço
      </Text>

      <Text style={styles.headerText}>
        Total de <Text style={styles.headerTextText}>{total} serviços</Text>
      </Text>

      <Text
        style={[
          // styles.description,
          {
            textAlign: "center",
            backgroundColor: "rgba(4, 38, 176, 0.5)",
            marginBottom: 15,
            // marginTop: 5,
            marginLeft: 190,
            marginRight: 11,
            fontSize: 4,
          },
        ]}
      ></Text>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        {prestadores.map((prestador) => (
          <View keyExtractor={(prestador) => String(prestador.id)}>
            <View style={styles.descriptionContainer}>
              <Text style={[styles.description, { marginTop: 10 }]}>Nome:</Text>
              <Text style={[styles.dataValue]}>{prestador.nome}</Text>
              <Text style={[styles.description]}>Sobre:</Text>
              <Text style={styles.dataValue}>{prestador.sobre}</Text>
              <Text style={[styles.description]}>Descrição do serviço:</Text>
              <Text style={styles.dataValue}>{prestador.descricao}</Text>
              <Text style={[styles.description]}>Telefone:</Text>
              <Text style={styles.dataValue}>{prestador.telefone}</Text>

              <TouchableOpacity
                style={styles.linkSection}
                onPress={() => handleNavigateToDetalhes(prestador)}
              >
                <Text style={styles.linkText}>Ver mais</Text>
                <Feather name="arrow-right" size={30} color="#0426B0" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    color: "#737380",
    textAlign: "right",
    marginEnd: 15,
  },
  headerTextText: {
    fontWeight: "bold",
  },
  linklink: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    color: "#13131a",
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionContainer: {
    justifyContent: "space-between",
    marginStart: 10,
    marginEnd: 10,
    backgroundColor: "rgba(4, 38, 176, 0.3)",
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
  dataValue: {
    flexDirection: "row",
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    color: "black",
  },
  linkSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  linkText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 10,
    color: "#0426B0",
  },
});
export default Prestadores;
