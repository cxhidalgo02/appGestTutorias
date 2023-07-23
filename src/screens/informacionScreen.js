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
            TutoriaApp
          </Text>
        </View> 
        <View style={styles.content}>
          <Text style={styles.textContent}>
            La aplicación está dirigida a docentes y estudiantes, específicamente para el control y seguimiento de tutorías en 
            entornos presenciales.
          </Text>
          <View style={styles.subcontent}>          
          <Pressable
          onPress={() => WebBrowser.openBrowserAsync('https://github.com/cxhidalgo02/appGestTutorias/blob/master/documents/Manual%20de%20usuario%20-%20TutorPlus.pdf')} >
          <MaterialCommunityIcons name="progress-download" size={30} style={styles.icon} />
            <Text style={styles.textSubContent}>
              Manual de usuario
            </Text>
          </Pressable>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textMarca}>
            UTPL
          </Text>
          <Octicons name="versions" size={24} style={styles.icon} />
          <Text style={style.textFooter}>
            Versión: 2.0.0
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
    marginTop: 50,
  },
  content: {
    marginTop: 10,
  },
  subcontent: {
    marginTop: 20,
  },
  footer: {
    marginTop: 100,
  },
  textTitle: {
    fontSize: 26, 
    textAlign: 'center', 
    fontWeight: 'bold',
    color: myColors.mustard,
    padding: 10,
    
  },
  textContent: {
    fontSize: 19, 
    textAlign: 'center', 
    color: myColors.navyblue,
    padding: 30,
  },
  textSubContent: {
    marginTop: 3,
    fontSize: 15,
    textAlign: 'center',
    color: myColors.mustard,
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