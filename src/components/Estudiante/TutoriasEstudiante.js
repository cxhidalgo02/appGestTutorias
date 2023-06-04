import * as React from 'react';
import * as rn from 'react-native';
import { styleComp } from '../../styles/stylesComp';
import { database } from '../../../config/firebaseConfig';
import { doc, updateDoc,} from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons'; 
import localStorage from 'react-native-expo-localstorage';

export default function TutoriasEstudiante({
        id, codigoTutoEst, temaTutoEst, descripcionTutoEst, aulaTutoEst, fechaTutoEst, horaTutoEst, semanaTutoEst,
        idAltEst, inscripcionTutoEst, validadaTutoEst, fechaRegTutEst,
    })
{    
    // Id del usuario que inicia sesion
    const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
    // Id de la asignatura que seleccionar el estudiante
    const pathCodAsigEst = localStorage.getItem(`keyCodAsigEst`, pathCodAsigEst); 
    // id de la tutoria que selecciona el estudiante
    const pathCodTutEst = localStorage.setItem("keyCodTutEst", id);

    const pathTutoria = `Usuarios/${pathIdEst}/AsignaturasEstudiante/${pathCodAsigEst}/TutoriasEstudiante/${id}`;
    //console.log('E Inscripcion Tutoria - pathTutoria => ',pathTutoria);

     const onInscribirse = () => {
        const docRef = doc(database, `/Usuarios/${pathIdEst}/AsignaturasEstudiante/${pathCodAsigEst}/TutoriasEstudiante/${id}`);
            updateDoc(docRef, {inscripcionTutoEst: 'true', });
    } 

    const [isValidateActive, setIsValidateActive] = React.useState(false);
    return(
        <rn.TouchableOpacity style={styleComp.productContainer} 
            onLongPress={() => setIsValidateActive(true)}
            onPress={() => setIsValidateActive(false)}
            activeOpacity={0.8}
        >
            <rn.Text style={styleComp.texttitle}> {temaTutoEst} </rn.Text>
            <rn.Text style={styleComp.textsubtitle}> {id} </rn.Text>
            <rn.Text style={styleComp.descrip}>
                <AntDesign name="tag" size={18} color="black" /> - {descripcionTutoEst} 
            </rn.Text>
            <rn.Text style={styleComp.information}> 
                <AntDesign name="right" size={16} color="black" /> Aula: {aulaTutoEst} 
            </rn.Text>
            <rn.Text style={styleComp.information}> 
                <AntDesign name="right" size={16} color="black" /> Fecha: {fechaTutoEst} 
            </rn.Text>
            <rn.Text style={styleComp.information}> 
                <AntDesign name="right" size={16} color="black" /> Hora: {horaTutoEst} 
            </rn.Text>
            <rn.Text style={styleComp.information}>
                <AntDesign name="right" size={16} color="black" /> Semana: {semanaTutoEst} </rn.Text>
            <rn.Text style={styles.information}>
                <AntDesign name="right" size={16} color="black" /> Inscrito: {inscripcionTutoEst} 
            </rn.Text>
            <rn.Text style={styleComp.information}>
                <AntDesign name="right" size={16} color="black" /> Validada: {validadaTutoEst} 
            </rn.Text>
            <rn.View style={styles.btnsContiner}>
                {isValidateActive && (
                    <rn.Pressable onPress={onInscribirse} style={styleComp.validateAstButton}>
                        <AntDesign name="checksquareo" size={24} color="white" />
                    </rn.Pressable>
                )}
            </rn.View>
        </rn.TouchableOpacity>
    )
}

const styles = rn.StyleSheet.create({
    btnsContiner:{
        width: '100%',
        marginTop: 10,
        backgroundColor: 'transparent',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});