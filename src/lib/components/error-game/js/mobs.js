import { images,isMobileDevice } from './shared.js';

class Mob {
  constructor(){
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(delta){
    // movement
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval){
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += delta;
    }
    // Check if Mob is off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context){
    context.strokeStyle = 'rgba(0, 0, 0, 0)';
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this. height)
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}

export class FlyingMob extends Mob {
  constructor(game){
    super(); // runs code from parent class
    this.name = "bee";
    this.game = game;
    this.width = 25;
    this.height = 26;
    this.x = this.game.width
    this.y = Math.random() * this.game.height * 0.5 + this.game.hudHeight;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 2.5;
    this.image = images.beeImage;
    // Move the flying enemies up and down as they move
    this.angle = 0;
    this.angleValue = Math.random() * 0.1 + 0.1;

  }
  update(delta){
    super.update(delta);
    this.angle += this.angleValue
    this.y += Math.sin(this.angle) // Maps positions of flying mobs along sin waves
  }

}

export class GroundMob {
  constructor(game){
    this.name = "wolf";
    this.frameX = 0;
    this.frameY = 0;
    this.game = game;
    this.width = 84.6;
    this.height = 51;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = images.wolfImage;
    this.speedX = isMobileDevice() ? -0.1: -0.5;
    this.speedY = 0;
    this.maxFrame = 4;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  } 
  update(delta) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval){
      this.frameTimer = 0;
      if (this.frameX > 0){
        this.frameX--; 
      } 
      else this.frameX = this.maxFrame;
    } else {
      this.frameTimer += delta;
    }
    // Check if Mob is off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw(context){
    context.strokeStyle = 'rgba(0, 0, 0, 0)';
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this. height)
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}

export class Hedgehog extends Mob {
  constructor(game){
    super();
    this.name = "hedgehog";
    this.game = game;
    this.width = 24;
    this.height = 25;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = images.hedgehogImage;
    this.speedX = -1.5
    this.speedY = 0;
    this.maxFrame = 5;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(delta) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval){
      this.frameTimer = 0;
      if (this.frameX > 0) this.frameX--;  
      else this.frameX = this.maxFrame;
    } else {
      this.frameTimer += delta;
    }

    // Check if Mob is off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context) {
    context.strokeStyle = 'rgba(0, 0, 0, 0)';
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this. height)
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}
export class Wizard extends Mob{
  constructor(game){
    super();
    this.name = "wizard";
    this.width = 80;
    this.height = 80;
    this.game = game;
    this.frameX = 0;
    this.frameY = 0;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5 + this.game.hudHeight;
    this.speedX = 0.3;
    this.speedY = 0;
    this.maxFrame = 9;
    this.image = images.wizardImage;

  }
  update(delta){
    // movement
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval){
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += delta;
    }
    // Check if Mob is off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context){
    context.strokeStyle = 'rgba(0, 0, 0, 0)';
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this. height)
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}

    


