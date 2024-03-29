import * as React from 'react';
import  { useState } from 'react';
import { database } from '../../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import localStorage from 'react-native-expo-localstorage';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { style } from '../../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../../components/layout/Layout';

const RegistroTutoriasDocenteScreen = () => {
  const navigation = useNavigation();

  const [codigoTuto, setCodigoTuto] = React.useState('')
  const [temaTuto, setTemaTuto] = React.useState('')
  const [descripcionTuto, setDescripcionTuto] = React.useState('')
  const [aulaTuto, setAulaTuto] = React.useState('')
  const [fechaTuto, setFechaTuto] = React.useState('')
  const [horaTuto, setHoraTuto] = React.useState('')
  const [semanaTuto, setSemanaTuto] = React.useState('')
  const [fechaRegTuto] = React.useState(new Date())

  const pathIdDoc = localStorage.getItem(`keyUserDoc`, pathIdDoc);
  // Id de la asignatura que seleccionar el usuario
  const pathIdAsig = localStorage.getItem(`keyCodAsigDoc`, pathIdAsig);
 // id del codigo que selecciona en la tutoria
  const pathUrlDoc  = `Usuarios/${pathIdDoc}/Asignaturas/${pathIdAsig}/Tutorias/`;
  const onSend = async () => {
    try {
      const registroTutoria = {
        codigoTuto: codigoTuto,
        temaTuto: temaTuto,
        descripcionTuto: descripcionTuto,
        aulaTuto: aulaTuto,
        fechaTuto: fechaTuto,
        horaTuto: horaTuto,
        semanaTuto: semanaTuto,
        fechaRegTuto: fechaRegTuto
      };
      const docRef = doc(database, pathUrlDoc, registroTutoria.codigoTuto );
      await setDoc(docRef, (registroTutoria) );
      Alert.alert('Registro exitoso!', '', [
        { text: 'Aceptar' },
      ]);
      navigation.goBack();
    } catch (error) {
      console.log('ERROR => ',error);
      Alert.alert('Error al registrar!', '', [
        { text: 'Aceptar' },
      ]);
    }
  }

  //atributos y metodos para seleccion de la fecha
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirmDate = (Date) => {
    setSelectedDate(Date);
    hideDatePicker();
  };

  //atributos y metodos para seleccion de la hora
  const [selectedTime, setSelectedTime] = useState();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirmTime = (Time) => {
    setSelectedTime(Time);
    hideTimePicker();
  };

  return (
   <Layout>
    <Text style={style.textTitle}>
      FORMULARIO
    </Text>
      <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
        onChangeText={(text) => setCodigoTuto(text)}
        placeholder="Codigo"
      />
      <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
        onChangeText={(text) => setTemaTuto(text)}
        placeholder="Tema"
      />
      <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
      onChangeText={(text) => setDescripcionTuto(text)}
        placeholder="Descripción"
      />
      <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
      keyboardType="numeric"
      onChangeText={(text) => setAulaTuto(text)}
        placeholder="Aula"
      />
      <View style = {styles.containerFecha}>
        <View style = {styles.btnCalendar}>
          <Pressable onPress={showDatePicker} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
            <Ionicons name="calendar-outline" size={31} color="#293774" />
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
        </View>
        <View style = {styles.inputCalendar}>
            <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
              editable={true}
              onChangeText={(text) => setFechaTuto(text)}
              placeholder="Fecha">
              {`${selectedDate ? moment(selectedDate).format("DD-MM-YYYY").toString() : "DD-MM-YYYY"}`}
            </TextInput>
        </View>
      </View>
      <View style = {styles.containerFecha}>
        <View style = {styles.btnCalendar}>
          <Pressable onPress={showTimePicker} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
            <Ionicons name="md-time-outline" size={31} color="#293774" />
            </Pressable>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
            />
        </View>
        <View style = {styles.inputCalendar}>
            <TextInput style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
              editable={true}
              onChangeText={(text) => setHoraTuto(text)}
              placeholder="Hora">
              {`${selectedTime ? moment(selectedTime).format("HH:mm").toString() : "HH:mm"}`}
            </TextInput>
        </View>
      </View>
      <Picker
          //style = {style.select}
          style={[style.select, Platform.OS === 'ios' && style.iOS_select]}
          selectedValue={semanaTuto}
          onValueChange={(itemValue) => setSemanaTuto(itemValue)}
          >
          <Picker.Item label="Seleccionar semana" value="0" />
          <Picker.Item label="Semana 1" value="1" />
          <Picker.Item label="Semana 2" value="2"/>
          <Picker.Item label="Semana 3" value="3"/>
          <Picker.Item label="Semana 4" value="4"/>
          <Picker.Item label="Semana 5" value="5"/>
          <Picker.Item label="Semana 6" value="6"/>
          <Picker.Item label="Semana 7" value="7"/>
          <Picker.Item label="Semana 8" value="8"/>
          <Picker.Item label="Semana 9" value="9"/>
          <Picker.Item label="Semana 10" value="10"/>
          <Picker.Item label="Semana 11" value="11"/>
          <Picker.Item label="Semana 12" value="12"/>
          <Picker.Item label="Semana 13" value="13"/>
          <Picker.Item label="Semana 14" value="14"/>
          <Picker.Item label="Semana 15" value="15"/>
          <Picker.Item label="Semana 16" value="16"/>
      </Picker>
      <TouchableOpacity style={style.button} onPress={onSend} >
        <Text style={style.textbutton}>REGISTRAR</Text>
      </TouchableOpacity>
   </Layout>

  );
};
export default RegistroTutoriasDocenteScreen;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcontainer: {
    width: '75%',
  },
  scrollForm: {
    textAlign: "center",
    marginTop: 18,
  },
  containerFecha: {
    width: '100%',
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCalendar: {
    width: "20%",
    marginTop: 20,
  },
  inputCalendar: {
    width: "80%",
  }
});