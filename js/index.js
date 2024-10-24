import { Application, Sprite, Assets } from 'pixi.js';

const app = new Application();

await app.init();

document.body.appendChild(app.canvas);

const texture = await Assets.load('bunny.png');

// This creates a texture from a 'bunny.png' image
const bunny = new Sprite(texture);

// Setup the position of the bunny
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;

// Rotate around the center
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// Add the bunny to the scene we are building
app.stage.addChild(bunny);

// Listen for frame updates
app.ticker.add(() => {
  // each frame we spin the bunny around a bit
  bunny.rotation += 0.01;
});
