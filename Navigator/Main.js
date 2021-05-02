import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import  Container from './Container'
import TabScreen from '../gameScreen/TabScreen'
import  TicTacToeScreen from '../gameScreen/tictac'
import DinoScreen from '../gameScreen/DinoScreen'
import MineSweepScreen from '../gameScreen/MineSweepScreen'
import BallScreen from '../gameScreen/BallScreen'
import SnakeScreen from '../gameScreen/SnakeScreen'

const Stack = createStackNavigator()

export default function Main() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Board Game" component={Container}/>
                <Stack.Screen name="Tab The Black" component={TabScreen} />
                <Stack.Screen name="Mine Sweeper" component={MineSweepScreen} />
                <Stack.Screen name="Dino Game" component={DinoScreen} />
                <Stack.Screen name="Tic Tac Toe" component={TicTacToeScreen} />
                <Stack.Screen name="Ball Juggling" component={BallScreen} />
                <Stack.Screen name="Snake" component={SnakeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}