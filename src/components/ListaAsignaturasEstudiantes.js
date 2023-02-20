import * as React from 'react';
import * as RN from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export default function ListaAsignaturasEstudiantes({
    id,
    codigo,
    nombre,
    tipo,
    createdAt,
}) {
/*
    const onDelete = () => {
        const docRef = doc(database, 'asignaturaTutorias', id);
        deleteDoc(docRef);
    }

    const onEdit = () => {
        const docRef = doc(database, 'asignaturaTutorias', id);
        updateDoc(docRef, {
            isSold: true,
        });
    }
*/

const navigation = useNavigation();
    return(
        <RN.View style={styles.productContainer}>     
            <RN.Text style={styles.code}>{codigo}</RN.Text>
            <RN.Text style={styles.textContent}>{nombre}</RN.Text>
            <RN.Text style={styles.textContent}>{tipo}</RN.Text>    
              
            <RN.View style={styles.btnsContiner}>

                <RN.Pressable title='tutoriasEstudianteScreen'
                    onPress={() => navigation.navigate('tutoriasEstudianteScreen')}
                    style={styles.btnContiner}>
                    <FontAwesome5 name="book" size={25} color="black" />
                </RN.Pressable>

                <RN.Pressable
                    onPress={() => alert('Reporte semanal') }
                    style={styles.btnContiner}>
                    <FontAwesome5 name="file-download" size={25} color="black" />
                </RN.Pressable>
            </RN.View>
        </RN.View>
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
    code: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#293774',
        padding: 5,
    },
    textContent:{
        fontSize: 18,
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
        width: '50%',  
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
});