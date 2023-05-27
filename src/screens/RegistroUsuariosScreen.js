import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp} from "firebase/app";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, TextInput, ScrollView, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { style } from '../styles/styles';
import { Picker } from '@react-native-picker/picker';

const RegistroUsuariosScreen = () => {
  const navigation = useNavigation();
   //inicializacion de firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  //atrubutos de las clase usuarios
  const [cedula, newUsuarioCedula] = React.useState('')
  const [nombres, newUsuarioNombres] = React.useState('')
  const [apellidos, newUsuarioApellidos] = React.useState('')
  const [correo, newUsuarioCorreo] = React.useState('')
  const [clave, newUsuarioClave] = React.useState('')
  const [tipo, newUsuarioTipo] = React.useState("")
  const [fehcaRegistro, newFechaRegitroUsuario] = React.useState(new Date()) //fecha de registro - sistema

  const onSend = async () => {
    const infoUsuario = createUserWithEmailAndPassword(auth, correo, clave).then((userCredential) => {
      const user = userCredential.user;
      const registroUsuario = doc(firestore, `registroUsuarios/${user.uid}`);
      setDoc( registroUsuario, {  
        cedula: cedula, 
        nombres: nombres, 
        apellidos: apellidos, 
        correo: correo,
        clave: clave,
        tipo: tipo,
        fechaRegistro: fehcaRegistro
      });
      return userCredential;
    });
    Alert.alert('Registro exitoso!', '', [
      { text: 'Aceptar' },
    ]);
    navigation.goBack();
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
          <ScrollView style = {styles.scrollForm}
            refreshControl={ <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/> } 
          >
          <Text style={style.textTitle}>
            FORMULARIO
          </Text>
            <TextInput
              style = {style.textInput}
              placeholder="Cedula"
              keyboardType="numeric"
              onChangeText={(text) => newUsuarioCedula(text)}
            />
            <TextInput
              style = {style.textInput}
              placeholder="Nombres"
              onChangeText={(text) => newUsuarioNombres(text)}
            />
            <TextInput
              placeholder="Apellidos"
              style = {style.textInput}
              onChangeText={(text) => newUsuarioApellidos(text)}
            />
            <TextInput 
              style = {style.textInput}
              placeholder="Correo"
              onChangeText={(text) => newUsuarioCorreo(text)}
            />
            <TextInput 
              style = {style.textInput}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={(text) => newUsuarioClave(text)}
            />
            <Picker
              style = {style.select}
              selectedValue={tipo}
              onValueChange={(itemValue) => newUsuarioTipo(itemValue)}
            >
              <Picker.Item label="Tipo" value="Tipo" />
              <Picker.Item label="Docente" value="Docente" />
              <Picker.Item label="Estudiante" value="Estudiante" />
            </Picker>
            <TouchableOpacity
              style={style.button}
              onPress={onSend}>
              <Text style={style.textbutton}>REGISTRAR</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RegistroUsuariosScreen;

const styles = StyleSheet.create({
  scrollForm: {
    textAlign: "center",
    marginTop: 50,
  },
  selectOptions:{
    borderWidth: 1,
    borderColor: "#2E86C1",
    backgroundColor:"#fff",
    padding:10,
    paddingStart: 20,
    width: "80%",
    marginTop:20,
    borderRadius: 10,
  },
});