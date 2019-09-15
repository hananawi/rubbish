export default class Button {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.state = false
        this.flag = false
        this.f = false

        addEventListener('touchstart', ((e) => {
            if(!this.f)return
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY

            if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) this.flag = true
            //else this.flag = this.state = false
        }).bind(this))

        addEventListener('touchmove', ((e) => {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY

            if (!(x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height)) this.flag = false
        }).bind(this))

        addEventListener('touchend', ((e) => {
            this.state = this.flag
        }).bind(this))
    }

    cao(){
        this.flag = this.state = false
    }
}