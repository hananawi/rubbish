import Sprite from "../base/sprite.js"

const SRC = "it农场/界面/开始界面背景.png";
const WIDTH = innerWidth;
const HEIGHT = innerHeight;

var ctx = canvas.getContext("2d");
export default class Menu extends Sprite{
  constructor(){
    super(SRC, 0, 0, WIDTH, HEIGHT);

    this.state = 0;
    this.coor = [];
    var i = 0, y = 300;
    for(i = 0; i < 3; i++){
        this.coor[i] = y;
        y += i*50;
    }

    addEventListener("touchstart", (e)=>{
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        var i = 0;
        for(i = 0; i < 3; i++){
            if(!(x>=100&&x<=210))return;
            if (y >= this.coor[i]-20&&y<=this.coor[i]+20)this.state = i+1;
        }
        
    })
  }

  render(){
    this.draw(ctx);
    this.print("开始游戏", 100, 300, 28);
  }

  print(content, x, y, size){
    ctx.fillStyle = "#e84393";
    ctx.font = "bold " + size + "px Arial"
    ctx.fillText(content, x, y);
  }
}