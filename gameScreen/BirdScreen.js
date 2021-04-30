import React, { useState, useEffect } from 'react'
import { View, Text,Dimensions, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Bird from '../components/Bird/bird'
import Obstacles from '../components/Bird/Obstacles'

export default function BirdScreen() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth/2
  const [obstaclesLeft,setObstacles] = useState(screenWidth)
  const [obstaclesLeftTwo,setObstaclesTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [birdBottom, setBirdBottom] = useState(screenHeight/2)
  const [isGameOver, setIsGameOver] = useState('Play')
  const [score, setScore] = useState(0)
  const [curScore, setCurScore] = useState(0)
  const [highestScore, setHighestScore] = useState(0)
  const obstaclesWidth = 60
  const obstaclesHeight = 300
  const gap = 200
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
  
  //start falling
  useEffect(() => {
      if(isGameOver == 'Start'){
          if(birdBottom > 0) {
          gameTimerId = setInterval(() =>{
              setBirdBottom(birdBottom => birdBottom - gravity)
            },30)
            
                return () => {
                    clearInterval(gameTimerId)
                }
            }
      }
    }, [birdBottom])
    
    //jumping.....
    const jump = () => {
        if(!isGameOver && (birdBottom < screenHeight)) {
            setBirdBottom(birdBottom => birdBottom + 50)
        }
    }
    
      //start first obstacles
    useEffect(() => {
        if(isGameOver == 'Start'){
            if(obstaclesLeft > -obstaclesWidth) {
            obstaclesLeftTimerId = setInterval(() => {
                    setObstacles(obstaclesLeft => obstaclesLeft - 5)
                },30)
                return () => {
                    clearInterval(obstaclesLeftTimerId)
                }
            } else {
                setObstacles(screenWidth + 30 )
                setObstaclesNegHeight(obstaclesNegHeight => obstaclesNegHeight - Math.random() * 100)
                setScore(score => score + 1)
            }
        }
    },[obstaclesLeft])
    
      //start second obstacles
    useEffect(() => {
        if(isGameOver == 'Start'){
            if(obstaclesLeftTwo > -obstaclesWidth) {
                obstaclesLeftTimerIdTwo = setInterval(() => {
                setObstaclesTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
                },30)
                
                return () => {
                clearInterval(obstaclesLeftTimerIdTwo)
                }
            } else {
                setObstaclesTwo(screenWidth + 30)
                setObstaclesNegHeightTwo(obstaclesNegHeightTwo => obstaclesNegHeightTwo = - Math.random() * 100)
                setScore(score => score + 1)
            }
        }
    },[obstaclesLeftTwo])
    
    
    
      //check for collisions
    useEffect(() => {
        if(isGameOver == "Start"){
            if (
                ((birdBottom < (obstaclesNegHeight + obstaclesHeight + 30 ) ||
                birdBottom > (obstaclesNegHeight + obstaclesHeight + gap -30 )) && 
                (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30) 
                )
                ||
                ((birdBottom < (obstaclesNegHeightTwo + obstaclesHeight + 30 ) ||
                birdBottom > (obstaclesNegHeightTwo + obstaclesHeight + gap -30 )) && 
                (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
                )
            )
            { 
                gameOver()
            }
            if(curScore > highestScore)
                setHighestScore(curScore)
        }
    })

        
  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
    setIsGameOver('Lose')
    setCurScore(score)
  }

  const tryAgain = () => {
    setObstaclesNegHeight(0)
    setObstaclesNegHeightTwo(0)
    setBirdBottom(screenHeight/2)
    setIsGameOver('Start')
    setScore(0)
  }

    if(isGameOver == 'Start') {
        return (
            <TouchableWithoutFeedback onPress={jump}>
                <View style={styles.container}>
                {isGameOver && <Text style={styles.score}>{score}</Text>}
                <Bird 
                    birdBottom={birdBottom}
                    birdLeft={birdLeft}
                />
                <Obstacles
                    color={'green'}
                    obstaclesWidth={obstaclesWidth}
                    obstaclesHeight={obstaclesHeight}
                    randomBottom={obstaclesNegHeight}
                    gap={gap}
                    obstaclesLeft={obstaclesLeft}
                />
                <Obstacles
                    color={'red'}
                    obstaclesWidth={obstaclesWidth}
                    obstaclesHeight={obstaclesHeight}
                    randomBottom={obstaclesNegHeightTwo}
                    gap={gap}
                    obstaclesLeft={obstaclesLeftTwo}
                />
                </View>
            </TouchableWithoutFeedback>
        )
    } else if(isGameOver =='Lose'){
        return(
            <View style={styles.container}>
                <Text>Highest Score: {highestScore}</Text>
                <Text>Score: {curScore}</Text>
                <TouchableOpacity onPress={() => tryAgain()}>
                    <Text>Try again....</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setIsGameOver('Start')}>
                    <Text>start</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontSize: 100,
    color: 'red',
    paddingBottom: 200,
  }
})