import React from 'react'
import { View, Image } from 'react-native'

export default NotBar = ({ width, height, notBar }) => {
  return (
    <View style={{
      backgroundColor: '#fff', 
      position: 'absolute', 
      left: notBar[0], 
      top: notBar[1]
    }}> 
      <Image 
        source={require('../../img/RapidRoll/obstacles.png')}
        style={{ width: width, height: height }}
      />
    </View>
  )
}
