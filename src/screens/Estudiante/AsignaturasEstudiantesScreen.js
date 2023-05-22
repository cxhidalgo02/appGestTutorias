import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import AsignaturasEstudiantes from '../../components/AsignaturasEstudiantes';
import { View, Text, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';
import { style } from '../../styles/styles'; 

const AsignaturasEstudiantesScreen = () => {
  
  const [asignaturasEstudiante, setNuevaListaAE] = React.useState([]);
  const navigation = useNavigation();

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

  const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
  const consultaAsig = () =>{
    const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/`);
    const q = query(collectionRef, where('validada', '==','true'));
    const setDocAsignaturas = onSnapshot(q, querySnapshot => {
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
        } 
        );
    return setDocAsignaturas;
  }

  React.useEffect(() => {
    consultaAsig();
  },[])

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