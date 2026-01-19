import { player } from './player.js';
import { gameboard } from './gameboard.js';

export function game() {
  this.gameover = false;
  this.turn = 0; // 0 - PLAYER1 | 1 - PLAYER2
  this.player1 = new player();
  this.player2 = new player();
  this.gameInit = (
    numShips,
    missedCountMax,
    boardSize,
    playerType1,
    playerType2,
  ) => {
    this.player1.setPlayerConfig(numShips, missedCountMax, playerType1);
    this.player2.setPlayerConfig(numShips, missedCountMax, playerType2);
    this.player1.setBoard(boardSize);
    this.player2.setBoard(boardSize);
  };

  this.playerInsertShip = (player, shipArray) => {
    if (player === 1 && this.player1.playerType === 'HUMAN') {
      this.player1.humanPlayerInsertShip(shipArray);
    } else if (player === 2 && this.player2.playerType === 'HUMAN') {
      this.player2.humanPlayerInsertShip(shipArray);
    } else if (player === 1 && this.player1.playerType === 'COMPUTER') {
      this.player1.computerPlayerInsertShip();
    } else if (player === 2 && this.player2.playerType === 'COMPUTER') {
      this.player2.computerPlayerInsertShip();
    } else return;
  };

  this.gameEnd = () => {
    if (
      this.player1.gameboard.fleetDestroyed() ||
      this.player2.gameboard.fleetDestroyed()
    )
      return (this.gameover = true);
    else return (this.gameover = false);
  };

  this.whoWon = () => {
    if (
      this.player1.gameboard.fleetDestroyed() &&
      !this.player2.gameboard.fleetDestroyed()
    )
      return 'PLAYER 2 WINS!';
    else if (
      this.player2.gameboard.fleetDestroyed() &&
      !this.player1.gameboard.fleetDestroyed()
    )
      return 'PLAYER 1 WINS!';
    else if (
      this.player1.gameboard.fleetDestroyed() &&
      this.player2.gameboard.fleetDestroyed()
    )
      return 'TIE!';
    else return 'NO WINNER YET!';
  };

  this.move = (loc) => {
    if (this.turn == 0) {
      const move = this.player1.playerMove(loc);
      const ret = this.player2.trackOwnFleet(move[0], move[1]);
      this.player1.updateKnowledge(move[0], move[1], ret);
      this.turn = 1;
      return [move, ret];
    } else {
      const move = this.player2.playerMove(loc);
      const ret = this.player1.trackOwnFleet(move[0], move[1]);
      this.player2.updateKnowledge(move[0], move[1], ret);
      this.turn = 0;
      return [move, ret];
    }
  };
}
