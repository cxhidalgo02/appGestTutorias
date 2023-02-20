import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { Pressable, StyleSheet, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { firebaseConfig } from '../firebase-config';
import { initializeApp} from "firebase/app"; 
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'; 
import { useState } from "react";

import InicioScreen from "./screens/InicioScreen";
import RegistroUsuariosScreen from "./screens/RegistroUsuariosScreen";
import InformacionScreen from "./screens/informacionScreen";
import ResetClave from "./screens/ResetClaveScreen";
// SCREENS DE DOCENTES
import AsignaturasDocenteScreen from "./screens/Docente/AsignaturasDocenteScreen";
import RegistroAsignaturasDocenteScreen from "./screens/Docente/RegistroAsignaturasDocenteScreen";
import TutoriasDocenteScreen from "./screens/Docente//TutoriasDocenteScreen";
import RegistroTutoriasDocenteScreen from "./screens/Docente/RegistroTutoriasDocenteScreen";
import DarAltaEstudiantesScreen from "./screens/Docente/DarAltaEstudiantesScreen";
// SCREEN DE ESTUDIANTES
import AsignaturasEstudiantesScreen from "./screens/Estudiante/AsignaturasEstudiantesScreen";
import RegistroAsignaturasEstudianteScreen from "./screens/Estudiante/RegistroAsignaturasEstudianteScreen";
import TutoriasEstudianteScreen from "./screens/Estudiante/TutoriasEstudianteScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack( usuerio ) {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#D4AC0D' },
        headerTintColor: '#293774',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen name="bottomTabNavigator"  component={BottomTabNavigator} options={{ headerShown: false}}/>   
      <Stack.Screen name="informacionScreen" component={InformacionScreen} options={{title:'Gestión de Tutorías',}} />
      <Stack.Screen name="resetClave" component={ResetClave} options={{title:'Restaurar mi clave',}} />
      
      <Stack.Screen name="asignaturasDocenteScreen" component={AsignaturasDocenteScreen} options={{title:'Lista asignaturas',}} />
      <Stack.Screen name="registroAsignaturasDocenteScreen" component={RegistroAsignaturasDocenteScreen} options={{title:'Agregar asignatura',}} />
      <Stack.Screen name="tutoriasDocenteScreen" component={TutoriasDocenteScreen} options={{title:'Lista tutorias',}} />
      <Stack.Screen name="registroTutoriasDocenteScreen" component={RegistroTutoriasDocenteScreen} options={{title:'Agregar tutoria',}} />
      <Stack.Screen name="darAltaEstudiantesScreen" component={DarAltaEstudiantesScreen} options={{title:'Lista estudiantes',}} />
      
      <Stack.Screen name="asignaturasEstudiantesScreen" component={AsignaturasEstudiantesScreen} options={{title:'Lista asignaturas',}} />
      <Stack.Screen name="registroAsignaturasEstudianteScreen" component={RegistroAsignaturasEstudianteScreen} options={{title:'Agregar asignatura',}} />
      <Stack.Screen name="tutoriasEstudianteScreen" component={TutoriasEstudianteScreen} options={{title:'Lista tutorias',}} />
    </Stack.Navigator>       
  )
}

function BottomTabNavigator({ route, navigation })  {
    return (
        <Tab.Navigator initialRouteName="Feed"
          screenOptions={{
            headerStyle: { backgroundColor: '#D4AC0D' },
            headerTintColor: '#293774',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
            <Tab.Screen
                name="INICIO"
                component={InicioScreen}
                options={{
                tabBarLabel: 'INICIO',
                tabBarActiveTintColor: '#D4AC0D', tabBarInactiveTintColor:'#293774',
                tabBarIcon: ({ color, size }) => (<AntDesign name="home" size={25} color="#293774" />),
                headerRight: () => (
                    <Pressable
                      onPress={() => navigation.navigate('informacionScreen')}
                      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, })}>
                      <AntDesign name="infocirlceo" size={25} color="#293774" style={{ marginRight: 16 }}/>
                    </Pressable> 
                )
              }}
            />
            <Tab.Screen
                name="REGISTRO"
                component={RegistroUsuariosScreen}
                options={{
                tabBarLabel: 'REGISTRO', 
                tabBarActiveTintColor: '#D4AC0D', tabBarInactiveTintColor:'#293774',
                tabBarIcon: ({ color, size }) => (<AntDesign name="user" size={25} color="#293774" />),
              }}
            />
        </Tab.Navigator>
      );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}

/*  mostaza - #D4AC0D / azul - #293774 / blanco - #FDFEFE / verde - #0E6655 / gris - #B2BABB

    async function getRol(uid){
    const docRef = doc(firestore, `registroUsuarios/${user.uid}`);
    const docCifrada = getDoc(docRef);
    const infoFinal = docCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndFirebaseRol (usuarioFirebase){
    getRol( usuarioFirebase.uid).then((rol) => {
      const userData ={
        uid: usuarioFirebase.uid,
        correo: usuarioFirebase.correo,
        rol: rol,
      };
      setUsuario(userData);
      console.log("userData final: ", userData);
    });
  }
  onAuthStateChanged ( auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if(!user){
        setUserWithFirebaseAndFirebaseRol(usuarioFirebase);
      }
    } else {
        setUsuario(null);
     }
  });
*/