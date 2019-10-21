import Sprite from "../base/sprite.js"

//const RUBBISH_SRC = "images/680.jpg";
const RUBBISH_SRC = "images/一次性餐具.png"
const RUBBISH_WIDTH = 30;
const RUBBISH_HEIGHT = 30;


var ctx = canvas.getContext('2d')
export default class Rubbish extends Sprite{
	constructor(idx){
		super(RUBBISH_SRC,0,60,RUBBISH_WIDTH,RUBBISH_HEIGHT);
		//this.x = Math.random()*(window.innerWidth-RUBBISH_WIDTH);
		this.x = Math.floor(Math.random()*(window.innerWidth - RUBBISH_WIDTH));
        this.idx = idx;

    this.name = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/垃圾/";
	this.type = Math.ceil(Math.random()*4);
    if (this.type == 1) this.name += "干垃圾/";
    else if (this.type == 2) this.name += "湿垃圾/";
    else if (this.type == 3) this.name += "可回收垃圾";
    else this.name += "有害垃圾/";

		this.ind = Math.floor(Math.random()*16);

		this.img.src = this.name + this.ind + ".png";
	}

    render(){
        this.draw()
        ctx.strokeStyle = "red"
        ctx.strokeRect(this.x,this.y,this.width,this.height)
    }
}