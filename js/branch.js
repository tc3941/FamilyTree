import { Graphics } from 'pixi.js';

const graphics = new PIXI.Graphics();

class Branch {
  constructor(CellA, CellB) {
    this.cellA = CellA;
    this.cellB = CellB;
  }

  lines = [];
  drawConnection() {}
}
