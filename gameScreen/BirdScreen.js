import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import Bird from "../components/Bird/bird";
import Obstacles from "../components/Bird/obstacles";
import { Audio } from 'expo-av';


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
  const [highestScore, setHighestScore] = useState(0);
  const [sound, setSound] = useState();

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
      // console.log('jumped')
    }
  };

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setScore((score) => score + 1);
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
      return () => {
        clearInterval(obstaclesTimerIdTwo);
      };
    } else {
      setScore((score) => score + 1);
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 300);
    }
  }, [obstaclesLeftTwo]);

  //check for collisions
  useEffect(() => {
    // console.log(obstaclesLeft)
    // console.log(screenWidth/2)
    // console.log(obstaclesLeft > screenWidth/2)
    if (score > highestScore) setHighestScore(score);
    if (
      ((birdBottom < obstaclesNegHeight + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeight + obstacleHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstaclesNegHeightTwo + obstacleHeight + 30 ||
        birdBottom > obstaclesNegHeightTwo + obstacleHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
    ) {
      // console.log('game over')
      gameOver();
    }
  });

  async function playSoundFly() {
    // console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/BirdSounds/Fly.mp3')
    )
    setSound(sound)

    // console.log('Playing Sound')
    await sound.playAsync()
  }

  useEffect(() => {
    return sound
      ? () => {
          // console.log('Unloading Sound');
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
    setStatus("LOSE");
  };

  const initializeGame = () => {
    setBirdBottom(screenHeight / 2);
    setObstaclesLeftTwo(screenWidth + screenWidth / 2 + 30);
    setObstaclesLeft(screenWidth);
    setStatus("PLAY");
    setScore(0);
  };

  if (status == "PLAY") {
    return (
      <TouchableWithoutFeedback onPress={() => {jump(), playSoundFly()}}>
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
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeight}
            gap={gap}
            obstaclesLeft={obstaclesLeft}
          />
          <Obstacles
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
          <Text style={styles.re}>Try again. . . ?</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={initializeGame} style={styles.button}>
            <Icon name="reload" size={25} color={"#796c47"} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  board: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  point: {
    padding: 16,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
  },
  highScore: {
    fontSize: 35,
    position: "relative",
    fontFamily: "Arial",
    shadowColor: "#000",
    shadowOffset: { width: -5, height: 3 },
    shadowOpacity: 0.5,
    color: "#675d41",
    fontWeight: "bold",
  },
  score: {
    fontSize: 25,
    fontFamily: "Arial",
    shadowColor: "#000",
    shadowOffset: { width: -5, height: 3 },
    color: "#796c47",
    shadowOpacity: 0.5,
    paddingVertical: 16,
  },
  re: {
    fontSize: 20,
    color: "#796c47",
  },
  button: {
    width: 125,
    height: 60,
    backgroundColor: "rgb(204,204,0)",
    shadowColor: "rgb(163,163,0)",
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
