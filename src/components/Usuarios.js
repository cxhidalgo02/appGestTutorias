import * as React  from 'react';
import * as rn from 'react-native';
import { styleComp } from '../styles/stylesComp';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Usuarios({
        id, cedula, nombres, apellidos, tipo, correo, clave, validado, createdAt,
    }) 
{

    return( 
        <rn.View style={styleComp.productContainer}>
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
        </rn.View>
    )
}