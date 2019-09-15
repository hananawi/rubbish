import Running from "./runtime/running.js"
import Menu from "./runtime/menu.js"
import Help from "./runtime/help.js"
import Intro from "./runtime/intro.js"

const RIFA_SRC = "images/rifa.jpg"
const MEG_SRC = "images/megumin.jpg"

var ctx = canvas.getContext("2d");
var debug = 0;

function print(content) {
    ctx.fillStyle = "black"
    ctx.font = "10px Arial"
    ctx.fillText(content, 200, 200);
}

export default class Main {
    constructor() {
        this.aniId = 0
        this.init();
    }

    init() {
        this.running = new Running()
        this.menu = new Menu()
        this.help = new Help()
        this.intro = new Intro()

        this.loopBind = this.loop.bind(this);
        this.aniId = window.requestAnimationFrame(this.loopBind)
    }

    update() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.menu.f=this.help.f=this.intro.f = this.running.setting.f=false

        if (!this.menu.state) {
            this.menu.f = true
            this.menu.render()
            this.menu.check()
        }

        if (this.menu.state == 1) {
            this.running.setting.f=true
            this.running.rifa.flag = 1;
            this.running.per_frame();
            if (this.running.setting.state == 3) {
                this.init()
                cancelAnimationFrame(this.aniId);
                return
            }
        }
         else if (this.menu.state == 2) {
            this.help.f=true
            this.help.render(this.help.state);
            this.help.draww();
            this.help.check()
            if(this.help.state==-1){
                this.menu.state=0
                this.help.state = 0
            }
        }
        else if(this.menu.state == 3){
            this.intro.f = true
            this.intro.render()
            this.intro.draww()
            this.intro.check()
            if(!this.intro.f){
                this.menu.state = 0
            }
        }
        console.log(this.menu.state)
    }

    loop() {
        this.update();
        this.aniId = requestAnimationFrame(this.loopBind)
    }
}