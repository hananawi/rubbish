import Player from "../player/player.js"
import Rubbish from "../player/rubbish.js"

const WIDTH = innerWidth;
const HEIGHT = innerHeight;

var ctx = canvas.getContext("2d");

function print(content) {
    ctx.fillStyle = "black"
    ctx.font = "10px Arial"
    ctx.fillText(content, 200, 200);
}

export default class Running{
    constructor(){
        this.rifa = new Player();

        this.score = 0;
        this.streak = 0;
        this.type = 0;
        this.time = 0;
        this.time_x = 0;

        this.rubbish_arr = [];
        this.collected_cnt = 0;
        this.idx = 0;
    }

    per_frame(){
        this.draw_bg();

        print(this.time);
        this.draw_score();
        this.draw_timebar();
        this.rifa.moveit(this.rifa.dir, this.rifa.fast);
        this.rifa.draw(ctx);

        if(this.time==60){
            this.time_x+=0.2;
            this.rubbish_arr.push(new Rubbish(this.idx))
            this.idx++;
            this.time = -1;
        }
        this.time++;

        this.drop();
    }

    draw_score(){
        ctx.fillStyle = "black";
        ctx.font = "800 30px Impact";
        ctx.fillText(this.score, 25, 40);
    }

    draw_timebar(){
        ctx.fillStyle = "#34495e";
        ctx.fillRect(150, 43, 150-this.time_x,3);
    }

    draw_bg(){
        ctx.fillStyle = "#cce6ff";
        ctx.fillRect(0,0,WIDTH,HEIGHT);
    }

    drop(){
        var i = 0,len = this.rubbish_arr.length;
        for(i = 0;i<len;i++){
            var tmp = this.rubbish_arr[i];
            tmp.draw();
            tmp.y+=3;

///////////////////////////////////////////////////////////////////////////////////
            if(this.rifa.isCollideWith(tmp)){
                if (!this.type || this.type == tmp.type) this.streak++;
                else this.streak = 1;
                this.type = tmp.type;
                if (this.streak == 3) {
                    this.type = 0;
                    this.streak = 0;
                    this.score++;
                }

                this.rubbish_arr.splice(tmp.idx-this.collected_cnt,1);
                tmp = null;
                this.collected_cnt++;
                i--;len--;
            }
////////////////////////////////////////////////////////////////////////////////////

            else if (tmp.y > HEIGHT){
                this.rubbish_arr.splice(tmp.idx - this.collected_cnt, 1);
                tmp = null;
                this.collected_cnt++;
                i--; len--;
            }
        }
    }
}