const WIDTH = innerWidth;
const HEIGHT = innerHeight;

var ctx = canvas.getContext("2d");
var gap = 4.1, step = 5.5;


function print(content,i) {
    ctx.fillStyle = "#e84393";
    ctx.font = "bold 30px Arial";
    ctx.fillText(content, WIDTH/3.2, HEIGHT/gap+HEIGHT/step*i);
}


export default class Help {
    constructor() {
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

        addEventListener("touchstart", (e) => {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;

            var i = 0;
            for(i = 0; i < 4; i++){
                if(!i&&!(x>=WIDTH/3.2&&x<=WIDTH/3.2+120+30))return;
                if(!(x>=WIDTH/3.2&&x<=WIDTH/3.2+120))return;
                if(y>=this.coor[i]&&y<=this.coor[i]+35)this.flag = i+1;
            }
        })

        addEventListener("touchend", (e)=>{
            this.state = this.flag;
        })
    }

    render(x) {
        switch (x) {
            case 0:this.render0();break;
            case 1:this.render1();break;
        }
    }

    render1() {
        print("nmsl",0);
        print("nmsl",1);
        print("nmsl",2);
        print("nmsl",3);
    }

    render0() {
        print("可回收垃圾", 0);
        print("干垃圾", 1);
        print("湿垃圾", 2);
        print("有害垃圾", 3);
    }

    draww(){
        var i = 0;
        for(i = 0; i < 4; i++){
            ctx.fillStyle = "red";
            ctx.fillRect(WIDTH/3.2,this.coor[i],120,35);
        }
    }
}