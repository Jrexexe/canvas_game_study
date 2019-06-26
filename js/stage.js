
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 1900;
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
starLightImg.width = 200
starLightImg.height = 200
starLightImg.src = "images/rope/star_l.png";

// Star_d image
let starDarkReady = false;
var starDarkImg = new Image();
starDarkImg.onload = function () {
    starDarkReady = true;
};
starDarkImg.src = "images/rope/star_d.png";
starDarkImg.width = 200
starDarkImg.height = 200

let game_ready = false;


// Game objects

let gameConfig={
    speed : 400, // 数度
    round : 10, //轮数
    index:0,
    left:[2,4,6,8,10,12,14],
    right:[1,3,5,7,9,12,14]
}


let l_x = 320
let r_x = 600

let starFall={
    left:[
        {imgSrc:starDarkImg,x:l_x,y:0,scale:0},
        {imgSrc:starDarkImg,x:l_x,y:400,scale:0},
        {imgSrc:starDarkImg,x:l_x,y:800,scale:0},
        ],
    right:[
        {imgSrc:starDarkImg,x:r_x,y:-200,scale:0},
        {imgSrc:starDarkImg,x:r_x,y:300,scale:0},
        {imgSrc:starDarkImg,x:r_x,y:600,scale:0},
    ]
}
let star_y = 0;
let star_x = 0;
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



let x_aphe = 20
let scale_r = .06
let starSize={}
starSize.w = 100;
starSize.h = 100;

// Update game objects
var update = function (modifier) {
    function starAnimition(item,index) {
        item.y +=gameConfig.speed * modifier;
        if (item.x<361){
            item.x -= x_aphe * modifier;
            if ( item.y >= 1700){
                item.y = 0;
                item.x = l_x;
            }
        } else {
            item.x += x_aphe * modifier;
            if ( item.y >= 1700){
                item.y = 0;
                item.x = r_x;
            }
        }


        if (item.y > 800 && item.imgSrc !== starLightImg) {
            item.imgSrc = starLightImg;
        }
        if (item.y <= 800 && item.imgSrc !== starDarkImg) {
            item.imgSrc = starDarkImg;
        }

    }
    starFall.left.forEach(starAnimition)
    starFall.right.forEach(starAnimition)
    // 切换状态
    //  移动 放大

    if ('Space' in keysDown) { // Player holding up
        // hero.y -= hero.speed * modifier;
        console.log("Space");

    }else if ('ArrowLeft' in keysDown) { // Player holding up
        // hero.y -= hero.speed * modifier;
        console.log("<-");
        gameConfig.speed --;
    }else if ('ArrowRight' in keysDown) { // Player holding up
        // hero.y -= hero.speed * modifier;
        gameConfig.speed ++;
        console.log("->");
    }
};



// Draw everything
var render = function () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (starDarkReady && starLightReady) {
        function drawStar(item) {
            let s_w = starSize.w + item.y * scale_r
            let s_h = starSize.h + item.y * scale_r
            ctx.drawImage(item.imgSrc, item.x, item.y,s_w,s_h);
        }
        starFall.left.forEach( drawStar)
        starFall.right.forEach( drawStar)


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
