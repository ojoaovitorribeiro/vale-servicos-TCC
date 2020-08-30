import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import api from "../../../services/api";

const AllServicoss = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const prestadorId = route.params.prestador.prestador_id;
    const prestadorNome = route.params.prestador.nome;
    const [prestadores, setPrestadores] = useState([]);

    function handleNavigateToBack() {
        navigation.goBack();
    }

    api.get(`servico/${prestadorId}`, {
        headers: {
            Authorization: prestadorId,
        }
    }).then((response) => {
        setPrestadores(response.data);
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
                <Text style={[styles.title, { marginStart: 25, marginEnd: 25 }]}>
                    Outros serviços do prestador {prestadorNome}
        </Text>

                {prestadores.map((prestador) => (
                    <View keyExtractor={(prestador) => String(prestador.id)}>
                        <View style={styles.descriptionContainer}>
                            <Text style={[styles.description, {marginTop:10}]}>Tipo de Trabalho:</Text>
                            <Text style={styles.dataValue}>Tem que colocar o tipo de trabalho</Text>
                            <Text style={[styles.description]}>Serviço:</Text>
                            <Text style={styles.dataValue}>{prestador.descricao}</Text>

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
    }
});
export default AllServicoss;
