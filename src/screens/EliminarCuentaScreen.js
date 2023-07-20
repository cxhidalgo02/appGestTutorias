import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, View, Text,Modal, TextInput, Pressable } from 'react-native';
import { style } from '../styles/styles';
import { myColors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons'; 
import { styleModal } from '../styles/styleModal';
import Layout from '../components/layout/Layout';

const EliminarCuenta = ({ navigation })=> {

  const [modalVisible, setModalVisible] = useState(false);

return (
  <Layout>
    <Text style={style.textTitleSubForm}>
      CONFIRMAR CORREO
    </Text>
    <View style={styles.subcontainerText}>
      <Text style={style.textContentt}>
        Ingrese su correo para confirmar la eliminación de la cuenta.
      </Text>
    </View>
    <TextInput
      style={[style.textInput, Platform.OS === 'ios' && style.iOS_textInput]}
      placeholder="Correo"
      textContentType="emailAddress"
      autoCapitalize='none'/>
      <TouchableOpacity style={style.button} onPress={() => setModalVisible(true)}>
        <Text style={style.textbutton}>ENVIAR</Text>
      </TouchableOpacity>

      <View style={styleModal.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={styleModal.centeredView}>
                <View style={styleModal.modalView}>
                <Ionicons name="information-circle-outline" size={26} color="#293774" style={{padding:10}} />
                    <Text style={styleModal.modalTextTitle}>IMPORTANTE!</Text>
                    <Text style={styleModal.modalText}>
                      Pronto nos contacteremos para finalizar el proceso de eliminacion de la cuenta, 
                      mientras tanto sigue disfrutando de nuestro servicio.
                    </Text>
                    <Pressable
                        style={styleModal.buttonClose}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styleModal.textButtonClose}>CERRAR</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
      </View>
  </Layout>
);
};
export default EliminarCuenta;

const styles = StyleSheet.create({
  subcontainer: {
    width: '75%',
    marginTop: 175,
  },
  subcontainerText: {
    marginTop: 40,
  },
});