import React from 'react'
import { View, Image } from 'react-native'

export default Bar = ({ width, height, bar }) => {
  return (
    <View style={{
      position: 'absolute', 
      left: bar[0], 
      top: bar[1]
    }}>
      <Image 
        source={require('../../img/RapidRoll/bar.png')} 
        style={{ width: width, height: height }} 
      />
    </View>
  )
}
