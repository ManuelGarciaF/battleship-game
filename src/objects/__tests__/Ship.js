/* eslint-disable no-undef */
import Ship from '../Ship';

test('Creates a ship of the right length', () => {
  const ship = new Ship(5);
  expect(ship.length).toBe(5);
});

test('Can get hit', () => {
  const ship = new Ship(5);
  ship.hit(2);
  expect(ship.hitPlaces[2]).toBe(true);
});

test('Can get completely sunk', () => {
  const ship = new Ship(5);

  expect(ship.isSunk()).toBe(false);

  for (let i = 0; i < 5; i += 1) {
    ship.hit(i);
  }

  expect(ship.isSunk()).toBe(true);
});
