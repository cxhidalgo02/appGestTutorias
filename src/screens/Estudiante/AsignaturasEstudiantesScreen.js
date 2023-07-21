import * as React from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { Text, StyleSheet, View} from 'react-native';
import { style } from '../../styles/styles';
import { myColors } from '../../styles/colors';
import AsignaturasEstudiantes from '../../components/Estudiante/AsignaturasEstudiantes';
import Layout from '../../components/layout/Layout';

import { Portal, FAB, Provider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const AsignaturasEstudiantesScreen = () => {
  const navigation = useNavigation();

  //constructor para las asignaturas del estudiante
  const [asignaturasEstudiante, setNuevaListaAE] = React.useState([]);
  //UID del usuario estudiante que inicio sesion
  //const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);

  React.useEffect(() => {
    const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
    const collectionRef = collection(database, `Usuarios/${pathIdEst}/AsignaturasEstudiante/`);
    const asignaturasEstudianteQuery = query(collectionRef, where('altaAsigEst', '==','true'));
    const setDocAsignaturas = onSnapshot(asignaturasEstudianteQuery, querySnapshot => {
      setNuevaListaAE(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          codigoAsig: doc.data().codigoAsig,
          nombreAsig: doc.data().nombreAsig,
          tipoAsig: doc.data().tipoAsig,
          altaAsigEst: doc.data().altaAsigEst,
        }))
      );
    } );
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
        {asignaturasEstudiante.map(asignaturasEstudiante => <AsignaturasEstudiantes key={asignaturasEstudiante.id} {...asignaturasEstudiante}/>)}
          <Portal>
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
                  onPress: () => navigation.navigate('registroAsignaturasEstudianteScreen'),
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
export default AsignaturasEstudiantesScreen;

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