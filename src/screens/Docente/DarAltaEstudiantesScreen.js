import * as React from 'react';
import { style } from '../../styles/styles';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where,} from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DarAltaEstudiante from '../../components/DarAltaEstudiante';

const DarAltaEstudiantesScreen = () => {

  //constructor de estudiante para la clase dar de alata estudiante
  const [estudiante, setNuevoEstudiante] = React.useState([]);
  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id del estudiante que se trae de dar de alata estudiante screen
  const pathIdEstData = localStorage.getItem(`keyUserEstData`, pathIdEstData);
  // Id de la asignatura que seleccionar el usuario
  const pathIdAsig = localStorage.getItem(`keyCodAsigDoc`, pathIdAsig);

  React.useEffect(() => { 
    try {
      const collectionRef = collection(database, 'registroUsuarios');
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
  },[])
/*
  React.useEffect(() => { 
    consultaEstudiantes();
  },[])*/
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
          VALIDAR ACCESO
        </Text>  
        <ScrollView style={style.scrollContent}
          refreshControl={
            <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
          } 
        >
          {estudiante.map(estudiante=> <DarAltaEstudiante key={estudiante.id} {...estudiante}/>)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default DarAltaEstudiantesScreen;