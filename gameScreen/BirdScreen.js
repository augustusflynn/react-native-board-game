import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Bird from '../components/Bird/bird'
import Obstacles from '../components/Bird/obstacles'

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const birdWidth = 50
  const birdHeight = 60
  const [birdBottom, setBirdBottom]= useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft]= useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo]= useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight]= useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]= useState(0)
  const [score, setScore]= useState(0)
  const [highestScore, setHighestScore] = useState(0)

  const [status, setStatus] = useState("PLAY")
  const gravity = 3
  let obstacleWidth = 60
  let obstacleHeight = 300
  let gap = 200
  let gameTimerId
  let obstaclesTimerId
  let obstaclesTimerIdTwo
  
//start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      },30)
  
      return () => {
        clearInterval(gameTimerId)
      }
    }
    
  }, [birdBottom])
  // console.log(birdBottom)

  const jump = () => {
    if (birdBottom < screenHeight) {
      setBirdBottom(birdBottom => birdBottom + 50)
      // console.log('jumped')
    }
  }

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setScore(score => score +1)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 100)
    }
  }, [obstaclesLeft])

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
        return () => {
          clearInterval(obstaclesTimerIdTwo)
        }
      } else {
          setScore(score => score +1)
          setObstaclesLeftTwo(screenWidth)
          setObstaclesNegHeightTwo( - Math.random() * 100)
        }
  }, [obstaclesLeftTwo])

    //check for collisions
    useEffect(() => {
      // console.log(obstaclesLeft)
      // console.log(screenWidth/2)
      // console.log(obstaclesLeft > screenWidth/2)
      if(score > highestScore)
        setHighestScore(score)
      if (
        ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
        (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
        )
        || 
        ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
        (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
        )
        ) 
        {
        // console.log('game over')
        gameOver()
      }
    })

    const gameOver = () => {
      clearInterval(gameTimerId)
      clearInterval(obstaclesTimerId)
      clearInterval(obstaclesTimerIdTwo)
      setStatus("LOSE")
    }

    const initializeGame = () => {
      setBirdBottom(screenHeight / 2)
      setObstaclesLeftTwo(screenWidth + screenWidth/2 + 30)
      setObstaclesLeft(screenWidth)
      setStatus("PLAY")
      setScore(0)
    }
  
  if(status == "PLAY") {
    return (
      <TouchableWithoutFeedback onPress={jump}>
        <View style={styles.container}>
          <Bird 
            birdBottom = {birdBottom} 
            birdLeft = {birdLeft}
            birdWidth = {birdWidth}
            birdHeight = {birdHeight}
          />
          <Obstacles 
            color={'green'}
            obstacleWidth = {obstacleWidth}
            obstacleHeight = {obstacleHeight}
            randomBottom = {obstaclesNegHeight}
            gap = {gap}
            obstaclesLeft = {obstaclesLeft}
          />
          <Obstacles 
            color={'yellow'}
            obstacleWidth = {obstacleWidth}
            obstacleHeight = {obstacleHeight}
            randomBottom = {obstaclesNegHeightTwo}
            gap = {gap}
            obstaclesLeft = {obstaclesLeftTwo}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
  else {
    return ( 
      <View style={styles.board}>
        <Text>Highest Score: {highestScore}</Text>
        <Text>Your Score: {score}</Text>
        <TouchableOpacity style={styles.button} onPress={initializeGame}>
          <Text>Try again...</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  board: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    width: 100,
    height: 100
  }
})