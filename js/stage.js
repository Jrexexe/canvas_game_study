
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";


// Star_l image
let starLightReady = false;
var starLightImg = new Image();
starLightImg.onload = function () {
    starLightReady = true;
};

starLightImg.src = "images/rope/star_l.png";

// Star_d image
let starDarkReady = false;
var starDarkImg = new Image();
starDarkImg.onload = function () {
    starDarkReady = true;
};
starDarkImg.src = "images/rope/star_d.png";

let game_ready = false;


// Game objects

let gameConfig={
    speed : 200, // 数度
    round : 10, //轮数
    index:0,
    left:[2,4,6,8,10,12,14],
    right:[1,3,5,7,9,12,14]
}

let starFall={
    left:[],
    right:[]
}
let star_y = 0;
let canHitDistanceFromTop = 900; //多长的距离能够击打从上面掉下来的星星

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    console.log(e);
    keysDown[e.code] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.code];
}, false);


// next the game when the player hit or fallout
var next = function () {
    starFall.index++;
    // Throw the monster somewhere on the screen randomly

};


// Update game objects
var update = function (modifier) {
    if ('Space' in keysDown) { // Player holding up
        // hero.y -= hero.speed * modifier;
        console.log("Space");

    }else if ('ArrowLeft' in keysDown) { // Player holding up
        // hero.y -= hero.speed * modifier;
        console.log("<-");
        star_y --;
    }else if ('ArrowRight' in keysDown) { // Player holding up
        // hero.y -= hero.speed * modifier;
        star_y ++;
        console.log("->");
    }
};


// Draw everything
var render = function () {
    if (starDarkReady) {
        ctx.drawImage(starLightImg, 0, star_y);
    }
    // if (bgReady) {
    //     ctx.drawImage(bgImage, 0, 0);
    // }
    //
    // if (heroReady) {
    //     ctx.drawImage(heroImage, hero.x, hero.y);
    // }
    //
    // if (monsterReady) {
    //     ctx.drawImage(monsterImage, monster.x, monster.y);
    // }
    //
    // // Score
    // ctx.fillStyle = "rgb(250, 250, 250)";
    // ctx.font = "24px Helvetica";
    // ctx.textAlign = "left";
    // ctx.textBaseline = "top";
    // ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};


// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
next();
main();


// 还需要想一个容器来装目前在可视范围内的星星，然后移动星星，移动的时候判断距离，如果大于某个距离就显示亮的，小于就暗，亮的在按键按下的时候会对应消失，移动超过一个距离的就将该对象从容器删除
