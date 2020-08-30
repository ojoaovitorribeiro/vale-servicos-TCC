import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import api from "../../../services/api";

const Avaliacao = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const servicoId = route.params.prestador.id;
    const [avaliacoes, setAvaliacoes] = useState([]);

    function handleNavigateToBack() {
        navigation.goBack();
    }

    api.get(`avaliacoes/${servicoId}`, {
        headers: {
            Authorization: servicoId,
        }
    }).then((response) => {
        setAvaliacoes(response.data);
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
            <View style={styles.container}>
                <Text
                    style={[
                        styles.header,
                        { marginLeft: 10, marginStart: 10, marginTop: 10 },
                    ]}
                    onPress={handleNavigateToBack}
                >
                    <Text>
                        <Icon name="arrow-left" size={30} color="#0426B0" />
                    </Text>
                </Text>

                <Text style={styles.text}>
                    Avaliações deste serviço
            </Text>

                {avaliacoes.map((avaliacao) => (
                    <View keyExtractor={(avaliacao) => String(avaliacao.id)}>
                        <View style={styles.descriptionContainerr}>
                            <Text style={styles.descriptionn}>Avaliador: <Text style={styles.dataValuee}>{avaliacao.nome}</Text></Text>
                            <Text style={styles.descriptionn}>Nota: <Text style={styles.dataValuee}>{avaliacao.nota}</Text></Text>
                            <Text style={styles.descriptionn}>Comentário: <Text style={styles.dataValuee}>{avaliacao.comentario}</Text></Text>
                        </View>
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
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
        textAlign: "center"
    },
    descriptionn: {
        paddingHorizontal: 10,
        fontSize: 16,
        flexDirection: "row",
        color: "black",
        marginBottom: 3
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
    dataValuee: {
        flexDirection: "row",
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 10,
        color: "black",
        fontWeight: "bold",
        paddingEnd: 20,
        paddingStart: 20
    }
});
export default Avaliacao;
