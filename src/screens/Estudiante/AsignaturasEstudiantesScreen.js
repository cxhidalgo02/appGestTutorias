import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { View, Text, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { style } from '../../styles/styles'; 
import { AntDesign } from '@expo/vector-icons'; 
import AsignaturasEstudiantes from '../../components/Estudiante/AsignaturasEstudiantes';

const AsignaturasEstudiantesScreen = () => {
  const navigation = useNavigation();

  //constructor para las asignaturas del estudiante
  const [asignaturasEstudiante, setNuevaListaAE] = React.useState([]);
  //UID del usuario estudiante que inicio sesion
  //const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);

  React.useLayoutEffect(() => {
    navigation.setOptions({
    headerRight: () => 
      <Pressable title='registroAsignaturasEstudianteScreen'
        onPress={() => navigation.navigate('registroAsignaturasEstudianteScreen')}
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
        <AntDesign name="pluscircleo" size={28} color="#293774" style={{ marginRight: 10 }}/>
      </Pressable>
  })
  },[navigation])

  React.useEffect(() => {
    const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
    const collectionRef = collection(database, `Usuarios/${pathIdEst}/AsignaturasEstudiante/`);
    const asignaturasEstudianteQuery = query(collectionRef, where('validada', '==','true'));
    const setDocAsignaturas = onSnapshot(asignaturasEstudianteQuery, querySnapshot => {
      setNuevaListaAE(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          codigo: doc.data().codigo,
          nombre: doc.data().nombre,
          tipo: doc.data().tipo,
          validada: doc.data().validada,
          createdAt: doc.data().createdAt,
        }))
      );
    } );
    console.log('Asignatura EstScreen=>',asignaturasEstudianteQuery);
    return setDocAsignaturas;
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
          MIS ASIGNATURAS
        </Text>
        <ScrollView style={style.scrollContent}
          refreshControl={
            <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
          } 
        >
          {asignaturasEstudiante.map(asignaturasEstudiante => <AsignaturasEstudiantes key={asignaturasEstudiante.id} {...asignaturasEstudiante}/>)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default AsignaturasEstudiantesScreen;