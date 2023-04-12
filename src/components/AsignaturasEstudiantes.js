import React, {useState} from 'react';
import * as RN from 'react-native';
import "react-native-gesture-handler";
import { styleComp } from '../styles/stylesComp';
import { styleModal } from '../styles/styleModal';
import { database } from '../../config/firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { collection, query, where, getCountFromServer, doc, deleteDoc } from 'firebase/firestore';

export default function AsignaturasEstudiantes({
        id, codigo, nombre, tipo, createdAt,
    }) 
{

    // Id del usuario que inicia sesion
    const pathIdEst = localStorage.getItem(`keyUserEst`, pathIdEst);
    //guardo el codigo de asignatura que seleecione
    const pathCodAsigEst = localStorage.setItem("keyCodAsigEst", id);

    const onDelete = () => {
        const docRef = doc(database, `gestionUsuarios/${pathIdEst}/asignaturas/`, id);
            deleteDoc(docRef);
    }

    //Path para consultas de estudiante
    const pathAsig = `gestionUsuarios/${pathIdEst}/asignaturas/${codigo}`
    console.log('E Asignaturas - pathAsig => ',pathAsig);

    const [numTutorias, setNumTutorias] = React.useState([]);
    async function numTutoriasData() {
        try {
            const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/${codigo}/tutorias/`);
            const q = query(collectionRef);
            const snapshot = await getCountFromServer(q); 
            const result = snapshot.data().count;
            setNumTutorias(result);
            //console.log('# Tutorias => ', result);
        } catch (error) {
          console.log('Se produjo un error:', error);
        }
    }

    const [numTutoriasInscritas, setNumTutoriasInscritas] = React.useState([]);
    async function tutoriasInscritasData() {
        try {
            const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/${codigo}/tutorias/`);
            const q = query(collectionRef, where('inscripcion', '==', 'true'));
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
            const collectionRef = collection(database, `gestionUsuarios/${pathIdEst}/asignaturas/${codigo}/tutorias/`);
            const q = query(collectionRef, where('validada', '==', 'true'));
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
             <RN.Text style={styleComp.texttitle}>{ nombre }</RN.Text>
                <RN.Text style={styleComp.textsubtitle}>{ codigo}</RN.Text>
                <RN.Text style={styleComp.textContent}>Tipo: { tipo }</RN.Text>
                
                <RN.View style={styles.btnsContiner}>

                    <RN.Pressable title='tutoriasEstudianteScreen'
                        onPress={() => navigation.navigate('tutoriasEstudianteScreen')}
                        style={styles.btnContiner}>
                        <FontAwesome5 name="swatchbook" size={25} color="black" />
                    </RN.Pressable>

                    <RN.Pressable
                        onPress={() => setModalVisible(true)}
                        style={styles.btnContiner}>
                        <AntDesign name="appstore1" size={25} color="black" />
                    </RN.Pressable>
                </RN.View>
            </RN.View>
            {isDeleteActive && (
                <RN.Pressable onPress={onDelete} style={styleComp.deleteButton}>
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