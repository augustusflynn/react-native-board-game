import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'
import Snake from '../components/Snake/snake'
import Food from '../components/Snake/food'

const GRID_SIZE = 15
const CELL_SIZE = 20
const BOARD_SIZE = GRID_SIZE * CELL_SIZE

const randomFood = () => {
  let max = 18,
    min = 1
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5
  return [x, y]
}

const initialState = {
  snakeDots: [
    [0, 0],
    [1, 0],
  ],
  food: randomFood(),
  direction: 'RIGHT',
  speed: 300,
}

export default class SnakeScreen extends React.Component {
  state = initialState

  
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed)
  }

  componentDidUpdate() {
    this.checkIfOutBorder()
    this.checkIfCollap()
    this.checkIfEat()
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
        head = [head[0] + 1, head[1]]
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
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    const { food } = this.state
    if (head[0] === food[0] && head[1] === food[1]) {
      // console.log(head, '   ', food)
      this.setState({
        food: randomFood()
      })
      this.longerSnake()
      this.increaseSpeed()
    }
  }

  longerSnake = () => {
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed = () => {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  checkIfCollap = () => {
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        // console.log(head, '      ',dot)
        this.gameOver()
      }
    })
  }

  checkIfOutBorder = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if ( 
      head[0] >= 19 || 
      head[1] >= 19 || 
      head[0] < 0 || 
      head[1] < 0
    ) {
      this.gameOver()
    }
  }

  gameOver = () => {
    Alert.alert('lose')
    this.setState(initialState)
  }

  render() {
    const { snakeDots, food } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.gameArea}>
          <Snake snakeDots={snakeDots} size={GRID_SIZE} />
          <Food dot={food} size={GRID_SIZE} />
        </View>

        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => this.setState({ direction: 'UP' })}>
              <View style={styles.control} />
            </TouchableOpacity>
          </View>

          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => this.setState({ direction: 'LEFT' })}>
              <View style={styles.control} />
            </TouchableOpacity>
            <View style={[styles.control, { backgroundColor: null }]} />
            <TouchableOpacity
              onPress={() => this.setState({ direction: 'RIGHT' })}>
              <View style={styles.control} />
            </TouchableOpacity>
          </View>

          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => this.setState({ direction: 'DOWN' })}>
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameArea: {
    position: 'relative',
    borderColor: '#000',
    borderWidth: 7,
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlRow: {
    height: 100,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
