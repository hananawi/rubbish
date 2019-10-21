import Button from "../base/button.js"


const WIDTH = innerWidth
const HEIGHT = innerHeight

var ctx = canvas.getContext('2d')
export default class Intro{
    constructor(){
        this.back = new Button(20,20,50,30)

        this.f = false

        //this.content = "暂无"
    }

    check(){
        if(!this.f)return
        this.back.f = true
        if(this.back.state){
            this.f = false
            this.back.cao()
        }
    }

    render(){
      ctx.fillStyle = "#afdfe4"
        ctx.fillRect(0,0,WIDTH,HEIGHT)

      ctx.fillStyle = "#1b315e";
        ctx.font = "bold 15px Arial"
        //ctx.fillText("返回",50,50)
        var l=100;
      ctx.fillText("这是由华南农业大学Explosion！",60,100+l);
      ctx.fillText("小队开发的一款垃圾分类的微信小游", 40, 120 + l);
      ctx.fillText("戏，玩家通过移动不同类型的垃圾桶", 40, 140 + l);
      ctx.fillText("来接相应类型的垃圾，从而为炸弹爆", 40, 160 + l);
      ctx.fillText("炸倒计时增加更长的倒计时时间，获", 40, 180 + l);
      ctx.fillText("得更多的积分。玩家在休息娱乐的同", 40, 200 + l);
      ctx.fillText("时可以更清楚的了解垃圾分类。", 40, 220 + l);
    }

    draww(){
        ctx.strokeStyle = "red"
        //ctx.strokeRect(20,20,50,30)
        const b = canvas.getContext('2d')
        var backPicture = new Image()
      backPicture.src = 'https://696d-image-tj86e-1300283647.tcb.qcloud.la/%E8%BF%94%E5%9B%9E2.png?sign=838aa47b3c7ea131873a1718c37451d7&t=1571626189'
        b.drawImage(backPicture,20,10,50,50)
    }
}