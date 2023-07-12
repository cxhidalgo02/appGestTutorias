import * as React from 'react';
import { style } from '../../styles/styles';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where, } from 'firebase/firestore';

import ValidarAsistencia from '../../components/Docente/ValidarAsistencia';
import localStorage from 'react-native-expo-localstorage';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../../components/layout/Layout';


const ValidarAsistenciaScreen = () => {
  //constructor del estudiante
  const [estudiante, setNuevoEstudiante] = React.useState([]);
  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id del estudiante que se trae de dar de alata estudiante screen
  const pathIdEstData = localStorage.getItem(`keyUserEstData`, pathIdEstData);

  React.useEffect(() => {
    const collectionRef = collection(database, 'Usuarios');
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
    <Text style={style.textTitle}>
      VALIDAR ASISTENCIA
    </Text>
    {estudiante.map(estudiante=> <ValidarAsistencia key={estudiante.id} {...estudiante}/>)}
  </Layout>
);
};
export default ValidarAsistenciaScreen;