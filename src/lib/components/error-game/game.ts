import { Capy } from './js/capy.js';
import { InputHandler } from './js/input.js';
import { Background } from './js/background.js';
import { GroundMob, FlyingMob, Hedgehog, Wizard } from './js/mobs.js';
import { UI } from './js/UI.js';
import { isMobileDevice } from './js/shared.js';

let lastTime = 0;

export function setup(canvas: HTMLCanvasElement, button: HTMLButtonElement) {
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('2d context not supported');
  }

  canvas.width = 1000;
  canvas.height = 550;

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
  mobs: never[];
  particles: never[];
  collisions: never[];
  floatingText: never[];
  mobTimer: number;
  mobInterval: number;
  debug: boolean;
  health: number;
  energy: number;
  energyInc: number;
  engeryDec: boolean;
  score: number;
  highscore: number;
  hedgehogScore: number;
  beeScore: number;
  fontColor: string;
  hudHeight: number;
  energyDec: boolean;
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
    this.engeryDec = false;
    this.score = 0;
    this.highscore = getHighscore();
    this.hedgehogScore = 0;
    this.beeScore = 0;
    this.fontColor = 'black';
    this.hudHeight = 50;
    this.capy.currentState = this.capy.states[0]; // points to index within this.states
    this.capy.currentState.enter(); // activate initial default state
    this.energyDec = false;
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
      (mob as any).update(delta);
    });

    // Handle Floating Text
    this.floatingText.forEach((text) => {
      (text as any).update();
    });

    // Handle Particles
    this.particles.forEach((particle) => {
      (particle as any).update();
    });
    if (this.particles.length > this.maxParticles) {
      // Slice returns a portion of an array where start and end
      // represent the index of items in that array.
      this.particles.length = this.maxParticles;
    }

    // Handle collision boom
    this.collisions.forEach((collision) => {
      (collision as any).update(delta);
    });

    // Using filter instead of splice for performance purposes
    this.mobs = this.mobs.filter((mob) => !(mob as any).markedForDeletion);
    this.floatingText = this.floatingText.filter((text) => !(text as any).markedForDeletion);
    this.particles = this.particles.filter((particle) => !(particle as any).markedForDeletion);
    this.collisions = this.collisions.filter((collision) => !(collision as any).markedForDeletion);
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
    // Retrieve the highscore from localStorage and convert it to a number
    this.highscore = getHighscore();

    if (this.gameOver && (this.highscore === 0 || this.score >= this.highscore)) {
      // Update the highscore if it's the first time or if the current score is higher
      localStorage.setItem('highscore', this.score.toString()); // Convert this.score to a string before storing
      this.highscore = this.score; // Update the highscore in memory
    }
    console.log(this.highscore); // Display the highscore.
  }

  // Draw images, score, and so on
  draw() {
    this.background.draw(this.ctx);
    this.capy.draw(this.ctx);
    this.mobs.forEach((mob) => {
      (mob as any).draw(this.ctx);
    });
    this.particles.forEach((particle) => {
      (particle as any).draw(this.ctx);
    });
    this.collisions.forEach((collision) => {
      (collision as any).draw(this.ctx);
    });
    this.floatingText.forEach((text) => {
      (text as any).draw(this.ctx);
    });
    this.UI.draw(this.ctx);
  }

  addMob() {
    if (isMobileDevice()) {
      this.mobs.push(new FlyingMob(this) as never);
      if (this.speed > 0 && Math.random() < 0.3)
        this.mobs.push(new GroundMob(this) as never, new Hedgehog(this) as never);
    } else {
      this.mobs.push(new FlyingMob(this) as never);
      if (this.speed > 0 && Math.random() < 0.5) this.mobs.push(new Wizard(this) as never);
      if (this.speed > 0 && Math.random() < 1)
        this.mobs.push(new GroundMob(this) as never, new Hedgehog(this) as never);
    }
  }

  animate(time: number) {
    const delta = time - lastTime;
    lastTime = time;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.update(delta);
    this.draw();
    if (!this.gameOver) {
      this.animationId = requestAnimationFrame(this.animate.bind(this)); // Keep track of animation frame
    }
  }
}

function getHighscore() {
  return parseInt(localStorage.getItem('highscore')!, 10) || 0;
}
