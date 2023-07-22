import { StyleSheet } from "react-native";
import { myColors } from "./colors";

export const styleModal = StyleSheet.create({
//VENTANA MODAL
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '80%',
    },
    modalView: {
        margin: 20,
        backgroundColor: myColors.white,
        borderRadius: 10,
        padding: 40,
        //alignItems: 'center',
        shadowColor: myColors.black,
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        marginTop: 20,
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        backgroundColor: myColors.mustard,
    },
    textButtonClose: {
        color: myColors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTextTitle: {
        fontSize: 16,
        marginBottom: 15,
        color: myColors.navyblue,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        color: myColors.navyblue,
        textAlign: 'center',
        padding: 8,
    },

  });