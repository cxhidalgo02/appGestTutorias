import * as React from 'react';
import { useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { Text, StyleSheet, View, Modal, Pressable } from 'react-native';
import { style } from '../../styles/styles';
import { styleModal } from '../../styles/styleModal';
import { myColors } from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons'; 
import AsignaturasEstudiantes from '../../components/Estudiante/AsignaturasEstudiantes';
import Layout from '../../components/layout/Layout';

import { Portal, FAB, Provider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const AsignaturasEstudiantesScreen = () => {
  const navigation = useNavigation();

  //constructor para las asignaturas del estudiante
  const [asignaturasEstudiante, setNuevaListaAE] = React.useState([]);
  //UID del usuario estudiante que inicio sesion
  const correoEst = localStorage.getItem(`keyCorreoEst`, correoEst);

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

    //CONSULTA DEL PERFIL POR MEDIO DEL CORREO
    const [apellidos_user, setApellidoUser] = useState('');
    const [cedula_user, setCedulaUser] = useState('');
    const [correo_user, setCorreoUser] = useState('');
    const [nombres_user, setNombresUser] = useState('');
    const [tipo_user, setTipoUser] = useState('');
    console.log('>> ',apellidos_user, cedula_user);
    React.useEffect(() => {
      const q2 = query(collection(database, `Usuarios/`), where("correo", "==", correoEst));
      const unsubscribe2 = onSnapshot(q2, querySnapshot => {
        const asignaturaData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          apellidos: doc.data().apellidos,
          cedula: doc.data().cedula,
          correo: doc.data().correo,
          nombres: doc.data().nombres,
          tipo: doc.data().tipo,
        }));
        if (asignaturaData.length > 0) {
          // Se guardan los datos del primer documento en las variables de estado
          const { apellidos, cedula, correo, nombres, tipo } = asignaturaData[0];
          setApellidoUser(apellidos);
          setCedulaUser(cedula);
          setCorreoUser(correo);
          setNombresUser(nombres);
          setTipoUser(tipo);
        }
      });
    }, [correoEst]);

  //LAYOUT MAS BOTON FLOTANTE
  const Stack = createStackNavigator();
  function contentLayout() {
    const [open, setOpen] = React.useState(false);
    const isFocused = useIsFocused();
  
    function _onStateChange({ open }) {
      setOpen(open);
    }
    const [modalVisible, setModalVisible] = useState(false);
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
              label={'Menú'}
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
                {
                  icon: 'circle',
                  label: 'Mi perfil',
                  onPress: () => setModalVisible(true),
                },
              ]}
              theme={{ colors: { accent: '#293774' } }}
            /> 
          </Portal>

          <View style={styleModal.centeredView}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              setModalVisible(!modalVisible);
              }}>
              <View style={styleModal.centeredView}>
                  <View style={styleModal.modalView}>
                  <AntDesign name="idcard" size={34} color="#293774" style={{padding:10, textAlign:'center'}} />
                      <Text style={styleModal.modalTextTitle}>MI PERFIL</Text>
                      <Text style={styles.modalText}>
                        NOMBRES: {nombres_user} {apellidos_user}
                      </Text>
                      <Text style={styles.modalText}>
                        CEDULA: {cedula_user} 
                      </Text>
                      <Text style={styles.modalText}>
                        CCORREO: {correo_user} 
                      </Text>
                      <Text style={styles.modalText}>
                        PERFIL: {tipo_user}
                      </Text>
                      <Pressable
                          style={styleModal.buttonClose}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styleModal.textButtonClose}>CERRAR</Text>
                      </Pressable>
                  </View>
              </View>
          </Modal>
        </View>
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
  modalText: {
    fontSize: 14,
    color: myColors.navyblue,
    padding: 8,
    textAlign: "left",
},
});