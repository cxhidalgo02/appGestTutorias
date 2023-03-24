import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where, orderBy, and, getDoc, getDocs } from 'firebase/firestore';
import DarAltaEstudiante from '../../components/DarAltaEstudiante';
import { StyleSheet, View, Text, SafeAreaView, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';

const DarAltaEstudiantesScreen = () => {

  const [estudiante, setNuevoEstudiante] = React.useState([]);
  const [asignatura, setNuevaAsignatura] = React.useState([]);
  const [estudianteAlta, setNuevoEstudianteAlta] = React.useState([]);
  ///gestionUsuarios/hVUUrfRfKzNkCoBI0CBAHbaJAJJ2/asignaturas/CODTT001
  // Id del usuario que inicia sesion
  const pathId = localStorage.getItem(`keyUser`, pathId);
  // Id del estudiante
  const UidEst = localStorage.getItem(`keyEst`, UidEst);
  //console.log('UidEst => ', UidEst);
  // Id de la asignatura que seleccionar el usuario
  const pathCodAsig = localStorage.getItem(`keyCodigo`, pathCodAsig);
  console.log(pathCodAsig);
  //recuperar el path del estudiante con asignaturas del componente dar de alta estudiant
    const pathEstudiante = localStorage.getItem(`keyEstAsig`, pathEstudiante);
  //console.log('Dar de alta estudiantes Screen: ',pathEstudiante);

  const pathIdAsig = localStorage.getItem(`keyCodigo`, pathIdAsig);

  //console.log('pathId => ', pathId);
  //console.log('UidEst => ', UidEst);
  //console.log('pathCodAsig => ', pathCodAsig);
  //console.log('pathEstudiante => ', pathEstudiante);
  //console.log('pathIdAsig => ', pathIdAsig);

  async function consultaAsignaturas() {

        //consulta de asignaturas con path Estudiante del componente DarAltaEstudiante
        const collectionRef1 = collection(database, `gestionUsuarios/${UidEst}/asignaturas/`);
        const q = query(collectionRef1, where('codigo','==',`${pathCodAsig}`));
        //const q = query(collection(database, `gestionUsuarios/${UidEst}/asignaturas/`), where('validada','==','false'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const result = doc.data().validada;
          console.log(doc.id, " => ", result);
          //console.log(doc.id, " => ", doc.data());
          if ( result ==  'false') {
            console.log('DATOS DEL ESTUDIANTE');

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

          } else {
            console.log('NO HAY DATOS');
          }
        });

      }

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