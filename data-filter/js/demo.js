var store = createStore({ sex: 'all', text: '' })
store.subscribe(function (_store) {
    render(oList, filter(data, _store), _store);
});

// 工具函数：防抖
function debounce(_callback, _delay) {
    var _timer;
    return function () {
        var _self = this,
            _arg = arguments;
        clearTimeout(_timer);
        _timer = setTimeout(function () {
            _callback.apply(_self, _arg);
        }, _delay);
    }
}

// 测试数据
var data = [
    { name: '李哲', sex: 'male', head: 'img/1.jpg', keyword: ['山东 泰安', 'null', 'firstSVIP', '大佬'], star: 0 },
    { name: '梦幻', sex: 'male', head: 'img/2.jpg', keyword: ['列支敦士登', '大佬'], star: 0 },
    { name: '面朝大海，绽放你的微笑', sex: 'male', head: 'img/3.jpg', keyword: ['新疆 乌鲁木齐', '大佬'], star: 0 },
    { name: '丹凤', sex: 'female', head: 'img/4.jpg', keyword: ['海南 海口', '大佬'], star: 0 },
    { name: 'X石神', sex: 'male', head: 'img/5.jpg', keyword: ['四川 成都', '大佬'], star: 0 },
    { name: '张廷军', sex: 'male', head: 'img/6.jpg', keyword: ['安道尔', '和谐', '大佬'], star: 0 },
    { name: 'JDI', sex: 'female', head: 'img/7.jpg', keyword: ['爱尔兰 都柏林', '大佬'], star: 0 },
    { name: 'Be your guardian', sex: 'male', head: 'img/8.jpg', keyword: ['四川 眉山', '大佬'], star: 0 },
    { name: '冫氵真的⁶⁶⁶₆₆₆⁶⁶⁶', sex: 'male', head: 'img/9.jpg', keyword: ['江苏 南通', '大佬'], star: 0 },
    { name: '365', sex: 'male', head: 'img/10.jpg', keyword: ['假妹子', '大佬'], star: 0 },
    { name: '9', sex: 'male', head: 'img/11.jpg', keyword: ['河北 承德', '大佬'], star: 0 },
    { name: '有病的人', sex: 'male', head: 'img/12.jpg', keyword: ['广东 广州', '大佬'], star: 0 },
    { name: '沙福成', sex: 'male', head: 'img/13.jpg', keyword: ['吉林 松原', 'ZOYEN'], star: 0 }
];

// 以下是DOM操作
var oFilterText = document.getElementsByClassName('filter-text')[0],
    oFilterSex = document.getElementsByClassName('filter-sex')[0],
    oList = document.getElementById('list');

// 输入事件
oFilterText.addEventListener('input', debounce(function (e) {
    store.dispatch('text', this.value)
    window.location.hash = this.value;
}, 600));

// 切换性别事件
oFilterSex.addEventListener('click', function (_event) {
    _event = _event || window.event;
    var _className = 'active';
    if (_event.target.parentNode == this && !_event.target.classList.contains(_className)) {
        Array.prototype.forEach.call(this.getElementsByClassName(_className), function (_ele) {
            _ele.classList.remove(_className);
        });
        _event.target.classList.add(_className)
        store.dispatch('sex', _event.target.getAttribute('sex'));
    }
});

// 初始化
function init() {
    if (window.location.hash != '') {
        oFilterText.value = decodeURI(window.location.hash.replace(/^#/, ''));
        store.dispatch('text', oFilterText.value);
    } else {
        store.dispatch();
    }
}
init();