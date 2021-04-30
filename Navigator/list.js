import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

export default function ListItem(props) {
    const { name, images } =  props
    

    return (
        <View style={styles.container}>
            <Image source={images} style={styles.image}/>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#242526',
        borderRadius: 20,
        paddingBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3e4042',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.7
    
    },
    image: {
        margin: 16,
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 20,
        fontWeight: '100'
    }
})