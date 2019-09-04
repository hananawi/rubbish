

var ctx = canvas.getContext("2d");

export default class Sprite {
	constructor(imgSrc = "", x = 0, y = 0, width = 0, height = 0) {
		this.img = new Image()
		this.img.src = imgSrc

		this.width = width
		this.height = height

		this.x = x
		this.y = y

		this.visible = true
	}

	draw(){
		if(!this.visible)return;
		ctx.drawImage(this.img, this.x, this.y, this.width,this.height);
	}

	isCollideWith(sp) {
		let spX = sp.x + sp.width / 2
		let spY = sp.y + sp.height / 2

		if (!this.visible || !sp.visible)
			return false

		return !!(spX >= this.x+30
			&& spX <= this.x + this.width-40
			&& spY >= this.y+30
			&& spY <= this.y + 50)
	}
}
