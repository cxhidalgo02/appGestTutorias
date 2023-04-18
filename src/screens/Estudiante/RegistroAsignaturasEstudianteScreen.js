import * as React from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { database } from '../../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import { style } from '../../styles/styles'; 
import { myColors } from '../../styles/colors';

const RegistroAsignaturasEstudianteScreen = () => { 
  const navigation = useNavigation();

  //UID del estudiante que inicia sesion
  const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
  //pat path con el UID del estudiante que inica sesion y crea el documento y coleccion
  const pathUrl = `gestionUsuarios/${pathIdEst}/asignaturas/`;

  const [codigo, setCodigoAsignatura] = React.useState('')
  const onSend = async () => {
    try {
      const docu = {
        codigo: codigo,
        createdAt: new Date(),
        nombre: '',
        tipo: '',
        validada: 'false',
      };
      const docRef = doc(database, pathUrl, docu.codigo);
      await setDoc(docRef, (docu) );
      alertRecordAsignatura();
      navigation.goBack();
      
    } catch (error) {
      alertErrorAsignatura();
      console.log('ERROR => ',error);
    }
  }

  const alertRecordAsignatura = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Asignatura registrada',
      })
    } catch (error) {
      console.log("No pudo mostrar el Error:  ", error);
    }
  }

  const alertErrorAsignatura = () => {
    try {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error al registrar la asignatura',
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
        <View style={styles.subcontainer}> 
          <Text style={style.textTitle}>
            FORMULARIO
          </Text>
          <Text style={styles.textContent}>
              Ingrese el código de la asignatura para solicitar acceso.
          </Text>
          <ScrollView style = {styles.scrollForm} 
            refreshControl={
              <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
            } 
          >
            <TextInput style = {style.textInput}
              onChangeText={(text) => setCodigoAsignatura(text)}
              placeholder="Ingrese el codigo"
            />
            <TouchableOpacity style={style.button} onPress={onSend} >
              <Text style={style.textbutton}>REGISTRAR</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RegistroAsignaturasEstudianteScreen;

const styles = StyleSheet.create({
  subcontainer: {
    width: '80%',
    marginTop: -20,
  },
  scrollForm: {
    textAlign: "center",
  },
  textContent: {
    fontSize: 16, 
    textAlign: 'center', 
    color: myColors.navyblue,
  },
});
