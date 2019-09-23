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

    this.name = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/it%E5%86%9C%E5%9C%BA/%E5%9E%83%E5%9C%BE/";
	this.type = Math.ceil(Math.random()*4);
    if (this.type == 1) this.name += "%E5%B9%B2%E5%9E%83%E5%9C%BE/";
    else if (this.type == 2) this.name += "%E6%B9%BF%E5%9E%83%E5%9C%BE/";
    else if (this.type == 3) this.name += "%E6%9C%AA%E5%8F%AF%E5%9B%9E%E6%94%B6/";
    else this.name += "%E6%9C%89%E5%AE%B3%E5%9E%83%E5%9C%BE/";

		this.ind = Math.floor(Math.random()*16);

		this.img.src = this.name + this.ind + ".png";
	}

    render(){
        this.draw()
        ctx.strokeStyle = "red"
        ctx.strokeRect(this.x,this.y,this.width,this.height)
    }
}