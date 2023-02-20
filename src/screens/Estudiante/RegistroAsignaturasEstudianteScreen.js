import * as React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const RegistroAsignaturasEstudianteScreen = () => { 
  
  const navigations = useNavigation();
  const [tipo, setTipo] = React.useState("")
  const [nuevaAsignatura, setnuevaAsignatura] = React.useState({
    nombre: '', 
    codigo: '',
    tipo: '',
    createdAt: new Date(),
  })
  const onSend = async() => {
    await addDoc(collection(database, 'asignaturaTutorias'), nuevaAsignatura);
    navigations.goBack();
  } 
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        
          <Text style={styles.textTitle}>
            FORMULARIO
          </Text>
          <Text style={styles.textContent}>
              Ingrese el código de la asignatura para solicitar acceso.
          </Text>

          <ScrollView style = {styles.scrollForm}> 
            <TextInput style = {styles.textInput}
              onChangeText={(text) => setnuevaAsignatura({...nuevaAsignatura, nombre:text})}
              placeholder="Ingrese el codigo"
            />
          
            <TouchableOpacity style={styles.button} onPress={onSend} >
              <Text style={styles.textbutton}>REGISTRAR</Text>
            </TouchableOpacity>
          </ScrollView>
        
      </View>
    </SafeAreaView>
  );
};
export default RegistroAsignaturasEstudianteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  scrollForm: {
    textAlign: "center",
  },
  textTitle: {
    fontSize: 24, 
    textAlign: 'center', 
    padding: 20,
    color: '#293774',
  },
  textContent: {
    fontSize: 16, 
    textAlign: 'center', 
    color: '#293774',
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
