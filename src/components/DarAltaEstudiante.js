import * as React  from 'react';
import * as rn from 'react-native';
import { database } from '../../config/firebaseConfig';
import { doc, updateDoc, collection, query, where, onSnapshot} from 'firebase/firestore';
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
    
    const [asignatura, setNuevaAsignatura] = React.useState([]);
    
    const pathUid =  localStorage.getItem(`keyUser`, pathUid);
    //console.log('pathUid A-U=> ', pathUid);

    //UID del estudiante 
    const UidEst = id;
    localStorage.setItem("keyEst", UidEst);
    //console.log('UidEstudent => ', UidEst);

    //codigo de las asignatura de seleccione
    const pathIdAsig = localStorage.getItem(`keyCodigo`, pathIdAsig);
    //console.log('pathIdAsignatura => ', pathIdAsig);

    //path de estudiante con asignaturas y codigo
    const pathEstudiante=`gestionUsuarios/${id}/asignaturas/${pathIdAsig}`
    localStorage.setItem("keyEstAsig", pathEstudiante);
    //console.log('Tetx DarAltaEstudiante: ', pathEstudiante);

    //SQL PARA CONSULTAR LAS ASIGNATURAS DEL ESTUDIANTE
    const pathAsig =`gestionUsuarios/${id}/asignaturas/`
    localStorage.setItem("keySql", pathAsig);
    //console.log('Path SQL => ', pathAsig); 
    React.useEffect(() => { 
    const consultaAsignaturas = () => {
        //consulta de asignaturas
        const collectionRef1 = collection(database, `gestionUsuarios/${UidEst}/asignaturas/`);
        const q = query(collectionRef1, where('id','==',`${pathIdAsig}`), where('validada','==','false') );
        const unsubscribe = onSnapshot(q, querySnapshot => { 
            setNuevaAsignatura(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    codigo: doc.data().codigo,
                    nombre: doc.data().nombre,
                    tipo: doc.data().tipo,
                    validada: doc.data().validada,
                }))
              );
            });
            console.log('Asignatura => ', asignatura);
        return unsubscribe;
    }
},[])
    

    
    const onValidate = () => {
    const docRef = doc(database, `gestionUsuarios/${id}/asignaturas/${pathIdAsig}`);
            updateDoc(docRef, {validada: 'true' });
    }    

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
                    <MaterialIcons name="mail" size={18} color="black" /> URL: {pathEstudiante} 
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