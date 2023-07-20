import React, {useState} from 'react';
import * as RN from 'react-native';
import "react-native-gesture-handler";
import { styleComp } from '../../styles/stylesComp';
import { styleModal } from '../../styles/styleModal';
import { database } from '../../../config/firebaseConfig';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { collection, query, where, getCountFromServer, doc, deleteDoc } from 'firebase/firestore';

export default function AsignaturasEstudiantes({
        id, idAsig, nombreAsig, codigoAsig, tipoAsig, fechaRegAsig, uidEstudiante, altaAsigEst,
    }) 
{

    // Id del usuario que inicia sesion
    const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
    //guardo el codigo de asignatura que seleecione
    const pathCodAsigEst = localStorage.setItem("keyCodAsigEst", id);

    //funcion para mostar el boton de eliminar al mantener presionado
    const onDelete = () => {
        const docRef = doc(database, `Usuarios/${pathIdEst}/AsignaturasEstudiante/`, id);
        deleteDoc(docRef);
    }

    //Path para consultas de estudiante
    const pathAsig = `Usuarios/${pathIdEst}/AsignaturasEstudiante/${codigoAsig}`

    const [numTutorias, setNumTutorias] = React.useState([]);
    async function numTutoriasData() {
        try {
            const collectionRef = collection(database, `Usuarios/${pathIdEst}/AsignaturasEstudiante/${codigoAsig}/TutoriasEstudiante/`);
            const q = query(collectionRef);
            const snapshot = await getCountFromServer(q); 
            const result = snapshot.data().count;
            setNumTutorias(result);
        } catch (error) {
        console.log('Se produjo un error:', error);
        }
    }

    const [numTutoriasInscritas, setNumTutoriasInscritas] = React.useState([]);
    async function tutoriasInscritasData() {
        try {
            const collectionRef = collection(database, `Usuarios/${pathIdEst}/AsignaturasEstudiante/${codigoAsig}/TutoriasEstudiante/`);
            const q = query(collectionRef, where('inscripcionTutoEst', '==', 'true'));
            const snapshot = await getCountFromServer(q); 
            const result = snapshot.data().count;
            setNumTutoriasInscritas(result);
        } catch (error) {
        console.log('Se produjo un error:', error);
        }
    }

    const [numTutoriasValidadas, setNumTutoriasValidadas] = React.useState([]);
    async function tutoriasValidadasData() {
        try {
            const collectionRef = collection(database, `Usuarios/${pathIdEst}/AsignaturasEstudiante/${codigoAsig}/TutoriasEstudiante/`);
            const q = query(collectionRef, where('validadaTutoEst', '==', 'true'));
            const snapshot = await getCountFromServer(q); 
            const result = snapshot.data().count;
            setNumTutoriasValidadas(result);
        } catch (error) {
        console.log('Se produjo un error:', error);
        }
    }

    React.useEffect(() => { 
        numTutoriasData();  
        tutoriasInscritasData(); 
        tutoriasValidadasData();
    },[])

    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    return(
        <RN.TouchableOpacity 
            onLongPress={() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
        >
            <RN.View style={styleComp.productContainer} >     
                <RN.Text style={styleComp.texttitle}>{ nombreAsig }</RN.Text>
                <RN.Text style={styleComp.textsubtitle}>{ codigoAsig }</RN.Text>
                <RN.Text style={styleComp.textContent}>Tipo: { tipoAsig }</RN.Text>
                <RN.View style={styles.btnsContiner}>
                    <RN.Pressable title='tutoriasEstudianteScreen'
                        onPress={() => navigation.navigate('tutoriasEstudianteScreen')}
                        style={styles.btnContiner}>
                        <AntDesign name="profile" size={25} color="black" />
                    </RN.Pressable>
                    <RN.Pressable
                        onPress={() => setModalVisible(true)}
                        style={styles.btnContiner}>
                        <AntDesign name="appstore-o" size={25} color="black" />
                    </RN.Pressable>
                </RN.View>
            </RN.View>
            {isDeleteActive && (
                <RN.Pressable onPress={onDelete} style={styleComp.deleteAsigButton}>
                    <AntDesign name="delete" size={24} color="white" />
                </RN.Pressable>
            )}

        <RN.View style={styleModal.centeredView}>
                <RN.Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                    <RN.View style={styleModal.centeredView}>
                    <RN.View style={styleModal.modalView}>
                    <Ionicons name="information-circle-outline" size={26} color="#293774" style={{padding:10}} />
                        <RN.Text style={styleModal.modalTextTitle}>REPORTE DE TUTORIAS</RN.Text>
                            <RN.Text style={styleModal.modalText}>
                                Número de tutorías: { numTutorias }
                            </RN.Text>
                            <RN.Text style={styleModal.modalText}>
                                Tutorías inscritas: { numTutoriasInscritas } / { numTutorias }
                            </RN.Text>
                            <RN.Text style={styleModal.modalText}>
                                Tutorías validadas: { numTutoriasValidadas } / { numTutorias }
                            </RN.Text>
                        <RN.Pressable
                        style={styleModal.buttonClose}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <RN.Text style={styleModal.textButtonClose}>CERRAR</RN.Text>
                        </RN.Pressable>
                    </RN.View>
                    </RN.View>
                </RN.Modal>
            </RN.View>
        </RN.TouchableOpacity>
    )
}

const styles = RN.StyleSheet.create({
    btnsContiner:{
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: "row",
    },
    btnContiner:{
        width: '50%',  
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
});