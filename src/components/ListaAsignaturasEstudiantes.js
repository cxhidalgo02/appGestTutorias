import * as React from 'react';
import * as RN from 'react-native';
import "react-native-gesture-handler";
import { database } from '../../config/firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';

export default function ListaAsignaturasEstudiantes({
    id,
    codigo,
    nombre,
    tipo,
    createdAt,
}) {

    const onDelete = () => {
        const docRef = doc(database, 'asignaturaTutorias', id);
        deleteDoc(docRef);
    }

    // Id del usuario que inicia sesion
    const pathIdEst = localStorage.getItem(`keyUser`, pathIdEst);
    //guardo el codigo de asignatura que seleecione
    localStorage.setItem("keyCodigoEst", id);

    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    const navigation = useNavigation();
    return(
        <RN.TouchableOpacity 
            onLongPress={() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
        >
             <RN.View style={styles.productContainer} >     
             <RN.Text style={styles.texttitle}>{nombre}</RN.Text>
                <RN.Text style={styles.textsubtitle}>{codigo}</RN.Text>
                <RN.Text style={styles.textContent}>Tipo: {tipo}</RN.Text>  
                
                <RN.View style={styles.btnsContiner}>

                    <RN.Pressable title='tutoriasEstudianteScreen'
                        onPress={() => navigation.navigate('tutoriasEstudianteScreen')}
                        style={styles.btnContiner}>
                        <FontAwesome5 name="swatchbook" size={25} color="black" />
                    </RN.Pressable>

                    <RN.Pressable
                        style={styles.btnContiner}>
                        <FontAwesome5 name="file-download" size={25} color="black" />
                    </RN.Pressable>
                </RN.View>
            </RN.View>
            {isDeleteActive && (
                <RN.Pressable onPress={onDelete} style={styles.deleteButton}>
                <AntDesign name="delete" size={24} color="white" />
                </RN.Pressable>
            )}
        </RN.TouchableOpacity>
    )
}

const styles = RN.StyleSheet.create({
    productContainer: {
        width: "85%",
        padding: 10,
        margin: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#2E86C1",
        backgroundColor:"#fff",
    },
    texttitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#293774',
        
    },
    textsubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D4AC0D',
    },
    textContent:{
        fontSize: 16,
        color: '#293774',
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
   },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
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
    /* MODAL */
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
    },
    description: {
        color: "#56636F",
        fontSize: 13,
        fontWeight: "normal",
        width: "100%",
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