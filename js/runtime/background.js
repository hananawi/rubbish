import Sprite from "../base/sprite"

//const MEG_SRC = "images/megumin.jpg"
const MEG_SRC = "it农场/分类桶和图标和头像/可回收图标.png"
//const MEG_SRC = "it农场/时间条/时间条1.png"
const MEG_WIDTH = window.innerWidth
const MEG_HEIGHT = window.innerHeight

var ctx = canvas.getContext("2d");
export default class BackGround extends Sprite{
	constructor(){
		super(MEG_SRC,0,0,MEG_WIDTH,MEG_HEIGHT);
	}

  drawit(){
    ctx.fillStyle = "pink";
    ctx.fillRect(0,0,MEG_WIDTH,MEG_HEIGHT);
    this.draw();
  }
}