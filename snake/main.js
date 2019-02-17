var box = document.getElementById('box');
var btnNewGame = document.getElementById('btnNewGame');
var btnPause = document.getElementById('btnPause');

var fx = 2;
var fxed = 2;
var head = undefined;
var body = [];
var food = undefined;
var dsq = undefined;
var speed = 200;

bind();
newGame();

function random19() {
    var num = Math.floor(Math.random() * 20);
    if (num == 20) {
        num = 19;
    }
    return num;
}

function init() {
    head = createBody(1, 0, 'head');
    body = [createBody(0, 0, 'h')];
    food = createBody(10, 10, 'food');
}
function bind() {
    btnNewGame.onclick = newGame;
    btnPause.onclick = pause;
    document.onkeydown = keyd;
}
function newGame() {
    clearInterval(dsq);
    fxed = fx = 2;
    box.innerHTML = '';
    btnPause.innerText = '暂停';
    init();
    box.style.transform = 'none';
    dsq = setInterval('run();', speed);
}
function pause() {
    if (btnPause.innerText == '暂停') {
        clearInterval(dsq);
        box.removeAttribute('style');
        btnPause.innerText = '继续';
    } else {
        dsq = setInterval('run();', speed);
        box.style.transform = 'none';
        btnPause.innerText = '暂停';
    }
}


function z_randon(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randonFood() {
    if (body.length == 20 * 20 - 2) {
        return;
    }
    food.x = random19();
    food.y = random19();
    if (food.x == head.x && food.y == head.y) {
        randonFood();
        return;
    }
    for (var i = 0; i < body.length; i++) {
        if (food.x == body[i].x && food.y == body[i].y) {
            randonFood();
            return;
        }
    }
    food.e.style.left = food.x * 25 + 'px';
    food.e.style.top = food.y * 25 + 'px';
}
function keyd(e) {
    switch (e.which) {
        case 38:
            if (fxed != 3) {
                fx = 1;
            }
            break;
        case 39:
            if (fxed != 4) {
                fx = 2;
            }
            break;
        case 40:
            if (fxed != 1) {
                fx = 3;
            }
            break;
        case 37:
            if (fxed != 2) {
                fx = 4;
            }
            break;
    }
}
function createBody(x, y, type) {
    var body = { e: document.createElement('div'), x, y };
    body.e.className = 'grid ' + type;
    body.e.style.left = body.x * 25 + 'px';
    body.e.style.top = body.y * 25 + 'px';
    box.appendChild(body.e);
    return body;
}
function run() {
    var headNext = { x: head.x, y: head.y }
    fxed = fx;
    switch (fxed) {
        case 1:
            head.y--;
            break;
        case 2:
            head.x++;
            break;
        case 3:
            head.y++;
            break;
        case 4:
            head.x--;
            break;
    }
    // 撞墙检测
    if (head.x < 0 || head.x > 19 || head.y < 0 || head.y > 19) {
        gameover();
        return;
    }
    // 吃检测
    if (head.x == food.x && head.y == food.y) {
        body.unshift(createBody(headNext.x, headNext.y, (fxed == 2 || fxed == 4) ? 'h' : 'z'));
        randonFood();
    } else {
        for (var i = 0; i < body.length; i++) {
            if (head.x == body[i].x && head.y == body[i].y) {
                gameover();
                return;
            }
        }
        body.unshift(body.pop());
        body[0].x = headNext.x;
        body[0].y = headNext.y;
        body[0].e.className = 'grid ' + ((fxed == 2 || fxed == 4) ? 'h' : 'z');
        body[0].e.style.left = body[0].x * 25 + 'px';
        body[0].e.style.top = body[0].y * 25 + 'px';
    }
    head.e.style.left = head.x * 25 + 'px';
    head.e.style.top = head.y * 25 + 'px';
}

function gameover() {
    clearInterval(dsq);
    box.removeAttribute('style');
}