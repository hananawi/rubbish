

var ctx = canvas.getContext("2d");

export default class Help{
    constructor(){
        this.state = 0;
        //0: 总览   1: 可回收   2: 干垃圾   3: 湿垃圾   4: 有害垃圾

        addEventListener("touchstart", (e)=>{
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;

            if(x>=100&&x<=200&&y>=70&&y<=100)this.state = 1;

        })
    }

    render(x){
        switch(x){
            case 1: render1();
        }
    }

    render1(){
        ctx.fillStyle = "red";
        ctx.fillText("nmsl", 100, 70);
    }
}