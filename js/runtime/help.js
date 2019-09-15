import Button from "../base/button.js"

const WIDTH = innerWidth;
const HEIGHT = innerHeight;
const STATE = Symbol('state')

var ctx = canvas.getContext("2d");
var gap = 4.1,
    step = 5.5;


function print(content, i) {
    ctx.fillStyle = "#e84393";
    ctx.font = "bold 30px Arial";
    ctx.fillText(content, WIDTH / 3.2, HEIGHT / gap + HEIGHT / step * i);
}


export default class Help {
    constructor() {
        this.f = false
        this.state = 0;
        //0: 总览   1: 可回收   2: 干垃圾   3: 湿垃圾   4: 有害垃圾

        this.flag = 0;
        this.coor = [];

        var i = 0,
            y = HEIGHT / 5;
        for (i = 0; i < 4; i++) {
            this.coor[i] = y;
            y += HEIGHT / 5.5;
        }

        this.buttons = []
        var i = 0
        for (i = 0; i < 4; i++)
            if (!i) this.buttons.push(new Button(WIDTH / 3.2, this.coor[i], 120 + 30, 35))
        else this.buttons.push(new Button(WIDTH / 3.2, this.coor[i], 120, 35))

        this.back = new Button(50, 50, 50, 50)
    }

    check() {
        if (!this.f) return
        this.back.f = true
        var i = 0
        for (i = 0; i < 4; i++){
            this.buttons[i].f = true
            if (this.buttons[i].state) {
                this.state = i + 1
                this.buttons[i].cao()
                return
            }
        }
        if (this.back.state) {
            if (this.state > 0) this.state = 0
            else if (!this.state) this.state = -1
            this.back.cao()
        }
    }

    render(x) {
        ctx.fillStyle = "rgb(211, 229, 251)"
        ctx.fillRect(0, 0, WIDTH, HEIGHT)

        ctx.fillStyle = "#e84393"
        ctx.font = "bold 20px Arial"
        ctx.fillText("返回", 50, 70)
        switch (x) {
            case 0:
                this.render0();
                break;
            case 1:
                this.render1();
                break;
            case 2:
                this.render2()
                break
            case 3:
                this.render3()
            case 4:
                this.render4()
        }
    }

    render1() {
        print("暂无", 0)
    }
    render2() {
        print("暂无", 0)
    }
    render3() {
        print("暂无", 0)
    }
    render4() {
        print("暂无", 0)
    }

    render0() {
        print("可回收垃圾", 0);
        print("干垃圾", 1);
        print("湿垃圾", 2);
        print("有害垃圾", 3);
    }

    draww() {
        var i = 0;
        for (i = 0; i < 4; i++) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(WIDTH / 3.2, this.coor[i], 120, 35);
        }
        ctx.strokeRect(50, 50, 50, 50)
    }
}