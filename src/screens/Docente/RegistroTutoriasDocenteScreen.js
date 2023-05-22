import * as React from 'react';
import { style } from '../../styles/styles';
import { database } from '../../../config/firebaseConfig';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegistroTutoriasDocenteScreen = () => { 
  const navigation = useNavigation();

  const [codigoTutoria, setCodigoTutoria] = React.useState('')
  const [temaTutoria, setTemaTutoria] = React.useState('')
  const [descripcionTutoria, setDescripcionTutoria] = React.useState('')
  const [aulaTutoria, setAulaTutoria] = React.useState('')
  const [horaTutoria, setHoraTutoria] = React.useState('')
  const [semanaTutoria, setSemanaTutoria] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState(new Date())

  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id de la asignatura que seleccionar el usuario
  const pathIdAsig = localStorage.getItem(`keyCodAsigDoc`, pathIdAsig);
 // id del codigo que selecciona en la tutoria
 
  const pathUrlDoc  = `gestionUsuarios/${pathIdDoc}/asignaturas/${pathIdAsig}/tutorias/`;
  const onSend = async () => {
    try {
      const registroTutoria = {
        codigo: codigoTutoria,
        tema: temaTutoria, 
        descripcion: descripcionTutoria,
        aula: aulaTutoria,
        hora: horaTutoria,
        semana: semanaTutoria,
        createdAt: createdAt
      };
      const docRef = doc(database, pathUrlDoc, registroTutoria.codigo);
      await setDoc(docRef, (registroTutoria) );
      navigation.goBack();
    } catch (error) {
      console.log('ERROR => ',error);
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
          <ScrollView style = {styles.scrollForm}
            refreshControl={
              <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
            } 
          >
          <Text style={style.textTitle}>
            FORMULARIO
          </Text>
            <TextInput style = {style.textInput}
              onChangeText={(text) => setCodigoTutoria(text)}
              placeholder="Codigo"
            />
            <TextInput style = {style.textInput}
              onChangeText={(text) => setTemaTutoria(text)}
              placeholder="Tema"
            />
            <TextInput style = {style.textInput}
            onChangeText={(text) => setDescripcionTutoria(text)}
              placeholder="Descripción"
            />
            <TextInput style = {style.textInput}
            onChangeText={(text) => setAulaTutoria(text)}
              placeholder="Aula"
            />  
            <TextInput style = {style.textInput}
            onChangeText={(text) => setHoraTutoria(text)}
              placeholder="Hora"
            /> 
            <Picker
                style = {style.select}
                selectedValue={semanaTutoria}
                onValueChange={(itemValue) => setSemanaTutoria(itemValue)}
                >
                <Picker.Item label="Semana 1" value="1" />
                <Picker.Item label="Semana 2" value="2"/>
                <Picker.Item label="Semana 3" value="3"/>
                <Picker.Item label="Semana 4" value="4"/>
                <Picker.Item label="Semana 5" value="5"/>
                <Picker.Item label="Semana 6" value="6"/>
                <Picker.Item label="Semana 7" value="7"/>
                <Picker.Item label="Semana 8" value="8"/>
                <Picker.Item label="Semana 9" value="9"/>
                <Picker.Item label="Semana 10" value="10"/>
                <Picker.Item label="Semana 11" value="11"/>
                <Picker.Item label="Semana 12" value="12"/>
                <Picker.Item label="Semana 13" value="13"/>
                <Picker.Item label="Semana 14" value="14"/>
                <Picker.Item label="Semana 15" value="15"/>
                <Picker.Item label="Semana 16" value="16"/>
                <Picker.Item label="Semana 17" value="17"/>
                <Picker.Item label="Semana 18" value="18"/>
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
export default RegistroTutoriasDocenteScreen;

const styles = StyleSheet.create({
  scrollForm: {
    textAlign: "center",
    marginTop: 80,
  },
});