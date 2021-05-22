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
import BirdScreen from '../gameScreen/BirdScreen'
import DontLetHimDie from '../gameScreen/DontLetHimDie'
import PingPongScreen from '../gameScreen/PingPongScreen'
import RapidRollScreen from '../gameScreen/RapidRoll'
import Screen2048 from '../gameScreen/Screen2048'
import ComingSoon from '../gameScreen/ComingSoon'

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
                <Stack.Screen name="Flappy Bird" component={BirdScreen} />
                <Stack.Screen name="Don't Let Him Die" component={DontLetHimDie} />
                <Stack.Screen name="Ping Pong" component={PingPongScreen} />
                <Stack.Screen name="Rapid Roll" component={RapidRollScreen}/>
                <Stack.Screen name="2048" component={Screen2048}/>
                <Stack.Screen name="Coming Soon" component={ComingSoon}/>
            </Stack.Navigator>
        </NavigationContainer>
    )

}