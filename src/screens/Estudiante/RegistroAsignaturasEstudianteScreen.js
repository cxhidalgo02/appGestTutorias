import * as React from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { database } from '../../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { myColors } from '../../styles/colors';
import { style } from '../../styles/styles';
import Layout from '../../components/layout/Layout';

const RegistroAsignaturasEstudianteScreen = () => {
  const navigation = useNavigation();

  //atrubito de la clase tutorias
  const [codigoAsig, setCodigoAsignatura] = React.useState('')

  //UID del estudiante que inicia sesion
  const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
  //pat path con el UID del estudiante que inica sesion, crea el documento y coleccion
  const pathUrl = `Usuarios/${pathIdEst}/AsignaturasEstudiante/`;
  const onSend = async () => {
    try {
      const docu = {
        codigoAsig: codigoAsig,
        nombreAsig: '',
        tipoAsig: '',
        altaAsigEst: 'false',
        fechaRegEst: new Date(),
      };
      const registroAsignaturaEstudiante = doc(database, pathUrl, docu.codigoAsig);
      await setDoc(registroAsignaturaEstudiante, (docu) );
      Alert.alert('Registro exitoso!', '', [
        { text: 'Aceptar' },
      ]);
      navigation.goBack();
    } catch (error) {
      console.log('ERROR => ',error);
      Alert.alert('Error al registrar!', '', [
        { text: 'Aceptar' },
      ]);
    }
  }

  return (
    <Layout>
      <View style={style.titleContainer}>
        <Text style={style.textTitleSubForm}>
          FORMULARIO
        </Text>
      </View>
      <Text style={styles.textContent}>
        Ingrese el código de la asignatura para solicitar acceso.
      </Text>
      <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
        onChangeText={(text) => setCodigoAsignatura(text)}
        placeholder="Ingrese el codigo"
      />
      <TouchableOpacity style={style.button} onPress={onSend} >
        <Text style={style.textbutton}>REGISTRAR</Text>
      </TouchableOpacity>
  </Layout>
  );
};
export default RegistroAsignaturasEstudianteScreen;

const styles = StyleSheet.create({
  textContent: {
    fontSize: 16,
    textAlign: 'center',
    color: myColors.navyblue,
  },
  subcontainerText: {
    marginTop: 40,
  },
});