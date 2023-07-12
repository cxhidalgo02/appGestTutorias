import { StyleSheet } from "react-native";
import { myColors } from "./colors";

export const styleComp = StyleSheet.create({
    productContainer: {
        width: "85%",
        padding: 10,
        margin: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: myColors.skyblue,
        backgroundColor: myColors.white,
        elevation: 5,
    },
    texttitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: myColors.navyblue,
    },
    textsubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: myColors.mustard,
    },
    textContent:{
        fontSize: 16,
        color: myColors.navyblue,
    },
    descrip: {
        fontSize: 16,
    },
    information: {
        color: myColors.black,
        fontSize: 16,
    },
    btnsContiner:{
        width: '90%',
        backgroundColor: 'transparent',
        flexDirection: "row",
    },
    btnContiner:{
        width: '50%',
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    deleteButton: {
        position: "absolute",
        right: 8,
        top: 0,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: myColors.navyblue,
        borderRadius: 8,
        elevation: 5,
      },
    validateButton: {
        position: "absolute",
        right: 8,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: myColors.mustard,
        borderRadius: 8,
        elevation: 5,
    },
    validateAstButton: {
        position: "absolute",
        right: -35,
        top: -50,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: myColors.mustard,
        borderRadius: 8,
        elevation: 5,
    },
  });