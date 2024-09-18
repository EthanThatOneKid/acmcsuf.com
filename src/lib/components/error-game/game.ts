import { Capy } from './js/capy.js';
import { InputHandler } from './js/input.js';
import { Background } from './js/background.js';
import { GroundMob, FlyingMob, Hedgehog, Wizard } from './js/mobs.js';
import { UI } from './js/UI.js';
import { loadImages, images, isMobileDevice } from './js/shared.js';

let lastTime = 0;

export async function setup(canvas: HTMLCanvasElement, button: HTMLButtonElement) {
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('2d context not supported');
  }

  canvas.width = 1000;
  canvas.height = 550;

  // Load images before setting up the game
  loadImages();

  // Wait until all images are loaded
  await new Promise((resolve) => {
    const checkImagesLoaded = setInterval(() => {
      if (Object.keys(images).length === 13) { // Adjust this number based on the number of images in `imageArr`
        clearInterval(checkImagesLoaded);
        resolve();
      }
    }, 100);
  });

  const game = new Game(canvas.width, canvas.height, ctx);
  game.setupButtonClick = game.setupButtonClick.bind(game);

  window.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      if (game.gameOver) {
        game.restart();
      } else {
        game.togglePause();
      }
    }
  });

  canvas.addEventListener('click', () => {
    game.togglePause();
  });

  button.addEventListener('click', game.setupButtonClick);

  game.draw();
}

// All logic will go through class Game
class Game {
  gameOver: boolean;
  isFirstPause: boolean;
  animationId: null | number;
  isPaused: boolean;
  width: number;
  height: number;
  groundMargin: number;
  speed: number;
  maxSpeed: number;
  maxParticles: number;
  background: Background;
  capy: Capy;
  input: InputHandler;
  UI: UI;
  mobs: (GroundMob | FlyingMob | Hedgehog | Wizard)[];
  particles: any[];
  collisions: any[];
  floatingText: any[];
  mobTimer: number;
  mobInterval: number;
  debug: boolean;
  health: number;
  energy: number;
  energyInc: number;
  energyDec: boolean;
  score: number;
  highscore: number;
  hedgehogScore: number;
  beeScore: number;
  fontColor: string;
  hudHeight: number;
  ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.isFirstPause = true;
    this.animationId = null;
    this.isPaused = true;
    this.width = width;
    this.height = height;
    this.groundMargin = 30;
    this.speed = 0;
    this.maxSpeed = 3;
    this.maxParticles = 50;
    this.background = new Background(this);
    this.capy = new Capy(this);
    this.input = new InputHandler(this);
    this.UI = new UI(this);
    this.mobs = [];
    this.particles = [];
    this.collisions = [];
    this.floatingText = [];
    this.mobTimer = 0;
    this.mobInterval = 1000;
    this.debug = false;
    this.gameOver = false;
    this.health = 6;
    this.energy = 6;
    this.energyInc = 1200;
    this.energyDec = false;
    this.score = 0;
    this.highscore = getHighscore();
    this.hedgehogScore = 0;
    this.beeScore = 0;
    this.fontColor = 'black';
    this.hudHeight = 50;
    this.capy.currentState = this.capy.states[0]; // points to index within this.states
    this.capy.currentState.enter(); // activate initial default state
    this.ctx = ctx;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (!this.isPaused && this.isFirstPause) {
      this.isFirstPause = false;
    }

    if (this.isPaused) {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      this.draw();
    } else {
      this.animate(0);
    }
  }

  // Run forever animation frame
  update(delta: number) {
    this.energyDec = false;
    if (this.isPaused) return;
    if (this.health === 0) this.gameOver = true;
    if (this.gameOver) {
      this.displayHighScore();
    }
    this.background.update();
    this.capy.update(this.input.keys, delta);

    // Handle Mobs
    if (this.mobTimer > this.mobInterval) {
      this.addMob();
      this.mobTimer = 0;
    } else {
      this.mobTimer += delta;
    }

    // Handle Mobs
    this.mobs.forEach((mob) => {
      mob.update(delta);
    });

    // Handle Floating Text
    this.floatingText.forEach((text) => {
      text.update();
    });

    // Handle Particles
    this.particles.forEach((particle) => {
      particle.update();
    });
    if (this.particles.length > this.maxParticles) {
      this.particles.length = this.maxParticles;
    }

    // Handle collision boom
    this.collisions.forEach((collision) => {
      collision.update(delta);
    });

    this.mobs = this.mobs.filter((mob) => !mob.markedForDeletion);
    this.floatingText = this.floatingText.filter((text) => !text.markedForDeletion);
    this.particles = this.particles.filter((particle) => !particle.markedForDeletion);
    this.collisions = this.collisions.filter((collision) => !collision.markedForDeletion);
    if (this.energyInc <= 1200) this.energyInc += 1;
    if (this.energyInc % 200 === 0 && !this.energyDec) {
      this.energy += 1;
    }
  }

  // Restart Game
  restart() {
    this.gameOver = false;
    this.capy.restart();
    this.background.restart();
    this.mobs = [];
    this.collisions = [];
    this.health = 6;
    this.hedgehogScore = 0;
    this.beeScore = 0;
    this.score = 0;
    this.isPaused = false; // Set isPaused to false so the game isn't paused after restarting
    this.animate(0);
  }

  setupButtonClick() {
    this.capy.mobileJump();
  }

  // Handle Local High Score
  displayHighScore() {
    this.highscore = getHighscore();

    if (this.gameOver && (this.highscore === 0 || this.score >= this.highscore)) {
      localStorage.setItem('highscore', this.score.toString());
      this.highscore = this.score;
    }
    console.log(this.highscore);
  }

  // Draw images, score, and so on
  draw() {
    this.background.draw(this.ctx);
    this.capy.draw(this.ctx);
    this.mobs.forEach((mob) => {
      mob.draw(this.ctx);
    });
    this.particles.forEach((particle) => {
      particle.draw(this.ctx);
    });
    this.collisions.forEach((collision) => {
      collision.draw(this.ctx);
    });
    this.floatingText.forEach((text) => {
      text.draw(this.ctx);
    });
    this.UI.draw(this.ctx);
  }

  addMob() {
    if (isMobileDevice()) {
      this.mobs.push(new FlyingMob(this));
      if (this.speed > 0 && Math.random() < 0.3)
        this.mobs.push(new GroundMob(this), new Hedgehog(this));
    } else {
      this.mobs.push(new FlyingMob(this));
      if (this.speed > 0 && Math.random() < 0.5) this.mobs.push(new Wizard(this));
      if (this.speed > 0 && Math.random() < 1)
        this.mobs.push(new GroundMob(this), new Hedgehog(this));
    }
  }

  animate(time: number) {
    const delta = time - lastTime;
    lastTime = time;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.update(delta);
    this.draw();
    if (!this.gameOver) {
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
  }
}

function getHighscore() {
  return parseInt(localStorage.getItem('highscore')!, 10) || 0;
}
