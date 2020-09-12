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
            var ball = convertImg(this.ballRes[i])
            //document.getElementById(this.ballRes[i]);
            this.awardList[i] = new Ball(this.canvas, this.ballRes[i], ball);
            this.awardList[i].init();
        }
    }

    startAndGetCacha(ball, callback) {
        var that = this;
        $('.ballfalling').removeClass("start");

        that.reset();
        
        window.clearInterval(this.timer);
        this.timer = setInterval(function () {
            that.canvas.getContext('2d').clearRect(0, 0, that.canvas.width, that.canvas.height);
            for (let i = 0; i < that.awardList.length; i++) {
                that.awardList[i].run();
            }
        }, 10);

        setTimeout(() => {
            that.stop(ball)
        }, 3000)

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

    reset() {
        for (let i = 0; i < this.ballRes.length; i++) {
            var img = convertImg(this.ballRes[i])
            img.style.display = "none";
            this.awardList[i].init();
        }

    }
}


function convertImg(ball) {
    switch (ball) {
        case "other1":
            return document.getElementById("ball1")
        case "other2":
            return document.getElementById("ball2")
        case "other3":
            return document.getElementById("ball3")
        case "other4":
            return document.getElementById("ball4")
        case "other5":
            return document.getElementById("ball5")
        case "money":
            return document.getElementById("ball8")
        case "coupon":
            return document.getElementById("ball6")
        case "gift":
            return document.getElementById("ball7")
    }
}


function Ball(canvas, type, img) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.img = img;
    this.r = this.img.width;
    this.x = this.rand(canvas.width - this.r);
    this.y = this.rand(canvas.height - this.r);
    // this.y = this.y + canvas.height / 2
    this.type = type;

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
        if (this.x > this.canvas.width - this.r) {
            this.speedX = -this.speedX;
            this.x = this.canvas.width - this.r;
        }
        if (this.x < 0) {
            this.speedX = Math.abs(this.speedX);
            this.x = 0;
        }
        if (this.y > this.canvas.height - this.r) {
            this.speedY = -this.speedY;
            this.y = this.canvas.height - this.r;
        }
        if (this.y < 0) {
            this.speedY = Math.abs(this.speedY);
            this.y = 0;
        }
        this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
    }
}
