import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { style } from '../styles/styles'; 
import { myColors } from '../styles/colors';
import { Octicons } from '@expo/vector-icons';  

const informacionScreen = ()  => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <View style={styles.title} >
          <Text style={styles.textTitle}>
            Gestión de Tutorias
          </Text>
        </View> 
        <View style={styles.content}>
          <Text style={styles.textContent}>
            La aplicación está dirigida a docentes y estudiantes, específicamente para el control y seguimiento de tutorías en 
            entornos presenciales.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textMarca}>
            UTPL
          </Text>
          <Octicons name="versions" size={24} style={styles.icon} />
          <Text style={style.textFooter}>
            Versión: 1.0.0
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default informacionScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title:{
    marginTop: 120,
  },
  content: {
    marginTop: 20,
  },
  footer: {
    marginTop: 180,
  },
  textTitle: {
    fontSize: 24, 
    textAlign: 'center', 
    fontWeight: 'bold',
    color: myColors.mustard,
    padding: 20,
    
  },
  textContent: {
    fontSize: 19, 
    textAlign: 'center', 
    color: myColors.navyblue,
    padding: 30,
  },
  textMarca: {
    fontSize: 24, 
    textAlign: 'center', 
    fontWeight: 'bold',
    color: myColors.navyblue,
    padding: 20,
    marginBottom: 20,
  },
  icon: {
    textAlign: 'center',
    color : myColors.navyblue,
  },
});