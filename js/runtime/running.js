import Player from "../player/player.js"
import Rubbish from "../player/rubbish.js"

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

        this.coloridx = 0;
        this.color = C[0];
        this.step = [];
        var i = 0,j=0;
        for(i=0;i<4;i++){
            var tmp = [];
            for(j=0;j<3;j++){
                if(i!=3)tmp.push((C[i+1][j]-C[i][j])/60);
                else tmp.push((C[0][j]-C[3][j])/60);
            }
            this.step.push(tmp);
            //console.log(this.step.length+': '+this.step[this.step.length-1]);
        }
        for(i=0;i<4;i++){
            var tmp = new Image();
            tmp.src = "it农场/分类桶和图标和头像/图标"+(i+1)+".png";
            P.push(tmp);
        }

        this.rubbish_arr = [];
        this.collected_cnt = 0;
        this.idx = 0;
    }

    per_frame(){
        this.draw_bg(this.color);

        print(this.time);
        this.draw_score();
        this.draw_timebar();
        this.rifa.moveit(this.rifa.dir, this.rifa.fast);
        this.rifa.draw(ctx);

        if(this.time%60==0&&this.time){
            this.time_x+=0.2;
            this.rubbish_arr.push(new Rubbish(this.idx))
            this.idx++;
        }
        if(this.time >= 600){
            var i = 0;
            for(i=0;i<3;i++){
                this.color[i]+=this.step[this.coloridx][i];
            }
        }
        if(this.time == 660){
            this.time = -1;
            this.coloridx=(this.coloridx+1)%4;
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

    draw_bg(c){
        ctx.fillStyle = "rgb("+c[0]+','+c[1]+','+c[2]+')';
        ctx.fillRect(0,0,WIDTH,HEIGHT);
        ctx.drawImage(P[this.coloridx],100,100,100,100);
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