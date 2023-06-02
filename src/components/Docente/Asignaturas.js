import * as RN from 'react-native';
import React, {useState} from 'react';
import { styleComp } from '../../styles/stylesComp';
import { styleModal } from '../../styles/styleModal';
import { database } from '../../../config/firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, deleteDoc,} from 'firebase/firestore';
import { collection, query,  getCountFromServer } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';

export default function Asignaturas ({
        id, codigo, nombre, tipo, fechaReg,
        //idAsig, codigoAsig, nombreAsig, tipoAsig, fechaRegAsig
    }) 
{

    // Id del usuario que inicia sesion
    const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);

    const onDelete = () => {
        const docRef = doc(database, `Usuarios/${pathIdDoc}/Asignaturas/`, id);
        deleteDoc(docRef);
    }

    //path usuario  con asignaturas 
    const pathAsig=`Usuarios/${pathIdDoc}/Asignaturas/${codigo}`
    //guardo el codigo de asignatura para enviar a Dar de alta
    const pathIdAsigDoc = localStorage.setItem("keyCodAsigDoc", codigo);

    const [numTutorias, setNumTutorias] = React.useState([]);
    async function numTutoriasData() {
        try {
            const collectionRef = collection(database, `Usuarios/${pathIdDoc}/Asignaturas/${codigo}/Tutorias/`);
            const q = query(collectionRef);
            const snapshot = await getCountFromServer(q); 
            const result = snapshot.data().count;
            setNumTutorias(result);
        } catch (error) {
        console.log('* ERROR: ', error);
        }
    }

    React.useEffect(() => { 
        numTutoriasData();  
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
            <RN.View style={styleComp.productContainer}>     
                <RN.Text style={styleComp.texttitle}>{nombre}</RN.Text>
                <RN.Text style={styleComp.textsubtitle}>{codigo}</RN.Text>
                <RN.Text style={styleComp.textContent}> Tipo: {tipo}</RN.Text> 
                <RN.View style={styles.btnsContiner}>
                    <RN.Pressable title='altaEstudiantesScreen'
                        onPress={() => navigation.navigate('altaEstudiantesScreen')}
                        style={styles.btnContiner}>
                        <FontAwesome5 name="user-cog" size={25} color="black" />
                    </RN.Pressable>
                    <RN.Pressable title='tutoriasDocenteScreen'
                        onPress={() => navigation.navigate('tutoriasDocenteScreen')}
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
                    setModalVisible(!modalVisible);
                    }}>
                    <RN.View style={styleModal.centeredView}>
                        <RN.View style={styleModal.modalView}>
                            <RN.Text style={styleModal.modalTextTitle}>INFORMACIÓN!</RN.Text>
                            <RN.Text style={styleModal.modalText}>
                                Número de tutorías: { numTutorias }
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
        width: '90%',
        backgroundColor: 'transparent',
        flexDirection: "row",
    },
    btnContiner:{
        width: '36%',  
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
});