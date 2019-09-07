import Running from "./runtime/running.js"
import Menu from "./runtime/menu.js"
import Help from "./runtime/help.js"

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
        this.aniId = 0;

        this.init();
    }

    init() {
        this.running = new Running();
        this.menu = new Menu();
        this.help = new Help();

        this.loopBind = this.loop.bind(this);
        cancelAnimationFrame(this.aniId);
        this.aniId = requestAnimationFrame(this.loopBind);
    }

    update() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if(!this.state)this.state = this.menu.state;

        if (!this.state)this.menu.render();

        else if(this.state == 1){
            this.menu = null;
            this.running.rifa.flag = 1;
            this.running.per_frame();
        }
        else if(this.state == 2){
            this.help.draww();
            this.help.render(this.help.state);
        }
    }

    loop() {
        this.update();
        this.aniId = requestAnimationFrame(this.loopBind);
    }

}