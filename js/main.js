import Player from "./player/player"
import Sprite from "./base/sprite"
import BackGround from "./runtime/background"
import Menu from "./runtime/menu.js"
import Rubbish from "./player/rubbish.js"
import GameInfo from "./runtime/gameinfo.js"
import Pool from "./base/pool.js"
import Help from "./runtime/help.js"

const RIFA_SRC = "images/rifa.jpg"
const MEG_SRC = "images/megumin.jpg"

var ctx = canvas.getContext("2d");
var debug = 0;

function print(content, x, y) {
    ctx.fillStyle = "black"
    ctx.font = "10px Arial"
    ctx.fillText(content, x, y);
}

export default class Main {
    constructor() {
        this.aniId = 0;

        this.time = 0;
        this.time_cnt = 0;
        this.rubbish_collected_cnt = 0;
        this.ind = 0;
        this.time_ind = 0;
        this.state = 0;

        this.rubbish_arr = [];

        this.meg = new BackGround();
        this.init();
    }

    init() {
        this.gameinfo = new GameInfo();
        this.pools = new Pool();
        this.rifa = new Player();
        this.menu = new Menu();
        this.help = new Help();

        this.loopBind = this.loop.bind(this);
        cancelAnimationFrame(this.aniId);
        this.aniId = requestAnimationFrame(this.loopBind);


    }

    creat_rubbish() {
        var x = Math.floor(Math.random() * 1000) % 6;
        var rubbish = this.pools.getins(Rubbish);
        rubbish.ind = this.ind;
        this.rubbish_arr.push(rubbish);
        this.ind++;
    }

    time_pass(x) {
        print("REMAINED TIME: ", 10, 50);
        ctx.fillStyle = "green";
        ctx.fillRect(100, 43, 200-x, 10);
    }

    update() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if(!this.state)this.state = this.menu.state;

        if (!this.state)this.menu.render();

        else if(this.state == 1){
            this.menu = null;
            this.rifa.flag = 1;
            this.running();
        }
        else if(this.state == 2){
            this.help.draww();
            this.help.render(this.help.state);
        }
    }

    running(){
        this.meg.drawit();//background!!!  draw it first!!!
        this.gameinfo.drawGameScore(ctx, this.score);
        this.rifa.moveit(this.rifa.dir, this.rifa.fast);
        this.rifa.draw(ctx);

        this.time_pass(this.time);

        this.time_cnt++;

        if (this.time_cnt % 10 == 0) this.time += 0.2;

        if (this.time_cnt == 60) {
            this.creat_rubbish(this.ind);
            this.time_cnt = 0;
        }

        var i = 0;
        for (i = 0; i < this.rubbish_arr.length; i++) {
            var tmp = this.rubbish_arr[i];
            var tind = tmp.ind - this.rubbish_collected_cnt;

            tmp.y += 3;
            tmp.draw(ctx);
            print(tmp.ind, tmp.x, tmp.y);

            //全局碰撞检测///////////////////////////////////////////
            if (this.rifa.isCollideWith(tmp)) {

                if (this.gameinfo.streak == 0) {
                    this.gameinfo.streak++;
                    this.gameinfo.f = tmp.f;
                } else {
                    if (tmp.f == this.gameinfo.f) this.gameinfo.streak++;
                    else this.gameinfo.streak = 0;
                    if (this.gameinfo.streak == 3) {
                        this.gameinfo.streak = 0;
                        this.gameinfo.score++;
                    }
                }

                this.rubbish_arr.splice(tind, 1);
                tmp = null;
                this.rubbish_collected_cnt++;
                i--;
            } else if (tmp.y > window.innerHeight) {
                this.rubbish_arr.splice(tind, 1);
                tmp = null;
                this.rubbish_collected_cnt++;
                i--;
            }
            /////////////////////////////////////////////////////
        }
    }

    loop() {
        this.update();
        if(!this.state)this.menu.draww();
        this.aniId = requestAnimationFrame(this.loopBind);
    }

}