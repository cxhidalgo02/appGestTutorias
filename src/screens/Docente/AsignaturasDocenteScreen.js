import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Asignaturas from '../../components/Asignaturas';
import { StyleSheet, View, Text, SafeAreaView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';

const AsignaturasDocenteScreen = () => {

  const [asignatura, setNuevaAsignatura] = React.useState([]);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
      <Pressable title='registroAsignaturasDocenteScreen'
          onPress={() => navigation.navigate('registroAsignaturasDocenteScreen')}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
          <MaterialIcons name="add-circle" size={30} color="#293774" style={{ marginRight: 5 }}/>
        </Pressable>
  })
  },[navigation])

  React.useEffect(() => {
    // CONSULTA ASIGNATURAS `gestionUsuarios/${userUid}`
    const collectionRef = collection(database, `gestionUsuarios/nnLosuPGVMRnFcthuMH9p40mkr43/asignaturas`);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
          <Text style={styles.textTitle}>
            MIS ASIGNATURAS
          </Text>
          <ScrollView style={styles.scrollAsig}>
            {asignatura.map(asignatura => <Asignaturas key={asignatura.id} {...asignatura}/>)}
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};
export default AsignaturasDocenteScreen;

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
        width: "85%",
        padding: 10,
        margin: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#2E86C1",
        backgroundColor:"#fff",
    },
    title: {
        fontSize: 18,
    },
    code: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0FA5E9',
    },
    type: {
        fontSize: 18,
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
   },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    btnsContiner:{
        width: '90%',
        backgroundColor: 'transparent',
        flexDirection: "row",
    },
    btnContiner:{
        width: '35%',  
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
});