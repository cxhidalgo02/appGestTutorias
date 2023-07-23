import * as React from 'react';
import { style } from '../../styles/styles';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query,} from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { Text, View} from 'react-native';
import Tutorias from '../../components/Docente/Tutorias';
import Layout from '../../components/layout/Layout';

import { Portal, FAB, Provider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const TutoriasDocenteScreen = () => {
  const navigation = useNavigation();

  const [tutoria, setNuevaTutoria] = React.useState([]);
  //boton para el escreen registro Tutorias del docente
  React.useLayoutEffect(() => {
    navigation.setOptions({  })
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
          MIS TUTORIAS
        </Text>
      </View>
      {tutoria.map(tutoria => <Tutorias key={tutoria.id} {...tutoria}/>)}
      
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
              label: 'Agregar tutoria',
              onPress: () => navigation.navigate('registroTutoriasDocenteScreen'),
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
export default TutoriasDocenteScreen;