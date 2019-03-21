var vm = new Vue({
    el: '#main',
    data: {
        today: new Date(),
        select: new Date(),
        weekMode: false,
        caleOffsetX: 0,
        caleAnimationTimer: 0,
        caleTransition: false
    },
    computed: {
        // 计算当前日历数据
        weeks() {
            var m = new Date(this.select),
                d = [],
                currDay = 0,
                currWeek = 0;
            if (this.weekMode) {
                m.setDate(m.getDate() - m.getDay());
                d[currWeek] = d[currWeek] || new Array(7);
                for (var i = 0; i < d[currWeek].length; i++) {
                    d[currWeek][currDay] = m.getDate();
                    m.setDate(m.getDate() + 1);
                    currDay++;
                }
            } else {
                m.setDate(1);
                currDay = m.getDay();
                do {
                    d[currWeek] = d[currWeek] || new Array(7);
                    d[currWeek][currDay] = m.getDate();
                    m.setDate(m.getDate() + 1);
                    if (currDay == 6) {
                        currWeek++;
                        currDay = 0;
                    } else {
                        currDay++;
                    }
                } while (m.getDate() > 1);
            }
            return d;
        },
        // 绑定到cale上的transform样式
        caleTransform() {
            return 'translateX(' + this.caleOffsetX + 'px)';
        }
    },
    methods: {
        // 跳转n周或n月
        go(offset) {
            if (this.weekMode) {
                this.select.setDate(this.select.getDate() + offset * 7);
            } else {
                this.select.setMonth(this.select.getMonth() + offset);
            }
            this.select = new Date(this.select);
        },
        // 上一周或上一个月
        prev() {
            this.go(-1);
        },
        // 上一周或上一个月
        next() {
            this.go(1);
        },
        // 跳转到今天
        toToday(e) {
            this.today = new Date();
            this.select = new Date();
        },
        // 日期格式化
        dateFormat(oDate) {
            var year = oDate.getFullYear(),
                month = oDate.getMonth() + 1,
                date = oDate.getDate();
            if (month < 10) {
                month = '0' + month
            }
            if (date < 10) {
                date = '0' + date
            }
            return year + '-' + month + '-' + date;
        },
        // 日期选择事件
        clickDate(e){
            if(e.target.nodeName == 'LI'){
                if(parseInt(e.target.innerText) > 0){
                    this.select.setDate(e.target.innerText);
                    this.select = new Date(this.select);
                }
            }
        },
        // 左右滑动方法
        caleTouch(e) {
            var sep = null;
            switch (e.type) {
                case 'touchstart':
                    cancelAnimationFrame(this.caleAnimationTimer);
                    this.caleTouch.startX = e.touches[0].clientX - this.caleOffsetX;
                    break;
                case 'touchmove':
                    this.caleOffsetX = e.touches[0].clientX - this.caleTouch.startX;
                    break;
                case 'touchend':
                    this.caleTransition = false;
                    sep = document.body.clientWidth * 0.15;
                    if (Math.abs(this.caleOffsetX) < sep) {
                        this.caleAnimation(0);
                    } else if (this.caleOffsetX >= sep) {
                        this.caleAnimation(document.body.clientWidth, () => {
                            this.prev();
                            this.caleTransition = true;
                            this.caleOffsetX = 0;
                        });
                    } else if (this.caleOffsetX <= -sep) {
                        this.caleAnimation(-document.body.clientWidth, () => {
                            this.next();
                            this.caleTransition = true;
                            this.caleOffsetX = 0;
                        });
                    }
                    break;
            }
        },
        // 左右滑动动画实现
        caleAnimation(newCaleOffsetX, callback) {
            var speed = (newCaleOffsetX - this.caleOffsetX) > 0 ? 20 : -20;
            var step = () => {
                this.caleOffsetX += speed;
                this.caleAnimationTimer = requestAnimationFrame(step);
                if ((newCaleOffsetX == 0 && speed * this.caleOffsetX >= 0) || (newCaleOffsetX > 0 && this.caleOffsetX >= newCaleOffsetX) || (newCaleOffsetX < 0 && this.caleOffsetX <= newCaleOffsetX)) {
                    cancelAnimationFrame(this.caleAnimationTimer);
                    this.caleOffsetX = newCaleOffsetX;
                    if (callback) {
                        callback();
                    }
                }
            }
            this.caleAnimationTimer = requestAnimationFrame(step);
        }
    }
});




document.addEventListener('touchstart', documentTouch);
document.addEventListener('touchmove', documentTouch);
document.addEventListener('touchend', documentTouch);
var oCale = document.getElementsByClassName('cale')[0],
    documentTouchY = 0,
    prevCaleHeight = 0,
    documentAnimationTimer = 0;

// document的事件处理
function documentTouch(event) {
    event = event || window.event;
    switch (event.type) {
        case 'touchstart':
            cancelAnimationFrame(documentAnimationTimer);
            documentTouchY = event.touches[0].clientY;
            prevCaleHeight = oCale.clientHeight;
            break;
        case 'touchmove':
            oCale.style.height = prevCaleHeight + event.touches[0].clientY - documentTouchY + 'px';
            if(oCale.clientHeight < 78){
                oCale.style.height = '78px';
            } else if(oCale.clientHeight > 298){
                oCale.style.height = '298px';
            }
            break;
        case 'touchend':
            if(oCale.clientHeight < 188){
                documentAnimation(78, function(){
                    vm.weekMode = true;
                });
            } else {
                documentAnimation(298, function(){
                    vm.weekMode = false;
                });
            }
            break;
    }
}

// document上下滑动动画实现
function documentAnimation(newCaleOffsetY, callback) {
    var speed = (newCaleOffsetY - oCale.clientHeight) > 0 ? 20 : ((newCaleOffsetY - oCale.clientHeight) < 0 ? -20 : 0);
    var step = () => {
        oCale.style.height = oCale.clientHeight + speed + 'px';
        documentAnimationTimer = requestAnimationFrame(step);
        if (oCale.clientHeight <= 78 || oCale.clientHeight >= 298) {
            cancelAnimationFrame(documentAnimationTimer);
            oCale.style.height = newCaleOffsetY + 'px';
            if (callback) {
                callback();
            }
        }
    }
    documentAnimationTimer = requestAnimationFrame(step);
}

// 没有用百分比，所以请用浏览器移动端页面360px窗口宽度浏览
// 代码有很多优化的地方，时间原因，就先这样吧，自己测试了一会没发现BUG
// Author: 沙福成
// Email: zoyen2016@163.com