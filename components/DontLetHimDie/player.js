import React from 'react'
import { View, Image} from 'react-native'

export default Player = ({ playerPos, playerBottom, playerWidth, playerHeight }) => {
  return (
    <View style={{
      left: playerPos,
      bottom: playerBottom,
      position: 'absolute',
      width: playerWidth,
      height: playerHeight
    }}>
      <Image source={require('../../img/DontLetHimDie/player.png')} />
    </View>
  )
}