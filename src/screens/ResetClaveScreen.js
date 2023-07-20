import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp} from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { style } from '../styles/styles';
import { myColors } from '../styles/colors';
import { AntDesign } from '@expo/vector-icons'; 
import Layout from '../components/layout/Layout';

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
      Alert.alert('Error!', 'Revisar su correo o registrese', [
        { text: 'Aceptar' },
      ]);
    }
}

return (
  <Layout>
    <Text style={style.textTitleSubForm}>
      INGRESAR CORREO
    </Text>
    <View style={styles.subcontainerText}>
      <Text style={style.textContentt}>
      Prodrá restablecer su contraseña si se encuentra registrado.
      </Text>
    </View>
    <TextInput
      style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
      id="Email"
      placeholder="Correo"
      textContentType="emailAddress"
      autoCapitalize='none'
      onChangeText={(text) => setEmail(text)}/>
      <TouchableOpacity style={style.button} onPress={ resetPass }>
          <Text style={style.textbutton}>ENVIAR</Text>
      </TouchableOpacity>
      <View style={styles.subcontainerText}>
      </View>
  </Layout>
);
};
export default resetClave;

const styles = StyleSheet.create({
  subcontainerText: {
    marginTop: 40,
  },
});