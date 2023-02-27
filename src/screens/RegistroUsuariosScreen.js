import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, TextInput, ScrollView, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { Select, CheckIcon,  NativeBaseProvider} from 'native-base';
import { initializeApp} from "firebase/app";
import { firebaseConfig } from '../../firebase-config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const RegistroUsuariosScreen = (user) => {

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
 
  //CREAR USUARIO  -----------------------------------------------------------------------------------------
    const onSend = async () => {
      const infoUsuario = createUserWithEmailAndPassword(auth, correo, clave
        ).then((userCredential) => {
          //console.log('Cuenta creada...')
          const user = userCredential.user;
          //console.log("UserCredential: ",user.uid);
          const docRef = doc(firestore, `registroUsuarios/${user.uid}`);
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
        navigation.goBack();
    }
    
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
          <ScrollView style = {styles.scrollForm}>
          <Text style={styles.textTitle}>
            FORMULARIO
          </Text>
            <TextInput
              style = {styles.textInput}
              placeholder="Cedula"
              keyboardType="numeric"
              onChangeText={(text) => setCedula(text)}
            />
            <TextInput
              style = {styles.textInput}
              placeholder="Nombres"
              onChangeText={(text) => setNombres(text)}
            />
            <TextInput
              placeholder="Apellidos"
              style = {styles.textInput}
              onChangeText={(text) => setApellidos(text)}
            />
            <TextInput 
              style = {styles.textInput}
              placeholder="Correo"
              onChangeText={(text) => setCorreo(text)}
            />
            <TextInput 
              style = {styles.textInput}
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
              style={styles.button}
              onPress={onSend}>
              <Text style={styles.textbutton}>REGISTRARSE</Text>
            </TouchableOpacity>
          </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
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
    marginTop: 50,
  },
  textInput:{
    borderWidth: 1,
    borderColor: "#2E86C1",
    backgroundColor:"#fff",
    padding:10,
    paddingStart: 20,
    marginTop:20,
    borderRadius: 10,
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
  button: {
    textAlign:"center",
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
export default RegistroUsuariosScreen;

/*
      const handleCreateAccount = () =>{
      createUserWithEmailAndPassword(auth, email, password)
      .then( (userCredential) => {
        console.log('Cuenta creada...')
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('InicioScreen')
      })
      .catch( error => {
        console.log(error)
        Alert.alert(error.message)
      });
    }
      
*/