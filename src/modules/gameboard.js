import { ship } from './ship.js';

export function gameboard() {
  this.size = 10;
  this.getSize = (size) => {
    this.size = size;
    return this.size;
  };
  this.boardShip = [];
  this.targetShip = [];
  this.ships = [];
  this.missedCount = 0;
  this.initBoard = () => {
    for (let i = 0; i < this.size; i++) {
      this.boardShip[i] = [];
      for (let j = 0; j < this.size; j++) this.boardShip[i][j] = 0;
    }
    for (let i = 0; i < this.size; i++) {
      this.targetShip[i] = [];
      for (let j = 0; j < this.size; j++) this.targetShip[i][j] = 0;
    }
  };
  this.insertShip = (x, y, type, config, id) => {
    const SHIP = new ship();
    SHIP.init(x, y, config, type);
    let length = SHIP.length;
    let isClear = true;
    let inserted = false;
    if (config == 0) {
      if (
        x > 0 &&
        y > 0 &&
        length > 0 &&
        y + length - 1 <= this.size &&
        x <= this.size
      ) {
        for (let i = y; i <= y + length - 1; i++) {
          if (this.boardShip[x - 1][i - 1] > 0) {
            isClear = false;
            break;
          }
        }
        if (isClear) {
          for (let i = y; i <= y + length - 1; i++) {
            this.boardShip[x - 1][i - 1] = id;
          }
          inserted = true;
        }
      } else return false;
    } else if (config == 1) {
      if (
        x > 0 &&
        y > 0 &&
        length > 0 &&
        x + length - 1 <= this.size &&
        y <= this.size
      ) {
        for (let i = x; i <= x + length - 1; i++) {
          if (this.boardShip[i - 1][y - 1] > 0) {
            isClear = false;
            break;
          }
        }
        if (isClear) {
          for (let i = x; i <= x + length - 1; i++) {
            this.boardShip[i - 1][y - 1] = id;
          }
          inserted = true;
        }
      } else return false;
    }
    if (inserted) {
      this.ships.push(SHIP);
      return true;
    }
    return false;
  };
  this.updateBoard = (x, y) => {
    if (this.boardShip[x - 1][y - 1] > 0) {
      this.ships[this.boardShip[x - 1][y - 1] - 1].isHit(x, y);
      if (this.ships[this.boardShip[x - 1][y - 1] - 1].isSunk()) {
        console.log('Ship Sunk!');
        this.boardShip[x - 1][y - 1] = this.size * this.size + 1; // MARK AS HIT
        return 2;
      }
      this.boardShip[x - 1][y - 1] = this.size * this.size + 1; // MARK AS HIT
      return 1;
    } else {
      this.boardShip[x - 1][y - 1] = -1;
      this.missedCount++;
      return 0;
    }
  };

  this.hitEnemy = (x, y) => {
    if (this.targetShip[x - 1][y - 1] == 0) this.targetShip[x - 1][y - 1] = 1;
  };

  this.attackSuccess = (x, y) => {
    this.targetShip[x - 1][y - 1] = 2;
  };

  this.getDrown = () => {
    let drown = 0;
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk()) drown++;
    }
    return drown;
  };

  this.fleetDestroyed = () => {
    return this.getDrown() == this.ships.length;
  };
}
