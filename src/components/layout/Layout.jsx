import React from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { style as styles } from '../../styles/styles'

const Layout = ({children, style}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container} >
          <ScrollView
            contentContainerStyle={styles.contentScrollView}
            style={styles.scrollForm}
          >
            <View style={StyleSheet.flatten([styles.subcontainer, style])}>
              {children}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
  )
}

export default Layout