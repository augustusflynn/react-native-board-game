
import React from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';

const Obstacles = ({
    obstacleWidth, 
    obstacleHeight, 
    randomBottom, 
    gap, 
    obstaclesLeft,
    jump
}) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                width: obstacleWidth,
                height: 500,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }}>
                <TouchableWithoutFeedback onPress={jump}>
                    <Image source={require('../../img/Bird/obstacle.png')} style={{position: 'absolute'}} />
                </TouchableWithoutFeedback>
            </View>
            <View style={{
                position: 'absolute',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
                <TouchableWithoutFeedback onPress={jump}>
                    <Image source={require('../../img/Bird/obstacle1.png')} style={{position: 'absolute'}} />
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

export default Obstacles