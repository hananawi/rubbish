import Button from "../base/button.js"

const WIDTH = innerWidth;
const HEIGHT = innerHeight;
const STATE = Symbol('state')
//const X = (WIDTH / 3.2) - 5;
//const Y = (HEIGHT / gap + HEIGHT / step * i) - 25;
const r = 5;

var ctx = canvas.getContext("2d");
var gap = 4.1,
    step = 5.5;


function print(content, i) {
    const bgg = canvas.getContext('2d') // 创建一个 2d context
    //bgg.shadowColor = 'black';
    bgg.fillStyle = '#FFFFFF' // 矩形颜色
    /*bgg.shadowColor = 'black';
    bgg.shadowBlur=10;
    bgg.shadowOffsetX=5;
    bgg.shadowOffsetY = 5;*/
    bgg.fillRect((WIDTH / 3.2) - 5, (HEIGHT / gap + HEIGHT / step * i) - 25, 120, 35);
    bgg.beginPath();
    bgg.moveTo((WIDTH / 3.2) - 5 + r, (HEIGHT / gap + HEIGHT / step * i) - 25);
    bgg.arcTo((WIDTH / 3.2) - 5 + 120, (HEIGHT / gap + HEIGHT / step * i) - 25, (WIDTH / 3.2) - 5 + 120, (HEIGHT / gap + HEIGHT / step * i) - 25 + 35, r);
    bgg.arcTo((WIDTH / 3.2) - 5 + 120, (HEIGHT / gap + HEIGHT / step * i) - 25 + 35, (WIDTH / 3.2) - 5, (HEIGHT / gap + HEIGHT / step * i) - 25 + 35, r);
    bgg.arcTo((WIDTH / 3.2) - 5, (HEIGHT / gap + HEIGHT / step * i) - 25 + 35, (WIDTH / 3.2) - 5, (HEIGHT / gap + HEIGHT / step * i) - 25, r);
    bgg.arcTo((WIDTH / 3.2) - 5, (HEIGHT / gap + HEIGHT / step * i) - 25, (WIDTH / 3.2) - 5 + 120, (HEIGHT / gap + HEIGHT / step * i) - 25, r);
    bgg.closePath();
    bgg.stroke();
    //bgg.fillRect((WIDTH / 3.2) - 5, (HEIGHT / gap + HEIGHT / step * i) - 25, 120, 35);
    //bgg.clip();//剪切
    ctx.fillStyle = "#681E1E";
    ctx.font = "20px Arial";
    ctx.fillText(content, WIDTH / 3.2, HEIGHT / gap + HEIGHT / step * i);
}

export default class Help {
    constructor() {
        this.f = false
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

        this.buttons = []
        var i = 0
        for (i = 0; i < 4; i++)
            if (!i) this.buttons.push(new Button(WIDTH / 3.2, this.coor[i], 120, 35))
        else this.buttons.push(new Button(WIDTH / 3.2, this.coor[i], 120, 35))

        this.back = new Button(20, 20, 40, 20)

        this.std = 0
        this.initEvent()
    }

    initEvent() {
        this.sflag = false
        this.y = 0
        this.d = 0
        addEventListener('touchstart', ((e) => {
            if (!this.state) return
            this.sflag = true
            this.y = e.touches[0].clientY
        }).bind(this))

        addEventListener('touchmove', ((e) => {
            if(!this.sflag)return
            this.d = e.touches[0].clientY - this.y

            if (this.std >= 100&&this.d>0)return
            else if(this.std<=-1600&&this.d<0)return

            this.y = e.touches[0].clientY
            this.std += this.d
        }).bind(this))

        addEventListener('touchend', ((e) => {
            this.sflag = false
        }).bind(this))
    }

    printf(content, i, j) {
        const bgg = canvas.getContext('2d') // 创建一个 2d context
        bgg.fillStyle = '#FFFFFF' // 矩形颜色
        bgg.fillRect(0, (HEIGHT / step - (i * 20) + HEIGHT / step * i) - 25 + this.std, WIDTH, 35)
        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.fillText(content, WIDTH / 3.2, HEIGHT / step - (i * 20) + HEIGHT / step * i + this.std)
        this.print_Image(i, j);
    }

    print_Image(i, j) {
        const ctx = canvas.getContext('2d');
        var a = new Image();
        var name = '';
        switch (j) {
            case 1:
            name = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/%E5%9E%83%E5%9C%BE/%E5%8F%AF%E5%9B%9E%E6%94%B6%E5%9E%83%E5%9C%BE/";
                break;
            case 2:
            name = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/%E5%9E%83%E5%9C%BE/%E5%B9%B2%E5%9E%83%E5%9C%BE/";
                break;
            case 3:
            name = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/%E5%9E%83%E5%9C%BE/%E6%B9%BF%E5%9E%83%E5%9C%BE/";
                break;
            case 4:
            name = "https://696d-image-tj86e-1300283647.tcb.qcloud.la/%E5%9E%83%E5%9C%BE/%E6%9C%89%E5%AE%B3%E5%9E%83%E5%9C%BE/";
                break;
        }
        a.src = name + i + '.png';
        ctx.drawImage(a, 250, (HEIGHT / step - (i * 20) + HEIGHT / step * i) - 30 + this.std, 50, 50);
    }

