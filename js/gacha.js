var ballfalling = document.getElementById('ballfalling');

class Gacha {

    constructor(canvasId, res) {
        this.awardList = [];
        this.timer;
        this.ballRes = res;
        this.canvas = document.getElementById(canvasId);
        this.callback;
        this.init();
    }

    init() {
        // var that = this
        this.awardList = [];
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.ballRes.length; i++) {
            var ball = document.getElementById(this.ballRes[i]);
            this.awardList[i] = new Ball(this.canvas, i, ball);
            this.awardList[i].init();
        }
    }

    startAndGetCacha(ball, callback) {
        $('.ballfalling').removeClass("start")

        for (let i = 0; i < this.ballRes.length; i++) {
            document.getElementById(this.ballRes[i]).style.display = "none";
        }

        var that = this;
        window.clearInterval(this.timer);
        this.timer = setInterval(function () {
            that.canvas.getContext('2d').clearRect(0, 0, that.canvas.width, that.canvas.height);
            for (let i = 0; i < that.awardList.length; i++) {
                that.awardList[i].run();
            }
        }, 10);

        setTimeout(() => {
            that.stop(ball)
        }, 1000)

        $('.ballfalling').bind("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend", function (event) {
            callback(ball)
            $('.ballfalling').unbind();
        })
    }

    stop(index) {
        // var that = this;
        window.clearInterval(this.timer);

        let i = this.awardList.map(function (e) { return e.type; }).indexOf(index);
        let ball;
        if (i > -1) {
            ball = this.awardList[i];
            // this.awardList.splice(i, 1);
        }
 
        $('.ballfalling').addClass("start")
        ball.img.removeAttribute("style")
    }
}

function Ball(canvas, index, img) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.img = img;
    this.r = this.img.width / 2;
    this.x = this.rand(canvas.width - this.r * 2);
    this.y = this.rand(canvas.height / 2 - this.r * 2);
    this.y = this.y + canvas.height / 2
    this.type = index;

    do {
        this.speedX = this.rand(20) - 10;
    } while (this.speedX < 5);

    do {
        this.speedY = this.rand(20) - 10;
    } while (this.speedY < 5);
}


Ball.prototype = {
    init: function () {
        this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
    },
    rand: function (num) {
        return Math.random() * num;
    },
    run: function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > this.canvas.width - this.r * 2) {
            this.speedX = -this.speedX;
        }
        if (this.x < 0) {
            this.speedX = Math.abs(this.speedX);
        }
        if (this.y > this.canvas.height - this.r * 2) {
            this.speedY = -this.speedY;
        }
        if (this.y < 0) {
            this.speedY = Math.abs(this.speedY);
        }
        this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
    }
}
