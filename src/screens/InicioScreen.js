import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, TextInput, ScrollView, LogBox, RefreshControl} from 'react-native';
import localStorage from 'react-native-expo-localstorage';
import { style } from '../styles/styles';
import { Picker } from '@react-native-picker/picker';

LogBox.ignoreAllLogs();

const InicioScreen = ({ navigation })=> {

  //atributos de la clase usuario
  const [correo, setCorreo] = React.useState('');
  const [clave, setClave] = React.useState('');
  const [tipo, setTipo] = React.useState("");
  //inicializacion de firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);
  
 const handleSingIn = () =>{
    signInWithEmailAndPassword(auth, correo, clave)
    .then( (userCredential) => {      
      const user = userCredential.user;
      const userUid = user.uid;
      const collectionRegUsuario = collection(firestore, "registroUsuarios");
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
          case "Docente":
            navigation.navigate('asignaturasDocenteScreen');
            localStorage.setItem("keyUserDoc", userUid);
            break;
          case "Estudiante":
            navigation.navigate('asignaturasEstudiantesScreen');
            localStorage.setItem("keyUserEst", userUid);
            break;
          case "Tipo":
            console.log('Debe seleccionar un tipo!');
            break;
        }
      }
      );    
    })
    .catch( (error) => {
      console.log(" * ERROR * ",error)
    });
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
            refreshControl={
              <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
            } 
          >
          <Text style={style.textTitle}>
              ACCEDER A SU CUENTA
            </Text>
              <TextInput style = {style.textInput}
                id="Email"
                placeholder="Correo"
                textContentType="emailAddress"
                autoCapitalize='none'
                onChangeText={(text) => setCorreo(text)}/>
              <TextInput style = {style.textInput}
                id="Pass"
                placeholder="Contraseña"
                textContentType="password"
                secureTextEntry
                autoCapitalize='none'
                type={shown ? 'text' : 'password'}
                onChangeText={(text) => setClave(text)}/> 
              <Picker
                  style = {style.select}
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
                <Text style={style.textbuttonTwo}>Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
          </ScrollView> 
        </View>
      </View>
    </SafeAreaView>
  );
};
export default InicioScreen;

const styles = StyleSheet.create({
  scrollForm: {
    textAlign: "center",
    marginTop: 120,
  },
  containerFecha: {
    width: '100%',
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCalendar: {
    width: "20%",
    marginTop: 20,
  },
  inputCalendar: {
    width: "80%",
  }
});