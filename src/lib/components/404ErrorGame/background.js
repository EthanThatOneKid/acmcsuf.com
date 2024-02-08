import { images } from "./main.js";

class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 50; //should be game.hudHeight
    }
    update(){    
        if (this.x < -this.width) this.x = 0
        else this.x -= this.game.speed * this.speedModifier
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
 
}

export class Background {
    constructor(game){
        this.game = game;
        this.width = 1000;
        this.height = 500;
        this.layer1 = images.layer1;
        this.layer2 = images.layer2;
        this.layer3 = images.layer3;
        this.layer4 = images.layer4;
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.3, this.layer2);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.8, this.layer3);
        this.layer4 = new Layer(this.game, this.width, this.height, 1, this.layer4);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4];
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update()
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context)
        })
    }
    restart(){
        this.x = 0;
    }
}

