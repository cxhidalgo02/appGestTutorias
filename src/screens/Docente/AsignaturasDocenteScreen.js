import * as React from 'react';
import { style } from '../../styles/styles';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import Asignaturas from '../../components/Docente/Asignaturas';
import { View, Text, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const AsignaturasDocenteScreen = () => {
  const navigation = useNavigation();

  const [asignatura, setNuevaAsignatura] = React.useState([]);
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);

  React.useEffect(() => { 

    const collectionRef = collection(database, `Usuarios/${pathIdDoc}/Asignaturas/`);
    const asignaturaEstQuery = query(collectionRef, orderBy('nombreAsig', 'desc'));
    const setDocAsignaturas = onSnapshot(asignaturaEstQuery, querySnapshot => {
        setNuevaAsignatura(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              codigoAsig: doc.data().codigoAsig,
              nombreAsig: doc.data().nombreAsig,
              tipoAsig: doc.data().tipoAsig,
              fechaRegAsig: doc.data().fechaRegAsig,  
            }))   
          );
        }
        ); 
    return setDocAsignaturas;
  },[])

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