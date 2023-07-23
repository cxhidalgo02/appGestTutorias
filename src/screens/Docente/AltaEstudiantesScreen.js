import * as React from 'react';
import { style } from '../../styles/styles';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where,} from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';
import { Text, View } from 'react-native';
import AltaEstudiante from '../../components/Docente/AltaEstudiante';
import Layout from '../../components/layout/Layout';

const AltaEstudiantesScreen = () => {

  //constructor de estudiante para la clase dar de alata estudiante
  const [listaAltaEst, setListaAltaEst] = React.useState([]);
  // Id del usuario que inicia sesion
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id del estudiante que se trae de dar de alata estudiante screen
  const pathIdEstData = localStorage.getItem(`keyUserEstData`, pathIdEstData);
  // Id de la asignatura que seleccionar el usuario
  const pathIdAsig = localStorage.getItem(`keyCodAsigDoc`, pathIdAsig);

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
          // CONSULTA REFERENCIA ESTUDIANTES
          const q2 = query(collection(database, `Usuarios/${uid_Estudiante}/AsignaturasEstudiante/`),where("codigoAsig", "==", pathIdAsig));
          const unsubscribe2 = onSnapshot(q2, querySnapshot => {
            const asignaturaData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              nombreAsig: doc.data().nombreAsig,
              altaAsigEst : doc.data().altaAsigEst,
            }));
            // Se guardda el codigo de las asignatura seleecionada
            const codigo_asig = asignaturaData[0]?.id;
            const nom_asig = asignaturaData[0]?.nombreAsig;
            const alta_asig = asignaturaData[0]?.altaAsigEst;
            
            if( codigo_asig === pathIdAsig && alta_asig === 'false' && nom_asig === '' ){
              const q3 = query(collection(database, 'Usuarios'), where('cedula', '==', cedula_Estudiante), where('tipo', '==', 'Estudiante'));
              const unsubscribe3 = onSnapshot(q3, querySnapshot => {
                const estudiantesNewData = querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  cedula: doc.data().cedula,
                  nombres: doc.data().nombres,
                  apellidos: doc.data().apellidos,
                  correo: doc.data().correo,
                }));
                 // Agregar todos los estudiantes a listaAltaEst utilizando concat()
                setListaAltaEst(prevLista => prevLista.concat(estudiantesNewData));
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

  return (
    <Layout>
      <View style={style.titleContainer}>
        <Text style={style.textTitle}>
          VALIDAR ACCESO
        </Text>
      </View>
        {listaAltaEst.map(listaAltaEst=> <AltaEstudiante key={listaAltaEst.id} {...listaAltaEst}/>)}
    </Layout>
  );
};
export default AltaEstudiantesScreen;