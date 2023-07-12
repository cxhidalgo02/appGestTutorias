import * as React from 'react';
import { style } from '../../styles/styles';
import { myColors } from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import Asignaturas from '../../components/Docente/Asignaturas';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Layout from '../../components/layout/Layout';

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

  return (
    <Layout>
      <View style={style.titleContainer}>
        <Text style={style.textTitle}>
          MIS ASIGNATURAS
        </Text>
      </View>
      {asignatura.map(asignatura => <Asignaturas key={asignatura.id} {...asignatura}/>)}

      <Pressable onPress={() => navigation.navigate('eliminarCuenta')}>
        <AntDesign name="deleteuser" size={25}  style={styles.btnDelete} />
        <Text style={styles.textDelete}>
          Eliminar Cuenta
        </Text>
      </Pressable>
    </Layout>
  );
};
export default AsignaturasDocenteScreen;

const styles = StyleSheet.create({
  btnDelete:{
    textAlign: "center",
    color: myColors.navyblue
  },
  textDelete:{
    textAlign: "center", 
    color: myColors.mustard
  },
});