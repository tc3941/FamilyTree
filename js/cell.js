import { Member } from './member.js';
//TODO: Make logic for max height and width, family tree logic (placement)

export class Cell {
  constructor(Member) {
    this.member = Member;
    this.name = this.member.getFullName();
    this.id = this.member.id;
    this.cellContainer = new PIXI.Container();
    this.style = new PIXI.TextStyle({
      fill: '#e0e0e0',
      fontFamily: 'Georgia',
      fontSize: 28,
      align: 'center',
    });
    this.text = new PIXI.Text({
      text: this.member.getFullName(),
      style: this.style,
    });
    this.x;
    this.y;
    this.positionSet = false;
    this.bloodRelated = false;
  }

  static TEXT_MAX_SIZE_X = 300;
  static TEXT_MAX_SIZE_Y = 35;
  static CANVAS;

  setCanvas(canvas) {
    this.CANVAS = canvas;
  }

  drawOG(canvasW = this.x, canvasH = this.y) {
    //canvasW = this.CANVAS.width; //x
    //canvasH = this.CANVAS.height; //y
    //console.log('x: ' + canvasW + ' y: ' + canvasH);
    this.text = new PIXI.Text({
      text: this.member.getFullName(),
      style: this.style,
    });

    //  console.log(this.text.width); //265 for my name suggested max size of 300
    let cellTopLine = new PIXI.Graphics();
    this.cellContainer.addChild(cellTopLine);
    let cellBotLine = new PIXI.Graphics();
    this.cellContainer.addChild(cellBotLine);
    //Potentionally temporary left and right line
    let cellLeftLine = new PIXI.Graphics();
    this.cellContainer.addChild(cellLeftLine);
    let cellRightLine = new PIXI.Graphics();
    this.cellContainer.addChild(cellRightLine);
    this.cellContainer.addChild(this.text);

    //console.log(this.text.height);

    cellTopLine.moveTo(canvasW + Cell.TEXT_MAX_SIZE_X * 0.1, canvasH - 3);
    cellLeftLine.moveTo(canvasW, canvasH + Cell.TEXT_MAX_SIZE_Y * 0.1);
    cellRightLine.moveTo(
      canvasW + Cell.TEXT_MAX_SIZE_X,
      canvasH + Cell.TEXT_MAX_SIZE_Y * 0.1
    );

    cellTopLine.lineTo(canvasW + Cell.TEXT_MAX_SIZE_X * 0.9, canvasH - 3);
    cellLeftLine.lineTo(canvasW, canvasH + Cell.TEXT_MAX_SIZE_Y * 0.9);
    cellRightLine.lineTo(
      canvasW + Cell.TEXT_MAX_SIZE_X,
      canvasH + Cell.TEXT_MAX_SIZE_Y * 0.9
    );

    cellBotLine.moveTo(
      canvasW + Cell.TEXT_MAX_SIZE_X * 0.1,
      canvasH + Cell.TEXT_MAX_SIZE_Y
    );

    cellBotLine.lineTo(
      canvasW + Cell.TEXT_MAX_SIZE_X * 0.9,
      canvasH + Cell.TEXT_MAX_SIZE_Y
    );
    cellTopLine.stroke({ width: 1, color: 0xffffff });
    cellBotLine.stroke({ width: 1, color: 0xffffff });
    cellLeftLine.stroke({ width: 1, color: 0xffffff });
    cellRightLine.stroke({ width: 1, color: 0xffffff });

    //move text to center
    this.text.x = canvasW + Cell.TEXT_MAX_SIZE_X / 2 - this.text.width / 2;
    this.text.y = canvasH;

    // console.log('container: ');
    // console.log(this.cellContainer);
  }

  draw(canvasW, canvasH) {
    this.x = canvasW; // Assign proper X position
    this.y = canvasH; // Assign proper Y position

    let padding = 50; // Space between cells

    let cellTopLine = new PIXI.Graphics();
    let cellBotLine = new PIXI.Graphics();
    let cellLeftLine = new PIXI.Graphics();
    let cellRightLine = new PIXI.Graphics();

    this.cellContainer.addChild(
      cellTopLine,
      cellBotLine,
      cellLeftLine,
      cellRightLine,
      this.text
    );

    // Adjust box position
    let boxX = this.x; // + padding;
    let boxY = this.y; // + padding;

    cellTopLine.moveTo(boxX, boxY);
    cellTopLine.lineTo(boxX + Cell.TEXT_MAX_SIZE_X, boxY);

    cellLeftLine.moveTo(boxX, boxY);
    cellLeftLine.lineTo(boxX, boxY + Cell.TEXT_MAX_SIZE_Y);

    cellRightLine.moveTo(boxX + Cell.TEXT_MAX_SIZE_X, boxY);
    cellRightLine.lineTo(
      boxX + Cell.TEXT_MAX_SIZE_X,
      boxY + Cell.TEXT_MAX_SIZE_Y
    );

    cellBotLine.moveTo(boxX, boxY + Cell.TEXT_MAX_SIZE_Y);
    cellBotLine.lineTo(
      boxX + Cell.TEXT_MAX_SIZE_X,
      boxY + Cell.TEXT_MAX_SIZE_Y
    );

    // Move text to center of the box
    this.text.x = boxX + Cell.TEXT_MAX_SIZE_X / 2 - this.text.width / 2;
    this.text.y = boxY + 5;
  }

  getName() {
    this.member.getFullName();
  }
}

function getStringWidth(input, font) {
  // Create a hidden span element
  const span = document.createElement('span');
  span.style.font = font; // Set the font if needed
  span.style.visibility = 'hidden';
  span.textContent = input;

  // Append the span to the document body
  document.body.appendChild(span);

  // Get the width of the span
  const width = span.offsetWidth;

  // Remove the span from the document body
  document.body.removeChild(span);

  return width;
}
