import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { doc, setDoc} from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, RefreshControl, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { style } from '../../styles/styles';
import Layout from '../../components/layout/Layout';

const RegistroAsignaturasDocenteScreen = () => {
  const navigation = useNavigation();

  //atributos de las clase asignatura
  const [codigoAsig, setCodigoAsig] = React.useState('')
  const [nombreAsig, setNombreAsig] = React.useState('')
  const [tipoAsig, setTipoAsig] = React.useState('')
  const [fechaRegAsig] = React.useState(new Date())

  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  //pat path con el UID del docente que inica sesion, crea el documento y coleccion
  const pathUrl = `Usuarios/${pathIdDoc}/Asignaturas/`;
  const onSend = async () => {
    try {
      const registroAsignatura = {
        idAsig: codigoAsig,
        codigoAsig: codigoAsig,
        nombreAsig: nombreAsig,
        tipoAsig: tipoAsig,
        fechaRegAsig: fechaRegAsig,
      };
      const docRef = doc(database, pathUrl, registroAsignatura.codigoAsig);
      await setDoc(docRef, (registroAsignatura) );
      Alert.alert('Registro exitoso!', '', [
        { text: 'Aceptar' },
      ]);
      navigation.goBack();
    } catch (error) {
      console.log('ERROR =>', error);
      Alert.alert('Error al registrar!', '', [
        { text: 'Aceptar' },
      ]);
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
    <Layout>
      <Text style={style.textTitle}>
        FORMULARIO
      </Text>
        <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
          onChangeText={(text) => setNombreAsig(text)}
          placeholder="Nombre de la asignatura"
        />
        <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
          onChangeText={(text) => setCodigoAsig(text)}
          placeholder="Codigo de la asignatura"
        />
        <Picker
          //style = {style.select}
          style={[style.select, Platform.OS === 'ios' && style.iOS_select]}
          selectedValue={tipoAsig}
          onValueChange={(itemValue) => setTipoAsig(itemValue)}
        >
          <Picker.Item label="Tipo" value="Ninguna" />
          <Picker.Item label="Troncal" value="Troncal"/>
          <Picker.Item label="Genérica" value="Genérica"/>
          <Picker.Item label="Complementaria" value="Complementaria"/>
          <Picker.Item label="Libre configuración" value="Libre configuración"/>
          <Picker.Item label="Formación Básica" value="Formación Básica"/>
          <Picker.Item label="Gestión Productiva" value="Gestión Productiva"/>
        </Picker>
        <TouchableOpacity style={style.button} onPress={onSend} >
          <Text style={style.textbutton}>REGISTRAR</Text>
        </TouchableOpacity>
    </Layout>
  );
};
export default RegistroAsignaturasDocenteScreen;