import { Member } from './member.js';

export class Cell {
  constructor(Member) {
    this.member = Member;
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
  }

  draw(canvasW, canvasH) {
    this.text = new PIXI.Text({
      text: this.member.getFullName(),
      style: this.style,
    });

    let cellTopLine = new PIXI.Graphics();
    this.cellContainer.addChild(cellTopLine);
    let cellBotLine = new PIXI.Graphics();
    this.cellContainer.addChild(cellBotLine);
    this.cellContainer.addChild(this.text);

    cellTopLine.moveTo(
      canvasW / 2 +
        getStringWidth(
          this.member.getFullName(),
          this.style.fontSize * 0.1 + 'px ' + this.style.fontFamily
        ),
      canvasH / 2 - 3
    );

    cellTopLine.lineTo(
      canvasW / 2 +
        getStringWidth(
          this.member.getFullName(),
          this.style.fontSize * 0.9 + 'px ' + this.style.fontFamily
        ),
      canvasH / 2 - 3
    );

    cellBotLine.moveTo(
      canvasW / 2 +
        getStringWidth(
          this.member.getFullName(),
          this.style.fontSize * 0.1 + 'px ' + this.style.fontFamily
        ),
      canvasH / 2 + this.style.fontSize + 7
    );

    cellBotLine.lineTo(
      canvasW / 2 +
        getStringWidth(
          this.member.getFullName(),
          this.style.fontSize * 0.9 + 'px ' + this.style.fontFamily
        ),
      canvasH / 2 + this.style.fontSize + 7
    );
    cellTopLine.stroke({ width: 1, color: 0xffffff });
    cellBotLine.stroke({ width: 1, color: 0xffffff });
    this.text.x = canvasW / 2;
    this.text.y = canvasH / 2;
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
