import { StyleSheet } from "react-native";
import { myColors } from "./colors";

export const style = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  subcontainer: {
    width: '75%',
  },
  textTitle: {
    fontSize: 20, 
    textAlign: 'center', 
    marginBottom: 16, 
    color: myColors.navyblue,
  },
  textContentt: {
    fontSize: 16, 
    textAlign: 'center', 
    color: myColors.navyblue,
  },
  textContent: {
    fontSize: 22, 
    textAlign: 'center', 
    color: myColors.navyblue,
  },
  textInput:{
    //borderWidth: 1,
    //borderColor: myColors.skyblue,
    backgroundColor: myColors.white,
    padding:15,
    paddingStart: 20,
    marginTop:20,
    //borderRadius: 10,
    elevation: 5,
  },
  select: {
    borderWidth: 1,
    borderColor: myColors.skyblue,
    backgroundColor: myColors.white,
    padding: 10,
    marginTop: 25,
    borderRadius:10,
    elevation: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: myColors.navyblue,
    padding: 10,
    marginTop: 40,
    borderRadius:10,
    elevation: 5,
  },
  textbutton: {
    color: myColors.light,
  },
  buttonTwo: {
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  textbuttonTwo: {
    color: myColors.navyblue,
  },
  buttonThree: {
    alignItems: 'center',
    padding: 10,
  },
  textbuttonThree: {
    color: myColors.navyblue,
  },
  scrollContent: {
    width: '90%',
  },
  scrollForm: {
    textAlign: "center",
    marginTop: 100,
  },
});