import { Capy } from './capy.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { GroundMob, FlyingMob, Hedgehog, Wizard } from './mobs.js';
import { UI } from './UI.js';

/*
*  Naming convention for assets sub-folders:
*    sprites folder- has 'Image' in the name
*    effects folder - has 'Effect' in the name
*    background folder - all other file names
*/
const imageArr = [
    'capyImage.png',
    'layer1.png',
    'layer2.png',
    'layer3.png',
    'layer4.png',
    'beeImage.png',
    'wizardImage.png',
    'wolfImage.png',
    'hedgehogImage.png',
    'fireEffect.gif',
    'gravityEffect.gif',
    'boomEffect.png',
    'bars.png'
];

const images = {};
imageArr.forEach(imageName => {
    const name = imageName.split('.')[0];
    images[name] = new Image();
    images[name].src = './assets/' + determineImageSubFolder(imageName) + "/" + imageName;
});

function determineImageSubFolder(imageName) {
    if (imageName.includes('Image'))
        return 'sprites';
    else if (imageName.includes('Effect'))
        return 'effects';
    else
        return 'background';
}
export {images};

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export { isMobileDevice }
// LOAD event: Javascript waits for all dependent resources such as stylsheets 
// and images to be fully loaded and available before it runs
window.addEventListener('load', function(){
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 550;

   
    // All logic will go through class Game
    class Game {
        constructor(width, height){
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
            this.highscore = localStorage.getItem("highscore")
            this.hedgehogScore = 0;
            this.beeScore = 0;
            this.fontColor = 'black';
            this.hudHeight = 50;
            this.capy.currentState = this.capy.states[0]; // points to index within this.states
            this.capy.currentState.enter(); // activate initial default state
        }

        togglePause() {
            this.isPaused = !this.isPaused;
            if (!this.isPaused && this.isFirstPause) {
                this.isFirstPause = false;
            }
        
            if (this.isPaused) {
                cancelAnimationFrame(this.animationId); 
                this.draw(ctx); 
            } else {
                this.animate(0); 
            }
        }
        // Run forever animation frame
        update(delta){
            this.energyDec = false;
            if (this.isPaused) return; 
            if (this.health === 0) this.gameOver = true;
            if (this.gameOver) {
                this.displayHighScore();
            }
            this.background.update();
            this.capy.update(this.input.keys, delta);
            // Handle Mobs
            if (this.mobTimer > this.mobInterval){
                this.addMob();
                this.mobTimer = 0;
            } else {
                this.mobTimer += delta;
            }
            // Handle Mobs
            this.mobs.forEach(mob => {
                mob.update(delta);
            })
            // Handle Floating Text
            this.floatingText.forEach(text => {
                text.update();         
            })
            // Handle Particles
            this.particles.forEach((particle, index) => {
                particle.update();
            })
            if (this.particles.length > this.maxParticles) {
                // Slice returns a portion of an array where start and end 
                // represent the index of items in that array. 
                this.particles.length = this.maxParticles;
            }
            // Handle collision boom
            this.collisions.forEach((collision, index) => {
                collision.update(delta);
            })
            // Using filter instead of splice for performance purposes
            this.mobs = this.mobs.filter(mob => !mob.markedForDeletion);
            this.floatingText = this.floatingText.filter(text => !text.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            if (this.energyInc <= 1200) this.energyInc += 1
            if (this.energyInc % 200 === 0 && !this.energyDec) {this.energy += 1}

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
            this.highscore = parseInt(localStorage.getItem("highscore"), 10) || 0;
        
            if (this.gameOver && (this.highscore === 0 || this.score >= this.highscore)) {
                // Update the highscore if it's the first time or if the current score is higher
                localStorage.setItem("highscore", this.score.toString()); // Convert this.score to a string before storing
                this.highscore = this.score; // Update the highscore in memory
            }
            console.log(this.highscore); // Display the highscore.
        }

        // Draw images, score, and so on
        draw(context){
            this.background.draw(context);
            this.capy.draw(context);
            this.mobs.forEach(mob => {
                mob.draw(context);
            })
            this.particles.forEach(particle => {
                particle.draw(context);
            })
            this.collisions.forEach(collision => {
                collision.draw(context);
            })
            this.floatingText.forEach(text => {
                text.draw(context); 
            })
            this.UI.draw(context);
        }
        addMob(){
            
            if (isMobileDevice()) {
                this.mobs.push(new FlyingMob(this));
                if (this.speed > 0 && Math.random() < 0.3) this.mobs.push(new GroundMob(this), new Hedgehog(this));
            } else {
            this.mobs.push(new FlyingMob(this));
            if (this.speed > 0 && Math.random() < 0.5) this.mobs.push(new Wizard(this));
            if (this.speed > 0 && Math.random() < 1) this.mobs.push(new GroundMob(this), new Hedgehog(this));
            }
        }
            
        animate(time) {
            const delta = time - lastTime;
            lastTime = time;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.update(delta);
            this.draw(ctx);
            if (!this.gameOver) {
                this.animationId = requestAnimationFrame(this.animate.bind(this)); // Keep track of animation frame
            }
        }
    }

    const game = new Game(canvas.width, canvas.height);
    game.setupButtonClick = game.setupButtonClick.bind(game);

    let lastTime = 0;

    
    window.addEventListener('keydown', function (event) {
        if (event.code === 'Enter' ) {
            event.preventDefault();
            if (game.gameOver) {
                game.restart();
            } else {
                game.togglePause();
            }
        }
    });

    canvas.addEventListener('click', function () {
        game.togglePause();
    });


    mobileButton.addEventListener('click', game.setupButtonClick);

    game.draw(ctx);
}
);

