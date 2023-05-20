import * as React from 'react';
import { firebaseConfig } from '../../firebase-config';
import { initializeApp} from "firebase/app";
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, TextInput } from 'react-native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { style } from '../styles/styles';

const resetClave = ({ navigation })=> {

  const [email, setEmail] = React.useState('')
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  async function resetPass() {
    try {
      sendPasswordResetEmail(auth, email)
      .then(() => {
      })
      .catch((error) => {
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
        <View style={style.subcontainer}> 

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
  subcontainerText: {
    marginTop: 40,
  },
});
