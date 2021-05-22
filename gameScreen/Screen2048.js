import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Screen2048 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      score: 0,
      highestScore: 0,
      gameLose: false
    }
    this.getScore()
    this.addNumber()
    this.addNumber()
  }

  addNumber = () => {
    const { grid } = this.state
    let option = grid
    let row, col
    do {
      row = Math.floor( Math.random()*4)
      col = Math.floor( Math.random()*4)
    } while(option[row][col] != 0)

    const titleVal = Math.random() < 0.5 ? 2 : 4
    option[row][col] = titleVal

    this.setState({
      grid: option
    })

    this.checkLose()
  }

  checkWin = (num) => {
    if(num == 2048) {
      Alert.alert('Amazing!!!', 'Congratulation, You won!!', [
        {
          text: 'Continue'
        },
        {
          text: 'New Game',
          onPress: this.reset
        }
      ])
    }
  }

  checkLose = () => {
    const { grid } = this.state
    for(let i = 0; i < 4; i++){
      for(let j=0;j<4;j++) {
        if(i!=0 && grid[i-1][j] == grid[i][j])  return
        if(j!=0 && grid[i][j-1] == grid[i][j])  return

        if(i!=0 && grid[j][i-1] == grid[j][i])  return
        if(j!=0 && grid[j-1][i] == grid[j][i])  return

        if(grid[i][j] == 0)  return
      }
    }
    this.setState({ gameLose: true })
  }

  countScore = (num) => {
    const { score, highestScore } = this.state
    let newScore = score + num
    this.setState({ score: newScore })
    if(newScore > highestScore) {
      this.setState({ highestScore: newScore})
    }
    this.storageScore()
  }

  moveLeft = (gestureState) => {
    const { grid } = this.state
    let option = grid
    let move
    for(let i=0;i<4;i++) {
      let mergedTitle = [0,0,0,0]
      for(let j=1;j<4;j++) {
        if(option[i][j] == 0) continue

        for(let k = j; k > 0; k--) {
          if(option[i][k-1] == 0) {
            option[i][k-1] = option[i][k]
            option[i][k] = 0
            move = true
          }
          else if (option[i][k-1] == option[i][k] && mergedTitle[k-1] == 0) {
            option[i][k-1] = option[i][k-1] + option[i][k]
            option[i][k] = 0
            mergedTitle[k-1] = 1
            this.countScore(option[i][k-1])
            this.checkWin(option[i][k-1])
            move = true
            break
          }
        }
      }
    }
    if(move) {
      this.addNumber()
    }
    this.setState({ grid: option })
  }

  moveRight = (gestureState) => {
    const { grid } = this.state
    let option = grid
    let move = false
    for(let i=0;i<4;i++) {
      let mergedTitle = [0,0,0,0]
      for(let j=3;j>=0;j--) {
        if(option[i][j] == 0) continue

        for(let k = j; k < 4; k++) {
          if(option[i][k+1] == 0) {
            option[i][k+1] = option[i][k]
            option[i][k] = 0
            move = true
          }
          else if (option[i][k+1] == option[i][k] && mergedTitle[k+1] == 0) {
            option[i][k+1] = option[i][k+1] + option[i][k]
            option[i][k] = 0
            mergedTitle[k+1] = 1
            this.countScore(option[i][k+1])
            this.checkWin(option[i][k+1])
            move = true
            break
          }
        }
      }
    }
    if(move) {
      this.addNumber()
    }
    this.setState({ grid: option })
  }

  moveUp = (gestureState) => {
    const { grid } = this.state
    let option = grid
    let move
    for(let i=0;i<4;i++) {
      let mergedTitle = [0,0,0,0]
      for(let j=1;j<4;j++) {
        if(option[j][i] == 0) continue

        for(let k = j; k > 0; k--) {
          if(option[k-1][i] == 0) {
            option[k-1][i] = option[k][i]
            option[k][i] = 0
            move = true
          }
          else if (option[k-1][i] == option[k][i] && mergedTitle[k-1] == 0) {
            option[k-1][i] = option[k-1][i] + option[k][i]
            option[k][i] = 0
            mergedTitle[k-1] = 1
            this.countScore(option[k-1][i])
            this.checkWin(option[k-1][i])
            move = true
            break
          }
        }
      }
    }

    if(move) {
      this.addNumber()
    }
    this.setState({ grid: option })
  }

  moveDown = (gestureState) => {
    const { grid } = this.state
    let option = grid
    let move
    for(let i=0;i<4;i++) {
      let mergedTitle = [0,0,0,0]
      for(let j=3;j>=0;j--) {
        if(option[j][i] == 0) continue

        for(let k = j; k < 3; k++) {
          if(option[k+1][i] == 0) {
            option[k+1][i] = option[k][i]
            option[k][i] = 0
            move = true
          }
          else if (option[k+1][i] == option[k][i] && mergedTitle[k+1] == 0) {
            option[k+1][i] = option[k+1][i] + option[k][i]
            option[k][i] = 0
            mergedTitle[k+1] = 1
            this.countScore(option[k+1][i])
            this.checkWin(option[k+1][i])
            move = true
            break
          }
        }
      }
    }

    if(move) {
      this.addNumber()
    }
    this.setState({ grid: option })
  }

  getStyles = (titleVal) => {
    switch(titleVal) {
      case 2:
        return styles.title2
      case 4:
        return styles.title4
      case 8:
        return styles.title8
      case 16:
        return styles.title16
      case 32:
        return styles.title32
      case 64:
        return styles.title64
      case 128:
        return styles.title128
      case 256:
        return styles.title256
      case 512:
        return styles.title512
      case 1024:
        return styles.title1024
      case 2048:
        return styles.title2048
    }
    if(titleVal > 2048) return styles.defau
  }

  getTextColor = (titleVal) => {
    switch(titleVal) {
      case 2:
        return styles.num2
      case 4:
        return styles.num4
      case 8:
        return styles.num8
      case 16:
        return styles.num16
      case 32:
        return styles.num32
      case 64:
        return styles.num64
      case 128:
        return styles.num128
      case 256:
        return styles.num256
      case 512:
        return styles.num512
      case 1024:
        return styles.num1024
      case 2048:
        return styles.num2048
    }
    if(titleVal > 2048) return styles.greater2048
  }

  getFontSize(titleVal) {
    if(titleVal > 1000) return 25
    else return 32
  }

  reset = () => {
    this.setState({
      grid: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      score: 0,
      gameLose: false
    }, () => {
      this.addNumber()
      this.addNumber()
    })
  }

  storageScore = async () => {
    try {
      await AsyncStorage.setItem('highestScore2048', JSON.stringify(this.state.highestScore))
    } catch(e) {
      console.log(e)
    }
  }
  
  getScore = async () => {
    try {
      const value = await AsyncStorage.getItem('highestScore2048')
      if( value != null) {
        this.setState({ highestScore: JSON.parse(value) })
      }
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const { grid, score, highestScore, gameLose } = this.state
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <GestureRecognizer
        onSwipeUp={(state) => this.moveUp(state)}
        onSwipeDown={(state) => this.moveDown(state)}
        onSwipeLeft={(state) => this.moveLeft(state)}
        onSwipeRight={(state) => this.moveRight(state)}
        config={config}
        style={[styles.screen, !gameLose ? null : {opacity: 0.5}]}
      >
        <View style={styles.containTop}>
          <Text style={styles.logo}>2048</Text>
          <View style={{flexDirection: 'row', top: 5}}>
            <View style={styles.score}>
              <Text style={styles.scoreTitle} >SCORE</Text>
              <Text style={styles.scoreText} >{score}</Text>
            </View>
            <View style={styles.best}>
              <Text style={styles.scoreTitle}>BEST</Text>
              <Text style={styles.scoreText}>{highestScore}</Text>
            </View>
          </View>
        </View>

        <View style={styles.containSecond}>
          <Text style={styles.text}>Join the tiles, get to <Text style={{fontWeight:'bold', color: '#776e65'}}>2048!</Text></Text>
          <TouchableOpacity style={styles.btn} onPress={this.reset}>
            <Text style={{fontWeight: 'bold', color: '#f9f6f2'}}>New Game</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.gameArea}>
          {
            grid.map((row, i) => {
              return (
                <View style={styles.row} key={i}>
                  {row.map((titleVal, i2) => {
                    return (
                      <View style={[styles.title, this.getStyles(titleVal)]} key={i2}>
                        {titleVal != 0 && <Text style={[this.getTextColor(titleVal), { fontSize: this.getFontSize(titleVal) ,fontWeight: 'bold'}]}>{titleVal}</Text>}
                      </View> 
                    )
                })}
                </View>
              )
            })
          }
        </View>

        {gameLose && (
          <TouchableOpacity activeOpacity={1} style={styles.btnLose} onPress={this.reset}> 
            <Text style={{fontSize: 32, paddingBottom: 8, fontWeight: "bold"}}>GAME OVER!</Text>
              <Text style={{fontSize: 18, paddingBottom: 8, fontWeight: '700'}}>Your Score is: {score}</Text>
              <Text style={{fontSize: 12, fontWeight: '500', color: '#000'}}>Press anywhere to restart game</Text>
          </TouchableOpacity>
        )}

      </GestureRecognizer>
    )
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const boardWidth = SCREEN_WIDTH*0.8
const styles = StyleSheet.create({
    screen: {
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
      backgroundColor: '#ddd'
    },
    gameArea: {
      width: boardWidth,
      height: boardWidth,
      alignSelf: 'center',
      position: 'absolute',
      bottom: 150,
      backgroundColor: '#bcaca3',
      alignItems: 'center',
      justifyContent: 'center'
    },
    containTop: {
      flexDirection: 'row',
      position: 'absolute',
      top: '5%',
      width: SCREEN_WIDTH
    },
    containSecond: {
      flexDirection: 'row',
      position: 'absolute',
      top: "15%"
    },
    row: {
      flexDirection: 'row',
      height: '24%',
    },
    title: {
      width: '24%',
      borderColor: '#bcaca3',
      backgroundColor: '#cdc1b5',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 6
    },
    titleLast: {
      width: '24%',
      borderColor: '#bcaca3',
      backgroundColor: '#cdc1b5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title2: {
      backgroundColor: '#eee4db'
    },
    title4: {
      backgroundColor: '#efe0cd'
    },
    title8: {
      backgroundColor: '#f0b17b'
    },
    title16: {
      backgroundColor: '#f69465'
    },
    title32: {
      backgroundColor: '#f37c65'
    },
    title64: {
      backgroundColor: '#f5603b'
    },
    title128: {
      backgroundColor: '#ebcc6c'
    },
    title256: {
      backgroundColor: '#f1cb5a'
    },
    title512: {
      backgroundColor: '#e4ba4d'
    },
    title1024: {
      backgroundColor: '#f0c239'
    },
    title2048: {
      backgroundColor: '#e2b331'
    },
    defau: {
      backgroundColor: '#fa423b'
    },
    num2: {
      color: '#786f66'
    },
    num4: {
      color: '#726960'
    },
    num8: {
      color: '#f9f9f6'
    },
    num16: {
      color: '#f9f9f6'
    },
    num32: {
      color: '#f9f5f2'
    },
    num64: {
      color: '#f9efea'
    },
    num128: {
      color: '#f9f8f8'
    },
    num256: {
      color: '#fafaff'
    },
    num512: {
      color: '#f5e9cd'
    },
    num1024: {
      color: '#f3e6bb'
    },
    num2048: {
      color: '#fafcff'
    },
    greater2048: {
      color: "#fff"
    },
    logo: {
      left: 8,
      fontSize: 60, 
      flex: 2,
      color: '#776e65', 
      fontWeight: 'bold'
    },
    score: {
      flexDirection: 'column', 
      backgroundColor: '#bbad9e', 
      width: 90, 
      height: 45, 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 5
    },
    best: {
      flexDirection: 'column', 
      backgroundColor: '#bbad9e', 
      width: 90, 
      height: 45, 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 5, 
      marginHorizontal: 8
    },
    scoreTitle: {
      fontSize: 10,
      fontWeight: 'bold', 
      color: '#e5dace'
    },
    scoreText: {
      fontSize: 16, 
      color: '#fff', 
      fontWeight: 'bold'
    },
    text: {
      fontSize: 15, 
      fontWeight: '500', 
      color: '#a47665', 
      flex: 1,
      top: 8,
      left: 8
    },
    btn: {
      backgroundColor: '#8f7a66', 
      width: 100,
      height: 35, 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: 5,
      right: 8
    },
    btnLose: {
      zIndex: 2,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute'
    }
  })
  