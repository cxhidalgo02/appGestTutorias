import * as React from 'react';
import { style } from '../../styles/styles';
import { myColors } from '../../styles/colors';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import Asignaturas from '../../components/Docente/Asignaturas';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../../components/layout/Layout';

import { Portal, FAB, Provider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

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

  //LAYOUT MAS BOTON FLOTANTE
  const Stack = createStackNavigator();
  function contentLayout() {
    const [open, setOpen] = React.useState(false);
    const isFocused = useIsFocused();
  
    function _onStateChange({ open }) {
      setOpen(open);
    }
  
    return (
      <Layout>
      <View style={style.titleContainer}>
        <Text style={style.textTitle}>
          MIS ASIGNATURAS
        </Text>
      </View>
      {asignatura.map(asignatura => <Asignaturas key={asignatura.id} {...asignatura}/>)}
        <Portal >
          <FAB.Group 
            open={isFocused && open}
            icon={'menu'}
            onStateChange={_onStateChange}
            visible={isFocused}
            style={{ position: 'absolute', right: 0, bottom: 0, }}
            actions={[            
              {
                icon: 'circle',
                label: 'Agregar asignatura',
                onPress: () => navigation.navigate('registroAsignaturasDocenteScreen'),
              },
              {
                icon: 'circle',
                label: 'Eliminar cuenta',
                onPress: () => navigation.navigate('eliminarCuenta'),
              },
            ]}
            theme={{ colors: { accent: '#293774' } }}
          /> 
        </Portal>
      </Layout>
    );
  }

  return (
      <Provider>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="." component={contentLayout} />
        </Stack.Navigator>
      </Provider>
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