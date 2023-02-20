import * as React  from 'react';
import * as rn from 'react-native';
//import { database } from '../src/fb';
//import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
//import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import {useState} from 'react';

export default function Usuarios(
    {
        id,
        cedula,
        nombres,
        apellidos,
        tipo,
        correo,
        clave,
        validado,
        createdAt,
    }
) {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        
        <rn.View style={styles.productContainer}>
            <rn.Text> 
                <MaterialIcons name="fingerprint" size={18} color="black" /> - {cedula} 
            </rn.Text>
            <rn.Text> 
                <FontAwesome5 name="id-card" size={18} color="black" /> - {nombres} {apellidos}
            </rn.Text>
            <rn.Text> 
                <Ionicons name="bookmark" size={18} color="black" /> - {tipo} 
            </rn.Text>
            <rn.Text> 
                <MaterialIcons name="mail" size={18} color="black" /> - {correo} 
            </rn.Text>

            <rn.View style={styles.container}>
                <rn.Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
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

});