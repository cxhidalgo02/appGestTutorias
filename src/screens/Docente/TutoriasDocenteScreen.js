import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query,} from 'firebase/firestore';
import Tutorias from '../../components/Tutorias';
import { StyleSheet, View, Text, SafeAreaView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import localStorage from 'react-native-expo-localstorage';

const TutoriasDocenteScreen = () => {

  const [tutoria, setNuevaTutoria] = React.useState([]);
  const navigation = useNavigation();

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
  //const pathId = localStorage.getItem(`keyUser`, pathId);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >

        <Text style={styles.textTitle}>
            MIS TUTORIAS
          </Text>
          <ScrollView style={styles.scrollAsig}>
            {tutoria.map(tutoria => <Tutorias key={tutoria.id} {...tutoria}/>)}
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};
export default TutoriasDocenteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 22, 
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
  button: {
    alignItems: 'center',
    backgroundColor: '#2E86C1',
    padding: 10,
    width: "80%",
    marginTop: 40,
    borderRadius:10,
  },
  textbutton: {
    color: "#F2F3F4",
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
});