import * as React from 'react';
import { style } from '../../styles/styles';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where, } from 'firebase/firestore';
import ValidarAsistencia from '../../components/ValidarAsistencia';
import localStorage from 'react-native-expo-localstorage';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Skeleton } from 'moti/skeleton'; 
import { MotiView } from 'moti';


const ValidarAsistenciaScreen = () => {

  const [estudiante, setNuevoEstudiante] = React.useState([]);
  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id del estudiante que se trae de dar de alata estudiante screen
  const pathIdEstData = localStorage.getItem(`keyUserEstData`, pathIdEstData);
  
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

const [refreshing, setRefreshing] = React.useState(false);
const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 2000);
}, []);

const Spacer =  ({height = 25}) => <MotiView style={{height}}/>
function MySkeleton() {
  return (
    <>
        <Skeleton width={'60%'} height={40} colorMode={'light'} />
        <Spacer/>
        <Skeleton width={'80%'} height={105} colorMode={'light'} />
        <Spacer/>
        <Skeleton width={'80%'} height={105} colorMode={'light'} />
        <Spacer/>
        <Skeleton width={'80%'} height={105} colorMode={'light'} />
        <Spacer/>
        <Skeleton width={'80%'} height={105} colorMode={'light'} />
        <Spacer/>
        <Skeleton width={'80%'} height={105} colorMode={'light'} />
    </>
  );
}

return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.container} >
        <React.Suspense fallback={<MySkeleton />}>
          <Text style={style.textTitle}>
            VALIDAR ASISTENCIA
          </Text>
          
            <ScrollView style={style.scrollContent}
              refreshControl={
                <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
              } 
            >
              {estudiante.map(estudiante=> <ValidarAsistencia key={estudiante.id} {...estudiante}/>)}
            </ScrollView>
        </React.Suspense>
      </View>
    </SafeAreaView>
  );
};
export default ValidarAsistenciaScreen;