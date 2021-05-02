import React from 'react'
import { View, StyleSheet,  FlatList, TouchableOpacity } from 'react-native'
import ListItem from './list'


export default function Container({ navigation }) {
    const item = [
        {id: 1, name: "Tab The Black", img: require('../img/tabtheblack/1.png')},
        {id: 2, name: "Mine Sweeper", img: require('../img/MineSweep/2.png')},
        {id: 3, name: "Dino Game", img: require('../img/Dinogame/1.png')},
        {id: 4, name: "Tic Tac Toe", img: require('../img/Tictac/1.png')},
        {id: 5, name: "Ball Juggling", img: require('../img/Soccer/soccer.png')},
        {id: 6, name: "Snake", img: require('../img/Snake/1.png')}
    ]

    return (
        <View style={styles.container}>
            <FlatList
                data={item}
                renderItem={({ item }) => <TouchableOpacity style={styles.wrapper} onPress={() => navigation.navigate(item.name)} ><ListItem name={item.name} images={item.img}/></TouchableOpacity> }
                keyExtractor={(item) => item.id}
                numColumns={2}
                style={styles.container}
            />

        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingTop: 16,
        backgroundColor: '#DDD',
        flex: 1
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 8,
        paddingBottom:8,
        paddingTop: 16,
    }
})