import React from 'react'
import { View } from 'react-native'

export default (props) => {
    return (
        <View style={{
        position: 'absolute',
        borderWidth: 0.5, 
        borderColor:  '#fff',
        width: 15,
        height: 15,
        backgroundColor : '#000',
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`,
        zIndex: 2,
        }}
        />
    )
}