import * as React  from 'react';
import * as rn from 'react-native';
import { styleComp } from '../../styles/stylesComp';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { database } from '../../../config/firebaseConfig';
import { doc, updateDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';

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

  const [idData, setIdData] = React.useState('')
  const [codigoData, setCodigoData] = React.useState('')
  const [temaData, setTemaData] = React.useState('')
  const [descripcionData, setDescripcionData] = React.useState('')
  const [fechaData, setFechaData] = React.useState('')
  const [aulaData, setAulaData] = React.useState('')
  const [horaData, setHoraData] = React.useState('')
  const [semanaData, setSemanaData] = React.useState('')
  const [createdAtData, setCreatedAtData] = React.useState('')
  async function consultaTutoriasDocente() {
    try {
      //consulta de asignaturas con path Estudiante del componente DarAltaEstudiante
      const collectionRef1 = collection(database, `Usuarios/${pathIdDoc}/Asignaturas/${pathIdAsig}/Tutorias/`);
      const consultaTutoriasDoc = query(collectionRef1, where('codigoTuto', '==', `${pathIdTut}`) ); //`${pathIdTut}`
      const querySnapshot = await getDocs(consultaTutoriasDoc);
        querySnapshot.forEach((doc) => {
          setIdData(doc.id);
          setCodigoData(doc.data().codigoTuto);
          setAulaData(doc.data().aulaTuto);
          setDescripcionData(doc.data().descripcionTuto);
          setFechaData(doc.data().fechaTuto);
          setHoraData(doc.data().horaTuto);
          setSemanaData(doc.data().semanaTuto);
          setTemaData(doc.data().temaTuto);
          setCreatedAtData(doc.data().fechaRegTuto);
        })
      } catch (error) {
        console.log('ERROR T =>', error);
      }
  }

  React.useEffect(() => { 
    try {
      const pathUrl  = `Usuarios/${id}/AsignaturasEstudiante/${pathIdAsig}/TutoriasEstudiante/`;    
        const docu = {
          codigoTutoEst: pathIdTut,
          temaTutoEst: temaData, 
          descripcionTutoEst: descripcionData,
          aulaTutoEst: aulaData,
          fechaTutoEst: fechaData,
          horaTutoEst: horaData,
          semanaTutoEst: semanaData,
          fechaRegistroTutoEst: new Date(),
          inscripcionTutoEst: 'false',
          validadaTutoEst: 'false'
        };
        const agregarTutoriasEstudiante = doc(database, pathUrl, docu.codigoTutoEst);
        setDoc(agregarTutoriasEstudiante, (docu) );
      
    } catch (error) {
      console.log('Error: ' + error.message);
    }
  },[])

  React.useEffect(() => { 
    consultaAsignaturasDocente();
    consultaTutoriasDocente();
  },[])

  //funcion para mostar el boton de validar al mantener presionado
  const onValidate = () => {
    const docRef = doc(database, `Usuarios/${id}/AsignaturasEstudiante/${pathIdAsig}`);
    updateDoc(docRef, {nombreAsig: isDataN, tipoAsig: isDataT, altaAsigEst: 'true' });
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