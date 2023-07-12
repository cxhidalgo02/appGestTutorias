import { Platform, StyleSheet } from "react-native";
import { myColors } from "./colors";

export const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  subcontainer: {
    width: '80%',
    flex: 1,
    height: '100%',
  },
  titleContainer: {
    width: '100%',
    textAlign: 'center',
    padding: 10,
    marginBottom: 16,
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
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
  textFooter: {
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
    color: myColors.navyblue,
  },
  textInput:{
    backgroundColor: myColors.white,
    padding:15,
    paddingStart: 20,
    marginTop:20,
    elevation: 5,
  },
  iOS_textInput:{
    borderWidth: 1,
    borderColor: myColors.skyblue,
    backgroundColor: myColors.white,
    padding:15,
    paddingStart: 20,
    marginTop:20,
    borderRadius: 10,
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
  iOS_select: {
    borderWidth: 1,
    borderColor: myColors.skyblue,
    backgroundColor: myColors.white,
    marginTop: 25,
    borderRadius:10,
    //Disenio caja select
    padding: 0,
    height: 120,
    overflow: 'hidden',
    alignContent: 'center',
    justifyContent: 'center',
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
  scrollForm: {
    textAlign: "center",
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentScrollView: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
  });