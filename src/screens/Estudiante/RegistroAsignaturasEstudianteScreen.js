import * as React from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { database } from '../../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, RefreshControl, Alert } from 'react-native';
import { myColors } from '../../styles/colors';
import { style } from '../../styles/styles'; 

const RegistroAsignaturasEstudianteScreen = () => { 
  const navigation = useNavigation();

  //atrubito de la clase tutorias
  const [codigo, setCodigoAsignatura] = React.useState('')
  //UID del estudiante que inicia sesion
  const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);

  //pat path con el UID del estudiante que inica sesion, crea el documento y coleccion
  const pathUrl = `registroUsuarios/${pathIdEst}/registroAsignaturas/`;
  const onSend = async () => {
    try {
      const docu = {
        codigo: codigo,
        createdAt: new Date(),
        nombre: '',
        tipo: '',
        validada: 'false',
      };
      const registroAsignaturaEstudiante = doc(database, pathUrl, docu.codigo);
      await setDoc(registroAsignaturaEstudiante, (docu) );
      Alert.alert('Registro exitoso!', '', [
        { text: 'Aceptar' },
      ]);
      navigation.goBack();
    } catch (error) {
      console.log('ERROR => ',error);
    }
  }

  //estados para refrezcar el screen
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.container} >
        <View style={styles.subcontainer}> 
          <Text style={style.textTitle}>
            FORMULARIO
          </Text>
          <Text style={styles.textContent}>
            Ingrese el código de la asignatura para solicitar acceso.
          </Text>
          <ScrollView style = {styles.scrollForm} 
            refreshControl={
              <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
            } 
          >
          <TextInput style = {style.textInput}
            onChangeText={(text) => setCodigoAsignatura(text)}
            placeholder="Ingrese el codigo"
          />
          <TouchableOpacity style={style.button} onPress={onSend} >
            <Text style={style.textbutton}>REGISTRAR</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RegistroAsignaturasEstudianteScreen;

const styles = StyleSheet.create({
  subcontainer: {
    width: '75%',
    marginTop: 200,
  },
  scrollForm: {
    textAlign: "center",
  },
  textContent: {
    fontSize: 16, 
    textAlign: 'center', 
    color: myColors.navyblue,
  },
});