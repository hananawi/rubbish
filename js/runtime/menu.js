import Sprite from "../base/sprite.js"
import Button from "../base/button.js"

const SRC = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/%E5%BC%80%E5%A7%8B%E7%95%8C%E9%9D%A2%E8%83%8C%E6%99%AF.png?sign=82c10234f6e7fe1da514cb48d1efa6d5&t=1571626164";
const WIDTH = innerWidth;
const HEIGHT = innerHeight;

var ctx = canvas.getContext("2d");
export default class Menu extends Sprite {
    constructor() {
        super(SRC, 0, 0, WIDTH, HEIGHT);
        this.f = false

        this.state = 0;
        this.flag = 0;
        this.coor = [];
        var i = 0,
            y = HEIGHT / 2;
        for (i = 0; i < 3; i++) {
            this.coor[i] = y;
            y += HEIGHT / 7;
        }

        this.buttons = [];
        var i = 0
        for (i = 0; i < 3; i++)
            this.buttons.push(new Button(WIDTH / 3.2, this.coor[i], 120, 35))
    }

    check() {
        if (!this.f) return
        var i = 0
        for (i = 0; i < 3; i++){
            this.buttons[i].f = true
            if (this.buttons[i].state) {
                this.state = i + 1
                this.buttons[i].cao()
                return
            }
        }
    }

    render() {
        this.draw(ctx);
        this.print("开始游戏", WIDTH / 3.2, HEIGHT / 1.8, 30);
        this.print("游戏帮助", WIDTH / 3.2, HEIGHT / 1.8 + HEIGHT / 7, 30);
        this.print("游戏介绍", WIDTH / 3.2, HEIGHT / 1.8 + HEIGHT / 7 * 2, 30);
    }

    print(content, x, y, size) {
        ctx.fillStyle = "#e84393";
        //ctx.font = "bold " + size + "px Arial"
        ctx.font = "bold " + size + "px 方正汉真广标"
        ctx.fillText(content, x, y);
        this.ijk=false
        if(!this.ijk){
          ctx.shadowColor = 'black';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 5;
          this.ijk=true
        }
    }

    draww() {
        ctx.fillStyle = "red";
        var i = 0;
        for (i = 0; i < 3; i++) {
            ctx.fillRect(100, this.coor[i], 120, 35);
        }
    }
}