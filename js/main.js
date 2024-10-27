import { Cell } from './cell.js';
import { Member } from './member.js';

window.onload = async () => {
  //const { Graphics } = require('pixi.js');
  const graphics = new PIXI.Graphics();
  const app = new PIXI.Application();
  await app.init({ background: '#171717', width: 3840, height: 2160 });
  document.body.appendChild(app.canvas);
  // load the PNG asynchronously
  await PIXI.Assets.load('Media/sample.png');
  let sprite = PIXI.Sprite.from('Media/sample.png');

  // const style = new PIXI.TextStyle({
  //   fill: '#e0e0e0',
  //   fontFamily: 'Georgia',
  //   fontSize: 28,
  //   align: 'center',
  // });
  // let self = new Member({
  //   firstName: 'Theodore',
  //   lastName: 'Conyers Jr',
  //   age: 28,
  // });
  let self;
  let rootFamilyMember;

  const verticalGap = Cell.TEXT_MAX_SIZE_Y * 1.5;
  const horizontalGap = Cell.TEXT_MAX_SIZE_X * 0.333;
  //console.log(self);
  //const cellContainer = new PIXI.Container();

  //Start with the first one then find the parent based on the child's id
  //print Start > print their children in the 'next generation' > then print their children etc. until u cant then do the next and continue

  fetch('family.json')
    .then((response) => response.json())
    .then((familyData) => {
      const familyMembers = familyData.family.map(
        (memberData) => new Member(memberData)
      );
      //console.log(familyMembers);

      self = familyMembers[0];
      rootFamilyMember = new Cell(self);

      rootFamilyMember.setCanvas(app.canvas);
      rootFamilyMember.draw(app.canvas.width, app.canvas.height);

      let newMember;
      let currentX = app.canvas.width;
      let currentY = app.canvas.height;
      //set parents
      for (let i = 0; i <= familyMembers.length - 1; i++) {
        if (familyMembers[i].children.length != 0) {
          for (let j = 0; j <= familyMembers[i].children.length - 1; j++) {
            //for every child
            let child = familyMembers[i].children[j]; //set child
            //console.log(familyMembers.find((person) => person.id === child.id));
            if (child.id != null) {
              //if child has an id
              let trueSelf = familyMembers.find(
                (person) => person.id === child.id //the the person with the id
              );
              if (trueSelf != null) {
                console.log(parent);
                trueSelf.parentA == -1
                  ? (trueSelf.parentA = familyMembers[i].id)
                  : (trueSelf.parentB = familyMembers[i].id);
              } else {
                child.parentA == -1
                  ? (child.parentA = familyMembers[i].id)
                  : (child.parentB = familyMembers[i].id);
              }
            }
          }
          //newMember.setCanvas(app.canvas);
          //newMember.draw;
        }
      }

      console.log(familyMembers);
      app.stage.addChild(rootFamilyMember.cellContainer);
    })
    .catch((error) => console.error('Error loading family data:', error));

  //const text = new PIXI.Text({ text: rootFamilyMember.getName(), style });
  /*
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
  }*/
  /*
  let cellTopLine = new PIXI.Graphics();
  cellTopLine.moveTo(
    app.canvas.width / 2 +
      getStringWidth(
        'Theodore Conyers Jr',
        style.fontSize * 0.1 + 'px ' + style.fontFamily
      ),
    app.canvas.height / 2 + style.fontSize + 2
  );
  cellTopLine.lineTo(
    app.canvas.width / 2 +
      getStringWidth(
        'Theodore Conyers Jr',
        style.fontSize * 0.9 + 'px ' + style.fontFamily
      ),
    app.canvas.height / 2 + style.fontSize + 2
  );
  cellTopLine.stroke({ width: 1, color: 0xffffff });

  cellContainer.addChild(cellTopLine);*/
  //text.x = app.canvas.width / 2;
  //text.y = app.canvas.height / 2;

  let borderTop = new PIXI.Graphics();
  let borderBottom = new PIXI.Graphics();
  let borderLeft = new PIXI.Graphics();
  let borderRight = new PIXI.Graphics();

  app.stage.addChild(borderTop);
  app.stage.addChild(borderBottom);
  app.stage.addChild(borderLeft);
  app.stage.addChild(borderRight);

  //borderTop.lineStyle(20, 0xffffff, 1); // Line thickness: 5px, color: white, alpha: 1
  const BORDER_MARGIN = {
    x: app.screen.height / 100,
    y: app.screen.height / 100,
  };
  // Draw a line at the top of the screen
  borderTop.moveTo(BORDER_MARGIN.x, BORDER_MARGIN.y); // Start from the top-left corner
  borderTop.lineTo(app.screen.width - BORDER_MARGIN.x, BORDER_MARGIN.y); // Draw to the top-right corner
  borderTop.stroke({ width: 1, color: 0xffffff });

  borderBottom.moveTo(
    app.screen.width - BORDER_MARGIN.x,
    app.screen.height - BORDER_MARGIN.y
  ); // Start from the top-left corner
  borderBottom.lineTo(BORDER_MARGIN.x, app.screen.height - BORDER_MARGIN.y); // Draw to the top-right corner
  borderBottom.stroke({ width: 1, color: 0xffffff });

  borderLeft.moveTo(BORDER_MARGIN.x, BORDER_MARGIN.y); // Start from the top-left corner
  borderLeft.lineTo(BORDER_MARGIN.x, app.screen.height - BORDER_MARGIN.y); // Draw to the top-right corner
  borderLeft.stroke({ width: 1, color: 0xffffff });

  borderRight.moveTo(app.screen.width - BORDER_MARGIN.x, BORDER_MARGIN.y); // Start from the top-left corner
  borderRight.lineTo(
    app.screen.width - BORDER_MARGIN.x,
    app.screen.height - BORDER_MARGIN.y
  ); // Draw to the top-right corner
  borderRight.stroke({ width: 1, color: 0xffffff });

  // Add the borderTop to the stage
  app.stage.addChild(sprite);

  // Add a variable to count up the seconds our demo has been running
  let elapsed = 0.0;
  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  app.ticker.add((ticker) => {
    // Add the time to our total elapsed time
    elapsed += ticker.deltaTime;
    // Update the sprite's X position based on the cosine of our elapsed time.  We divide
    // by 50 to slow the animation down a bit...
    sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
  });

  const scrollUpArrow = document.getElementById('top');
  const scrollDownArrow = document.getElementById('bottom');
  const scrollLeftArrow = document.getElementById('left');
  const scrollRightArrow = document.getElementById('right');

  scrollUpArrow.addEventListener('click', function () {
    window.scrollBy({
      top: -window.innerHeight / 10, // Scroll up by one viewport height
      behavior: 'smooth', // Smooth scrolling
    });
  });
  scrollDownArrow.addEventListener('click', function () {
    window.scrollBy({
      top: window.innerHeight / 10, // Scroll up by one viewport height
      behavior: 'smooth', // Smooth scrolling
    });
  });
  scrollLeftArrow.addEventListener('click', function () {
    window.scrollBy({
      left: -window.innerWidth / 10, // Scroll up by one viewport height
      behavior: 'smooth', // Smooth scrolling
    });
  });
  scrollRightArrow.addEventListener('click', function () {
    window.scrollBy({
      left: window.innerWidth / 10, // Scroll up by one viewport height
      behavior: 'smooth', // Smooth scrolling
    });
  });

  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  const scrollableContent = document.querySelector('.scrollable-content');

  scrollableContent.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    scrollLeft = window.scrollX;
    scrollTop = window.scrollY;
    scrollableContent.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    scrollableContent.style.cursor = 'default';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const xDiff = e.clientX - startX;
    const yDiff = e.clientY - startY;

    window.scrollTo(scrollLeft - xDiff, scrollTop - yDiff);
  });
};
