import React, {useState} from 'react';
import * as rn from 'react-native';
import { styleComp } from '../../styles/stylesComp';
import { styleModal } from '../../styles/styleModal';
import { database } from '../../../config/firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { doc, deleteDoc} from 'firebase/firestore';

export default function Tutorias({
        //id, codigo, tema, descripcion, aula, fecha, hora, semana,
        id, codigoTuto, temaTuto, descripcionTuto, aulaTuto, fechaTuto, horaTuto, semanaTuto, fechaRegTuto
    }) 
{

    // Id del usuario que inicia sesion
    const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
    // Id de la asignatura que seleccionar el usuario
    const pathIdAsigDoc = localStorage.getItem(`keyCodAsigDoc`, pathIdAsigDoc);
    // id de la tutoria que selecciona el usuario
    const pathIdTutDoc = localStorage.setItem("keyCodTutDoc", id);
    //path de tutorias
    const pathTutoria = `Usuarios/${pathIdDoc}/Asignaturas/${pathIdAsigDoc}/Tutorias/${id}`

    const onDelete = () => {
        const docRef = doc(database, `Usuarios/${pathIdDoc}/Asignaturas/${pathIdAsigDoc}/Tutorias/${id}`);
        deleteDoc(docRef);
    }

    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    return(
        <rn.TouchableOpacity 
            onLongPress={() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
        >
            <rn.View style={styleComp.productContainer}>
                <rn.Text style={styleComp.texttitle}> {temaTuto} </rn.Text>
                <rn.Text style={styleComp.textsubtitle}> {id} </rn.Text>
                <rn.Text style={styleComp.descrip}>
                    <AntDesign name="infocirlceo" size={18} color="black" /> - {descripcionTuto} </rn.Text>
                <rn.Text style={styleComp.information}> 
                    <AntDesign name="right" size={16} color="black" /> Aula: {aulaTuto} 
                </rn.Text>
                <rn.Text style={styleComp.information}> 
                    <AntDesign name="right" size={16} color="black" /> Fecha: {fechaTuto} 
                </rn.Text>
                <rn.Text style={styleComp.information}> 
                    <AntDesign name="right" size={16} color="black" /> Hora: {horaTuto} 
                </rn.Text>
                <rn.Text style={styleComp.information}>
                    <AntDesign name="right" size={16} color="black" /> Semana: {semanaTuto} 
                </rn.Text>
                <rn.View style={styles.btnsContiner}>
                    <rn.Pressable 
                        onPress={() => navigation.navigate('validarAsistenciaScreen')}
                        style={styles.btnContiner}>
                        <Feather name="user-check" size={26} color="black" />
                    </rn.Pressable>
                    <rn.Pressable
                        onPress={() => setModalVisible(true)}
                        style={styles.btnContiner}>
                        <AntDesign name="appstore-o" size={25} color="black" />
                    </rn.Pressable>
                </rn.View>
            </rn.View>
            {isDeleteActive && (
                <rn.Pressable onPress={onDelete} style={styleComp.deleteTutButton}>
                <AntDesign name="delete" size={24} color="white" />
                </rn.Pressable>
            )}

            <rn.View style={styleModal.centeredView}>
                <rn.Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                    <rn.View style={styleModal.centeredView}>
                    <rn.View style={styleModal.modalView}>
                    <Ionicons name="information-circle-outline" size={26} color="#293774" style={{padding:10}} />
                        <rn.Text style={styleModal.modalTextTitle}>INFORMACIÓN!</rn.Text>
                        <rn.Text style={styleModal.modalText}>Estudiantes inscritos: 11</rn.Text>
                        <rn.Text style={styleModal.modalText}>Tutorias validadas:9 </rn.Text>

                        <rn.Pressable
                        style={styleModal.buttonClose}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <rn.Text style={styleModal.textButtonClose}>CERRAR</rn.Text>
                        </rn.Pressable>

                    </rn.View>
                    </rn.View>
                </rn.Modal>
            </rn.View>
        </rn.TouchableOpacity>
    )
}

const styles = rn.StyleSheet.create({
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