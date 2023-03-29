import * as React from 'react';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where, orderBy, and, getDoc, getDocs } from 'firebase/firestore';
import ValidarAsistencia from '../../components/ValidarAsistencia';
import { StyleSheet, View, Text, SafeAreaView, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';

const ValidarAsistenciaScreen = () => {

  const [estudiante, setNuevoEstudiante] = React.useState([]);
  // Id del usuario que inicia sesion
  const pathId = localStorage.getItem(`keyUser`, pathId);
  // Id del estudiante
  const UidEst = localStorage.getItem(`keyEst`, UidEst);
  // Id de la asignatura que seleccionar el usuario
  const pathCodAsig = localStorage.getItem(`keyCodigo`, pathCodAsig);
  //recuperar el path del estudiante con asignaturas del componente dar de alta estudiant
  const pathEstudiante = localStorage.getItem(`keyEstAsig`, pathEstudiante);
  //console.log('Dar de alta estudiantes Screen: ',pathEstudiante);
  
  //tutoria seleccionada
  const pathCodTut = localStorage.getItem(`keyCodigoTut`, pathCodTut);
  console.log('Codigo T => ', pathCodTut);
  
  async function consultaEstudiantes() {
    const collectionRef = collection(database, 'gestionUsuarios');
    const qOne = query(collectionRef, where("tipo", "==", "Estudiante") );
    const unsubscribe2 = onSnapshot(qOne, querySnapshot => { 
        setNuevoEstudiante(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                cedula: doc.data().cedula,
                nombres: doc.data().nombres,
                apellidos: doc.data().apellidos,
                correo: doc.data().correo,
            }))
          );
        });
    return unsubscribe2;
}

React.useEffect(() => { 
  consultaEstudiantes();
},[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <Text style={styles.textTitle}>
            VALIDAR ASISTENCIA
          </Text>
          <ScrollView style={styles.scrollAsig}>
            {estudiante.map(estudiante=> <ValidarAsistencia key={estudiante.id} {...estudiante}/>)}
          </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ValidarAsistenciaScreen;

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