import { ship } from '../modules/ship.js';

const Ship = new ship();

test('make_ship', () => {
  Ship.init(1, 1, 1, 2);
  expect(Ship.length).toBe(4);
  expect(Ship.startX).toBe(1);
  expect(Ship.startY).toBe(1);
});

test('length_getter', () => {
  expect(Ship.getLength(3)).toBe(5);
  expect(Ship.getLength(2)).toBe(4);
  expect(Ship.getLength(1)).toBe(3);
  expect(Ship.getLength(0)).toBe(2);
});

test('is_hit', () => {
  expect(Ship.isHit(1, 2)).toBe(false);
  expect(Ship.isHit(2, 1)).toBe(true);
  expect(Ship.isHit(3, 1)).toBe(true);
  expect(Ship.isHit(4, 1)).toBe(true);
  expect(Ship.afloat).toBe(false);
});
