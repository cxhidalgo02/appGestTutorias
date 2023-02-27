import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Usuarios from '../../components/Usuarios';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const DarAltaEstudiantesScreen = () => {

  const [usuario, setNuevpUsuario] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    const collectionRef = collection(database, 'gestionUsuarios');
    const q = query(collectionRef, where("tipo", "==", "Estudiante"));
    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot dejo los datos de usuarios');
        setNuevpUsuario(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                cedula: doc.data().cedula,
                nombres: doc.data().nombres,
                apellidos: doc.data().apellidos,
                tipo: doc.data().tipo,
                correo: doc.data().correo,
                clave: doc.data().clave,
                validado: doc.data().validado,
                createdAt: doc.data().createdAt,
            }))
          );
        }
        );
    return unsubscribe;
    },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <Text style={styles.textTitle}>
            VALIDAR ACCESO
          </Text>
          <ScrollView style={styles.scrollAsig}>
            {usuario.map(usuario=> <Usuarios key={usuario.id} {...usuario}/>)}
          </ScrollView>
          <TouchableOpacity style={styles.button} >
              <Text style={styles.textbutton}>GUARDAR</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default DarAltaEstudiantesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 24, 
    textAlign: 'center', 
    padding: 20,
    color: '#293774',
  },
  scrollAsig: {
    width: '90%',
  },
  textInput:{
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
    width: "80%",
    marginTop: 40,
    borderRadius:10,
  },
  textbutton: {
    color: "#F2F3F4",
  },
  btnContiner:{
    width: '35%',  
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  btnsContiner:{
    width: '75%',
    backgroundColor: 'transparent',
    flexDirection: "row",
  },
  productContainer: {
    width: "80%",
    padding: 10,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
},
title: {
    fontSize: 18,
}
});