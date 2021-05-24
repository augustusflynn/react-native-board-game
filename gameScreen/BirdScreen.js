import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import Bird from "../components/Bird/bird";
import Obstacles from "../components/Bird/obstacles";
import { Audio } from 'expo-av';

var axios = require('axios')
var databaseUrl = 'https://storage-7f406-default-rtdb.asia-southeast1.firebasedatabase.app/user/userId/highScore.json'


export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const birdWidth = 75;
  const birdHeight = 55;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(
    -Math.random() * 300
  );
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(
    -Math.random() * 300
  );
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0)

  const [status, setStatus] = useState("PLAY");
  const gravity = 5;
  let obstacleWidth = 60;
  let obstacleHeight = 500;
  let gap = 200;
  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

  //start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }

  }, [birdBottom]);
  // console.log(birdBottom)

  const jump = () => {
    if (birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 25);
      playSoundFly()
      // console.log('jumped')
    }
  };

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      if(obstaclesLeft > (screenWidth/2 - 35) && obstaclesLeft < (screenWidth/2) - 30){
        setScore((score) => score + 1);
        playSoundPing();
      }
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 300);
    }
  }, [obstaclesLeft]);

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      if(obstaclesLeftTwo > (screenWidth/2 - 35) && obstaclesLeftTwo < (screenWidth/2) - 30){
        setScore((score) => score + 1);
        playSoundPing();
      }
      return () => {
        clearInterval(obstaclesTimerIdTwo);
      };
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 300);
    }
  }, [obstaclesLeftTwo]);

  //check for collisions
  useEffect(() => {
    // console.log(obstaclesLeft)
    // console.log(screenWidth/2)
    // console.log(obstaclesLeft > screenWidth/2)
    if (
      ((birdBottom < obstaclesNegHeight + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeight + obstacleHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstaclesNegHeightTwo + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeightTwo + obstacleHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
      || birdBottom < 0 || birdBottom + 1.5*birdHeight > screenHeight
    ) {
      // console.log('game over')
      gameOver()
      playSoundDead()
    }
  });
  
  //fly sound
  async function playSoundFly() {
    // console.log('Loading SoundFly')
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/BirdSounds/Fly.mp3')
    )

    // console.log('Playing SoundFly')
    await sound.playAsync()
  }
  
  //dead sound
  async function playSoundDead() {
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/BirdSounds/Dead.mp3')
    )

    await sound.playAsync()
  }

  //ping sound
  async function playSoundPing() {
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/BirdSounds/Ping.mp3')
    )

    await sound.playAsync()
  }


  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
    setStatus("LOSE");
    if (score > highestScore) {
      setHighestScore(score)
    }
    postScore()
  };

  const initializeGame = () => {
    setBirdBottom(screenHeight / 2);
    setObstaclesLeftTwo(screenWidth + screenWidth / 2 + 30);
    setObstaclesLeft(screenWidth);
    setStatus("PLAY");
    setScore(0);
  };

  const postScore = () => {
    fetch(databaseUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scoreBird: highestScore
      })
    })
  }

  useEffect(() => {
    axios.get(databaseUrl)
    .then((res) => {
      setHighestScore(res.data.scoreBird)
    })
  }, [])

  if (status == "PLAY") {
    return (
      <TouchableWithoutFeedback onPress={jump}>
        <ImageBackground
          source={require("../img/Bird/bg.png")}
          style={styles.container}
        >
          <Bird
            birdBottom={birdBottom}
            birdLeft={birdLeft}
            birdWidth={birdWidth}
            birdHeight={birdHeight}
          />
          <Obstacles
            jump={jump}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeight}
            gap={gap}
            obstaclesLeft={obstaclesLeft}
          />
          <Obstacles
            jump={jump}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeightTwo}
            gap={gap}
            obstaclesLeft={obstaclesLeftTwo}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <ImageBackground
        source={require("../img/Bird/board.png")}
        style={styles.board}
      >
        <View style={styles.point}>
          <Text style={styles.highScore}>Highest Score: {highestScore}</Text>
          <Text style={styles.score}>Your Score: {score}</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={initializeGame} style={styles.button}>
            <Icon name="reload" size={25} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  board: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  point: {
    justifyContent: "center",
    alignItems: "center",
  },
  highScore: {
    fontSize: 35,
    position: "relative",
    fontWeight: "bold",
    fontFamily: "FlappyBird",
    color: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 1
  },
  score: {
    fontSize: 25,
    paddingVertical: 16,
    fontFamily: "FlappyBird",
    color: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 1
  },
  button: {
    width: 125,
    height: 60,
    backgroundColor: "rgb(204,204,0)",
    shadowColor: "rgb(163,163,0)",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
