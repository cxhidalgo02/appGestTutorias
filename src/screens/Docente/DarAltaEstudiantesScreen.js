import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where, } from 'firebase/firestore';
import DarAltaEstudiante from '../../components/DarAltaEstudiante';
import { StyleSheet, View, Text, SafeAreaView, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';

const DarAltaEstudiantesScreen = () => {

  const [estudiante, setNuevoEstudiante] = React.useState([]);
  // Id del usuario que inicia sesion
  const pathId = localStorage.getItem(`keyUser`, pathId);
  // Id de la asignatura que seleccionar el usuario
  const pathCodAsig = localStorage.getItem(`keyCodigo`, pathCodAsig);
  //recuperar el path del estudiante con asignaturas del componente dar de alta estudiant
  const pathEstudiante = localStorage.getItem(`keyEstAsig`, pathEstudiante);

  const consulta = () => {
    //consulta de estudiantes
    const collectionRef = collection(database, 'gestionUsuarios');
    const q = query(collectionRef, where("tipo", "==", "Estudiante") );
    //consulta de asignaturas de estudiantes
    const collectionRefTwo = collection(database, `/gestionUsuarios/${pathId}/asignaturas/`);
    const qTwo = query(collectionRefTwo, where("validada", "==", "false"));
    
    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('Lista de estudiantes');
        setNuevoEstudiante(
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
  }
  React.useEffect(() => {
    consulta();  
  },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <Text style={styles.textTitle}>
            VALIDAR ACCESO
          </Text>
          <ScrollView style={styles.scrollAsig}>
            {estudiante.map(estudiante=> <DarAltaEstudiante key={estudiante.id} {...estudiante}/>)}
          </ScrollView>
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