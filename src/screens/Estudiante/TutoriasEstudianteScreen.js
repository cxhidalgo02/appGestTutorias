import * as React from 'react';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { style } from '../../styles/styles';
import TutoriasEstudiante from '../../components/Estudiante/TutoriasEstudiante';

const TutoriasDocenteScreen = () => {
  //constructor para las tutorias del estudiante
  const [tutoria, setNuevaTutoria] = React.useState([]);

  // UID del usuario que inicia sesion
  const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
  // UID de la asignatura que seleccionar el usuario
  const pathCodAsigEst = localStorage.getItem(`keyCodAsigEst`, pathCodAsigEst);
  // UID de la tutoria que seleccionar el usuario  
  const pathCodTutEst = localStorage.getItem(`keyCodTutEst`, pathCodTutEst);

  React.useEffect(() => {
    const collectionRef = collection(database, `Usuarios/${pathIdEst}/AsignaturasEstudiante/${pathCodAsigEst}/TutoriasEstudiante`);
    const tutoriasEstudianteQuery = query(collectionRef, orderBy('semana', 'desc'));
    const unsubscribe = onSnapshot(tutoriasEstudianteQuery, querySnapshot => {
      setNuevaTutoria(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          tema: doc.data().tema,
          descripcion: doc.data().descripcion,
          aula: doc.data().aula,
          fecha: doc.data().fecha,
          hora: doc.data().hora,
          semana: doc.data().semana,
          inscripcion: doc.data().inscripcion,
          validada: doc.data().validada,
          createdAt: doc.data().createdAt,
        }))
      );
    });
    return unsubscribe;
  },[])

  //estados para refrezcar el screen
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
        <Text style={style.textTitle}>
          MIS TUTORIAS
        </Text>
        <ScrollView style={style.scrollContent}
          refreshControl={
            <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
          } 
        >
          {tutoria.map(tutoria => <TutoriasEstudiante key={tutoria.id} {...tutoria}/>)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default TutoriasDocenteScreen;