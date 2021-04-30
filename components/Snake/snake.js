import React from 'react'
import { View, StyleSheet} from 'react-native'

export default function Snake(props) {
    return (
        <View>
            {props.snakeDots.map((dot, i) => {
                return (<View 
                    key={i} 
                    style={[
                        styles.snakedot, 
                        {left: `${dot[0]}%`, top: `${dot[1]}%`}
                    ]} 
                    />)
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    snakedot: {
        position:"absolute",
        backgroundColor: "#000",
        borderWidth: 1, 
        borderColor:  '#fff',
        width: 15,
        height: 15,
        zIndex: 2,
    },
})