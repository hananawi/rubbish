import Player from "../player/player.js"
import Rubbish from "../player/rubbish.js"
import Setting from "../runtime/setting.js"
import Button from "../base/button.js"
import Help from "../runtime/help.js"

const WIDTH = innerWidth;
const HEIGHT = innerHeight;

const P = [];
const C = [
    [211, 229, 251],
    [173, 232, 226],
    [220, 223, 230],
    [241, 216, 219]
];

var ctx = canvas.getContext("2d");


export default class Running {
    constructor() {
        this.rifa = new Player();
        this.setting = new Setting()

        this.score = 0;
        this.streak = 0;
        this.type = 0;
        this.time = 0;
        this.time_x = 0;

        this.coloridx = 0;
        this.color = [];
        this.color[0] = C[0][0]
        this.color[1] = C[0][1]
        this.color[2] = C[0][2]
        this.step = [];

        this.rubbish_arr = [];
        this.collected_cnt = 0;
        this.idx = 0;

        this.bulbs = []

        this.init();
    }

    init() {
        var i = 0,
            j = 0;
        for (i = 0; i < 4; i++) {
            var tmp = [];
            for (j = 0; j < 3; j++) {
                if (i != 3) tmp.push((C[i + 1][j] - C[i][j]) / 60);
                else tmp.push((C[0][j] - C[3][j]) / 60);
            }``
            this.step.push(tmp);
        }

        for (i = 0; i < 4; i++) {
            var tmp = new Image();
          tmp.src = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/%E5%9E%83%E5%9C%BE%E6%A1%B6/%E5%9B%BE%E6%A0%87" + (i + 1) + ".png";
            P.push(tmp);
        }

        for (i = 0; i < 3; i++)
            this.bulbs.push(WIDTH / 2 + WIDTH / 8 * i)

        this.game_over = new Button(0,0,WIDTH,HEIGHT)
    }

    per_frame() {
        this.draw_bg(this.color); //////////////////////////////////////

        this.draw_bulb(this.streak)
        this.setting.render()
        this.draw_score();

        this.rifa.draw(ctx);

        this.setting.check()
        this.drop()
        this.draw_timebar();
        if (this.game_over.f) return
        if (this.setting.state) {
            if(this.setting.state == 2)this.draw_help()
            return
        }
        this.update()
    }

    draw_help(){
        if(!this.help)this.help = new Help()
        this.help.f = true
        this.help.render(this.help.state)
        this.help.check()
        if (this.help.state == -1) {
            this.setting.state = 0
            this.help.state = 0
        }
    }

    draw_score() {
      ctx.fillStyle = "white";
        ctx.font = "800 60px";
        ctx.fillText(this.score, 25, 50);
    }

    draw_timebar() {
        if (this.time_x >= 150) {
            this.game_over.f = true
            //this.print("游戏结束", this.game_over.x, this.game_over.y)
            var tmp = new Image()
          tmp.src = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/GameOver.png?sign=d6ac118bfc5ae84f709263203939d81a&t=1571626786"
            ctx.drawImage(tmp, 0, 0, WIDTH, HEIGHT)
            //this.game_over.draww()
        }
        if (this.time_x <= 0) this.time_x = 0
      ctx.fillStyle = "#00a0ff";
        ctx.fillRect(150, 43, 150 - this.time_x, 3);
    }

    draw_bg(c) {
        ctx.fillStyle = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')';
        //ctx.fillStyle = 'rgb(' + C[this.coloridx][0] + ',' + C[this.coloridx][1] + ',' + C[this.coloridx][2] + ')';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.drawImage(P[this.coloridx], WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
    }

    draw_bulb(x) {
        ctx.fillStyle = "red"
        ctx.strokeStyle = "red"
        var i = 0
      const b = canvas.getContext('2d')
      var backPicture = new Image()
      backPicture.src = 'https://696d-image-tj86e-1300283647.tcb.qcloud.la/%E5%BE%97%E5%88%86.png?sign=4a6975b4df0cccc44bb903e44b5c1e79&t=1571626131'
        for (i = 0; i < x; i++)
            ctx.drawImage(backPicture, this.bulbs[i], HEIGHT / 8.5, 32, 30)
    }

    update() {
        this.rifa.moveit(this.rifa.dir, this.rifa.fast);
        this.time_x += 0.05
        if (this.time % 60 == 0 && this.time) {
            this.rubbish_arr.push(new Rubbish(this.idx))
            this.idx++;
        }
        if (this.time >= 1200) {
            var i = 0;
            for (i = 0; i < 3; i++) {
                this.color[i] += this.step[this.coloridx][i];
            }
        }
        if (this.time == 1260) {
            this.time = -1;
            this.coloridx = (this.coloridx + 1) % 4;
            this.streak = 0
        }
        this.time++;
    }

    drop() {
        var i = 0,
            len = this.rubbish_arr.length;
        for (i = 0; i < len; i++) {
            var tmp = this.rubbish_arr[i];
            if (tmp.type == this.coloridx + 1) tmp.render()
            else tmp.draw()
            if (this.setting.state || this.game_over.f) continue
            tmp.y += 3;

            ///////////////////////////////////////////////////////////////////////////////////
            if (this.rifa.isCollideWith(tmp)) {
                if (this.coloridx + 1 == tmp.type) this.streak++
                    else this.streak = 0
                if (this.streak == 3) {
                    this.type = 0;
                    this.streak = 0;
                    this.score++;
                    this.time_x -= 80
                }

                this.rubbish_arr.splice(tmp.idx - this.collected_cnt, 1);
                tmp = null;
                this.collected_cnt++;
                i--;
                len--;
            }
            ////////////////////////////////////////////////////////////////////////////////////
            else if (tmp.y > HEIGHT) {
                this.rubbish_arr.splice(tmp.idx - this.collected_cnt, 1);
                tmp = null;
                this.collected_cnt++;
                i--;
                len--;
            }
        }
    }

    print(content, x, y) {
        ctx.fillStyle = "black"
        ctx.font = "10px Arial"
        ctx.fillText(content, x, y);
    }
}