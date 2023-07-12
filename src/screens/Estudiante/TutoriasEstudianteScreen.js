import * as React from 'react';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { style } from '../../styles/styles';
import TutoriasEstudiante from '../../components/Estudiante/TutoriasEstudiante';
import Layout from '../../components/layout/Layout';

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
    const tutoriasEstudianteQuery = query(collectionRef, orderBy('semanaTutoEst', 'desc'));
    const unsubscribe = onSnapshot(tutoriasEstudianteQuery, querySnapshot => {
      setNuevaTutoria(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          temaTutoEst: doc.data().temaTutoEst,
          descripcionTutoEst: doc.data().descripcionTutoEst,
          aulaTutoEst: doc.data().aulaTutoEst,
          fechaTutoEst: doc.data().fechaTutoEst,
          horaTutoEst: doc.data().horaTutoEst,
          semanaTutoEst: doc.data().semanaTutoEst,
          inscripcionTutoEst: doc.data().inscripcionTutoEst,
          validadaTutoEst: doc.data().validadaTutoEst,
          fechaRegTutoEst: doc.data().fechaRegTutoEst,
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
    <Layout>
      <View style={style.titleContainer}>
        <Text style={style.textTitle}>
          MIS TUTORIAS
        </Text>
      </View>
      {tutoria.map(tutoria => <TutoriasEstudiante key={tutoria.id} {...tutoria}/>)}
    </Layout>

  );
};
export default TutoriasDocenteScreen;