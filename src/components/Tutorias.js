import * as React from 'react';
import * as rn from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';

export default function Tutorias(
    {
        id,
        tema,
        descripcion,
        aula,
        hora,
        semana,
        fechaCreacion,
    }
) {

    const onDelete = () => {
        const docRef = doc(database, 'asignaturaTutorias', id);
        deleteDoc(docRef);
    }

    // Id del usuario que inicia sesion
    const pathId = localStorage.getItem(`keyUser`, pathId);
    // Id de la asignatura que seleccionar el usuario
    const pathCodAsig = localStorage.getItem(`keyCodigo`, pathCodAsig);
    // id de la tutoria que selecciona el usuario
    const pathTutoria = `gestionUsuarios/${pathId}/asignaturas/${pathCodAsig}/tutorias/${id}`
    const pathIdTut = localStorage.setItem("keyCodigoTut", id);
    //const pathIdTutoria = localStorage.getItem(`keyCodigoTut`, id);

    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    const navigation = useNavigation();
    return(
        <rn.TouchableOpacity 
            onLongPress={() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
        >
            <rn.View style={styles.productContainer}>
                <rn.Text style={styles.title}> {tema} </rn.Text>
                <rn.Text style={styles.subtitle}> {id} </rn.Text>
                <rn.Text style={styles.descrip}>
                    <MaterialCommunityIcons name="watermark" size={18} color="black" /> - {descripcion} </rn.Text>
                <rn.Text style={styles.information}> 
                    <Entypo name="chevron-right" size={18} color="black" /> Aula: {aula} </rn.Text>
                <rn.Text style={styles.information}> 
                    <Entypo name="chevron-right" size={18} color="black" /> Hora: {hora} </rn.Text>
                <rn.Text style={styles.information}>
                    <Entypo name="chevron-right" size={18} color="black" /> {semana} </rn.Text>

                    <rn.View style={styles.btnsContiner}>
                    <rn.Pressable 
                        onPress={() => alert('Lista de estudiantes que asistiran a la tutoria')}
                        style={styles.btnContiner}>
                        <FontAwesome5 name="user-check" size={25} color="black" />
                    </rn.Pressable>

                    <rn.Pressable
                        onPress={() => alert('Reporte de asistencia a la tutoria') }
                        style={styles.btnContiner}>
                        <FontAwesome5 name="file-download" size={25} color="black" />
                    </rn.Pressable>
                </rn.View>
            </rn.View>
            {isDeleteActive && (
                <rn.Pressable onPress={onDelete} style={styles.deleteButton}>
                <AntDesign name="delete" size={24} color="white" />
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#293774',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#D4AC0D',
    },
    descrip: {
        fontSize: 16,
    },
    information: {
        color: 'black',
        fontSize: 16,
    },
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
    deleteButton: {
        position: "absolute",
        right: 8,
        top: 0,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#293774",
        borderRadius: 8,
      },
});