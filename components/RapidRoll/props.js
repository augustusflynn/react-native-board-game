import { Dimensions } from 'react-native' 

export const WIDTH = Dimensions.get('window').width 
export const HEIGHT = Dimensions.get('window').height 


export const MAX_WIDTH = WIDTH*0.8, MAX_HEIGHT = HEIGHT * 0.6 

export const BAR = {
  width: MAX_WIDTH/4,
  height: 15
}

export const PLAYER = {
  width: 30,
  height: 30
}