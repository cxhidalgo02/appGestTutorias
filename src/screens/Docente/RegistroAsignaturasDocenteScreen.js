import * as React from 'react';
import { database } from '../../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Select, CheckIcon, NativeBaseProvider} from 'native-base';
import { collection, addDoc } from 'firebase/firestore';

const RegistroAsignaturasDocenteScreen = () => { 
  
  const navigation = useNavigation();
  const [nombre, setNombreAsignatura] = React.useState('')
  const [codigo, setCodigoAsignatura] = React.useState('')
  const [tipo, setTipo] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState(new Date())

  const onSend = async () => {
    //console.log('Datos de registro: ', nombreAsignatura, codigoAsignatura, tipo, createdAt )
    const setDoc = {
      nombre: nombre,
      codigo: codigo,
      tipo: tipo,
      createdAt: createdAt
    };
    //console.log("DATOS DE setDoc -- ", setDoc);
    await addDoc(collection(database, 'asignaturaTutorias'), setDoc);
    navigation.goBack();
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
          
          <ScrollView style = {styles.scrollForm}> 
          <Text style={styles.textTitle}>
            FORMULARIO
          </Text>
            <TextInput style = {styles.textInput}
              onChangeText={(text) => setNombreAsignatura(text)}
              placeholder="Nombre de la asignatura"
            />
            <TextInput style = {styles.textInput}
              onChangeText={(text) => setCodigoAsignatura(text)}
              placeholder="Codigo de la asignatura"
            />
            <NativeBaseProvider>
              <Select 
                  id="tipo"
                  selectedValue={tipo} 
                  minWidth={280} paddingTop={3}
                  marginTop={6}
                  borderColor="#2E86C1" backgroundColor="#fff" borderRadius={9} borderWidth={1} 
                  accessibilityLabel="Seleccionar" 
                  placeholder="Seleccionar" 
                  onValueChange={itemValue => setTipo(itemValue)} _selectedItem={{
                  endIcon: <CheckIcon size={6} />
                }}>
                <Select.Item label="Troncal" value="Troncal"/>
                <Select.Item label="Genérica" value="Genérica"/>
                <Select.Item label="Complementaria" value="Complementaria"/>
                <Select.Item label="Libre configuración" value="Libre configuración"/>
                <Select.Item label="Formación Básica" value="Formación Básica"/>
              </Select>
            </NativeBaseProvider>
          
            <TouchableOpacity style={styles.button} onPress={onSend} >
              <Text style={styles.textbutton}>REGISTRAR</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      
    </SafeAreaView>
  );
};
export default RegistroAsignaturasDocenteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 22, 
    textAlign: 'center', 
    marginBottom: 16, 
    color: '#293774',
  },
  scrollForm: {
    textAlign: "center",
    marginTop: 100,
  },
  textInput:{
    borderWidth: 1,
    borderColor: "#2E86C1",
    backgroundColor:"#fff",
    padding:10,
    marginTop:20,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#293774',
    padding: 10,
    marginTop: 40,
    borderRadius:10,
  },
  textbutton: {
    color: "#F2F3F4",
  },
});
