import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Rating, AirbnbRating } from "react-native-ratings";
import api from "../../../services/api";
import { color } from "react-native-reanimated";
// import { Feather } from "@expo/vector-icons";

const Avaliar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const servicoId = route.params.prestador.id;
  const prestadorId = route.params.prestador.prestador_id;
  const prestadores = route.params.prestadores;
  const contratanteId = route.params.contratante.id;
  const [start, setStart] = useState("");

  function ratingCompleted(rating) {
    // console.log("Rating is: " + rating);
    setStart(rating);
    // console.log(start);
  }
  // console.log(prestadores);
  const [nota, setNota] = useState("");
  const [comentario, setComentario] = useState("");

  function handleNavigateToBack() {
    navigation.goBack();
  }

  async function handleAvaliar() {
    const data = {
      nota: start,
      comentario,
      contratante_id: contratanteId,
      prestador_id: prestadorId,
      servprestado_id: servicoId,
    };

    try {
      const response = await api.post(`avaliacao/${contratanteId}`, data);
      // console.log(response);
      return navigation.navigate("Detalhess");
    } catch (err) {
      alert("Erro ao avaliar serviço, tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <Text
          style={[{ marginLeft: 20, marginStart: 20, marginTop: 10 }]}
          onPress={handleNavigateToBack}
        >
          <Text>
            <Icon name="arrow-left" size={30} color="#0426B0" />
          </Text>
        </Text>

        <Text style={styles.buttonIcon1}>
          <Icon name="star" size={70} color="rgba(4, 38, 176, 0.8)" />
        </Text>

        <Text style={[styles.title]}>Avaliação</Text>
        <Text
          style={[
            styles.description,
            {
              textAlign: "center",
              backgroundColor: "rgba(4, 38, 176, 0.5)",
              marginBottom: 9,
              // marginTop: 25,
              marginLeft: 20,
              marginRight: 20,
              fontSize: 4,
            },
          ]}
        ></Text>
        <View>
          <Text style={styles.description}>Avalie o serviço de 0 a 5</Text>
        </View>
        {/* <View style={styles.emoji}>
          <Entypo name="emoji-sad" size={30} color="#0426B0" />
          <Entypo name="emoji-neutral" size={30} color="#0426B0" />
          <Entypo name="emoji-happy" size={30} color="#0426B0" />
        </View> */}
        <AirbnbRating
          count={5}
          reviews={["Nota 1", "Nota 2", "Nota 3", "Nota 4", "Nota 5"]}
          defaultRating={1}
          size={20}
          onFinishRating={ratingCompleted}
          value={start}
        />

        <TextInput
          style={[styles.input, { height: 80, marginTop: 15 }]}
          value={comentario}
          onChangeText={setComentario}
          placeholder="Comentário"
        />

        <RectButton
          style={[styles.button, { marginStart: 20, marginEnd: 20 }]}
          onPress={handleAvaliar}
        >
          <View style={styles.buttonIcon}>
            <Text>
              <AntDesign name="check" size={30} color="white" />
            </Text>
          </View>
          <Text style={styles.buttonText}>Finalizar Avaliação</Text>
        </RectButton>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  star: {
    color: "#0426B0",
  },
  emoji: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 15,
    paddingEnd: 70,
    paddingStart: 70,
  },
  buttonIcon1: {
    alignItems: "center",
    marginBottom: 7,
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: "#13131a",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    marginBottom: 8,
    color: "#13131a",
    textAlign: "center",
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    // height: 90,
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
    alignItems: "center",
    marginTop: 8,
  },
  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});
export default Avaliar;
