import * as React from 'react';
import * as RN from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, deleteDoc, addDoc } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import localStorage from 'react-native-expo-localstorage';

export default function Asignaturas ({
    id,
    codigo,
    nombre,
    tipo,
}) {
    // Id del usuario que inicia sesion
    const pathId = localStorage.getItem(`keyUser`, pathId);

    //ESTUDIANTE
    const [estudiante, setEstNoValidate] = React.useState([]);
    React.useEffect(() => {
        const collectionRef = collection(database, 'gestionUsuarios');
        const q = query(collectionRef, where("tipo","==","Estudiante"));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            setEstNoValidate(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    cedula: doc.data().cedula,
                    nombres: doc.data().nombres,
                    tipo: doc.data().tipo,
                    validada: doc.data().validada,
                }))
                
              );
            }
            );
        return unsubscribe;
    },[])

    const onDelete = () => {
        const docRef = doc(database, 'asignaturaTutorias', id);
        deleteDoc(docRef);
    }

    //path usuario  con asignaturas 
    const pathAsig=`gestionUsuarios/${pathId}/asignaturas/${codigo}`
    //guardo el codigo de asignatura para enviar a Dar de alta
    localStorage.setItem("keyCodigo", codigo);

    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    const navigation = useNavigation();
    return(
        <RN.TouchableOpacity 
            onLongPress={() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
        >

            <RN.View style={styles.productContainer}>     
                <RN.Text style={styles.texttitle}>{nombre}</RN.Text>
                <RN.Text style={styles.textsubtitle}>{codigo}</RN.Text>
                <RN.Text style={styles.textContent}> Tipo: {tipo}</RN.Text> 
              
                <RN.View style={styles.btnsContiner}>

                    <RN.Pressable title='darAltaEstudiantesScreen'
                        onPress={() => navigation.navigate('darAltaEstudiantesScreen')}
                        style={styles.btnContiner}>
                        <FontAwesome5 name="user-cog" size={25} color="black" />
                    </RN.Pressable>

                    <RN.Pressable title='tutoriasDocenteScreen'
                        onPress={() => navigation.navigate('tutoriasDocenteScreen')}
                        style={styles.btnContiner}>
                        <FontAwesome5 name="swatchbook" size={25} color="black" />
                    </RN.Pressable>

                    <RN.Pressable
                        onPress={() => alert('Reporte semanal') }
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