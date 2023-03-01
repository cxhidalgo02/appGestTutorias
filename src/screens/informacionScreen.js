import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const image = {uri: 'https://www.utpl.edu.ec/sites/default/files/archivos/marca%20UTPL%202018-03.png'};

const informacionScreen = ({ route, navigation })  => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <View style={styles.subcontainer}>
          <AntDesign name="appstore-o" size={35} color="#293774" style={{marginBottom: 25}} />

          <Text style={styles.textContent}>
              La aplicación esta desarrollada para el control y gestión de tutorias presenciales
          </Text>
        </View>
        <ImageBackground source={image} style={styles.image}/>
      </View>
    </SafeAreaView>
  );
};
export default informacionScreen;

const styles = StyleSheet.create({
  image: {
    width: 175,
    height: 70,
    marginLeft: 86,
  },
  container: {
    flex: 1, 
    padding: 16,
    backgroundColor: '#FDFEFE',
  },
  subcontainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  textContent: {
    fontSize: 22, 
    marginBottom: 16,
    textAlign: 'center', 
    color: '#293774',
  },
  textInput:{
    borderWidth: 1,
    borderColor: "#2E86C1",
    backgroundColor:"#fff",
    padding:10,
    paddingStart: 20,
    width: "80%",
    marginTop:20,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2E86C1',
    padding: 10,
    width: "80%",
    marginTop: 40,
    borderRadius:10,
  },
  textbutton: {
    color: "#F2F3F4",
  },
});
