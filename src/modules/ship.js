export function ship() {
  this.length;
  this.startX;
  this.endX;
  this.startY;
  this.endY;
  this.afloat; // IS AFLOAT
  this.hits;
  this.isFlat; // Horizontal SHIP
  this.getLength = (type) => {
    if (type == 0) this.length = 2;
    else if (type == 1) this.length = 3;
    else if (type == 2) this.length = 4;
    else if (type == 3) this.length = 5;
    return this.length;
  };
  this.init = (x, y, config, type) => {
    this.length = this.getLength(type);
    this.startX = x;
    this.startY = y;
    this.afloat = true;
    this.hits = 0;
    if (config == 1) {
      this.endX = x + this.length - 1;
      this.endY = this.startY;
      this.isFlat = false;
    } else if (config == 0) {
      this.endX = x;
      this.endY = this.startY + this.length - 1;
      this.isFlat = true;
    }
  };
  this.isHit = (x, y) => {
    if (
      this.startX <= x &&
      this.endX >= x &&
      this.startY <= y &&
      this.endY >= y
    ) {
      this.hits++;
      if (this.hits == this.length) this.afloat = false; // SHIP HAS SUNK
      return true;
    }
    return false;
  };
  this.isSunk = () => {
    return !this.afloat;
  };
}
