import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp} from "firebase/app";
import { ALERT_TYPE, Dialog, } from 'react-native-alert-notification';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, TextInput, Alert,} from 'react-native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { style } from '../styles/styles';

const resetClave = ({ navigation })=> {

  const alertSendEmail = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Correo enviado',
        textBody: 'Verifique su bandeja de entrada!',
      })
    } catch (error) {
      console.log("No pudo mostrar el Error:  ", error);
    }
  }

  const alertErrorSendEmail = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Ingrese nuevamente su correo o registrese!',
      })
    } catch (error) {
      console.log("No pudo mostrar el Error:  ", error);
    }
  }

  const [email, setEmail] = React.useState('')
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  async function resetPass() {
    try {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        alertSendEmail();
      })
      .catch((error) => {
        alertErrorSendEmail();
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    } catch (error) {
      console.log('Se produjo un error:', error);
    }
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
        <View style={style.container}>  
          <View style={styles.subcontainer}> 

            <Text style={style.textTitle}>
                INGRESAR CORREO
            </Text>
            
            <TextInput style = {style.textInput}
              id="Email"
              placeholder="Correo"
              textContentType="emailAddress"
              autoCapitalize='none'
              onChangeText={(text) => setEmail(text)}/>

              <TouchableOpacity style={style.button} 
                  onPress={ resetPass }>
                <Text style={style.textbutton}>ENVIAR</Text>
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
  subcontainer: {
    width: '80%',
  },
  textContent: {
    fontSize: 16, 
    textAlign: 'center', 
    color: '#293774',
  },
  subcontainerText: {
    marginTop: 50,
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