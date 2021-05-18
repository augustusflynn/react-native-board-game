import React from 'react'
import { Text, View, StyleSheet, Animated, TouchableWithoutFeedback, Image } from 'react-native'
import { MAX_WIDTH, MAX_HEIGHT, BAR, PLAYER, WIDTH, HEIGHT } from '../components/RapidRoll/props'
import Bar from '../components/RapidRoll/bar'
import NotBar from '../components/RapidRoll/notBar'
import Player from '../components/RapidRoll/player'

const maxLeft = MAX_WIDTH - BAR.width
let left = [0, maxLeft * 1/6, maxLeft * 2/6, maxLeft * 3/6, maxLeft * 4/6, maxLeft * 5/6, maxLeft * 6/6 ]
const getRandomLeft = () => { 
  let max = left.length, min = 0
  return Math.floor(Math.random() * (max - min) + min)
}

export default class RapidRollScreen extends React.Component {
  constructor(props) {
    super(props)
    this.animatedScore = new Animated.Value(HEIGHT)
    this.fadeAnim = new Animated.Value(0)
    this.state = {
      bar0: [left[getRandomLeft()], 50],
      bar1: [left[getRandomLeft()], 180],
      bar2: [left[getRandomLeft()], 115],
      bar3: [left[3], 245],
      bar4: [left[getRandomLeft()], 310],
      bar5: [left[getRandomLeft()], 375],

      player: [left[3] + PLAYER.width, 245 - PLAYER.height],
      speed: 0,
      increasing: 'null',
      playerSpeed: -5,
      direction: 'save',
      isGameOver: false,
      isStart: false,
      score: 0,
      highestScore: 0
    }
  }

  checkCollision = () => {
    const { player, bar4, bar2 } = this.state
    if(player[1] > MAX_HEIGHT - PLAYER.height || player[1] < 0) {
      this.gameOver()
    }
    // if obstacles contain player, so end game 
    if(this.checkPlayerOnEachBar(bar2, player) ||
    this.checkPlayerOnEachBar(bar4, player) 
    ) {
      this.gameOver()
    }
  }

  checkPlayerOnEachBar = (b, p) => {
    const { speed } = this.state
    let pLeft = p[0], pRight = p[0] + PLAYER.width, pTop = p[1] ,pBottom = p[1] + PLAYER.height

    let bLeft = b[0], bRight = b[0] + BAR.width, bTop = b[1], bBottom = b[1] + BAR.height
    // if(speed < 15)  return pLeft < bRight && pRight > bLeft && (bTop - pBottom <= 30 && bTop - pBottom >= 0)
    return pLeft < bRight && pRight > bLeft && (bBottom - pBottom <= 50 && bBottom - pBottom >= 0)
  }

  componentDidMount() {
    setInterval(() => {this.startGame() , this.doIncreasing()}, 1000/50)
  }

  componentDidUpdate() {
    this.checkCollision()
  }

  doIncreasing = () => {
    const { player, increasing } = this.state
    let gap
    if(increasing == 'left')  {
      if(player[0] > 0) gap = -15
      else gap = 0
    }
    else if(increasing == 'right') {
      if(player[0] < MAX_WIDTH - PLAYER.width)  gap = 15
      else gap = 0
    }
    else gap = 0
    let i = [player[0] + gap, player[1]]
    this.setState({ player: i })
  }

