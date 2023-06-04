import * as React from 'react';
import { style } from '../../styles/styles';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query,} from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { View, Text, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Tutorias from '../../components/Docente/Tutorias';

const TutoriasDocenteScreen = () => {
  const navigation = useNavigation();

  const [tutoria, setNuevaTutoria] = React.useState([]);
  //boton para el escreen registro Tutorias del docente
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
      <Pressable title='registroTutoriasDocenteScreen'
        onPress={() => navigation.navigate('registroTutoriasDocenteScreen')}
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
        <AntDesign name="pluscircleo" size={28} color="#293774" style={{ marginRight: 10 }}/>
      </Pressable>
  })
  },[navigation])

  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id de la asignatura que seleccionar el docente
  const pathIdAsigDoc = localStorage.getItem(`keyCodAsigDoc`, pathIdAsigDoc);
  // Id de la tutoria que seleccionar el docente 
  const pathIdTutDoc = localStorage.getItem(`keyCodTutDoc`, pathIdTutDoc);

  React.useEffect(() => {
    const collectionRef = collection(database, `Usuarios/${pathIdDoc}/Asignaturas/${pathIdAsigDoc}/Tutorias`);
    const tutoriasEstQuery = query(collectionRef, orderBy('semanaTuto', 'desc'));
    const setDocTutorias = onSnapshot(tutoriasEstQuery, querySnapshot => {
      setNuevaTutoria(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          temaTuto: doc.data().temaTuto,
          descripcionTuto: doc.data().descripcionTuto,
          aulaTuto: doc.data().aulaTuto,
          fechaTuto: doc.data().fechaTuto,
          horaTuto: doc.data().horaTuto,
          semanaTuto: doc.data().semanaTuto,
          fechaRegTuto: doc.data().fechaRegTuto,
        }))
      );
    });
    return setDocTutorias;
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
          MIS TUTORIAS
        </Text>
        <ScrollView style={style.scrollContent}
          refreshControl={
            <RefreshControl refreshing ={refreshing} onRefresh={onRefresh}/>
          } 
        >
          {tutoria.map(tutoria => <Tutorias key={tutoria.id} {...tutoria}/>)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default TutoriasDocenteScreen;