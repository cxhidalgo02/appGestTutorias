import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, onSnapshot} from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TouchableOpacity, StyleSheet, Text, TextInput, LogBox, Alert, KeyboardAvoidingView} from 'react-native';
import localStorage from 'react-native-expo-localstorage';
import { style } from '../styles/styles';
import { AntDesign } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';
import Layout from '../components/layout/Layout';

LogBox.ignoreAllLogs();
const InicioScreen = ({ navigation })=> {

  //atributos de la clase usuario
  const [correo, setCorreo] = React.useState('');
  const [clave, setClave] = React.useState('');
  const [tipo, setTipo] = React.useState('');
  //inicializacion de firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);

 const handleSingIn = () =>{ signInWithEmailAndPassword(auth, correo, clave).then( (userCredential) => {
      const user = userCredential.user;
      const userUid = user.uid;
      const collectionRegUsuario = collection(firestore, "Usuarios");
      const q = query(collectionRegUsuario, where("id", "==", userUid));
      const setUsuario = onSnapshot(q, querySnapshot => {
        setUsuario(querySnapshot.docs.map(doc => ({
          correo: doc.data().correo,
          clave: doc.data().clave,
          tipo: doc.data().tipo,
          createdAt: doc.data().createdAt,
          }))
        );
        switch(tipo){
          case "Tipo":
            Alert.alert('Error!', 'Debe seleccionar su rol', [
              { text: 'Aceptar' },
            ]);
            break;
          case "Docente":
            localStorage.setItem("keyUserDoc", userUid);
            navigation.navigate('asignaturasDocenteScreen');
            Alert.alert('Bienvenido', '', [
              { text: 'Aceptar' },
            ]);
            break;
          case "Estudiante":
            localStorage.setItem("keyUserEst", userUid);
            navigation.navigate('asignaturasEstudiantesScreen');
            Alert.alert('Bienvenido', '', [
              { text: 'Aceptar' },
            ]);
            break;
        }
      });
    })
    .catch( (error) => {
      console.log(' * ERROR: ', error)
      Alert.alert('Error!', 'Verifique su correo o contraseña', [
        { text: 'Aceptar' },
      ]);
    });
  }

  return (
    <Layout>
      <KeyboardAvoidingView>
        <Text style={style.textTitleForm}>
          ACCEDER A SU CUENTA
        </Text>
        <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
          id="Email"
          placeholder="Correo"
          textContentType="emailAddress"
          autoCapitalize='none'
          onChangeText={(text) => setCorreo(text)}/>
        <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
          id="Pass"
          placeholder="Contraseña"
          textContentType="password"
          secureTextEntry
          autoCapitalize='none'
          onChangeText={(text) => setClave(text)}/>
        <Picker
            //style={style.select}
            style={[style.select, Platform.OS === 'ios' && style.iOS_select]}
            selectedValue={tipo}
            onValueChange={(itemValue) => setTipo(itemValue)}
          >
            <Picker.Item label="Tipo" value="Tipo" />
            <Picker.Item label="Docente" value="Docente" />
            <Picker.Item label="Estudiante" value="Estudiante" />
          </Picker>
          <TouchableOpacity style={style.button} onPress={handleSingIn}>
              <Text style={style.textbutton}>INICIO SESIÓN</Text>
          </TouchableOpacity>
        <TouchableOpacity style={style.buttonTwo} onPress={() => navigation.navigate('resetClave')}>
          <Text style={style.textbuttonTwo}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Layout>
  );
};
export default InicioScreen;