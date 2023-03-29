import * as React from 'react';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
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

  async function consultaAsignaturas() {
        //consulta de asignaturas con path Estudiante del componente DarAltaEstudiante
        const collectionRef1 = collection(database, `gestionUsuarios/${pathIdEstData}/asignaturas/`);
        const q = query(collectionRef1, where('codigo','==',`${pathIdAsig}`) );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const resNombre = doc.data().nombre;
          const resTipo = doc.data().tipo;
          const resValidada = doc.data().validada;
          console.log(doc.id, " => ", resNombre, " => ", resTipo, " => ", resValidada);
          console.log(doc.id, " => ", doc.data());
          if ( resValidada ==  'false') {
          console.log('DATOS DEL ESTUDIANTE');
          } else {
            console.log('NO HAY DATOS');
          }
        });
  }

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
    consultaAsignaturas();
    consultaEstudiantes();
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