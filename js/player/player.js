import Sprite from "../base/sprite"

//const RIFA_SRC = "images/rifa.jpg"
const RIFA_SRC = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/it%E5%86%9C%E5%9C%BA/%E5%88%86%E7%B1%BB%E6%A1%B6%E5%92%8C%E5%9B%BE%E6%A0%87%E5%92%8C%E5%A4%B4%E5%83%8F/%E5%8F%AF%E5%9B%9E%E6%94%B6%E5%9E%83%E5%9C%BE%E5%9E%83%E5%9C%BE%E6%A1%B6.png"
const RIFA_WIDTH = 100;
const RIFA_HEIGHT = 160;

export default class Player extends Sprite {
    constructor() {
        super(RIFA_SRC, 0, 0, RIFA_WIDTH, RIFA_HEIGHT);

        //初始位置
        this.x = window.innerWidth / 2 - this.width / 2;
        this.y = window.innerHeight - this.height / 2 - 60;

        //this.touched = false;
        this.flag = 0;

        addEventListener('touchstart', ((e) => {
            //e.preventDefault();
            if(!this.flag)return;
            var x = e.touches[0].clientX;
            if (x > this.x+this.width/2) this.dir = 1;
            else this.dir = -1;
        }).bind(this))

        this.wx = 20;
        this.wy = 20;

        this.dir = 0;
        this.fast = 0;
        this.step = 3;

        this.score = 20;
    }

    istouched(x, y) {
        if (x > this.x && x < this.x + this.width
            && y > this.y && y < this.y + this.height) return true;
        return false;
    }

    moveit(dir, fast) {
        if (this.dir == 0) return;

        var x = this.x;
        if (this.dir == 1) x += 3 + fast * 2;
        else x -= 3 + fast * 2;

        if (x < -30) x = -30;
        if (x > window.innerWidth - this.width + 40) x = window.innerWidth - this.width + 40;

        this.x = x;
    }
}
