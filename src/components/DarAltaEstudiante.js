import * as React  from 'react';
import * as rn from 'react-native';
//import { database } from '../src/fb';
//import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
//import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useState} from 'react';
import { doc, deleteDoc, updateDoc, where } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig';

export default function DarAltaEstudiante(
    {
        id,
        cedula,
        nombres,
        apellidos,
        tipo,
        correo,
        clave,
        validada,
        codigo,
        createdAt,
    }
) {
    const pathUser=`gestionUsuarios/${id}/asignaturas/CODTT002`
    
    const onValidate = () => {
    const docRef = doc(database, `gestionUsuarios/${id}/asignaturas/CODTT002`);
            updateDoc(docRef, {validada: 'true', });
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
                    <MaterialIcons name="mail" size={18} color="black" /> - {validada} 
                </rn.Text>
                <rn.Text> 
                    <MaterialIcons name="mail" size={18} color="black" /> - {pathUser} 
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
        top: 0,
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