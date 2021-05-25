import Ship from './Ship';

export default class Gameboard {
  constructor(size) {
    // Create 2d array of tiles
    this.shipsArray = [];
    this.tilesArray = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        hit: false,
        ship: null,
        shipIndex: null,
      }))
    );
  }

  placeShip(x, y, shipLength, vertical) {
    if (vertical) {
      return this._placeVerticalShip(x, y, shipLength);
    }
    return this._placeHorizontalShip(x, y, shipLength);
  }

  _placeVerticalShip(x, y, shipLength) {
    if (!this._checkVerticalTiles(x, y, shipLength)) {
      return false;
    }
    const ship = new Ship(shipLength);
    for (let i = 0; i < shipLength; i += 1) {
      this.tilesArray[y + i][x].ship = ship;
      this.tilesArray[y + i][x].shipIndex = i;
    }
    this.shipsArray.push(ship);
    return true;
  }

  _placeHorizontalShip(x, y, shipLength) {
    if (!this._checkHorizontalTiles(x, y, shipLength)) {
      return false;
    }
    const ship = new Ship(shipLength);
    for (let i = 0; i < shipLength; i += 1) {
      this.tilesArray[y][x + i].ship = ship;
      this.tilesArray[y][x + i].shipIndex = i;
    }
    this.shipsArray.push(ship);
    return true;
  }

  // Returns true if it's a valid position for a Ship.
  _checkVerticalTiles(x, startingY, length) {
    for (let i = 0; i < length; i += 1) {
      if (!this.isTileEmpty(x, startingY + i)) return false;
    }
    return true;
  }

  // Returns true if it's a valid position for a Ship.
  _checkHorizontalTiles(startingX, y, length) {
    for (let i = 0; i < length; i += 1) {
      if (!this.isTileEmpty(startingX + 1, y)) return false;
    }
    return true;
  }

  // Returns true if the hit was successful, returns false if the coordinates
  // were already attacked.
  receiveAttack(x, y) {
    if (this.isHit(x, y)) return false;

    this.tilesArray[y][x].hit = true;

    if (!this.isTileEmpty(x, y)) {
      this.tilesArray[y][x].ship.hit(this.tilesArray[y][x].shipIndex);
    }
    return true;
  }

  isTileEmpty(x, y) {
    return this.tilesArray[y][x].ship === null;
  }

  isHit(x, y) {
    return this.tilesArray[y][x].hit;
  }

  getShip(x, y) {
    return this.tilesArray[y][x].ship;
  }

  unsunkShipsLeft() {
    return this.shipsArray.reduce(
      (count, ship) => (ship.isSunk() ? count : count + 1),
      0
    );
  }
}
