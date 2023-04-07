import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, 
  SafeAreaView, TextInput, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { Select, CheckIcon,  NativeBaseProvider} from 'native-base';
import { initializeApp} from "firebase/app";
import { firebaseConfig } from '../../firebase-config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import { style } from '../styles/styles';

const RegistroUsuariosScreen = () => {

  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  const [cedula, setCedula] = React.useState('')
  const [nombres, setNombres] = React.useState('')
  const [apellidos, setApellidos] = React.useState('')
  const [correo, setCorreo] = React.useState('')
  const [clave, setClave] = React.useState('')
  const [tipo, setTipo] = React.useState("")
  const [createdAt, setCreatedAt] = React.useState(new Date())

    const onSend = async () => {
      const infoUsuario = createUserWithEmailAndPassword(auth, correo, clave
        ).then((userCredential) => {
          const user = userCredential.user;
          const docRef = doc(firestore, `gestionUsuarios/${user.uid}`);
          setDoc(docRef, {
            cedula: cedula, 
            nombres: nombres, 
            apellidos: apellidos, 
            correo: correo,
            clave: clave,
            tipo: tipo,
            createdAt: createdAt
          });
          return userCredential;
        });
        alertRecordUsuario();
        navigation.goBack();
    }

    const alertRecordUsuario = () => {
      try {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Usuario Registrado Correctamente',
        })
      } catch (error) {
        console.log("No pudo mostrar el Error:  ", error);
      }
    }

    const alertErrorUsuario = () => {
      try {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error al Registrar el Usuario',
        })
      } catch (error) {
        console.log("No pudo mostrar el Error:  ", error);
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
          <ScrollView style = {styles.scrollForm}
            refreshControl={
              <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
            } 
          >
          <Text style={style.textTitle}>
            FORMULARIO
          </Text>
            <TextInput
              style = {style.textInput}
              placeholder="Cedula"
              keyboardType="numeric"
              onChangeText={(text) => setCedula(text)}
            />
            <TextInput
              style = {style.textInput}
              placeholder="Nombres"
              onChangeText={(text) => setNombres(text)}
            />
            <TextInput
              placeholder="Apellidos"
              style = {style.textInput}
              onChangeText={(text) => setApellidos(text)}
            />
            <TextInput 
              style = {style.textInput}
              placeholder="Correo"
              onChangeText={(text) => setCorreo(text)}
            />
            <TextInput 
              style = {style.textInput}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={(text) => setClave(text)}
            />
            <NativeBaseProvider>
              <Select 
                  selectedValue={tipo} 
                  minWidth={280} paddingTop={3}
                  marginTop={6}
                  borderColor="#2E86C1" backgroundColor="#fff" borderRadius={9} borderWidth={1} 
                  accessibilityLabel="Seleccionar" 
                  placeholder="Seleccionar" 
                  onValueChange={itemValue => setTipo(itemValue)}
                  _selectedItem={{endIcon: <CheckIcon size={6} />
                }}>
                <Select.Item label="Docente" value="Docente" />
                <Select.Item label="Estudiante" value="Estudiante" />
              </Select>
            </NativeBaseProvider>
            <TouchableOpacity
              style={style.button}
              onPress={onSend}>
              <Text style={style.textbutton}>REGISTRAR</Text>
            </TouchableOpacity>
          </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
export default RegistroUsuariosScreen;