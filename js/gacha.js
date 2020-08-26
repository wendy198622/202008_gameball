
function Gacha(canvas, res) {
    var that = this;
    this.ballList = res;
    this.ballNum = res.length;
    this.awardList = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.timer;

    this.init = function () {

        for (let i = 0; i < that.ballNum; i++) {
            that.awardList[i] = new Ball(that.ctx, i, that.ballList[i]);
            that.awardList[i].init();
        }

        window.clearInterval(that.timer);
        that.timer = setInterval(function () {
            that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
            for (let i = 0; i < that.awardList.length; i++) {
                that.awardList[i].run();
                // console.log(1)
            }
        }, 12);
    }

    that.stopAndGetCacha = function (index) {
        window.clearInterval(that.timer);
        let i =  that.awardList.map(function(e) { return e.type; }).indexOf(index);
        let ball
        if(i > -1 ){
            ball = that.awardList[i];
            that.awardList.splice( i, 1);
            ball.img.setAttribute('class', 'start');
        }

        that.timer = setInterval(function () {
            that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
            for (let i = 0; i < that.awardList.length; i++) {
                that.awardList[i].run();
            }
        }, 12);
    }

}

function Ball(ctx, index, img) {
    this.ctx = ctx;
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
        if (this.x > canvas.width - this.r * 2) {
            this.speedX = -this.speedX;
        }
        if (this.x < 0) {
            this.speedX = Math.abs(this.speedX);
        }
        if (this.y > canvas.height - this.r * 2) {
            this.speedY = -this.speedY;
        }
        if (this.y < 0) {
            this.speedY = Math.abs(this.speedY);
        }
        this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
    }
}

var canvas = document.getElementById('ballcanvas');
var ctx = canvas.getContext('2d');
var ball1 = document.getElementById('ball1');
var ball2 = document.getElementById('ball2');
var ball3 = document.getElementById('ball3');
var ball4 = document.getElementById('ball4');
var ball5 = document.getElementById('ball5');
var ball6 = document.getElementById('ball6');
var ball7 = document.getElementById('ball7');
var ball8 = document.getElementById('ball8');
var ballList = [ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8];
var gacha = new Gacha(canvas, ballList);
gacha.init()
