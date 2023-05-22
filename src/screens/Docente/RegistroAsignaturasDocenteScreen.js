import * as React from 'react';
import { style } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import { database } from '../../../config/firebaseConfig';
import { doc, setDoc, getFirestore, } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { Picker } from '@react-native-picker/picker';

const RegistroAsignaturasDocenteScreen = () => { 
  const navigation = useNavigation();

  const [nombreAsignatura, setNombreAsignatura] = React.useState('')
  const [codigoAsignatura, setCodigoAsignatura] = React.useState('')
  const [tipoAsignatura, setTipoAsignatura] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState(new Date())

  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);

  const pathUrl = `gestionUsuarios/${pathIdDoc}/asignaturas/`;
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
      navigation.goBack();
      
    } catch (error) {
      console.log('ERROR =>', error);
    }
  }

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