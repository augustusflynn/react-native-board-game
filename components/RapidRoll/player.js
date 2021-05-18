import React from 'react'
import { View, Image } from 'react-native'

export default Player = ({ width, height, player }) => {
  return (
    <View style={{
      backgroundColor: '#fff', 
      position: 'absolute',
      left: player[0], 
      top: player[1],
      borderRadius: 100
    }}>
      <Image 
        source={require('../../img/RapidRoll/player.png')}
        style={{ width: width, height: height }}
      />
    </View>
  )
}