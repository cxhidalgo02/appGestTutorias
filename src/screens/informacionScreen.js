import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { style } from '../styles/styles'; 
import { myColors } from '../styles/colors';
import { Octicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import * as WebBrowser from 'expo-web-browser';


const informacionScreen = ()  => {
  const navigation = useNavigation();
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
    marginTop: 100,
  },
  content: {
    marginTop: 20,
  },
  subcontent: {
    marginTop: 40,
  },
  footer: {
    marginTop: 140,
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