import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import TutoriasEstudiante from '../../components/TutoriasEstudiante';
import { StyleSheet, View, Text, SafeAreaView, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';

const TutoriasDocenteScreen = () => {

  const [tutoria, setNuevaTutoria] = React.useState([]);
  const navigation = useNavigation();

  // Id del usuario que inicia sesion
  const pathIdEst = localStorage.getItem(`keyUser`, pathIdEst);
  // Id de la asignatura que seleccionar el usuario
  const pathCodAsigEst = localStorage.getItem(`keyCodigoEst`, pathCodAsigEst);
  // Id de la tutoria que seleccionar el usuario  
  const pathIdTut = localStorage.getItem(`keyCodigoTut`, pathIdTut);

  React.useEffect(() => {
    const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/${pathCodAsigEst}/tutorias`);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot dejo los datos de tutorias');
        setNuevaTutoria(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                tema: doc.data().tema,
                descripcion: doc.data().descripcion,
                aula: doc.data().aula,
                hora: doc.data().hora,
                semana: doc.data().semana,
                inscripcion: doc.data().inscripcion,
                validada: doc.data().validada,
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
            MIS TUTORIAS
          </Text>
          <ScrollView style={styles.scrollAsig}>
            {tutoria.map(tutoria => <TutoriasEstudiante key={tutoria.id} {...tutoria}/>)}
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};
export default TutoriasDocenteScreen;

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
    backgroundColor: '#2E86C1',
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
});