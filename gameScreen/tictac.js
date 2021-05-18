import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';

export default class TicTacToeScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      gameState:[
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
      player1: 0,
      player2: 0,
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState:[
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    })
  }
  initializeGame1 = () => {
    this.setState({
      gameState:[
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: -1
    });
  }

  getWinner = () => {
    var sum;
    var arr = this.state.gameState;
    const NUM_TILE = 3;

    //check rows
    for(let i = 0; i < NUM_TILE; i++) {
      sum = arr[i][0] + arr[i][1]+ arr[i][2];
      if(sum == 3) { return 1; }
      else if(sum == -3) { return -1; }
    }

    //check columns
    for(let j = 0; j < NUM_TILE; j++) {
      sum = arr[0][j] + arr[1][j] + arr[2][j];
      if(sum == 3) { return 1; }
      else if(sum == -3) { return -1; }
    }

    //check diagonal
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum == 3) { return 1; }
    else if(sum == -3) { return -1; }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if(sum == 3) { return 1; }
    else if(sum == -3) { return -1; }

    // no winner
    return 0;
  }

  onTilePress = (row, col) => {
    const { gameState, currentPlayer, player1, player2 } = this.state; 
    
    //dont allow tile to change
    var value = gameState[row][col];
    if(value != 0) { return; }

    //set current tile
    var arr = gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //switch player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({
      currentPlayer: nextPlayer
    });

    //check winner
    var winner = this.getWinner();
    if ( winner == 1) {
      this.setState({
        player1: player1 + 1
      })
      Alert.alert("Congratulation!!!!", "Player 1 is the winner",[{ text: "OK", onPress: () => this.initializeGame1() }])
    } else if ( winner == -1 ) {
      this.setState({
        player2: player2 + 1
      })
      Alert.alert("Congratulation", "Player 2 is the winner", [{ text: "OK", onPress: () => this.initializeGame() }])
    }
  }
  
  renderIcons = (row, col) => {
    const { gameState } = this.state;
    var value = gameState[row][col];
    switch(value){
      case 1: return <Icon name="close" style={styles.tileX}/>;
      case -1:return <Icon name="circle-outline" style={styles.tileO}/>
      default: return <View />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../img/Tictac/logo.png')} style={{width: 300, height: 60, top: '2%'}}/>

        <View style={styles.point}>
          <Text style={styles.player1}>Player 1</Text>
          <Text style={styles.score1}>{this.state.player1}</Text>
          <Text style={styles.score2}>{this.state.player2}</Text>
          <Text style={styles.player2}>Player 2</Text>
        </View>
        <View style={{ paddingTop: 30 }}/>

        <View style={{top: '7%'}}>
          <View  style={{ flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity onPress={() => this.onTilePress(0, 0)}  style={[styles.tile, { marginRight: 15, marginBottom: 15 }]}>
              {this.renderIcons(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { marginBottom: 15, marginRight: 15 }]}>
              {this.renderIcons(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { marginBottom: 15 }]}>
              {this.renderIcons(0, 2)}
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { marginRight: 15, marginBottom: 15 }]}>
              {this.renderIcons(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, { marginRight: 15, marginBottom: 15 }]}>
              {this.renderIcons(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { marginBottom: 15 }]}>
            {this.renderIcons(1, 2)}
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { marginRight: 15 }]}>
              {this.renderIcons(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { marginRight: 15 }]}>
              {this.renderIcons(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={styles.tile}>
              {this.renderIcons(2, 2)}
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.btn} onPress={() => this.initializeGame()}>
          <Text style={{fontSize:20, fontFamily: 'Arial', fontWeight: 'bold',color:'#a71829',}}>New Game</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#350006',
    alignItems: 'center',
  },
  tile: {
    backgroundColor: '#d2b414',
    width: 100,
    height: 100, 
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#a71829',
    shadowColor: '#f49c1e',
    shadowOffset: {width: -10, height: -10},
    shadowOpacity: 0.2
  },
  tileX: {
    color: "red",
    fontSize: 60,
  },
  tileO: {
    color: "green",
    fontSize: 60,
  },
  score1: {
    fontWeight: 'bold',
    color: 'red',
    paddingHorizontal: 10,
    fontSize: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
  },
  score2: {
    fontWeight: 'bold',
    color:'green',
    paddingHorizontal: 10,
    fontSize: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
  },
  player1: {
    fontWeight: 'bold',
    color: '#d20000',
    paddingHorizontal: 10,
    fontSize: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
  },
  player2: {
    fontWeight: 'bold',
    color:'#005f00',
    paddingHorizontal: 10,
    fontSize: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
  },
  point: {
    borderWidth: 2,
    borderColor: '#a71829',
    borderRadius: 20,
    fontSize: 10,
    width: 400,
    backgroundColor: "#d2b414",
    justifyContent:"center",
    padding: 16,
    shadowColor: '#f49c1e',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    flexDirection: 'row',
    top: '7%'
  },
  btn: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#a71829',
    width: 160, 
    height: 50,
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor:"#f0ce14",
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
    top: '12%'
  }
});