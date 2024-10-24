//import { Graphics, Application } from 'pixi.js';
window.onload = async () => {
  //const { Graphics } = require('pixi.js');
  const graphics = new PIXI.Graphics();
  const app = new PIXI.Application();
  await app.init({ background: '#171717', width: 3840, height: 2160 });
  document.body.appendChild(app.canvas);
  // load the PNG asynchronously
  await PIXI.Assets.load('Media/sample.png');
  let sprite = PIXI.Sprite.from('Media/sample.png');

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
