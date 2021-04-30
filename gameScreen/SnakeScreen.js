import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Snake from '../components/Snake/snake'
import Food from '../components/Snake/food'

const ScreenWidth = Dimensions.get('screen').width
const ScreenHeight = Dimensions.get('screen').height

const randomFood = () => {
  let max = 21, min = 1;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

export default function SnakeScreen(){
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [4, 0]
  ])
  const [direction, setDirection] = useState('RIGHT')
  const [food, setFood] = useState(randomFood())



  return (
    <>
      <View style={styles.gameArea}>
        <Snake snakeDots={snakeDots} />
        <Food dot={food} />
      </View>

      <View style={styles.controls}>

        <View style={styles.controlRow}>
          <TouchableOpacity >
            <View style={styles.control} />
          </TouchableOpacity>
        </View>

        <View style={styles.controlRow}>
          <TouchableOpacity >
            <View style={styles.control} />
          </TouchableOpacity>
          <View style={[styles.control, { backgroundColor: null}]} />
          <TouchableOpacity>
            <View style={styles.control} />
          </TouchableOpacity>
        </View>

        <View style={styles.controlRow}>
          <TouchableOpacity >
              <View style={styles.control} />
          </TouchableOpacity>
        </View>
      
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  gameArea: {
    position: 'relative',
    borderColor: "#000", 
    borderWidth: 8,
    width: ScreenWidth, 
    height: ScreenHeight-(ScreenHeight/2)
  },
  controls: {
    width: ScreenWidth,
    height: ScreenHeight/2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlRow: {
    height: 100,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  }
})