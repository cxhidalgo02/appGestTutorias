import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp} from "firebase/app";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset} from 'firebase/auth'; 
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, TextInput, Alert,} from 'react-native';

const resetClave = ({ route, navigation })=> {

  const [correo, setCorreo] = React.useState('')
  const [clave, setClave] = React.useState('')
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

// RESETEAR LA CLAVE -----------------------------------------------------------------------------------------

   function handleResetPassword(auth, actionCode, continueUrl, lang) {

    verifyPasswordResetCode(auth, actionCode).then((email) => {
      const accountEmail = email;
      const newPassword = "...";
      confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {

      }).catch((error) => {

      });
    }).catch((error) => {
    });
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      
        <View style={styles.container}>  
          <View style={styles.subcontainer}> 

            <Text style={styles.textTitle}>
                INGRESAR CORREO
            </Text>
            
            <TextInput style = {styles.textInput}
              id="Email"
              placeholder="Correo"
              textContentType="emailAddress"
              autoCapitalize='none'
              onChangeText={(text) => setCorreo(text)}/>

              <TouchableOpacity style={styles.button} 
                  onPress={ () =>
                  Alert.alert('Disculpas!!', 'Estamos trabajando', [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ])
                  }>
                <Text style={styles.textbutton}>ENVIAR</Text>
              </TouchableOpacity>
              
              <View style={styles.subcontainerText}>
                <Text style={styles.textContent}>
                    Prodrá restablecer su contraseña si se encuentra registrado, de lo contrario
                </Text>
                <TouchableOpacity style={styles.buttonTwo} onPress={() => navigation.navigate('bottomTabNavigator')}>
                  <Text style={styles.textbuttonTwo}>Registrerse aquí!</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, 
  },
  subcontainer: {
    width: '80%',
  },
  textTitle: {
    fontSize: 22, 
    textAlign: 'center', 
    marginTop: 15,
    marginBottom: 15, 
    color: '#293774',
  },
  textContent: {
    fontSize: 16, 
    textAlign: 'center', 
    color: '#293774',
  },
  subcontainerText: {
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
  },
  textbuttonTwo: {
    color: '#293774',
  },

});
export default resetClave;

