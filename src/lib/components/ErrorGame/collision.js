import { images } from './main.js';

export class Boom {
    constructor(game, x, y){
        this.game = game;
        this.image = images.boomEffect;
        this.boomWidth = 100;
        this.boomHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.boomWidth * this.sizeModifier;
        this.height = this.boomHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.boomWidth, 0, this.boomWidth, this.boomHeight, this.x, this.y, this.width, this.height)
    }
    update(delta){
        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += delta;
        }
       
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
        
    }
}