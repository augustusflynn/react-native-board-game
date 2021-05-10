import React from 'react'
import { View, TouchableOpacity, StyleSheet, Alert, Text, Image } from 'react-native'
import Constants from '../components/MineSweep/Constants'
import Cell from '../components/MineSweep/Cell'
import { Audio } from 'expo-av'


export default class MineSweepScreen extends React.Component {
    constructor(props) {
        super(props)

        this.boardWidth = Constants.CELL_SIZE * Constants.BOARD_SIZE;
        this.grid = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, idx) => {
            return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, idx) => {
                return null;
            })
        })
    }

    async playSoundBoom() {
        const { sound } = await Audio.Sound.createAsync(
            require('../audio/MineSound/boom.mp3')
        )
        await sound.playAsync()
    }

    onDie = () => {
        this.playSoundBoom()
        Alert.alert("Ooops, you stepped on a boom! What a shame")
        for (let i = 0; i < Constants.BOARD_SIZE; i++) {
            for (let j = 0; j < Constants.BOARD_SIZE; j++) {
                this.grid[i][j].revealWithoutCallback()
            }
        }
    }

    revealNeighbors = (x, y) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i != 0 || j != 0) && x + i >= 0 && x + i <= Constants.BOARD_SIZE - 1 && y + j >= 0 && y + j <= Constants.BOARD_SIZE - 1) {
                    this.grid[x + i][y + j].onReveal(false)
                }
            }
        }
    }

    onReveal = (x, y) => {
        let neighbors = 0
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (x + i >= 0 && x + i <= Constants.BOARD_SIZE - 1 && y + j >= 0 && y + j <= Constants.BOARD_SIZE - 1) {
                    if (this.grid[x + i][y + j].state.isMine) {
                        neighbors++
                    }
                }
            }
        }

        if (neighbors) {
            this.grid[x][y].setState({
                neighbors: neighbors
            })
        } else {
            this.revealNeighbors(x, y)
        }
    }

    renderBoard = () => {
        return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, rowIdx) => {
            let cellList = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, colIdx) => {
                return <Cell
                    onReveal={this.onReveal}
                    onDie={this.onDie}
                    key={colIdx}
                    width={Constants.CELL_SIZE}
                    height={Constants.CELL_SIZE}
                    x={colIdx}
                    y={rowIdx}
                    ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                />
            })

            return (
                <View key={rowIdx} style={{ width: this.boardWidth, height: Constants.CELL_SIZE, flexDirection: 'row' }}>
                    {cellList}
                </View>
            )
        })


    }

    resetGame = () => {
        for (let i = 0; i < Constants.BOARD_SIZE; i++) {
            for (let j = 0; j < Constants.BOARD_SIZE; j++) {
                this.grid[i][j].reset()
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={require('../img/MineSweep/1.png')} />
                <View style={{ width: this.boardWidth, height: this.boardWidth, backgroundColor: '#888888', flexDirection: 'column' }}>
                    {this.renderBoard()}
                </View>
                <View style={{ paddingBottom: 100 }} />
                <TouchableOpacity style={styles.button} onPress={() => this.resetGame()}>
                    <Text style={{ fontSize: 19, color: '#736c6c' }}>New Game</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bdbdbd",
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 110,
        height: 50,
        position: 'relative',
        backgroundColor: '#bdbdbd',
        borderWidth: 2,
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#7d7d7d',
        borderBottomColor: '#7d7d7d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        maxWidth: 450
    }
})