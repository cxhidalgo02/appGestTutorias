import * as React  from 'react';
import {useState} from 'react';
import * as rn from 'react-native';
import { styleComp } from '../../styles/stylesComp';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { database } from '../../../config/firebaseConfig';
import { doc, updateDoc, collection, query, where, getDocs, setDoc, onSnapshot } from 'firebase/firestore';

import localStorage from 'react-native-expo-localstorage';

export default function DarAltaEstudiante({
        id, cedula, nombres, apellidos, correo, ferchaRegistro
    }) 
{
  //Uid del estudiante que encuentre en la base de datos   (id) 
  const pathIdEstData = localStorage.setItem("keyUserEstData", id); //console.log('UID del estudiante = ', id);
  //Uid del docente que inicia sesion   (id) 
  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc); //console.log('UID del docente =', pathIdDoc);
  //codigo de las asignatura de seleccione
  const pathIdAsig = localStorage.getItem(`keyCodAsigDoc`, pathIdAsig);
  //path del codigo de la tutoria
  const pathIdTut = localStorage.getItem(`keyCodTutDoc`, pathIdTut);

  //path de estudiante con asignaturas y codigo
  const pathEstudiante=`Usuarios/${id}/AsignaturasEstudiante/${pathIdAsig}`

   //contiene los atributos que se consulto para agregarle al estudiante al tener acceso
   const [isDataN, setIsDataN] = React.useState('');
   const [isDataT, setIsDataT] = React.useState('');
   //Funcion para hacer la consulta ala base de datos de la asignanura a la que se inscribio el estudiante
