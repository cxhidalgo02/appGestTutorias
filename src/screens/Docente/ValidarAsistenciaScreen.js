import * as React from 'react';
import {useState} from 'react';
import { style } from '../../styles/styles';
import { myColors } from "../../styles/colors";
import { database } from '../../../config/firebaseConfig';
import { AntDesign } from '@expo/vector-icons'; 
import { collection, onSnapshot, query, where, } from 'firebase/firestore';
import ValidarAsistencia from '../../components/Docente/ValidarAsistencia';
import localStorage from 'react-native-expo-localstorage';
import { Text, View, TouchableOpacity, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Layout from '../../components/layout/Layout';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { Portal, FAB, Provider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const ValidarAsistenciaScreen = () => {
  //constructor de la nueva lista de estudiantes
  const [listaValidarEst, setListaValidarEst] = React.useState([]);
  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id del estudiante que se trae de dar de alata estudiante screen
  const pathIdEstData = localStorage.getItem(`keyUserEstData`, pathIdEstData);
  //codigo de las asignatura de seleccione
  const pathIdAsig = localStorage.getItem(`keyCodAsigDoc`, pathIdAsig);
  //tutoria seleccionada
  const pathCodTutDoc = localStorage.getItem(`keyCodTutDoc`, pathCodTutDoc);

  //guardo el codigo de asignatura para enviar a Dar de alta
  const codAsigDoc = localStorage.getItem(`keyCodAsigDoc`, codAsigDoc);

  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
      <img
        src="https://github.com/cxhidalgo02/appGestTutorias/blob/master/assets/favicon.png?raw=true"
        style="width: 15vw;" 
      />

      <h1 style="font-size: 40px; font-family: Helvetica Neue; font-weight: bold;">
        Lista de Estudiantes
      </h1>

      <h2 style="font-size: 30px; font-family: Helvetica Neue; font-weight: normal; text-align: left;">
        Docente: Luis Armijos 
      </h2>
      <h2 style="font-size: 30px; font-family: Helvetica Neue; font-weight: normal; text-align: left;">
        Asignatura: Trabajo de Titulación GP 4.2
      </h2>
      <h2 style="font-size: 30px; font-family: Helvetica Neue; font-weight: normal; text-align: left;">
        Tutoria: Revisión final 
      </h2>
      <h2 style="font-size: 30px; font-family: Helvetica Neue; font-weight: normal; text-align: left;">
        Semana: 1 / Fecha: 21-08-2023
      </h2>
      
      <h3 style="font-size: 25px; font-family: Helvetica Neue; font-weight: bold; text-align: left;">
        Estudiantes inscritos a la tutoria
      </h3>

      <h3 style="font-size: 25px; font-family: Helvetica Neue; font-weight: normal; text-align: left;">
        1104865736 - Carlos Hidalgo 
      </h3>

    </body>
  </html>
    `;

  React.useEffect(() => {
    try {
      // CONSULTA ESTUDIANTES
      const q1 = query(collection(database, 'Usuarios'), where("tipo", "==", "Estudiante"));
      const unsubscribe = onSnapshot(q1, querySnapshot => {
        const estudiantesData = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          cedula: doc.data().cedula,
          nombres: doc.data().nombres,
          apellidos: doc.data().apellidos,
          correo: doc.data().correo,
        }));
        // Realizar la consulta de asignaturas para cada estudiante
        estudiantesData.forEach(estudiante => {
          const uid_Estudiante = estudiante.id;
          const cedula_Estudiante = estudiante.cedula;
          //console.log('PAT ', uid_Estudiante, pathIdAsig, pathCodTutDoc);
          // CONSULTA REFERENCIA ESTUDIANTES - MATERIA  PRUEBA 01 Y TUTORIA 2
          const q2 = query(collection(database, `/Usuarios/${uid_Estudiante}/AsignaturasEstudiante/${pathIdAsig}/TutoriasEstudiante/`),
            where("codigoTutoEst", "==", pathCodTutDoc)
          );          
          const unsubscribe2 = onSnapshot(q2, querySnapshot => {
            const tutoriaData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              codigoTutoEst: doc.data().codigoTutoEst,
              inscripcionTutoEst: doc.data().inscripcionTutoEst,
              validadaTutoEst : doc.data().validadaTutoEst,
            }));
            
            // Se guardda el codigo de las tutoria seleecionada
            const codigo_tuto = tutoriaData[0]?.codigoTutoEst;
            const inscripcion_tuto = tutoriaData[0]?.inscripcionTutoEst; //Para que salga lista debe estar en TRUE
            const validada_tuto = tutoriaData[0]?.validadaTutoEst;
            console.log('TUTORIAS:', codigo_tuto, inscripcion_tuto, validada_tuto);

            if( codigo_tuto === pathCodTutDoc && inscripcion_tuto === 'Si' && validada_tuto === 'No' ){
              console.log('Hay que validar la tutoria!', codigo_tuto, ' ', inscripcion_tuto);
              const q3 = query(collection(database, 'Usuarios'), where("cedula", "==", cedula_Estudiante));
              
              const unsubscribe3 = onSnapshot(q3, querySnapshot => {
                const estudiantesNewData = querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  cedula: doc.data().cedula,
                  nombres: doc.data().nombres,
                  apellidos: doc.data().apellidos,
                  correo: doc.data().correo,
                }));
                 // Agregar todos los estudiantes a listaAltaEst utilizando concat()
                setListaValidarEst(prevLista => prevLista.concat(estudiantesNewData));
                console.log('Data estudiante > ', estudiantesNewData);
              });
            }
            
          });
        });
        return unsubscribe;
      });
    } catch (error) {
      console.log('ERROR =>', error);
    }
  },[])

  
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const print = async () => {
    // En iOS/Android imprime el html dado
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // En iOS/Android imprime el html dado
    const { uri } = await Print.printToFileAsync({ html });
    console.log('El archivo se ha guardado en:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

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
              VALIDAR ASISTENCIA
            </Text>
          </View>
          {listaValidarEst.map(listaValidarEst=> <ValidarAsistencia key={listaValidarEst.id} {...listaValidarEst}/>)}

          <View style={styles.containerBtns}>
            <View style={styles.btnPrinter}>
            <Text style={styles.textbtns}> Imprimir </Text>
              <Pressable
                onPress={print}
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
                <AntDesign name="printer" size={23} color="#FFFFFF" />
              </Pressable>
            </View>
            <View style={styles.btnShare}>
            <Text style={styles.textbtns}> Compartir </Text>
              <Pressable
                onPress={printToFile}
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
                <AntDesign name="sharealt" size={23} color="#FFFFFF" />
              </Pressable>
            </View>
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
export default ValidarAsistenciaScreen;

const styles = StyleSheet.create({
  containerBtns: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 550,
  },
  btnPrinter: {
    backgroundColor: myColors.navyblue,
    padding: 6,
    alignItems: 'center',
    width: '55%',
    borderColor: "blue",
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 5,
    borderWidth: 2,
    borderColor: myColors.gray
  },
  btnShare: {
    backgroundColor: myColors.navyblue,
    padding: 6,
    alignItems: 'center',
    width: '55%',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 5,
    borderWidth: 2,
    borderColor: myColors.gray
  },
  textbtns: {
    color: myColors.mustard,
    fontSize: 16,
  }
});