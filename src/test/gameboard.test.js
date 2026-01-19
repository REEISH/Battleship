import e from 'express';
import { gameboard } from '../modules/gameboard.js';

const BOARD = new gameboard();

test('init-board', () => {
  BOARD.initBoard();
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) expect(BOARD.boardShip[i][j]).toBe(0);
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) expect(BOARD.targetShip[i][j]).toBe(0);
});

test('insert-ship', () => {
  //   BOARD.insertShip(2, 3, 3, 1, 1);
  //   BOARD.insertShip(3, 1, 2, 0, 2);
  //   BOARD.insertShip(3, 1, 2, 1, 2);
  expect(BOARD.insertShip(2, 3, 3, 1, 1)).toBe(true);
  expect(BOARD.insertShip(3, 1, 2, 0, 2)).toBe(false);
  expect(BOARD.insertShip(3, 1, 2, 1, 2)).toBe(true);
  expect(BOARD.insertShip(1, 1, 1, 0, 3)).toBe(true);
  expect(BOARD.insertShip(10, 10, 0, 1, 4)).toBe(false);
  expect(BOARD.insertShip(9, 10, 0, 1, 4)).toBe(true);
  expect(BOARD.insertShip(5, 5, 1, 0, 5)).toBe(true);
  // expect(BOARD.insertShip(8, 6, 1, 0, 1)).toBe(true);
  // expect(BOARD.insertShip(10, 6, 0, 0, 2)).toBe(true);
  // expect(BOARD.insertShip(6, 6, 3, 1, 3)).toBe(true);
  // expect(BOARD.insertShip(6, 7, 2, 1, 4)).toBe(true);
  // expect(BOARD.insertShip(6, 9, 1, 1, 5)).toBe(true);
  //   for (let i = 0; i < 10; i++)
  //     for (let j = 0; j < 10; j++) console.log(i, j, BOARD.boardShip[i][j]);
});

test('update-board', () => {
  //   for (let i = 0; i < 10; i++)
  //     for (let j = 0; j < 10; j++) console.log(i, j, BOARD.boardShip[i][j]);
  expect(BOARD.updateBoard(2, 3)).toBe(1);
  expect(BOARD.updateBoard(3, 3)).toBe(1);
  expect(BOARD.updateBoard(4, 3)).toBe(1);
  expect(BOARD.updateBoard(5, 3)).toBe(1);
  expect(BOARD.updateBoard(7, 3)).toBe(0);
  expect(BOARD.updateBoard(8, 9)).toBe(0);
  expect(BOARD.updateBoard(6, 3)).toBe(2);
  expect(BOARD.updateBoard(1, 1)).toBe(1);
  expect(BOARD.getDrown()).toBe(1);
  expect(BOARD.updateBoard(2, 1)).toBe(0);
  expect(BOARD.updateBoard(1, 2)).toBe(1);
  expect(BOARD.updateBoard(1, 3)).toBe(2);
  expect(BOARD.getDrown()).toBe(2);
  expect(BOARD.fleetDestroyed()).toBe(false);
});

test('hit-enemy', () => {
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) {
      BOARD.hitEnemy(i + 1, j + 1);
      expect(BOARD.targetShip[i][j]).toBe(1);
    }
});
