import React from 'react'
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Dimensions
} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import Snake from '../components/Snake/snake'
import Food from '../components/Snake/food'

const GRID_SIZE = 15
const SCREEN_WIDTH = Dimensions.get('window').width
const BOARD_SIZE = SCREEN_WIDTH
const BOARD_SIZE_HEIGHT = SCREEN_WIDTH - 100

const randomFood = () => {
  let maxX = BOARD_SIZE/15 - 3, maxY = BOARD_SIZE_HEIGHT/15 - 3,min = 0
  let x = Math.floor((Math.random() * (maxX - min + 1) + min) / 5) * 5
  let y = Math.floor((Math.random() * (maxY - min + 1) + min) / 5) * 5
  return [x, y]
}

export default class SnakeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      snakeDots: [
        [3, 7],
      ],
      food: randomFood(),
      direction: 'PLAY',
      speed: 120,
      curScore: 1,
      highestScore: 0
    }
    this.getScore()
  }

  
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed)
  }

  componentDidUpdate() {
    const { curScore, highestScore } = this.state
    this.checkIfOutBorder()
    this.checkIfCollision()
    this.checkIfEat()
    if(curScore > highestScore){
      this.setState({highestScore: curScore})
    }
  }

  async playSoundEat() {
    const { sound } = await Audio.Sound.createAsync(
       require('../audio/SnakeAudio/eat.mp3')
    )

    await sound.playAsync()
  }

  async playSoundDead() {
    const { sound } = await Audio.Sound.createAsync(
       require('../audio/SnakeAudio/dead.mp3')
    )

    await sound.playAsync()
  }

  async playSoundUp() {
    const { sound } = await Audio.Sound.createAsync(
       require('../audio/SnakeAudio/up.mp3')
    )

    await sound.playAsync()
  }

  async playSoundDown() {
    const { sound } = await Audio.Sound.createAsync(
       require('../audio/SnakeAudio/down.mp3')
    )
    await sound.playAsync()
  }

  async playSoundLeft() {
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/SnakeAudio/left.mp3')
    )

    await sound.playAsync()
  }

  async playSoundRight() {
    const { sound } = await Audio.Sound.createAsync(
       require('../audio/SnakeAudio/right.mp3')
    )

    await sound.playAsync()
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 1, head[1]]
        break
      case 'LEFT':
        head = [head[0] - 1, head[1]]
        break
      case 'UP':
        head = [head[0], head[1] - 1]
        break
      case 'DOWN':
        head = [head[0], head[1] + 1]
        break
      default:
        break
    }
    // console.log(head)
    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots,
    })
  }

  checkIfEat = () => {
    const { snakeDots, food, curScore } = this.state 
    let head = snakeDots[snakeDots.length - 1]
    if (head[0] === food[0] && head[1] === food[1]) {
      // console.log(head, '   ', food)
      this.setState({
        food: randomFood(),
        curScore: curScore+1
      })
      this.longerSnake()
      this.playSoundEat()
    }
  }

  longerSnake = () => {
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([300, 300])
    this.setState({
      snakeDots: newSnake
    })
  }

  checkIfCollision = () => {
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        // console.log(head, '      ',dot)
        this.gameOver()
        this.playSoundDead()
      }
    })
  }

  checkIfOutBorder = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    let x = BOARD_SIZE/GRID_SIZE
    let y = BOARD_SIZE_HEIGHT/GRID_SIZE
    if ( 
      head[0] >= x - 1.5|| 
      head[1] >= y -1.5|| 
      head[0] < 0 || 
      head[1] < 0
    ) {
      console.log(head)
      this.gameOver()
      this.playSoundDead()
    }
  }

  gameOver = () => {
    const { snakeDots, highestScore } = this.state
    this.storageScore()
    Alert.alert(
      `Highest Score: ${highestScore}`,
      `Your Score: ${snakeDots.length}`, 
      [
        { 
          text: 'Try again...', 
          onPress: () => this.setState({ direction: 'OK'})
        }
      ])
    this.setState({
      snakeDots: [
        // [0, 0],
        [3, 7],
      ],
      food: randomFood(),
      direction: 'PLAY',
      speed: 300,
      curScore: 1
    })
  }


  storageScore = async () => {
    try {
      await AsyncStorage.setItem('SNAKE', JSON.stringify(this.state.highestScore))
    } catch(e) {
      console.log(e)
    }
  }
  
  getScore = async () => {
    try {
      const value = await AsyncStorage.getItem('SNAKE')
      if( value != null) {
        this.setState({ highestScore: JSON.parse(value) })
      }
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const { snakeDots, food, direction } = this.state
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    }
    return (
      <GestureRecognizer
        onSwipeUp={(state) => this.setState({ direction: 'UP'})}
        onSwipeDown={(state) => this.setState({ direction: 'DOWN'})}
        onSwipeLeft={(state) => this.setState({ direction: 'LEFT'})}
        onSwipeRight={(state) => this.setState({ direction: 'RIGHT'})}
        config={config}
        style={styles.container}
      >
        {(direction == 'PLAY') && <Text style={styles.start}>SWIPE TO PLAY</Text>}
        <View style={styles.gameArea}>
          <Snake snakeDots={snakeDots} size={GRID_SIZE} />
          <Food dot={food} size={GRID_SIZE} />
        </View>
      </GestureRecognizer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#d7d7d7'
  },
  gameArea: {
    position: 'relative',
    borderColor: '#000',
    borderWidth: 7,
    width: BOARD_SIZE,
    height: BOARD_SIZE_HEIGHT,
    backgroundColor: '#a4c78d',
    top: '1%'
  },
  start: {
    position: 'absolute',
    bottom: '10%',
    left: '14%',
    fontWeight: 'bold'
  }
})
