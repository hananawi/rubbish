import Sprite from "../base/sprite.js"
import Button from "../base/button.js"

const SRC = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/it%E5%86%9C%E5%9C%BA/%E7%95%8C%E9%9D%A2/setting.png?sign=7c2589e06f6120b277b00278e607e146&t=1569050599"
const WIDTH = innerWidth
const HEIGHT = innerHeight

var ctx = canvas.getContext('2d')

export default class Setting extends Sprite {
    constructor() {
        super(SRC, WIDTH / 1.8 - 30, 0, 30, 30)
        this.f = false
        this.state = 0

        this.buttons = []
        this.buttons.push(new Button(WIDTH / 1.8 - 30, 0, 30, 30))
        var i = 0
        for (i = 0; i < 3; i++)
            this.buttons.push(new Button(WIDTH / 3.2, HEIGHT / 3 + i * HEIGHT / 6, 120, 35))
    }

    check() {
        if(!this.f)return
        var i = 0
        for (i = 0; i < 4; i++){
            this.buttons[i].f = true
            if (this.buttons[i].state) {
                if (!i) this.state = -1
                else if (this.state == -1 && i == 1) this.state = 0
                else if (this.state == -1) this.state = i
                this.buttons[i].cao()
                return
            }
        }
    }

    print(content, x, y) {
        ctx.fillStyle = "#e84393"
        ctx.font = "bold 30px Arial"
        ctx.fillText(content, x, y)
    }

    render() {
        this.draw()
        if (this.state != -1) return
        this.print("继续游戏", this.buttons[1].x, this.buttons[1].y + 30)
        this.print("查看帮助", this.buttons[1].x, this.buttons[1].y + 30 + HEIGHT / 6)
        this.print("返回菜单", this.buttons[1].x, this.buttons[1].y + 30 + HEIGHT / 6 * 2)
    }

    draww() {
        ctx.strokeStyle = "red"
        var i = 0
        for (i = 0; i < 4; i++)
            ctx.strokeRect(this.buttons[i].x, this.buttons[i].y, this.buttons[i].width, this.buttons[i].height)
    }
}