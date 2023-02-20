import * as React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Select, CheckIcon, NativeBaseProvider} from 'native-base';

const RegistroTutoriasDocenteScreen = () => { 
  
  const navigation = useNavigation();
  const [nuevaTutoria, setnuevaTutoria] = React.useState({
    tema: '', 
    descripcion: '',
    aula: '',
    hora: '',
    semana: '',
    createdAt: new Date(),
  })

  const [tema, setTema] = React.useState('')
  const [descripcion, setDescripcion] = React.useState('')
  const [aula, setAula] = React.useState('')
  const [hora, setHora] = React.useState('')
  const [semana, setSemana] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState('')

  const onSend = async () => {
    console.log('Datos de registro: ', tema, descripcion, aula, hora, semana, createdAt )
    const setDoc = {
      tema: tema, 
      descripcion: descripcion,
      aula: aula,
      hora: hora,
      semana: semana,
      createdAt: createdAt
    };
    console.log("DATOS DE setDoc -- ", setDoc);
    await addDoc(collection(database, 'registroTutorias'), setDoc);
    navigation.goBack();
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >

          <Text style={styles.textTitle}>
            FORMULARIO
          </Text>

          <ScrollView style = {styles.scrollForm}>
            <TextInput style = {styles.textInput}
              onChangeText={(text) => setTema(text)}
              placeholder="Tema"
            />
            <TextInput style = {styles.textInput}
            onChangeText={(text) => setDescripcion(text)}
              placeholder="Descripción"
            />
            <TextInput style = {styles.textInput}
            onChangeText={(text) => setAula(text)}
              placeholder="Aula"
            />  
            <TextInput style = {styles.textInput}
            onChangeText={(text) => setHora(text)}
              placeholder="Hora"
            /> 
            <NativeBaseProvider>
              <Select 
                  id="tipo"
                  selectedValue={semana} 
                  minWidth={280} paddingTop={3}
                  marginTop={6}
                  borderColor="#2E86C1" backgroundColor="#fff" borderRadius={9} borderWidth={1} 
                  accessibilityLabel="Seleccionar" 
                  placeholder="Seleccionar" 
                  onValueChange={itemValue => setSemana(itemValue)} 
                  _selectedItem={{endIcon: <CheckIcon size={6} />
                }}>
                <Select.Item label="Semana 1" value="Semana 1" />
                <Select.Item label="Semana 2" value="Semana 2" />
                <Select.Item label="Semana 3" value="Semana 3" />
                <Select.Item label="Semana 4" value="Semana 4" />
                <Select.Item label="Semana 5" value="Semana 5" />
                <Select.Item label="Semana 6" value="Semana 6" />
                <Select.Item label="Semana 7" value="Semana 7" />
                <Select.Item label="Semana 8" value="Semana 8" />
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
export default RegistroTutoriasDocenteScreen;

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
  },
  scrollForm: {
    textAlign: "center",
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
    backgroundColor: '#2E86C1',
    padding: 10,
    marginTop: 40,
    borderRadius:10,
  },
  textbutton: {
    color: "#F2F3F4",
  },
});
