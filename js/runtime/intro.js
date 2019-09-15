import Button from "../base/button.js"


const WIDTH = innerWidth
const HEIGHT = innerHeight

var ctx = canvas.getContext('2d')
export default class Intro{
    constructor(){
        this.back = new Button(50,30,50,30)

        this.f = false

        this.content = "暂无"
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
        ctx.fillStyle = "rgb(211, 229, 251)"
        ctx.fillRect(0,0,WIDTH,HEIGHT)

        ctx.fillStyle = "#e84393"
        ctx.font = "bold 20px Arial"
        ctx.fillText("返回",50,50)
        ctx.fillText(this.content,150,300)
    }

    draww(){
        ctx.strokeStyle = "red"
        ctx.strokeRect(50,30,50,30)
    }
}