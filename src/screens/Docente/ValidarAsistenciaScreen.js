import * as React from 'react';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where, } from 'firebase/firestore';
import ValidarAsistencia from '../../components/ValidarAsistencia';
import { StyleSheet, View, Text, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';
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
      <Skeleton width={'80%'} height={135} colorMode={'light'} />
      <Spacer/>
      <Skeleton width={'80%'} height={135} colorMode={'light'} />
      <Spacer/>
      <Skeleton width={'80%'} height={135} colorMode={'light'} />
      <Spacer/>
      <Skeleton width={'80%'} height={135} colorMode={'light'} />
    </>
  );
}

return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <Text style={styles.textTitle}>
            VALIDAR ASISTENCIA
          </Text>
          <React.Suspense fallback={<MySkeleton />}>
            <ScrollView style={styles.scrollAsig}
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