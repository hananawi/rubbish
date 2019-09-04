import Sprite from "../base/sprite.js"

var ctx = canvas.getContext("2d");
export default class GameInfo{
	constructor(){
		this.streak = 0;
		this.score = 0;
		this.f = 0;
	}
	drawGameScore(){
		ctx.fillStyle = "black";
		ctx.font = "10px Arial"
		ctx.fillText("YOUR SCORES: ", 10, 30);
		ctx.fillText(this.score, 110,30);
	}

	
}