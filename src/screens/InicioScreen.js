import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, 
          TextInput, ScrollView, Alert, LogBox} from 'react-native';
import { Select, CheckIcon, NativeBaseProvider  } from 'native-base';

LogBox.ignoreAllLogs();

const InicioScreen = ({ navigation })=> {

  const [correo, setCorreo] = React.useState('');
  const [clave, setClave] = React.useState('');
  const [tipo, setTipo] = React.useState("");
  const [createdAt, setCreatedAt] = React.useState(new Date());
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);

 const handleSingIn = () =>{   
    console.log("Datos ingresados formulario: ", correo, clave, tipo);
    signInWithEmailAndPassword(auth, correo, clave)
    .then( (userCredential) => {      
      const user = userCredential.user;
      const userUid = user.uid;
      const collectionRef = collection(firestore, "gestionUsuarios");
      const q = query(collectionRef, where("id", "==", userUid));
      const setUsuario = onSnapshot(q, querySnapshot => {
        setUsuario(querySnapshot.docs.map(doc => ({
          correo: doc.data().correo,
          clave: doc.data().clave,
          tipo: doc.data().tipo,
          createdAt: doc.data().createdAt,
          }))
        );
        console.log("Datos usuario: ", correo, clave, tipo, createdAt);
        switch(tipo){
          case "Docente":
             navigation.navigate('asignaturasDocenteScreen');
          console.log('Se ha iniciado sesion como Docente....')
             break;
          case "Estudiante":
             navigation.navigate('asignaturasEstudiantesScreen');
          console.log('Se ha iniciado sesion como Estudiante....')
             break;
        }
       }
      );    
    })
    .catch( error => {
      console.log(" * ERROR * ",error)
      Alert.alert(error.message)
      Alert.alert('Error al iniciar sesión', 'Ingrese nuevamente su usuario y constraseña', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    });
  }
 
  return ( 
    <SafeAreaView style={{ flex: 1 }} >
      <View style={styles.container} >
        <ScrollView style = {styles.scrollForm}>
        <Text style={styles.textTitle}>
            INICIE SU CUENTA
          </Text>
            <TextInput style = {styles.textInput}
              id="Email"
              placeholder="Correo"
              textContentType="emailAddress"
              autoCapitalize='none'
              onChangeText={(text) => setCorreo(text)}/>
            <TextInput style = {styles.textInput}
              id="Pass"
              placeholder="Contraseña"
              textContentType="password"
              secureTextEntry
              autoCapitalize='none'
              type={shown ? 'text' : 'password'}
              onChangeText={(text) => setClave(text)}/> 
            <NativeBaseProvider>
              <Select 
                  id="tipoUsuario"
                  selectedValue={tipo} 
                  minWidth={280} paddingTop={3}
                  marginTop={6}
                  borderColor="#2E86C1" backgroundColor="#fff" borderRadius={9} borderWidth={1} 
                  accessibilityLabel="Seleccionar" 
                  placeholder="Seleccionar" 
                  onValueChange={itemValue => setTipo(itemValue)} _selectedItem={{
                  endIcon: <CheckIcon size={6} />
                }}>
                <Select.Item label="Docente" value="Docente" />
                <Select.Item label="Estudiante" value="Estudiante" />
            </Select>
            </NativeBaseProvider>

            <TouchableOpacity style={styles.button} onPress={handleSingIn}>
              <Text style={styles.textbutton}>INICIO SESIÓN</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonTwo} onPress={() => navigation.navigate('resetClave')}>
              <Text style={styles.textbuttonTwo}>Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </ScrollView> 
      </View>
    </SafeAreaView>
  );
};
export default InicioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  scrollForm: {
    textAlign: "center",
    marginTop: 120,
  },
  textTitle: {
    fontSize: 22, 
    textAlign: 'center', 
    marginBottom: 16, 
    color: '#293774',
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
  textSelect:{
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
    alignItems: 'center',
    backgroundColor: '#293774',
    padding: 10,
    marginTop: 40,
    borderRadius:10,
  },
  textbutton: {
    color: "#F2F3F4",
  },
  buttonTwo: {
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  textbuttonTwo: {
    color: '#293774',
  },
});


/* 
  const handleSingIn = () =>{ 
    signInWithEmailAndPassword(auth, correo, clave)
    .then( (userCredential) => {
      console.log('Se ha iniciado sesion...')
      const user = userCredential.user;
      console.log(user);
      navigation.navigate('asignaturasDocenteScreen')
    })
    .catch( error => {
      console.log(error)
      Alert.alert(error.message)
      navigation.navigate('InicioScreen')
    });
  }


  const collectionRef = collection(database, 'registroUsuarios');
      const q = query(collectionRef, where("id", "==", userSetUID));
      const setUsuario = onSnapshot(q, querySnapshot => {
        setNuevoUsuario(querySnapshot.docs.map(doc => ({
          correo: doc.data().correo,
          clave: doc.data().clave,
          tipo: doc.data().tipo,
          createdAt: doc.data().createdAt,
          }))
        );
        console.log("Datos usuario: ", correo, clave, tipo, createdAt);
        //console.log("setNuevoUsuario: ", setNuevoUsuario);
        if( tipo == "Docente"){
           navigation.navigate('asignaturasDocenteScreen')
          console.log('Se ha iniciado sesion como Docente....')
        } 
        if( tipo == "Estudiante"){
          navigation.navigate('asignaturasEstudiantesScreen')
          console.log('Se ha iniciado sesion como Estudiante....')
        }
       }
      );

      
  const handleSingIn3 = () =>{ 
    console.log("Datos ingresados formulario: ", correo, clave, tipo);
    signInWithEmailAndPassword(auth, correo, clave)
    .then( (userCredential) => {
      //console.log('Se ha iniciado sesion...')
      const user = userCredential.user;
      const userUid = user.uid;
      console.log("userUid : ", userUid );
      switch(tipo){
        case "Docente":
           navigation.navigate('asignaturasDocenteScreen');
        //console.log('Se ha iniciado sesion como Docente....')
           break;
        case "Estudiante":
           navigation.navigate('asignaturasEstudiantesScreen');
        //console.log('Se ha iniciado sesion como Estudiante....')
           break;
      }
    })
    .catch( error => {
      console.log(" * ERROR * ",error)
      Alert.alert(error.message)
      Alert.alert('Error al iniciar sesión', 'Ingrese nuevamente su usuario y constraseña', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    });
  }

  <ImageBackground source={image} resizeMode="cover" style={styles.image}>
  </ImageBackground>

*/