import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import Enemy from '../components/DontLetHimDie/Enemy';
import Player from '../components/DontLetHimDie/player';

const MAX_WIDTH = Dimensions.get('screen').width;
const MAX_HEIGHT = Dimensions.get('screen').height;

const randomE = () => {
  return Math.floor(Math.random() * 2)
};

export default function App() {
  const playerBottom = 100;
  const [playerPos, setPlayerPos] = useState(40);
  const playerHeight = 100;
  const playerWidth = 100;

  const gap = 400
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  const enemyLeft = [60, MAX_WIDTH-120]
  const [enemyStartLeft, setEnemyStartLeft] = useState(enemyLeft[randomE()])
  const [enemyTwoStartLeft, setEnemyTwoStartLeft] = useState(enemyLeft[randomE()])
  const [enemyStartPos, setEnemyStartPos] = useState(-MAX_HEIGHT);
  const [enemyTwoStartPos, setEnemyTwoStartPos] = useState(-(MAX_HEIGHT+gap));
  const [enemySpeed, setEnemySpeed] = useState(9999);

  const [start, setStart] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false);
  let enemyTimer;
  let enemyTwoTimer;

  //reduce speed
  useEffect(() => {
    switch(score){
      case 5: 
        setEnemySpeed(400)
        break
      case 10:
        setEnemySpeed(100)
        break;
      case 15:
        setEnemySpeed(50)
        break
      case 18:
        setEnemySpeed(30)
        break
      default: 
        break
    }
  });

  //start enemy
  useEffect(() => {
    if (enemyStartPos < 200) {
      enemyTimer = setInterval(() => {
        setEnemyStartPos((prev) => prev + 50);
      }, enemySpeed);

      return () => {
        clearInterval(enemyTimer);
      };
    } else {
      let r = randomE()
      setEnemyStartLeft(enemyLeft[r])
      setEnemyStartPos(-MAX_HEIGHT);
      setScore(score + 1);
    }
  }, [enemyStartPos]);

  //start enemy two
  useEffect(() => {
    if (enemyTwoStartPos < 200) {
      enemyTwoTimer = setInterval(() => {
        setEnemyTwoStartPos((prev) => prev + 50);
        console.log(enemyStartPos)
      }, enemySpeed);

      return () => {
        clearInterval(enemyTwoTimer);
      };
    } else {
      let r = randomE()
      setEnemyTwoStartLeft(enemyLeft[r])
      setEnemyTwoStartPos(-(MAX_HEIGHT));
      setScore(score + 1);
    }
  }, [enemyTwoStartPos]);

  const movePlayer = (direction) => {
    if (direction == 'left') {
      setPlayerPos(40);
    } else if (direction == 'right') {
      setPlayerPos(MAX_WIDTH - 140);
    }
  };

  // check collision
  useEffect(() => {
    if(
      //enemy 1 on the left
      (enemyStartPos > -60 && enemyStartPos < 60 && enemyStartLeft-20 == playerPos) ||
      //enemy 2 on the left
      (enemyTwoStartPos > -60 && enemyTwoStartPos < 60 && enemyTwoStartLeft-20 == playerPos) ||
      //enemy 1 on the right
      (enemyStartPos > -60 && enemyStartPos < 60 && enemyStartLeft+20==playerPos) ||
      //enemy 2 on the right
      (enemyTwoStartPos > -60 && enemyTwoStartPos < 60 && enemyTwoStartLeft+20==playerPos)
    ){
      gameOver()
    }
  })

  const gameOver = () => {
    // console.log("game over")
    setEnemySpeed(99999)
    clearInterval(enemyTwoTimer);
    clearInterval(enemyTimer);
    setIsGameOver(true);
    if(score > highestScore)  setHighestScore(score)
  }

  const initiallizeGame = () => {
    setEnemySpeed(800)
    setIsGameOver(false)
    setStart(true)
    setPlayerPos(40)
    setScore(0)
    setEnemyStartPos(-MAX_HEIGHT)
    setEnemyTwoStartPos(-MAX_HEIGHT - gap)
  }

  if(!isGameOver) {
    return (
      <ImageBackground source={require('../img/DontLetHimDie/bg.png')} style={[styles.container, !start ? {opacity: 0.7} : null]}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 80 }}>
          <View style={styles.point}>
            <Text style={styles.score}>{score}</Text>
          </View>
        </View>

        <Player
          playerPos={playerPos}
          playerBottom={playerBottom}
          playerWidth={playerWidth}
          playerHeight={playerHeight}
        />

        <Enemy
          enemyStartPos={enemyStartPos}
          enemyStartLeft={enemyStartLeft}
          img={require('../img/DontLetHimDie/enemy1.png')}
        />

        <Enemy
          enemyStartPos={enemyTwoStartPos}
          enemyStartLeft={enemyTwoStartLeft}
          img={require('../img/DontLetHimDie/enemy2.png')}
        />

        <View style={{left: 35, bottom: 300}}>
          {!start && <Text 
            style={{fontSize: 40, fontWeight: 'bold',color: '#fff'}}
            onPress={initiallizeGame}
          >TAB THIS TO PLAY</Text>}
        </View>

        <View style={styles.controls}>
          <Text style={styles.left} onPress={() => movePlayer('left')}>{'<'}</Text>
          <Text style={styles.right} onPress={() => movePlayer('right')}>{'>'}</Text>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground source={require('../img/DontLetHimDie/bg.png')} style={styles.loseScreen}>
        <ImageBackground source={require('../img/DontLetHimDie/board.png')} style={styles.scoreBoard}>
          <Text style={styles.highestScore}>Highest Score: {highestScore}</Text>
          <Text style={styles.curScore}>Your Score: {score}</Text>
          <Animated.View>
            <TouchableOpacity style={styles.button} onPress={initiallizeGame}>
              <Icon name="reload" size={40} color={'#283653'}/>
            </TouchableOpacity>
          </Animated.View>
        </ImageBackground>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    position: 'relative',
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    color: '#fff',
    fontSize: 60,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  right: {
    flex: 1,
    color: '#fff',
    margin: 0,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  point: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  loseScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  scoreBoard: {
    width: 400,
    height: 400,
    alignItems: 'center',
  },
  highestScore: {
    color: '#eee',
    fontSize: 35,
    fontWeight: 'bold',
    paddingVertical: 54,
  },
  curScore: {
    color: '#000',
    fontSize: 30,
    fontWeight: '500',
  },
  button: {
    bottom: -135,
    backgroundColor: '#ddd',
    width: 120,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#23304c',
    borderWidth: 2,
  },
});
