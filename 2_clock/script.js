var vm = new Vue({
    el: '#clock',
    data: {
        date: new Date()
    },
    computed: {
        hours(){
            return 'rotateZ(' + parseInt(this.date.getHours() * 30 + this.date.getMinutes() * 0.5) + 'deg) translateY(40px)';
        },
        minutes(){
            return 'rotateZ(' + parseInt(this.date.getMinutes() * 6 + this.date.getSeconds() * 0.1) + 'deg) translateY(50px)';
        },
        seconds(){
            return 'rotateZ(' + parseInt(this.date.getSeconds() * 6) + 'deg) translateY(60px)';
        }
    }
});

setInterval(function(){
    vm.date = new Date();
}, 1000);