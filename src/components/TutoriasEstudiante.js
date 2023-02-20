import * as React from 'react';
import * as rn from 'react-native';
//import { database } from '../src/fb';
//import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
//import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TutoriasEstudiante(
    {
        id,
        tema,
        descripcion,
        aula,
        hora,
        semana,
        createdAt,
    }
) {    
    const navigation = useNavigation();
    return(
        <rn.View style={styles.productContainer}>
            
            <rn.Text style={styles.title}> {tema} </rn.Text>
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
                    onPress={() => alert('Registrar asistencia')}
                    style={styles.btnContiner}>
                    <FontAwesome5 name="user-check" size={25} color="black" />
                </rn.Pressable>

            </rn.View>
        </rn.View>
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
        width: '100%',  
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },

});