import * as React from 'react';
import { style } from '../../styles/styles';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query,} from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import Tutorias from '../../components/Tutorias';
import { View, Text, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Skeleton } from 'moti/skeleton'; 
import { MotiView } from 'moti';


const TutoriasDocenteScreen = () => {
  const navigation = useNavigation();

  const [tutoria, setNuevaTutoria] = React.useState([]);

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

  const consultaTutorias = () => {
    const collectionRef = collection(database, `gestionUsuarios/${pathIdDoc}/asignaturas/${pathIdAsigDoc}/tutorias`);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const setDocTutorias = onSnapshot(q, querySnapshot => {
        //console.log('querySnapshot dejo los datos de tutorias');
        setNuevaTutoria(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                tema: doc.data().tema,
                descripcion: doc.data().descripcion,
                aula: doc.data().aula,
                hora: doc.data().hora,
                semana: doc.data().semana,
                createdAt: doc.data().createdAt,
            }))
          );
        }
        );
    return setDocTutorias;

  }
  React.useEffect(() => {
    consultaTutorias();
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
              {tutoria.map(tutoria => <Tutorias key={tutoria.id} {...tutoria}/>)}
            </ScrollView>
        </React.Suspense>
      </View>
    </SafeAreaView>
  );
};
export default TutoriasDocenteScreen;