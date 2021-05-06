import React from 'react';
import { Image, View } from 'react-native';

const Bird = ({birdBottom, birdLeft, birdWidth, birdHeight}) => {
    

    return (
        <View style={{
            position: 'absolute',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
        }}>
            <Image source={require('../../img/Bird/bird.png')} />
        </View>
    )
}

export default Bird