export class InputHandler {
  constructor(game){
    this.game = game;
    this.keys = [];
    this.touchY = '';
    this.touchTreshold = 30;
    window.addEventListener('keydown', e => {
      // If key is arrowdown and the key that was pressed is not
      // included in the this.keys array, push arrowdown into this.keys array
      if ((e.key === "ArrowDown" || 
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === " "
      ) && this.keys.indexOf(e.key) === -1){
        this.keys.push(e.key);
      } else if (e.key === 'd') {
        this.game.debug = !this.game.debug;
      } else if (e.key === "Enter" && this.game.gameOver) {
        this.game.restart();
      }

    });
    window.addEventListener('keyup', e => {
      // If key that was released is arrowdown, Use splice method to 
      // remove it from this.keys array 
      if (e.key === 'ArrowDown' || 
                e.key ==='ArrowUp' ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === " "){
        this.keys.splice(this.keys.indexOf(e.key), 1)
      }
      // Whenever someone touches browser window
    });
    window.addEventListener('touchstart', e => {
      this.touchY = e.changedTouches[0].pageY;

    });
    window.addEventListener('touchmove', e => {
      const swipeDistance = e.changedTouches[0].pageY - this.touchY
            
      if (swipeDistance < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
      else if (swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1) {
        this.keys.push('swipe down');
        if (this.game.gameOver) this.game.restart()
      }
    });
    window.addEventListener('touchend', e => {
      this.keys.splice(this.keys.indexOf('swipe up'), 1);
      this.keys.splice(this.keys.indexOf('swipe down'), 1);
    });
  }
}