import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground } from 'react-native';
import { style } from '../styles/styles'; 

const image = {uri: 'https://www.utpl.edu.ec/sites/default/files/archivos/marca%20UTPL%202018-03.png'};

const informacionScreen = ()  => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.container} >
        <Text style={style.textContent}>
          La aplicación esta desarrollada para el control y seguimiento 
          de tutorias a los estudiantes en la modalidad presencial.
        </Text>
        <ImageBackground source={image} style={styles.image}/>
      </View>
    </SafeAreaView>
  );
};
export default informacionScreen;

const styles = StyleSheet.create({
  image: {
    marginTop: 50,
    marginLeft: 15,
    width: '97%',
    height: '50%',
  },
});