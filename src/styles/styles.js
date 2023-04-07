import { StyleSheet } from "react-native";
import { myColors } from "./colors";

export const style = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 20, 
    textAlign: 'center', 
    marginBottom: 16, 
    color: myColors.navyblue,
  },
  textContent: {
    fontSize: 22, 
    textAlign: 'center', 
    color: '#293774',
  },
  textInput:{
    borderWidth: 1,
    borderColor: myColors.skyblue,
    backgroundColor: myColors.white,
    padding:10,
    paddingStart: 20,
    marginTop:20,
    borderRadius: 10,
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
  });