    check() {
        if (this.back.state) {
            if (this.state > 0) {
                this.state = 0
                this.std = 0
            } else if (!this.state) {
                this.state = -1
                this.f = false
            }
            this.back.cao()
        }
        if (!this.f || this.state > 0) return
        this.back.f = true
        var i = 0
        for (i = 0; i < 4; i++) {
            this.buttons[i].f = true
            if (this.buttons[i].state) {
                this.state = i + 1
                this.buttons[i].cao()
                return
            }
        }
    }

    render(x) {
        //ctx.fillStyle = "rgb(211, 229, 251)"
        ctx.fillStyle = '#F2F2F2'
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
        switch (x) {
            case 0:
                this.render0();
                break;
            case 1:
                this.render1();
                break;
            case 2:
                this.render2()
                break
            case 3:
                this.render3()
                break
            case 4:
                this.render4()
                break
        }
        ctx.fillStyle = "#e84393"
        ctx.font = "bold 20px Arial"
      const b = canvas.getContext('2d')
      var backPicture = new Image()
      backPicture.src = '返回2.png'
      b.drawImage(backPicture, 20, 10, 50, 50)
        //ctx.fillText("返回", 20, 10)
    }

    render1() {
        this.printf("一次性纸杯", 0, 1);
        this.printf("书本", 1, 1);
        this.printf("垃圾袋", 2, 1);
        this.printf("废弃衣物", 3, 1);
        this.printf("废弃衣物", 4, 1);
        this.printf("暖瓶", 5, 1);
        this.printf("牙膏管", 6, 1);
        this.printf("牙膏管", 7, 1);
        this.printf("牛奶玻璃瓶", 8, 1);
        this.printf("牛奶盒", 9, 1);
        this.printf("牛奶盒", 10, 1);
        this.printf("玻璃杯", 11, 1);
        this.printf("玻璃瓶", 12, 1);
        this.printf("矿泉水瓶", 13, 1);
        this.printf("胶瓶子", 14, 1);
        this.printf("镜子", 15, 1);
        this.printf("鞋子", 16, 1);
        this.printf("鱼罐头", 17, 1);
        this.printf("鱼罐头", 18, 1);
        //scroll-view
    }

    render2() {
        this.printf("口红", 0, 2);
        this.printf("回形针", 1, 2);
        this.printf("头发", 2, 2);
        this.printf("手套", 3, 2);
        this.printf("扫把", 4, 2);
        this.printf("牙膏", 5, 2);
        this.printf("纸尿布", 6, 2);
        this.printf("纸巾", 7, 2);
        this.printf("纽扣", 8, 2);
        this.printf("花盆", 9, 2);
        this.printf("贝壳", 10, 2);
        this.printf("扫把", 11, 2);
        this.printf("铅笔", 12, 2);
        this.printf("陶瓷", 13, 2);
        this.printf("牙膏", 14, 2);
        this.printf("纸尿布", 15, 2);
        this.printf("头发", 16, 2);
        this.printf("一次性餐具", 17, 2);
        this.printf("口红", 18, 2);
    }

    render3() {
        this.printf("便便", 0, 3);
        this.printf("西瓜皮", 1, 3);
        this.printf("调味料", 2, 3);
        this.printf("香蕉皮", 3, 3);
        this.printf("鱼骨", 4, 3);
        this.printf("鸡蛋壳", 5, 3);
        this.printf("剩菜饭", 6, 3);
        this.printf("树干", 7, 3);
        this.printf("巧克力", 8, 3);
        this.printf("橘子皮", 9, 3);
        this.printf("玉米", 10, 3);
        this.printf("糖果", 11, 3);
        this.printf("花生壳", 12, 3);
        this.printf("苹果核", 13, 3);
        this.printf("虾壳", 14, 3);
        this.printf("蛋糕", 15, 3);
    }

    render4() {
        this.printf("体温计", 0, 4);
        this.printf("合汞温度计", 1, 4);
        this.printf("圆珠笔芯", 2, 4);
        this.printf("废油漆桶", 3, 4);
        this.printf("打印机墨盒", 4, 4);
        this.printf("指甲油", 5, 4);
        this.printf("指甲油", 6, 4);
        this.printf("杀虫喷雾剂", 7, 4);
        this.printf("灯管", 8, 4);
        this.printf("电池", 9, 4);
        this.printf("电池", 10, 4);
        this.printf("相片底片", 11, 4);
        this.printf("老鼠药", 12, 4);
        this.printf("药物胶囊", 13, 4);
        this.printf("蓄电池", 14, 4);
        this.printf("血压器", 15, 4);
    }

    render0() {

        print("可回收垃圾", 0);
        print("干垃圾", 1);
        print("湿垃圾", 2);
        print("有害垃圾", 3);
    }
}