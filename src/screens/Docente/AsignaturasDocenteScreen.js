import * as React from 'react';
import { style } from '../../styles/styles';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import Asignaturas from '../../components/Asignaturas';
import { View, Text, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const AsignaturasDocenteScreen = () => {
  const navigation = useNavigation();

  //constructor para la clase asignaturas
  const [asignatura, setNuevaAsignatura] = React.useState([]);

  // UID del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);

  //Boton para llevar al formulario registro de asignatura
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
      <Pressable title='registroAsignaturasDocenteScreen'
          onPress={() => navigation.navigate('registroAsignaturasDocenteScreen')}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
          <AntDesign name="pluscircleo" size={28} color="#293774" style={{ marginRight: 10 }}/>
        </Pressable>
  })
  },[navigation])

  React.useEffect(() => { 
    const collectionRef = collection(database, `/registroUsuarios/${pathIdDoc}/registroAsignaturas/`);
    const q = query(collectionRef, orderBy('nombre', 'desc'));
    const setDocAsignaturas = onSnapshot(q, querySnapshot => {
        setNuevaAsignatura(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              codigo: doc.data().codigo,
              nombre: doc.data().nombre,
              tipo: doc.data().tipo,
              createdAt: doc.data().createdAt,  
            }))   
          );
        }
        ); 
    return setDocAsignaturas;
  },[])
/*
  React.useEffect(() => { 
    consultaAsig(); 
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
          MIS ASIGNATURAS
        </Text>
        <ScrollView style={style.scrollContent}   
          refreshControl={
            <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
          } 
        >
          {asignatura.map(asignatura => <Asignaturas key={asignatura.id} {...asignatura}/>)}
        </ScrollView> 
      </View>
    </SafeAreaView>    
  );
};
export default AsignaturasDocenteScreen;