  gameOver = () => { 
    let lastPlayer = [left[5], 100]
    const { score, highestScore } = this.state
    this.setState({
      player: lastPlayer,
      isGameOver: true,
      increasing: false
    })
    if(score > highestScore) this.setState({ highestScore: score })

    Animated.timing(this.animatedScore, {
      toValue: -30,
      duration: 2000,
      useNativeDriver: false
    }).start()

    Animated.timing(this.fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false
    }).start()
  }

  handlePressIn = (e) => {
    if(e == 'left') this.setState({ increasing: 'left' })
    if(e == 'right') this.setState({ increasing: 'right' })
  }

  handlePressOut = () => {
    this.setState({ increasing: 'null' })
  }

  handleStart = () => {
    this.setState({ isStart: true, speed: 1.5, score: 10 })
  }

  initial = () => {
    this.animatedScore.setValue(HEIGHT)
    this.fadeAnim.setValue(0)
    this.setState({
      bar0: [left[getRandomLeft()], 50],
      bar1: [left[getRandomLeft()], 180],
      bar2: [left[getRandomLeft()], 115],
      bar3: [left[3], 245],
      bar4: [left[getRandomLeft()], 310],
      bar5: [left[getRandomLeft()], 375],

      player: [left[3] + PLAYER.width, 245 - PLAYER.height],
      score: 0,
      isGameOver: false,
      direction: 'save',
      increasing: 'null',
      speed: 1.5,
      playerSpeed: -5,
    })
  }

  movePlayer = (direction) => {
    let gap
    const { player } = this.state
    if(direction == 'left') {
      if(player[0] > 0) gap = - 15
      else gap = 0
    } else {
      if(player[0] < MAX_WIDTH - PLAYER.width) gap = 15
      else gap = 0
    }

    let newPlayer = [player[0] + gap, player[1]]
    this.setState({ player: newPlayer })

  }

  // speedUp = () => {
  //   const { score } = this.state
  //   if(score == 15) {
  //     this.setState({ speed: 1.5 })
  //   }
  // }

  startGame = () => {
    const { bar0, bar1, bar2, bar3, bar4, bar5, player, speed, playerSpeed, isGameOver, direction, score } = this.state
    let gap = 5 * speed

    //direction will determind player will up or down
    switch(direction) {
      case 'save':
        this.setState({ playerSpeed: - gap})
        break
      case 'space':
        this.setState({ playerSpeed: gap })
        break
      default: 
        break
    }

    //bar0
    if(bar0[1] > 0) {
      let newBar = [bar0[0], bar0[1] - gap]
      this.setState({
        bar0: newBar  
      })
    } else {
      this.setState({
        bar0: [left[getRandomLeft()], MAX_HEIGHT],
        score: score+1
      })
    }
    //bar1
    if(bar1[1] > 0) {
      let newBar = [bar1[0], bar1[1] - gap]
      this.setState({
        bar1: newBar
      })
    } else {
      this.setState({
        bar1: [left[getRandomLeft()], MAX_HEIGHT],
        score: score+1
      })
    }
    //bar2
    if(bar2[1] > 0) {
      let newBar = [bar2[0], bar2[1] - gap]
      this.setState({
        bar2: newBar
      })
    } else {
      this.setState({
        bar2: [left[getRandomLeft()], MAX_HEIGHT],
      })
    }
    //bar3
    if(bar3[1] > 0) {
      let newBar = [bar3[0], bar3[1] - gap]
      this.setState({
        bar3: newBar
      })
    } else {
      this.setState({
        bar3: [left[getRandomLeft()], MAX_HEIGHT],
        score: score+1
      })
    }
    //bar4
    if(bar4[1] > 0) {
      let newBar = [bar4[0], bar4[1] - gap]
      this.setState({
        bar4: newBar
      })
    } else {
      this.setState({
        bar4: [left[getRandomLeft()], MAX_HEIGHT]
      })
    }
    //bar5
    if(bar5[1] > 0) {
      let newBar = [bar5[0], bar5[1] - gap]
      this.setState({
        bar5: newBar,
      })
    } else {
      this.setState({
        bar5: [left[getRandomLeft()], MAX_HEIGHT],
        score: score+1
      })
    }

    //start player
    let newPlayer = [player[0], player[1] + playerSpeed]
    this.setState({
      player: newPlayer
    })
    //check if bar contain player set direction
    if(this.checkPlayerOnEachBar(bar3, player) || 
      this.checkPlayerOnEachBar(bar0, player) || 
      this.checkPlayerOnEachBar(bar1, player) ||
      this.checkPlayerOnEachBar(bar5, player) 
    ) {
      this.setState({ direction: 'save' })
    } else {
      this.setState({ direction: 'space' })
    }

    //if game over speed = 0
    if(isGameOver) {
      this.setState({
        speed: 0,
        playerSpeed: 0
      })
    }

    // this.speedUp()
  }

  render() {
    const { bar0, bar1, bar2, bar3, bar4, bar5, player, isGameOver, isStart, score, highestScore } = this.state
    const { navigation } = this.props
      return (
        <View style={styles.container}>
          <Text style={styles.score}>You Made: {score}</Text>
          {!isGameOver ? 
            (<View style={styles.gameArea}>

              <Image 
                source={require('../img/RapidRoll/wall.png')}
                style={{position: 'absolute', left: -20, height: MAX_HEIGHT, width: 20, zIndex: 2}}
              />
              <Image 
                source={require('../img/RapidRoll/wall.png')} 
                style={{position: 'absolute', right: -20, height: MAX_HEIGHT, width: 20, zIndex: 2}}
              />
              <Image 
                source={require('../img/RapidRoll/downRange.png')}
                style={{position: 'absolute', width: MAX_WIDTH, height: 10, bottom: 0}}
              />
              <Image 
                source={require('../img/RapidRoll/downRange.png')}
                source={require('../img/RapidRoll/upRange.png')}
                style={{position: 'absolute', width: MAX_WIDTH, height: 10, top: 0}}
              />
              
              <Bar width={BAR.width} height={BAR.height} bar={bar0} />
              <Bar width={BAR.width} height={BAR.height} bar={bar1} />
              <NotBar width={BAR.width} height={BAR.height} notBar={bar2} />
              <Bar width={BAR.width} height={BAR.height} bar={bar3} />
              <NotBar width={BAR.width} height={BAR.height} notBar={bar4} />
              <Bar width={BAR.width} height={BAR.height} bar={bar5} />
            
              <Player width={PLAYER.width} height={PLAYER.height} player={player}/>

              {!isStart && 
                <TouchableWithoutFeedback onPress={this.handleStart}>
                  <Image source={require('../img/RapidRoll/start.png')} style={styles.button}/>
                </TouchableWithoutFeedback>
              }
            </View>) :  
            (<View style={styles.gameArea}>
              <Image 
                source={require('../img/RapidRoll/wall.png')}
                style={{position: 'absolute', left: -20, height: MAX_HEIGHT+15, width: 20, zIndex: 2}}
              />
              <Image 
                source={require('../img/RapidRoll/wall.png')} 
                style={{position: 'absolute', right: -20, height: MAX_HEIGHT, width: 20, zIndex: 2}}
              />
              <Image 
                source={require('../img/RapidRoll/downRange.png')}
                style={{position: 'absolute', width: MAX_WIDTH, height: 10, bottom: 0}}
              />
              <Image 
                source={require('../img/RapidRoll/downRange.png')}
                source={require('../img/RapidRoll/upRange.png')}
                style={{position: 'absolute', width: MAX_WIDTH, height: 10, top: 0}}
              />

              <Animated.Text style={[ 
                styles.highestScore, 
                {transform: [{ translateY: this.animatedScore }] }
              ]}
              >HIGHEST SCORE: {highestScore}</Animated.Text>
              <Text style={{fontSize: 15, fontWeight: '400', fontFamily: 'Pixel'}}>Play again... ?</Text>
              <View style={{flexDirection: "row"}}>
                <Animated.Text style={[ styles.later, { opacity: this.fadeAnim } ]} onPress={() => navigation.goBack()}>LATER</Animated.Text>

                <Animated.Text style={[styles.again, {opacity: this.fadeAnim}]} onPress={this.initial}>AGAIN</Animated.Text>
              </View>
            </View>)
          }

          <View style={styles.handleBtn}>
            <TouchableWithoutFeedback  
              onPress={() => this.movePlayer('left')}
              onPressIn={() => this.handlePressIn('left')}
              onPressOut={this.handlePressOut}
            >
              <Image  style={styles.btnLeft} source={require('../img/RapidRoll/left.png')}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback  
              onPress={() => this.movePlayer('right')}
              onPressIn={() => this.handlePressIn('right')}
              onPressOut={this.handlePressOut}
            >
              <Image style={styles.btnRight} source={require('../img/RapidRoll/right.png')}/>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#718e70'
  },
  gameArea: {
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
    backgroundColor: '#718e70',
    position: 'relative',
    alignSelf: 'center',
    top: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 260,
    height: 90,
    zIndex: 2
  },
  score: {
    fontSize: 25,
    fontWeight: 'bold',
    top: '8%',
    alignSelf: 'center',
    fontFamily: 'Pixel'
  },
  handleBtn: {
    flexDirection: 'row', 
    flex: 1, 
    alignSelf: 'center',
    top: '25%'
  },
  btnLeft: {
    width: 150, 
    height: 90, 
    marginRight: 16
  },
  btnRight: {
    width: 150, 
    height: 90, 
    marginLeft: 16
  },
  highestScore: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Pixel'
  },
  later: {
    padding: 16, 
    margin: 12,
    alignSelf: 'center',
    backgroundColor: '#a20000',
    fontFamily: 'Pixel',
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1
  },
  again: {
    padding: 16, 
    margin: 12,
    alignSelf: 'center',
    backgroundColor: '#005000',
    borderWidth:1,
    fontFamily: 'Pixel'
  }
})