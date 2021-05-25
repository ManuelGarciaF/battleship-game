export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitPlaces = [];
    for (let i = 0; i < length; i += 1) {
      this.hitPlaces.push(false);
    }
  }

  hit(index) {
    this.hitPlaces[index] = true;
  }

  // Look for not hit parts, if there are any, return false
  isSunk() {
    return !this.hitPlaces.some((value) => value === false);
  }
}
