
import React from 'react';
import { Image, View } from 'react-native';

const Obstacles = ({
    obstacleWidth, 
    obstacleHeight, 
    randomBottom, 
    gap, 
    obstaclesLeft}) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                width: obstacleWidth,
                height: 500,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }}>
                <Image source={require('../../img/Bird/obstacle.png')} style={{position: 'absolute'}} />
            </View>
            <View style={{
                position: 'absolute',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
                <Image source={require('../../img/Bird/obstacle1.png')} style={{position: 'absolute'}} />
            </View>
        </>
    )
}

export default Obstacles