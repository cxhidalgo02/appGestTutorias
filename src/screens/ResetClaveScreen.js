import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp} from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, TextInput, Alert } from 'react-native';
import { style } from '../styles/styles';

const resetClave = ({ navigation })=> {
  //atributo email de la clase usuario 
  const [email, setEmail] = React.useState('')
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  //funcion de firebase para restaurar la contraseña
  async function resetPass() {
    try {
      sendPasswordResetEmail(auth, email)
      .then(() => {
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      Alert.alert('Correo enviado!', 'Revisar su bandeja de entrada o spam', [
        { text: 'Aceptar' },
      ]);
      navigation.goBack();
    } catch (error) {
      console.log('* ERROR:', error);
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
              <Text style={style.textContentt}>
                Prodrá restablecer su contraseña si se encuentra registrado, de lo contrario
              </Text>
              <TouchableOpacity style={style.buttonThree} onPress={() => navigation.navigate('bottomTabNavigator')}>
                <Text style={style.textbuttonThree}>Registrerse aquí!</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
  </SafeAreaView>
);
};
export default resetClave;

const styles = StyleSheet.create({
  subcontainer: {
    width: '75%',
    marginTop: 175,
  },
  subcontainerText: {
    marginTop: 40,
  },
});