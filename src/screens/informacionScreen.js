import * as React from 'react';
import { style } from '../styles/styles'; 
import { StyleSheet, View, Text, SafeAreaView, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Skeleton } from 'moti/skeleton'; 
import { MotiView } from 'moti';

const image = {uri: 'https://www.utpl.edu.ec/sites/default/files/archivos/marca%20UTPL%202018-03.png'};

const Spacer =  ({height = 25}) => <MotiView style={{height}}/>

function MySkeleton() {
  return (
    <>
      <Skeleton width={'10%'} height={40} colorMode={'light'} />
      <Spacer/>
      <Skeleton width={'80%'} height={150} colorMode={'light'} />
      <Spacer/>
      <Skeleton width={'60%'} height={80} colorMode={'light'} />
    </>
  );
}

const informacionScreen = ({ route, navigation })  => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.container} >
        <React.Suspense fallback={<MySkeleton />}>

            <AntDesign name="appstore-o" size={35} color="#293774" style={{marginBottom: 25}} />

            <Text style={style.textContent}>
                La aplicación esta desarrollada para el control y seguimiento 
                de tutorias a los estudiantes en la modalidad presencial.
            </Text>

            <ImageBackground source={image} style={styles.image}/>

        </React.Suspense>   
      </View>
    </SafeAreaView>
  );
};
export default informacionScreen;

const styles = StyleSheet.create({
  image: {
    marginTop: 25,
    marginLeft: 25,
    width: '90%',
    height: '40%',
  },
});
