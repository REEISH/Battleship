import { gameboard } from './gameboard.js';

export function player() {
  this.numShips = 5;
  this.missedCountMax = 30;
  this.playerType; // HUMAN | COMPUTER
  this.gameboard = new gameboard();
  this.moveCount = 0;
  this.previousMoves = [];
  this.wasHit = false;
  this.setPlayerConfig = (numShips, missedCountMax, playerType) => {
    this.numShips = numShips;
    this.missedCountMax = missedCountMax;
    this.playerType = playerType;
  };
  this.setBoard = (size) => {
    this.gameboard.size = this.gameboard.getSize(size);
    this.gameboard.initBoard();
  };

  this.humanPlayerInsertShip = (array) => {
    for (let i = 0; i < array.length; i++) {
      this.gameboard.insertShip(
        array[i].x,
        array[i].y,
        array[i].type,
        array[i].config,
        i + 1,
      );
    }
  };

  this.humanLogic = (x, y) => {
    return [x, y, ++this.moveCount];
  };

  this.getLoc = (quadNum, config, random) => {
    if (config == 0) {
      if (quadNum == 0) return [random, 1];
      else if (quadNum == 1) return [random, 6];
      else if (quadNum == 2) return [random + 5, 6];
      else return [random + 5, 1];
    }
    if (config == 1) {
      if (quadNum == 0) return [1, random];
      else if (quadNum == 1) return [1, random + 5];
      else if (quadNum == 2) return [6, random + 5];
      else return [6, random];
    }
  };

  this.insertQuadrant = (quadNum, type, config, random, id) => {
    let loc = this.getLoc(quadNum, config, random);
    // console.log(loc);
    this.gameboard.insertShip(loc[0], loc[1], type, config, id);
  };

  this.computerPlayerInsertShip = () => {
    let random = 5;
    while (random == 5) random = Math.floor(Math.random() * 5 + 1);
    let firstSet = [random, (2 * random) % 5];
    let secondSet = [];
    for (let i = 0; i < 5; i++)
      if (i != random && i != (2 * random) % 5) secondSet.push(i);
    let quadFirst = Math.floor(Math.random() * 4);
    let quadSecond = Math.floor(Math.random() * 4);
    if (quadFirst == quadSecond) quadFirst = (quadFirst + 1) % 4;
    let configFirst = Math.random() > 0.5 ? 1 : 0;
    let configSecond = Math.random() > 0.5 ? 1 : 0;
    // console.log(random);
    // console.log(firstSet, configFirst, quadFirst);
    // console.log(secondSet, configSecond, quadSecond);
    let type = [3, 2, 1, 1, 0];
    this.insertQuadrant(quadFirst, type[random], configFirst, random + 1, 1);
    this.insertQuadrant(
      quadFirst,
      type[(2 * random) % 5],
      configFirst,
      ((2 * random) % 5) + 1,
      2,
    );
    for (let i = 0; i < 3; i++) {
      this.insertQuadrant(
        quadSecond,
        type[secondSet[i]],
        configSecond,
        secondSet[i] + 1,
        3 + i,
      );
    }
  };

  this.activePoints = [];

  this.computerLogic = () => {
    if (this.activePoints.length > 0) {
      while (this.activePoints.length > 0) {
        let basePoint = this.activePoints[0];
        let potentialMoves = [
          [basePoint[0] + 1, basePoint[1]],
          [basePoint[0] - 1, basePoint[1]],
          [basePoint[0], basePoint[1] + 1],
          [basePoint[0], basePoint[1] - 1],
        ];
        for (let move of potentialMoves) {
          if (
            move[0] >= 1 &&
            move[0] <= this.gameboard.size &&
            move[1] >= 1 &&
            move[1] <= this.gameboard.size &&
            this.gameboard.targetShip[move[0] - 1][move[1] - 1] == 0
          ) {
            return [move[0], move[1], ++this.moveCount];
          }
        }
        this.activePoints = this.activePoints.shift();
      }
      // If no adjacent moves are valid, clear active points
      this.activePoints = [];
    }
    if (this.activePoints.length == 0) {
      let randX = Math.floor(Math.random() * this.gameboard.size) + 1;
      let randY = Math.floor(Math.random() * this.gameboard.size) + 1;
      while (this.gameboard.targetShip[randX - 1][randY - 1] != 0) {
        randX = Math.floor(Math.random() * this.gameboard.size) + 1;
        randY = Math.floor(Math.random() * this.gameboard.size) + 1;
      }
      return [randX, randY, ++this.moveCount];
    }
  };

  this.playerMove = (loc) => {
    let move;
    if (this.playerType === 'COMPUTER') {
      move = this.computerLogic();
    } else {
      // Implement human move logic here
      move = this.humanLogic(loc[0], loc[1]);
    }
    this.previousMoves.push(move);
    this.gameboard.hitEnemy(move[0], move[1]);
    return move;
  };

  this.updateKnowledge = (x, y, result) => {
    if (result > 0) {
      this.gameboard.attackSuccess(x, y);
      this.activePoints.push([x, y]);
      this.wasHit = true;
      if (result == 2) {
        this.wasHit = false;
        this.activePoints = [];
      }
    } else {
      this.wasHit = false;
    }
  };

  this.trackOwnFleet = (x, y) => {
    return this.gameboard.updateBoard(x, y);
  };
}
