import React from 'react'
import { View, Image } from 'react-native'

export default Enemy = ({ enemyStartPos, enemyStartLeft, img }) => {
  return (
    <View style={{ left: enemyStartLeft, top: enemyStartPos}}>
      <Image 
        source={img} 
        style={{width: 60, height: 120 }}
      />
    </View>
  )
}