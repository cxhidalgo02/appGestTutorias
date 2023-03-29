import * as React from 'react';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import DarAltaEstudiante from '../../components/DarAltaEstudiante';
import { StyleSheet, View, Text, SafeAreaView, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';

const DarAltaEstudiantesScreen = () => {

  const [estudiante, setNuevoEstudiante] = React.useState([]);
  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id del estudiante que se trae de dar de alata estudiante screen
  const pathIdEstData = localStorage.getItem(`keyUserEstData`, pathIdEstData);
  // Id de la asignatura que seleccionar el usuario
  const pathIdAsig = localStorage.getItem(`keyCodAsigDoc`, pathIdAsig);

 //Funcion para hacer la consulta ala base de datos de la asignanura a la que se inscribio el estudiante
  async function consultaAsignaturasDocente() {
    try {
      //consulta de asignaturas con path Estudiante del componente DarAltaEstudiante
      const collectionRef1 = collection(database, `gestionUsuarios/${pathIdDoc}/asignaturas/`);
      const q = query(collectionRef1, where('codigo','==',`${pathIdAsig}`) );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const setNombreAsignatura = doc.data().nombre;
        const setTipoAsignatura = doc.data().tipo;
        console.log('DATOS ASIGNATURA DEL DOCENTE =>', doc.id, " => ", setNombreAsignatura, " => ", setTipoAsignatura);
        //console.log(doc.id, " => ", doc.data());
      });
      console.log('DATA => ', setNombreAsignatura, ', ', setTipoAsignatura);
    } catch (error) {
      console.log('ERROR =>', error);
    }
}

  async function consultaAsignaturas() {
    try {
      //consulta de asignaturas con path Estudiante del componente DarAltaEstudiante
      const collectionRef1 = collection(database, `gestionUsuarios/${pathIdEstData}/asignaturas/`);
      const q = query(collectionRef1, where('codigo','==',`${pathIdAsig}`) );
      const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
        const resNombre = doc.data().nombre;
        const resTipo = doc.data().tipo;
        const resValidada = doc.data().validada;
        console.log('DATOS ASIGNATURA DEL ESTUDIANTE =>', doc.id, " => ", resNombre, " => ", resTipo, " => ", resValidada);
        //console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.log('ERROR =>', error);
    }

  }

  async function updateAsignaturaEst() {
    //consulta de asignaturas con path Estudiante del componente DarAltaEstudiante
    try {
      console.log('DATA UPDATE => ', setNombreAsignatura, ', ', setTipoAsignatura);
      const docRef = doc(database, `gestionUsuarios/${pathIdEstData}/asignaturas/${pathIdAsig}`);
      updateDoc(docRef, {nombre: setNombreAsignatura, tipo: setTipoAsignatura });
      console.log('SQL EJECUTADO...');
    } catch (error) {
      console.log('ERROR =>', error);
    }
}

  async function consultaEstudiantes() {
    try {
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
    } catch (error) {
      console.log('ERROR =>', error);
    }

}


  React.useEffect(() => { 
    consultaAsignaturasDocente();
    consultaAsignaturas();
    consultaEstudiantes();
    updateAsignaturaEst();
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