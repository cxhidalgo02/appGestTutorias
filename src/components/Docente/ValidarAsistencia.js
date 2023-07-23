import * as React  from 'react';
import * as rn from 'react-native';
import { styleComp } from '../../styles/stylesComp';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { database } from '../../../config/firebaseConfig'; 
import { doc, updateDoc,} from 'firebase/firestore';

import localStorage from 'react-native-expo-localstorage';

export default function ValidarAsistencia({
        id, cedula, nombres, apellidos, correo, fechaRegistro
    }) 
{

    //codigo de las asignatura de seleccione
    const pathIdAsigDoc = localStorage.getItem(`keyCodAsigDoc`, pathIdAsigDoc);
     //tutoria seleccionada
    const pathCodTutDoc = localStorage.getItem(`keyCodTutDoc`, pathCodTutDoc);
    //path de estudiante con asignaturas y codigo
    const pathEstudiante=`Usuarios/${id}/AsignaturasEstudiante/${pathIdAsigDoc}/TutoriasEstudiante/${pathCodTutDoc}`

    //funcion para mostar el boton de eliminar
    const onValidate = () => {
        const docRef = doc(database, `Usuarios/${id}/AsignaturasEstudiante/${pathIdAsigDoc}/TutoriasEstudiante/${pathCodTutDoc}`);
        updateDoc(docRef, {validadaTutoEst: 'true' });
    }   
    //estado para boton de  validar
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
                <Feather name="user" size={19} color="black" />  - {nombres} {apellidos}
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