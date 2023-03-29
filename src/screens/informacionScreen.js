import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const image = {uri: 'https://www.utpl.edu.ec/sites/default/files/archivos/marca%20UTPL%202018-03.png'};

const informacionScreen = ({ route, navigation })  => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <View style={styles.subcontainer}>
          <AntDesign name="appstore-o" size={35} color="#293774" style={{marginBottom: 25}} />

          <Text style={styles.textContent}>
              La aplicación esta desarrollada para el control y seguimiento de tutorias presenciales a los estudiantes
          </Text>
          
        </View>
        <View style={styles.subcontainer2}>
        <ImageBackground source={image} style={styles.image}/>
        </View>
        
      </View>
    </SafeAreaView>
  );
};
export default informacionScreen;

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: '50%',
  },
  container: {
    flex: 1, 
    backgroundColor: '#FDFEFE',
  },
  subcontainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 80,
  },
  subcontainer2: {
    flex: 1, 
    alignItems: 'flex-end',
  },
  textContent: {
    fontSize: 22, 
    textAlign: 'center', 
    color: '#293774',
  },
});