async function consultaAsignaturasDocente() {
  try {
     //consulta de asignaturas con path Estudiante del componente DarAltaEstudiante
    const collectionRef1 = collection(database, `Usuarios/${pathIdDoc}/Asignaturas/`);
    const q = query(collectionRef1, where('codigoAsig','==',`${pathIdAsig}`) );
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setIsDataN(doc.data().nombreAsig);
        setIsDataT(doc.data().tipoAsig);
      })
    } catch (error) {
      console.log('ERROR', error);
    }
  }

  React.useEffect(() => { 
    consultaAsignaturasDocente();
  },[])

  const [aula_Tuto, setAulaTuto] = useState('');
  const [codigo_Tuto, setCodigoTuto] = useState('');
  const [descripcion_Tuto, setDescripTuto] = useState('');
  const [fecha_Tuto, setfechaTuto] = useState('');
  const [hora_Tuto, setHoraTuto] = useState('');
  const [semana_Tuto, setSeamanaTuto] = useState('');
  const [tema_Tuto, setTemaTuto] = useState('');

  //funcion para mostar el boton de validar al mantener presionado
  const onValidate = () => {
    const docRef = doc(database, `Usuarios/${id}/AsignaturasEstudiante/${pathIdAsig}`);
    updateDoc(docRef, {nombreAsig: isDataN, tipoAsig: isDataT, altaAsigEst: 'true' });
    // ENVIO DE DATOS A COMPLETAR DESPUES DE VALIDADO EL ACCESO
    try {
      // CONSULTA ASIGNATURAS
      const q1 = query(collection(database, `Usuarios/${pathIdDoc}/Asignaturas/`), where('codigoAsig','==',`${pathIdAsig}`));
      const unsubscribe = onSnapshot(q1, querySnapshot => {
        const asignaturasData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ccodigoAsig: doc.data().codigoAsig,
              nombreAsig: doc.data().nombreAsig,
              tipoAsig: doc.data().tipoAsig,
            }));
           // Realizar la consulta de asignaturas para cada estudiante
          asignaturasData.forEach(asignatura => {
            const id_asignatura = asignatura.id;
            const nombre_asignatura = asignatura.nombreAsig;
            const tipo_asignatura = asignatura.tipoAsig;
             // CONSULTA REFERENCIA ESTUDIANTES ASIGNATURAS
            const q2 = query(collection(database, `Usuarios/${id}/AsignaturasEstudiante/`),where("codigoAsig", "==", pathIdAsig));
            const unsubscribe2 = onSnapshot(q2, querySnapshot => {
              const asignaturaData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                codigoAsig: doc.data().codigoAsig,
                nombreAsig: doc.data().nombreAsig,
                altaAsigEst: doc.data().altaAsigEst,
                tipoAsig: doc.data().tipoAsig,
              }));
              // Se guardda el codigo de las asignatura seleecionada
              const id_asigEst = asignaturaData[0]?.id;
              const codigo_asigEst= asignaturaData[0]?.codigoAsig;
              const nombre_asigEst = asignaturaData[0]?.nombreAsig;
              const alta_asigEst = asignaturaData[0]?.altaAsigEst;
              const tipo_asigEst = asignaturaData[0]?.tipoAsig;

              if (id_asignatura === id_asigEst &&  nombre_asigEst === nombre_asignatura && alta_asigEst == 'true'){
                
                const q3 = query(collection(database, `Usuarios/${pathIdDoc}/Asignaturas/${pathIdAsig}/Tutorias/`)); 
                const unsubscribe3 = onSnapshot(q3, querySnapshot => {
                  const tutoriasData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    aulaTuto: doc.data().aulaTuto,
                    codigoTuto: doc.data().codigoTuto,
                    descripcionTuto: doc.data().descripcionTuto,
                    fechaTuto: doc.data().fechaTuto,
                    horaTuto: doc.data().horaTuto,
                    semanaTuto: doc.data().semanaTuto,
                    temaTuto: doc.data().temaTuto,
                  }));
                  //console.log('Pasa > 1');
                  //console.log('TUTORIAS PARA AGREGAR: ', tutoriasData, ' <');

                  if (tutoriasData.length > 0) {
                    // Se guardan los datos del primer documento en las variables de estado
                    try {
                      const pathUrlTutoria  = `Usuarios/${id}/AsignaturasEstudiante/${pathIdAsig}/TutoriasEstudiante/`;
                      // Aquí se guarda cada tutoría individualmente
                      tutoriasData.forEach(tutoria => {
                        const registroTutoriaEst = {
                          aulaTutoEst: tutoria.aulaTuto,
                          codigoTutoEst: tutoria.codigoTuto,
                          descripcionTutoEst: tutoria.descripcionTuto,
                          fechaTutoEst: tutoria.fechaTuto,
                          horaTutoEst: tutoria.horaTuto,
                          semanaTutoEst: tutoria.semanaTuto,
                          temaTutoEst: tutoria.temaTuto,
                          fechaRegistroTutoEst: new Date(),
                          inscripcionTutoEst: 'false',
                          validadaTutoEst: 'false'
                        };
                        //console.log('Pasa > 2');
                        //console.log('REGISTRO: ', registroTutoriaEst);
                        const docRef = doc(database, pathUrlTutoria, registroTutoriaEst.codigoTutoEst );
                        setDoc(docRef, registroTutoriaEst);
                      });
                    } catch (error) {
                      console.log('Error capturado por el catch:', error);
                    }
                  }
                });

              } else {
                console.log('X No se pudieron agregar las tutorias!');
              }
            });
          });
          return unsubscribe;
        });
    } catch (error) {
        console.log('Error: ', error);
    } 
  }

  //estado para mostar el boton de validar al mantener presionado
  const [isValidateActive, setIsValidateActive] = React.useState(false);
  return(
    <rn.TouchableOpacity 
      onLongPress={() => setIsValidateActive(true)}
      onPress={() => setIsValidateActive(false)}
      activeOpacity={0.8}
    >
    <rn.View style={styleComp.productContainer}>
      <rn.Text> 
        <MaterialIcons name="fingerprint" size={18} color="black" /> - {cedula} 
      </rn.Text>
      <rn.Text> 
        <Feather name="user" size={19} color="black" /> - {nombres} {apellidos}
      </rn.Text>
      <rn.Text> 
        <Feather name="at-sign" size={18} color="black" /> - {correo} 
      </rn.Text>
    </rn.View>
      {isValidateActive && (
        <rn.Pressable onPress={onValidate} style={styleComp.validateButton}>
          <AntDesign name="checksquareo" size={24} color="white" />
        </rn.Pressable>
      )}
    </rn.TouchableOpacity>
  )
}