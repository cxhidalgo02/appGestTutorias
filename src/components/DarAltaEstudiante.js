import * as React  from 'react';
import * as rn from 'react-native';
import { database } from '../../config/firebaseConfig';
import { doc, updateDoc, Firestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import localStorage from 'react-native-expo-localstorage';

export default function DarAltaEstudiante(
    {
        id,
        cedula,
        nombres,
        apellidos,
        correo,
    }
) {
    //Uid del estudiante que encuentre en la base de datos   (id) 
    const pathIdEstData = localStorage.setItem("keyUserEstData", id); //console.log('UID del estudiante = ', id);
    //Uid del docente que inicia sesion   (id) 
    const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc); //console.log('UID del docente =', pathIdDoc);
    //codigo de las asignatura de seleccione
    const pathIdAsig = localStorage.getItem(`keyCodAsigDoc`, pathIdAsig);
    //path de estudiante con asignaturas y codigo
    const pathEstudiante=`gestionUsuarios/${id}/asignaturas/${pathIdAsig}`

    const [isDataN, setIsDataN] = React.useState('');
    const [isDataT, setIsDataT] = React.useState('');
   //Funcion para hacer la consulta ala base de datos de la asignanura a la que se inscribio el estudiante
    async function consultaAsignaturasDocente() {
      try {
        //consulta de asignaturas con path Estudiante del componente DarAltaEstudiante
        const collectionRef1 = collection(database, `gestionUsuarios/${pathIdDoc}/asignaturas/`);
        const q = query(collectionRef1, where('codigo','==',`${pathIdAsig}`) );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setIsDataN(doc.data().nombre);
          setIsDataT(doc.data().tipo);
          //setNombreAsignatura = doc.data().nombre;
          //setTipoAsignatura = doc.data().tipo;
          console.log('DATOS ASIGNATURA DEL DOCENTE =>', doc.id, "<= ");
          //console.log(doc.id, " => ", doc.data());
        })
         // console.log('DATA UPDATE => ', isDataN, isDataT);
  
      } catch (error) {
        console.log('ERROR =>', error);
      }
  }

  React.useEffect(() => { 
    consultaAsignaturasDocente();
  },[])

    const onValidate = () => {
    const docRef = doc(database, `gestionUsuarios/${id}/asignaturas/${pathIdAsig}`);
            updateDoc(docRef, {nombre: isDataN, tipo: isDataT,  validada: 'true' });
    }    

    //const navigation = useNavigation();
    /*const addAsignaturaEstudiante = async () => {
        const docRef = doc(Firestore, `gestionUsuarios/${id}/asignaturas/${pathIdAsig}`); 
        setDoc(docRef, {
          id: codigo,
          nombre: nombre,
          codigo: codigo,
          tipo: tipo,
          createdAt: createdAt
        });
       // navigation.goBack();
    }*/

    const [isValidateActive, setIsValidateActive] = React.useState(false);
    return(
        <rn.TouchableOpacity 
            onLongPress={() => setIsValidateActive(true)}
            onPress={() => setIsValidateActive(false)}
            activeOpacity={0.8}
            >
            <rn.View style={styles.productContainer}>
                <rn.Text> 
                    <MaterialIcons name="fingerprint" size={18} color="black" /> - {cedula} 
                </rn.Text>
                <rn.Text> 
                    <FontAwesome5 name="id-card" size={18} color="black" /> - {nombres} {apellidos}
                </rn.Text>
                <rn.Text> 
                    <MaterialIcons name="mail" size={18} color="black" /> - {correo} 
                </rn.Text>
                <rn.Text> 
                    <MaterialIcons name="mail" size={18} color="black" /> Path: {pathEstudiante} 
                </rn.Text>
            </rn.View>
            
            {isValidateActive && (
                <rn.Pressable onPress={onValidate} style={styles.validateButton}>
                    <AntDesign name="checksquareo" size={24} color="white" />
                </rn.Pressable>
            )}
                
        </rn.TouchableOpacity>
    )
}

const styles = rn.StyleSheet.create({
    productContainer: {
        width: "85%",
        padding: 10,
        margin: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#2E86C1",
        backgroundColor:"#fff",
        elevation: 5,
    },
    validateButton: {
        position: "absolute",
        right: 8,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D4AC0D",
        borderRadius: 8,
    },
    deleteButton: {
        position: "absolute",
        right: 8,
        top: 50,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#293774",
        borderRadius: 8,
      },
});