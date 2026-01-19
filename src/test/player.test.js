import { player } from '../modules/player.js';

const PLAYER_H = new player();
const PLAYER_C = new player();

test('set-config', () => {
  PLAYER_C.setPlayerConfig(5, 30, 'COMPUTER');
  PLAYER_H.setPlayerConfig(5, 30, 'HUMAN');
  expect(PLAYER_C.playerType).toBe('COMPUTER');
  expect(PLAYER_H.playerType).toBe('HUMAN');
});

test('set-board', () => {
  PLAYER_C.setBoard(10);
  PLAYER_H.setBoard(10);
  expect(PLAYER_C.gameboard.size).toBe(10);
  expect(PLAYER_H.gameboard.size).toBe(10);
});

test('human-insert', () => {
  let array = [
    { x: 2, y: 3, type: 3, config: 1, id: 1 },
    { x: 3, y: 1, type: 2, config: 1, id: 2 },
    { x: 1, y: 1, type: 1, config: 0, id: 3 },
    { x: 9, y: 10, type: 0, config: 1, id: 4 },
    { x: 5, y: 5, type: 1, config: 0, id: 5 },
  ];
  PLAYER_H.humanPlayerInsertShip(array);
  expect(PLAYER_H.gameboard.ships.length).toBe(5);
  let check_3 = [
    PLAYER_H.gameboard.ships[3].startX,
    PLAYER_H.gameboard.ships[3].startY,
    PLAYER_H.gameboard.ships[3].length,
    PLAYER_H.gameboard.ships[3].afloat,
    PLAYER_H.gameboard.ships[3].endX,
  ];
  expect(check_3).toEqual([9, 10, 2, true, 10]);
  let check_4 = [
    PLAYER_H.gameboard.ships[4].startX,
    PLAYER_H.gameboard.ships[4].startY,
    PLAYER_H.gameboard.ships[4].length,
    PLAYER_H.gameboard.ships[4].afloat,
    PLAYER_H.gameboard.ships[4].endX,
  ];
  expect(check_4).toEqual([5, 5, 3, true, 5]);
});

test('human-logic', () => {
  expect(PLAYER_H.humanLogic(3, 4)).toEqual([3, 4, 1]);
  expect(PLAYER_H.humanLogic(5, 6)).toEqual([5, 6, 2]);
  expect(PLAYER_H.humanLogic(7, 8)).toEqual([7, 8, 3]);
});

test('computer-insert', () => {
  PLAYER_C.computerPlayerInsertShip();
  expect(PLAYER_C.gameboard.ships.length).toBe(5);
  expect(PLAYER_C.gameboard.ships[0].afloat).toBe(true);
  expect(PLAYER_C.gameboard.ships[1].afloat).toBe(true);
  expect(PLAYER_C.gameboard.ships[2].afloat).toBe(true);
  expect(PLAYER_C.gameboard.ships[3].afloat).toBe(true);
  expect(PLAYER_C.gameboard.ships[4].afloat).toBe(true);
});

test('computer-logic', () => {
  const move1 = PLAYER_C.computerLogic();
  expect(move1.length).toBe(3);
  expect(move1[0]).toBeGreaterThanOrEqual(1);
  expect(move1[0]).toBeLessThanOrEqual(10);
  expect(move1[1]).toBeGreaterThanOrEqual(1);
  expect(move1[1]).toBeLessThanOrEqual(10);
  expect(move1[2]).toBe(1);
  const move2 = PLAYER_C.computerLogic();
  expect(move2.length).toBe(3);
  expect(move2[0]).toBeGreaterThanOrEqual(1);
  expect(move2[0]).toBeLessThanOrEqual(10);
  expect(move2[1]).toBeGreaterThanOrEqual(1);
  expect(move2[1]).toBeLessThanOrEqual(10);
  expect(move2[2]).toBe(2);
});
