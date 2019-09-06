import Sprite from "../base/sprite.js"


const SRC = "it农场/界面/开始界面背景.png";
const WIDTH = innerWidth;
const HEIGHT = innerHeight;

var ctx = canvas.getContext("2d");
export default class Menu extends Sprite {
    constructor() {
        super(SRC, 0, 0, WIDTH, HEIGHT);
        this.debug = 0;

        this.state = 0;
        this.flag = 0;
        this.coor = [];
        var i = 0,
            y = HEIGHT / 2;
        for (i = 0; i < 3; i++) {
            this.coor[i] = y;
            y += HEIGHT / 7;
        }
        this.initEvent();
    }

    render() {
        this.draw(ctx);
        this.print("开始游戏", WIDTH / 3.2, HEIGHT / 1.8, 30);
        this.print("游戏帮助", WIDTH / 3.2, HEIGHT / 1.8 + HEIGHT / 7, 30);
        this.print("游戏介绍", WIDTH / 3.2, HEIGHT / 1.8 + HEIGHT / 7 * 2, 30);
    }

    print(content, x, y, size) {
        ctx.fillStyle = "#e84393";
        ctx.font = "bold " + size + "px Arial"
        ctx.fillText(content, x, y);
    }

    initEvent() {
        addEventListener("touchstart", ((e) => {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;

            var i = 0;
            for (i = 0; i < 3; i++) {
                if (!(x >= WIDTH/3.2 && x <= WIDTH+120)) return;
                if (y >= this.coor[i] && y <= this.coor[i] + 35) this.flag = i + 1;
            }
        }).bind(this))

        addEventListener("touchmove", ((e) => {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;

            this.debug = y;

            if (!(x >= WIDTH/3.2 && x <= WIDTH+120)) {
                this.flag = 0;
                return;
            }
            if (!(y >= this.coor[this.flag - 1] && y <= this.coor[this.flag - 1] + 35)) this.flag = 0;
        }).bind(this))

        addEventListener("touchend", ((e) => {
            this.state = this.flag;
        }).bind(this))
    }

    draww() {
        ctx.fillStyle = "red";
        var i = 0;
        for (i = 0; i < 3; i++) {
            ctx.fillRect(100, this.coor[i], 120, 35);
        }
    }
}