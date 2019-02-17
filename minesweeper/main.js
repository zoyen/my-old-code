var box = document.getElementById('box');
var btnNewGame = document.getElementById('btnNewGame');

var data = undefined;

init();
bindEvent();
newGame();

function init() {
    var grid = undefined;
    for (var i = 0; i < 100; i++) {
        grid = document.createElement('div');
        grid.className = 'grid';
        grid.setAttribute('row', parseInt(i / 10));
        grid.setAttribute('col', parseInt(i % 10));
        box.appendChild(grid);
    }
}

function bindEvent() {
    btnNewGame.onclick = newGame;
    for (var i = 0; i < box.children.length; i++) {
        box.children[i].onclick = gridClick;
        box.children[i].oncontextmenu  = mrightClick;
    }
}


function gridClick() {
    if (this.innerText != '') {
        return;
    }
    var row = parseInt(this.getAttribute('row'));
    var col = parseInt(this.getAttribute('col'));
    if (data[row][col] == 0) {
        kuosan(row, col);
    } else {
        for (var i = 0; i < box.children.length; i++) {
            var row = parseInt(box.children[i].getAttribute('row'));
            var col = parseInt(box.children[i].getAttribute('col'));
            if (data[row][col] == 1) {
                box.children[i].innerText = '雷';
                box.children[i].style.background = '#f00';
                box.children[i].style.color = '#fff';
            }
        }
        gameOver();
    }
}

function kuosan(row, col) {
    var lei = 0;
    var p = [
        { row: row - 1, col: col - 1 },
        { row: row - 1, col: col },
        { row: row - 1, col: col + 1 },
        { row: row, col: col - 1 },
        { row: row, col: col + 1 },
        { row: row + 1, col: col - 1 },
        { row: row + 1, col: col },
        { row: row + 1, col: col + 1 },
    ];
    for (var i = 0; i < p.length; i++) {
        if (p[i].row >= 0 && p[i].row <= 9 && p[i].col >= 0 && p[i].col <= 9 && data[p[i].row][p[i].col] != 0) {
            lei++;
        }
    }
    if (row >= 0 && row <= 9 && col >= 0 && col <= 9) {
        if (box.children[row * 10 + col].innerText != '') {
            return;
        }
        box.children[row * 10 + col].innerText = lei;
        box.children[row * 10 + col].style.background = '#ccc';
        if (lei == 0) {
            box.children[row * 10 + col].style.color = '#eee';
            box.children[row * 10 + col].style.background = '#eee';
            for (var i = 0; i < p.length; i++) {
                kuosan(p[i].row, p[i].col);
            }
        }
    }
    isWin();
}

function mrightClick(){
    if (this.innerText == '') {
        this.innerText = '标';
        this.style.background = '#ff0';
    } else if(this.innerText == '标'){
        this.innerText = '';
        this.removeAttribute('style');
    }
    isWin();
    return false;
}
function isWin(){
    for(var i = 0; i< box.children.length; i++){
        if(box.children[i].innerText == ''){
            return;
        }
        if(box.children[i].innerText == '标'){
            var row = parseInt(box.children[i].getAttribute('row'));
            var col = parseInt(box.children[i].getAttribute('col'));
            if(data[row][col] == 0){
                return;
            }
        }
    }
    gameOver();
}
// 随机一个雷
function randomGrid() {
    var row = undefined;
    var col = undefined;
    do {
        row = parseInt(Math.random() * 10);
        col = parseInt(Math.random() * 10);
    } while (data[row][col] != 0);
    data[row][col] = 1;
}

// 新游戏
function newGame() {
    // 清除所有雷
    data = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    // 添加雷
    for (var i = 0; i < 10; i++) {
        randomGrid();
    }
    // 清除View
    for (var i = 0; i < box.children.length; i++) {
        box.children[i].innerText = '';
        box.children[i].removeAttribute('style');
    }
    box.style.transform = 'none';
}

// 游戏结束
function gameOver() {
    box.style.transform = 'perspective(800px) rotateX(30deg)';
}