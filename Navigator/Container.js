import React from 'react'
import { useFonts } from 'expo-font'
import { View, StyleSheet,  FlatList, TouchableOpacity } from 'react-native'
import ListItem from './list'


export default function Container({ navigation }) {
    const [loaded] = useFonts({
        Pixel: require('../Font/Pixel.ttf'),
        FlappyBird: require('../Font/FlappyBird.ttf')
    })

    if(!loaded) return null

    const item = [
        {id: 0, name: "2048", img: require('../img/2048/logo.png')},
        {id: 1, name: "Ball Juggling", img: require('../img/Soccer/soccer.png')},
        {id: 2, name: "Dino Game", img: require('../img/Dinogame/1.png')},
        {id: 3, name: "Don't Let Him Die", img: require('../img/DontLetHimDie/player.png')},
        {id: 4, name: "Flappy Bird", img: require('../img/Bird/logo.png')},
        {id: 5, name: "Mine Sweeper", img: require('../img/MineSweep/2.png')},
        {id: 6, name: "Ping Pong", img: require('../img/Pong/pong.png')},
        {id: 7, name: "Rapid Roll", img: require('../img/RapidRoll/logo.png')},
        {id: 8, name: "Snake", img: require('../img/Snake/1.png')},
        {id: 9, name: "Tab The Black", img: require('../img/tabtheblack/1.png')},
        {id: 10, name: "Tic Tac Toe", img: require('../img/Tictac/1.png')},
        {id: 11, name: "Coming Soon", img: require('../img/Tictac/1.png')},
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