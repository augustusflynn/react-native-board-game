import React from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import  TicTacToeScreen from './gameScreen/tictac'
import TabScreen from './gameScreen/TabScreen'
import DinoScreen from './gameScreen/DinoScreen'
import MineSweepScreen from './gameScreen/MineSweepScreen'
import BallScreen from './gameScreen/BallScreen'
import SnakeScreen from './gameScreen/SnakeScreen' 
import Main from './Navigator/Main'

export default function App() {
  return (
    <Main />
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#bdbdbd",
    justifyContent: 'center',
    alignItems: 'center',
  }
})

