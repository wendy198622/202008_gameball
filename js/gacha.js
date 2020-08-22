
// var sprite
// var view = document.getElementsByName("ballcanvas")
// let app = new PIXI.Application({
//     view:view[0]
//   }
// );
// app.renderer.backgroundColor = 0x061639;
// PIXI.loader
// .add("file:///F:/WorkSpace/202008_gameball/assets/ball7.png")
// .load(setup);
// function setup() {
//     sprite = new PIXI.Sprite(
//         PIXI.loader.resources["file:///F:/WorkSpace/202008_gameball/assets/ball7.png"].texture
//       );
//       app.stage.addChild(sprite);
//   }

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
var ballNum = 8;
var awardList = [];
var timer;
var award = document.getElementById('awardBall');
var message = document.getElementById('message');

function init() {
    for (let i = 0; i < ballNum; i++) {
        awardList[i] = new Ball(i, ballList[i]);
        awardList[i].init();
    }
    window.clearInterval(timer);
    timer = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < awardList.length; i++) {
            awardList[i].run();
        }
    }, 12);
}

function Ball(index, img) {
    this.img = img;
    this.r = this.img.width / 2;
    this.x = this.rand(canvas.width - this.r * 2);
    this.y = this.rand(canvas.height / 2 - this.r * 2);
    this.y = this.y + canvas.height / 2
    this.color = index;

    do {
        this.speedX = this.rand(20) - 10;
    } while (this.speedX < 5);

    do {
        this.speedY = this.rand(20) - 10;
    } while (this.speedY < 5);
}

Ball.prototype = {
    init: function () {
        ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
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
        ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
    }
}

init();