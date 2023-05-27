import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { doc, setDoc} from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, RefreshControl, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { style } from '../../styles/styles';

const RegistroAsignaturasDocenteScreen = () => { 
  const navigation = useNavigation();

  //atributos de las clase asignatura
  const [nombreAsignatura, setNombreAsignatura] = React.useState('')
  const [codigoAsignatura, setCodigoAsignatura] = React.useState('')
  const [tipoAsignatura, setTipoAsignatura] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState(new Date())

  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);

  //pat path con el UID del docente que inica sesion, crea el documento y coleccion
  const pathUrl = `registroUsuarios/${pathIdDoc}/registroAsignaturas/`;
  const onSend = async () => {
    try {
      const registroAsignatura = {
        id: codigoAsignatura,
        nombre: nombreAsignatura,
        codigo: codigoAsignatura,
        tipo: tipoAsignatura,
        createdAt: createdAt
      };
      const docRef = doc(database, pathUrl, registroAsignatura.codigo);
      await setDoc(docRef, (registroAsignatura) );
      Alert.alert('Registro exitoso!', '', [
        { text: 'Aceptar' },
      ]);
      navigation.goBack();
    } catch (error) {
      console.log('ERROR =>', error);
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
        <View style={style.subcontainer} >
            <ScrollView style = {style.scrollForm} 
              refreshControl={
                <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
              } 
            >
            <Text style={style.textTitle}>
              FORMULARIO
            </Text>
              <TextInput style = {style.textInput}
                onChangeText={(text) => setNombreAsignatura(text)}
                placeholder="Nombre de la asignatura"
              />
              <TextInput style = {style.textInput}
                onChangeText={(text) => setCodigoAsignatura(text)}
                placeholder="Codigo de la asignatura"
              />
              <Picker
                style = {style.select}
                selectedValue={tipoAsignatura}
                onValueChange={(itemValue) => setTipoAsignatura(itemValue)}
              >
                <Picker.Item label="Tipo" value="Tipo" />
                <Picker.Item label="Troncal" value="Troncal"/>
                <Picker.Item label="Genérica" value="Genérica"/>
                <Picker.Item label="Complementaria" value="Complementaria"/>
                <Picker.Item label="Libre configuración" value="Libre configuración"/>
                <Picker.Item label="Formación Básica" value="Formación Básica"/>
              </Picker>
              <TouchableOpacity style={style.button} onPress={onSend} >
                <Text style={style.textbutton}>REGISTRAR</Text>
              </TouchableOpacity>
            </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RegistroAsignaturasDocenteScreen;