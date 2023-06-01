import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground } from 'react-native';
import { style } from '../styles/styles'; 
import { myColors } from '../styles/colors';
import { Octicons } from '@expo/vector-icons';  

const image = {uri: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Universidad_T%C3%A9cnica_Particular_de_Loja.png'};

const informacionScreen = ()  => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.container} >
        <View style={styles.subcontainer} >
          <View style={styles.containerImg}>  
            <ImageBackground source={image} style={styles.image}/>  
          </View>
          <View>
            <Text style={style.textContent}>
              La aplicación esta desarrollada para el control y seguimiento 
              de tutorias en la modalidad presencial.
            </Text>
          </View>
        </View>
      </View>
      <Octicons name="versions" size={24} style={styles.icon} />
      <Text style={style.textFooter}>
        Versión: 1.0.0
      </Text>
    </SafeAreaView>
  );
};
export default informacionScreen;

const styles = StyleSheet.create({
  image: {
    marginTop: 50,
    marginBottom: 60,
    marginLeft: 85,
    width: '60%', // Ajusta el ancho de la imagen según tus necesidades
    aspectRatio:1, // Mantiene la proporción original de la imagen
  },
  icon: {
    marginTop: 200,
    textAlign: 'center',
    color : myColors.navyblue,
  },
  subcontainer: {
    //width: '80%',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  containerImg: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
});