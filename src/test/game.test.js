import { game } from '../modules/game.js';

const GAME = new game();

test('game-init', () => {
  GAME.gameInit(5, 30, 10, 'HUMAN', 'COMPUTER');
  expect(GAME.player1.playerType).toBe('HUMAN');
  expect(GAME.player2.playerType).toBe('COMPUTER');
  expect(GAME.player1.gameboard.ships.length).toBe(0);
  expect(GAME.player2.gameboard.ships.length).toBe(0);
  expect(GAME.gameover).toBe(false);
  expect(GAME.turn).toBe(0);
  expect(GAME.player1.missedCountMax).toBe(30);
  expect(GAME.player2.missedCountMax).toBe(30);
  expect(GAME.player1.numShips).toBe(5);
  expect(GAME.player2.numShips).toBe(5);
  expect(GAME.player1.gameboard.size).toBe(10);
  expect(GAME.player2.gameboard.size).toBe(10);
});

test('game-insert-ship', () => {
  let array_H = [
    { x: 2, y: 3, type: 3, config: 1, id: 1 },
    { x: 3, y: 1, type: 2, config: 1, id: 2 },
    { x: 1, y: 1, type: 1, config: 0, id: 3 },
    { x: 9, y: 10, type: 0, config: 1, id: 4 },
    { x: 5, y: 5, type: 1, config: 0, id: 5 },
  ];
  let array_C = [];
  GAME.playerInsertShip(1, array_H);
  expect(GAME.player1.gameboard.ships.length).toBe(5);
  expect(GAME.player1.gameboard.ships[0].afloat).toBe(true);
  expect(GAME.player1.gameboard.ships[1].afloat).toBe(true);
  expect(GAME.player1.gameboard.ships[2].afloat).toBe(true);
  expect(GAME.player1.gameboard.ships[3].afloat).toBe(true);
  expect(GAME.player1.gameboard.ships[4].afloat).toBe(true);
  expect(GAME.player1.gameboard.ships[0].startX).toBe(2);
  expect(GAME.player1.gameboard.ships[1].startX).toBe(3);
  expect(GAME.player1.gameboard.ships[2].startX).toBe(1);
  expect(GAME.player1.gameboard.ships[3].startX).toBe(9);
  expect(GAME.player1.gameboard.ships[1].length).toBe(4);
  expect(GAME.player1.gameboard.ships[4].length).toBe(3);
  expect(GAME.player1.gameboard.ships[3].endX).toBe(10);
  expect(GAME.player1.gameboard.ships[0].endX).toBe(6);
  expect(GAME.player1.gameboard.ships[1].endX).toBe(6);
  expect(GAME.player1.gameboard.ships[2].endX).toBe(1);
  expect(GAME.player1.gameboard.ships[4].endX).toBe(5);
  GAME.playerInsertShip(2, array_C);
  expect(GAME.player2.gameboard.ships.length).toBe(5);
  expect(GAME.player2.gameboard.ships[0].afloat).toBe(true);
  expect(GAME.player2.gameboard.ships[1].afloat).toBe(true);
  expect(GAME.player2.gameboard.ships[2].afloat).toBe(true);
  expect(GAME.player2.gameboard.ships[3].afloat).toBe(true);
  expect(GAME.player2.gameboard.ships[4].afloat).toBe(true);
});

test('game-move', () => {
  let val_1 = GAME.move([2, 3]);
  expect(val_1[0]).toEqual([2, 3, 1]);
  expect(GAME.turn).toBe(1);
  let val_2 = GAME.move([]);
  expect(val_2[0].length).toBe(3);
  expect(GAME.turn).toBe(0);
  let val_3 = GAME.move([3, 1]);
  expect(val_3[0]).toEqual([3, 1, 2]);
  expect(GAME.turn).toBe(1);
});
