import * as React from 'react';
import { style } from '../../styles/styles';
import { database } from '../../../config/firebaseConfig';
import { collection, onSnapshot, query, where, } from 'firebase/firestore';
import ValidarAsistencia from '../../components/Docente/ValidarAsistencia';
import localStorage from 'react-native-expo-localstorage';
import { Text, View } from 'react-native';
import Layout from '../../components/layout/Layout';

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

            if( codigo_tuto === pathCodTutDoc && inscripcion_tuto === 'true' && validada_tuto === 'false' ){
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

return (
  <Layout>
    <View style={style.titleContainer}>
      <Text style={style.textTitle}>
        VALIDAR ASISTENCIA
      </Text>
    </View>
    {listaValidarEst.map(listaValidarEst=> <ValidarAsistencia key={listaValidarEst.id} {...listaValidarEst}/>)}
  </Layout>
);
};
export default ValidarAsistenciaScreen;

          /*const q2 = query(collection(database, `/Usuarios/H1uFyJEU8uQon7mPHwVbWLN3wxv1/AsignaturasEstudiante/prueba01/TutoriasEstudiante/`), 
            where("codigoTutoEst", "==", 'tutoria2')
          );*/