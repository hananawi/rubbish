import Sprite from "../base/sprite.js"

//const RUBBISH_SRC = "images/680.jpg";
const RUBBISH_SRC = "images/一次性餐具.png"
const RUBBISH_WIDTH = 50;
const RUBBISH_HEIGHT = 50;



export default class Rubbish extends Sprite{
	constructor(idx){
		super(RUBBISH_SRC,0,60,RUBBISH_WIDTH,RUBBISH_HEIGHT);
		//this.x = Math.random()*(window.innerWidth-RUBBISH_WIDTH);
		this.x = Math.floor(Math.random()*(window.innerWidth - RUBBISH_WIDTH));
        this.idx = idx;

		this.name = "it农场/垃圾/";
		this.type = Math.ceil(Math.random()*4);
		if(this.type == 1)this.name += "干垃圾/";
		else if(this.type == 2)this.name += "湿垃圾/";
		else if(this.type == 3)this.name += "未可回收/";
		else this.name += "有害垃圾/";

		this.ind = Math.floor(Math.random()*16);

		this.img.src = this.name + this.ind + ".png";
	}
}