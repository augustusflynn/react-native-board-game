import React from 'react'
import { Text, SafeAreaView, Image, StyleSheet } from 'react-native'

export default function ComingSoon() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 50, fontWeight: '500'}}>OOPS!!!</Text>
      <Image source={require('../img/oops.png')} style={{}}/>
      <Text style={{color: '#aaa'}}>We're updating new game ...</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})