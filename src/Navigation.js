import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { firebaseConfig } from '../firebase-config';
import { initializeApp} from "firebase/app"; 
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'; 
import { myColors } from "./styles/colors"; 
//ICONOS
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
//SCREEN DE INICIO
import InicioScreen from "./screens/InicioScreen";
import RegistroUsuariosScreen from "./screens/RegistroUsuariosScreen";
import InformacionScreen from "./screens/informacionScreen";
import ResetClave from "./screens/ResetClaveScreen";
// SCREENS DE DOCENTES
import AsignaturasDocenteScreen from "./screens/Docente/AsignaturasDocenteScreen";
import RegistroAsignaturasDocenteScreen from "./screens/Docente/RegistroAsignaturasDocenteScreen";
import TutoriasDocenteScreen from "./screens/Docente//TutoriasDocenteScreen";
import RegistroTutoriasDocenteScreen from "./screens/Docente/RegistroTutoriasDocenteScreen";
import AltaEstudiantesScreen from "./screens/Docente/AltaEstudiantesScreen";
import ValidarAsistenciaScreen from "./screens/Docente/ValidarAsistenciaScreen";
// SCREEN DE ESTUDIANTES
import AsignaturasEstudiantesScreen from "./screens/Estudiante/AsignaturasEstudiantesScreen";
import RegistroAsignaturasEstudianteScreen from "./screens/Estudiante/RegistroAsignaturasEstudianteScreen";
import TutoriasEstudianteScreen from "./screens/Estudiante/TutoriasEstudianteScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack( ) {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: myColors.mustard },
        headerTintColor: myColors.navyblue,
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen name="bottomTabNavigator"  component={BottomTabNavigator} options={{ headerShown: false}}/>   
      <Stack.Screen name="informacionScreen" component={InformacionScreen} options={{title:'Gestión de Tutorías',}} />
      <Stack.Screen name="resetClave" component={ResetClave} options={{title:'Restaurar mi clave',}} />
      
      <Stack.Screen name="asignaturasDocenteScreen" component={AsignaturasDocenteScreen} options={{title:'Lista asignaturas',}} />
      <Stack.Screen name="registroAsignaturasDocenteScreen" component={RegistroAsignaturasDocenteScreen} options={{title:'Agregar asignatura',}} />
      <Stack.Screen name="tutoriasDocenteScreen" component={TutoriasDocenteScreen} options={{title:'Lista tutorias',}} />
      <Stack.Screen name="registroTutoriasDocenteScreen" component={RegistroTutoriasDocenteScreen} options={{title:'Agregar tutoria',}} />
      <Stack.Screen name="altaEstudiantesScreen" component={AltaEstudiantesScreen} options={{title:'Lista estudiantes',}} />
      <Stack.Screen name="validarAsistenciaScreen" component={ValidarAsistenciaScreen} options={{title:'Lista estudiantes',}} />

      <Stack.Screen name="asignaturasEstudiantesScreen" component={AsignaturasEstudiantesScreen} options={{title:'Lista asignaturas',}} />
      <Stack.Screen name="registroAsignaturasEstudianteScreen" component={RegistroAsignaturasEstudianteScreen} options={{title:'Agregar asignatura',}} />
      <Stack.Screen name="tutoriasEstudianteScreen" component={TutoriasEstudianteScreen} options={{title:'Lista tutorias',}} />
    </Stack.Navigator>       
  )
}

function BottomTabNavigator({ navigation })  {


    return (
        <Tab.Navigator initialRouteName="Feed"
          screenOptions={{
            headerStyle: { backgroundColor: myColors.mustard },
            headerTintColor: myColors.navyblue,
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
            <Tab.Screen
                name="INICIO"
                component={InicioScreen}
                options={{
                tabBarLabel: 'INICIO',
                tabBarActiveTintColor: myColors.mustard, 
                tabBarInactiveTintColor: myColors.navyblue,
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
                tabBarActiveTintColor: myColors.mustard, 
                tabBarInactiveTintColor: myColors.navyblue,
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