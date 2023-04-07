import * as React from 'react';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import TutoriasEstudiante from '../../components/TutoriasEstudiante';
import { StyleSheet, View, Text, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';
import { Skeleton } from 'moti/skeleton'; 
import { MotiView } from 'moti';
import { style } from '../../styles/styles';

const TutoriasDocenteScreen = () => {

  const [tutoria, setNuevaTutoria] = React.useState([]);

  // Id del usuario que inicia sesion
  const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
  // Id de la asignatura que seleccionar el usuario
  const pathCodAsigEst = localStorage.getItem(`keyCodAsigEst`, pathCodAsigEst);
  // Id de la tutoria que seleccionar el usuario  
  const pathCodTutEst = localStorage.getItem(`keyCodTutEst`, pathCodTutEst);

  React.useEffect(() => {
    const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/${pathCodAsigEst}/tutorias`);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
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

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    const Spacer =  ({height = 30}) => <MotiView style={{height}}/>
    function MySkeleton() {
      return (
        <>
          <Skeleton width={'60%'} height={40} colorMode={'light'} />
          <Spacer/>
          <Skeleton width={'80%'} height={175} colorMode={'light'} />
          <Spacer/>
          <Skeleton width={'80%'} height={175} colorMode={'light'} />
          <Spacer/>
          <Skeleton width={'80%'} height={175} colorMode={'light'} />
        </>
      );
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.container} >
        <React.Suspense fallback={<MySkeleton />}>
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
        </React.Suspense>
      </View>
    </SafeAreaView>
  );
};
export default TutoriasDocenteScreen;