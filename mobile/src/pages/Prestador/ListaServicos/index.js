import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import api from "../../../services/api";
import { MaterialIcons } from "@expo/vector-icons";
const ListaServicos = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const prestadorId = route.params.prestador.id;
  const prestador = route.params.prestador;

  const [servicos, setServicos] = useState([]);
  // console.log(servicos)

  function handleNavigateToPrincipal() {
    navigation.navigate("Principal");
  }
  function handleNavigateToVerServicos(servico, prestador) {
    navigation.navigate("VerServicos", { servico, prestador });
  }

  useEffect(() => {
    api
      .get(`profile`, {
        headers: {
          Authorization: prestadorId,
        },
      })
      .then((response) => {
        setServicos(response.data);
      });
  }, [servicos]);

  return (
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

        <Text style={styles.buttonIcon1}>
          <MaterialIcons
            name="dashboard"
            size={70}
            color="rgba(4, 38, 176, 0.8)"
          />
        </Text>

        <Text style={styles.title}>Meus Serviços</Text>

        <View style={styles.dataContainer1}>
          {/* <Text style={styles.dataValue}>{servico.imagem}</Text> */}
          <Text style={styles.dataValue1}>Descrição</Text>
          <Text
            style={styles.dataValue1}
            // onPress={() => handleNavigateToVerServicos(servico, prestador)}
          >
            Ver
          </Text>
        </View>
        <Text
          style={[
            // styles.description,
            {
              textAlign: "center",
              backgroundColor: "rgba(4, 38, 176, 0.3)",
              marginBottom: 9,
              marginTop: 5,
              marginLeft: 20,
              marginRight: 20,
              fontSize: 4,
            },
          ]}
        ></Text>
        {servicos.map((servico) => (
          <View
            style={styles.dataContainer}
            keyExtractor={(servico) => String(servico.id)}
          >
            {/* <Text style={styles.dataValue}>{servico.imagem}</Text> */}
            <Text style={styles.dataValue}>{servico.descricao}</Text>
            <Text
              style={styles.dataValueIcon}
              onPress={() => handleNavigateToVerServicos(servico, prestador)}
            >
              <AntDesign
                name="arrowright"
                style={{ margin: 0 }}
                size={26}
                color="rgba(4, 38, 176, 1)"
              />
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  dataContainer1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(4, 38, 176, 1)",

    marginStart: 10,
    marginEnd: 10,
    borderRadius: 9,
    marginBottom: 15,
  },
  dataContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    // height: 60,
    flexDirection: "row",
    borderRadius: 9,
    marginStart: 10,
    marginEnd: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  dataValue: {
    flex: 1,
    justifyContent: "center",
    color: "black",
    marginStart: 14,
    fontSize: 16,
    marginTop: 19,
    marginBottom: 19,
  },
  dataValueIcon: {
    alignItems: "center",
    marginRight: 12,
    justifyContent: "center",
  },

  dataValue1: {
    paddingHorizontal: 20,
    marginTop: 7,
    fontSize: 16,
    marginBottom: 18,
    color: "white",
    paddingTop: 13,
  },
  buttonIcon1: {
    alignItems: "center",
    marginBottom: 7,
    textAlign: "center",
  },
});
export default ListaServicos;
