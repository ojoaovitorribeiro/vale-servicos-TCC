import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import {
  BaseButton,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import api from "../../../services/api";

const Detalhes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const prestador = route.params.prestador;
  const servicoId = route.params.prestador.id;

  function handleNavigateToPrestadores() {
    navigation.goBack();
  }
  function handleNavigateToAllServicos(prestador) {
    navigation.navigate("AllServicos", { prestador });
  }
  function handleNavigateToAvaliacoes(prestador) {
    navigation.navigate("Avaliacoes", { prestador });
  }

  api
    .get(`avaliacoes/${servicoId}`, {
      headers: {
        Authorization: servicoId,
      },
    })
    .then((response) => {
      setAvaliacoes(response.data);
    });

  const message = `Olá ${prestador.nome}, estou interessado em seus serviços. Vim do Vale Serviços. Podemos conversar?`;

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Vale Serviços - Contato`,
      recipients: [prestador.email],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=+55${prestador.telefone}&text=${message}`
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.linkSection, { marginTop: 15 }]}
          activeOpacity={1}
        >
          <Feather
            name="arrow-left"
            size={30}
            color="#0426B0"
            onPress={() => handleNavigateToPrestadores(prestador)}
          />
        </TouchableOpacity>

        <View>
          <Text
            style={[
              {
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 15,
                textAlign: "center",
              },
            ]}
          >
            Detalhes do Prestador
          </Text>
        </View>

        <View style={(styles.icon, { marginBottom: 0 })}>
          <View style={styles.iconUser}>
            <Text>
              <FontAwesome name="user-circle-o" size={80} color="black" />
            </Text>
          </View>
        </View>
        <Text
          style={[
            // styles.description,
            {
              textAlign: "center",
              backgroundColor: "rgba(4, 38, 176, 0.3)",
              // marginBottom: 12,
              marginTop: 9,
              marginLeft: 20,
              marginRight: 20,
              fontSize: 4,
            },
          ]}
        ></Text>

        <View style={styles.descriptionContainer}>
          <Text
            style={[
              styles.description,
              {
                textAlign: "center",
                // backgroundColor: "rgba(4, 38, 176, 0.3)",
                marginBottom: 9,
                marginTop: 6,
                marginLeft: 15,
                marginRight: 15,
                fontSize: 19,
              },
            ]}
          >
            Informações Pessoais
          </Text>

          <Text style={styles.description}>Nome</Text>
          <Text style={styles.dataValue}>{prestador.nome}</Text>
          <Text style={styles.description}>Telefone</Text>
          <Text style={styles.dataValue}>{prestador.telefone}</Text>
          <Text style={styles.description}>Referência de Trabalho</Text>
          <Text style={styles.dataValue}>{prestador.referencia}</Text>
          <Text style={styles.description}>Cidade/UF</Text>
          <Text style={styles.dataValue}>{prestador.city}/MS</Text>
          <Text
            style={[
              // styles.description,
              {
                textAlign: "center",
                backgroundColor: "rgba(4, 38, 176, 0.3)",
                // marginBottom: 12,
                marginTop: 5,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 4,
              },
            ]}
          ></Text>
          <Text
            style={[
              styles.description,
              {
                textAlign: "center",
                // backgroundColor: "rgba(4, 38, 176, 0.3)",
                marginBottom: 9,
                marginTop: 6,
                marginLeft: 15,
                marginRight: 15,
                fontSize: 19,
              },
            ]}
          >
            Informações do Serviço
          </Text>
          <View style={styles.avalia}>
            <Text
              style={styles.linkText}
              onPress={() => handleNavigateToAvaliacoes(prestador)}
            >
              Avaliações do serviço
            </Text>
            <Feather
              name="star"
              size={25}
              color="gold"
              onPress={() => handleNavigateToPrestadores(prestador)}
            />
          </View>
          <Text style={styles.description}>Descrição do Serviço</Text>
          <Text style={styles.dataValue}>{prestador.sobre}</Text>
          <Text style={[styles.description]}>Descrição do Serviço</Text>
          <Text style={styles.dataValue}>{prestador.descricao}</Text>
        </View>

        <TouchableOpacity
          style={styles.linkSection}
          onPress={() => handleNavigateToAllServicos(prestador)}
        >
          <Text style={styles.linkText}>Conheça meus outros serviços</Text>
          <Feather name="arrow-right" size={30} color="#0426B0" />
        </TouchableOpacity>
        <View style={[{ marginTop: 22 }]}>
          <Text
            style={[styles.description, { paddingStart: 20, marginTop: 14 }]}
          >
            Contatar Prestador?
          </Text>

          <TouchableOpacity activeOpacity={1} style={styles.buttonPad1}>
            <Text style={[styles.buttonText]} onPress={sendMail}>
              Email
            </Text>
            <Text style={styles.buttonText} onPress={sendWhatsapp}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    paddingEnd: 20,
    paddingStart: 20,
    marginBottom: 10,
  },
  descriptionn: {
    paddingHorizontal: 10,
    fontSize: 16,
    flexDirection: "row",
    color: "black",
    marginBottom: 3,
  },
  dataValuee: {
    flexDirection: "row",
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
    paddingEnd: 20,
    paddingStart: 20,
  },
  descriptionContainerr: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
    marginStart: 10,
    marginEnd: 10,
    backgroundColor: "rgba(4, 38, 176, 0.3)",
    marginBottom: 15,
    paddingHorizontal: 5,
    color: "#41414d",
    borderRadius: 5,
  },
  descriptionContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  icon: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  avalia: {
    borderRadius: 5,
    // justifyContent: "center",
    // alignItems: "center",
    paddingEnd: 20,
    paddingStart: 9,
    marginBottom: 6,
    flexDirection: "row",
    // marginTop: 8,
  },
  description: {
    paddingHorizontal: 15,
    fontSize: 16,
    flexDirection: "row",
    color: "black",

    fontWeight: "bold",
  },
  dataValue: {
    flexDirection: "row",
    fontSize: 16,
    marginBottom: 8,
    paddingHorizontal: 15,
    color: "black",
  },
  iconUser: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonn: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 15,
  },
  button: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 15,
    marginBottom: 15,
    paddingEnd: 20,
    paddingStart: 20,
  },
  buttonPad: {
    // marginTop: 5,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // fontSize: 15,
    // marginBottom: 15,
    // paddingEnd: 20,
    // paddingStart: 20,
  },
  buttonPad1: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 15,
    marginBottom: 15,
    paddingEnd: 20,
    paddingStart: 20,
  },
  buttonText: {
    width: 150,
    height: 50,
    backgroundColor: "#0426B0",
    color: "#FFF",
    fontSize: 16,
    borderRadius: 5,
    textAlign: "center",
    paddingTop: 12,
  },
  buttonText1: {
    width: 250,
    height: 42,
    backgroundColor: "#0426B0",
    // color: "#FFF",
    fontSize: 15,
    borderRadius: 5,
    textAlign: "center",
    // paddingTop: 12,
  },
  linkSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginStart: 10,
    marginEnd: 10,
  },
  linkText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 10,
    color: "#0426B0",
  },
});
export default Detalhes;
