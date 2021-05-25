import Gameboard from '../Gameboard';
import Ship from '../Ship';

test('can place vertical ships on it', () => {
  const board = new Gameboard(10);
  expect(board.placeShip(0, 0, 5, true)).toBeTruthy();
  expect(board.tilesArray[0][0].ship).toBeInstanceOf(Ship);
});

test('registers hits', () => {
  const board = new Gameboard(10);
  board.placeShip(0, 0, 9, false);
  expect(board.receiveAttack(0, 0)).toBeTruthy();
  expect(board.isHit(0, 0)).toBeTruthy();
});

test("Can sink a ship by hitting all of it's coords", () => {
  const board = new Gameboard(10);
  board.placeShip(0, 0, 3, false);

  expect(board.getShip(0, 0).isSunk()).toBeFalsy();
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  board.receiveAttack(2, 0);
  expect(board.getShip(0, 0).isSunk()).toBeTruthy();
});

test('Can return the number of unsunk ships left', () => {
  const board = new Gameboard(10);
  board.placeShip(0, 0, 3, false);
  board.placeShip(0, 3, 2, false);
  board.placeShip(0, 4, 4, false);
  board.placeShip(0, 5, 2, false);
  board.placeShip(0, 9, 7, false);
  board.receiveAttack(0, 3);
  board.receiveAttack(1, 3);
  expect(board.unsunkShipsLeft()).toBe(4);
});
