/* 
详细的API
配置参数(默认参数和配置参数)
不能影响其他的代码
*/
;
(function(window) {

    function Tab(option) {
        this.setting = { //默认参数
            id: '#tab',
            etype: 'onmouseover', //切换的事件类型
            tabtimer: false, //自动切换
            invoke: 0 //默认从哪项开始
        };
        this.option = option; //配置参数
        // 用配置参数覆盖默认函数
        this.init();
    }

    Tab.prototype.init = function() {
        // 圆形里面初始化方法
        //配置参数覆盖默认参数
        Object.assign(this.setting, this.option);
        this.tab = document.querySelector(this.setting.id);
        this.tabtitle = this.tab.querySelectorAll('.sex li');
        this.tabcontent = this.tab.querySelectorAll('.navbar .list-item');
        this.num = 0; //存放当前点击标题的索引
        this.timer = null; //鼠标移入移出的返回值
        this.autotimer = null; //自动轮播的返回值
        var _this = this;


        for (var i = 0; i < this.tabtitle.length; i++) {
            this.tabtitle[i].index = i;
            if (this.setting.etype == 'onmouseover' || this.setting.etype != 'onclick') {
                this.tabtitle[i].onmouseover = function() {
                    _this.num = this.index;
                    _this.tabswitch();
                }
            } else {
                //防止tab切换频繁触发。
                this.tabtitle[i][this.setting.etype] = function() {
                    _this.num = this.index;
                    _this.timer = setTimeout(function() {
                        _this.tabswitch();
                    }, 400);
                };
                this.tabtitle[i].onmouseout = function() {
                    clearTimeout(_this.timer);
                }
            }
        }

        //判断是否自动切换
        if (this.setting.tabtimer) {
            this.autoplay();
            this.tab.onmouseover = function() {
                clearInterval(_this.autotimer);
            };
            this.tab.onmouseout = function() {
                _this.autoplay();
            }
        }
        //默认从哪项开始
        if (this.setting.invoke && this.setting.invoke > 0 && this.setting.invoke <= this.tabtitle.length) {
            this.num = this.setting.invoke - 1;
            this.tabswitch();
        } else {
            this.num = 0;
        }

    }

    //切换过程
    Tab.prototype.tabswitch = function() {
        for (var i = 0; i < this.tabtitle.length; i++) {
            this.tabtitle[i].className = '';
            this.tabcontent[i].className = 'list-item';
        }
        this.tabtitle[this.num].className = 'active';
        this.tabcontent[this.num].className = 'list-item show';
    }

    //自动切换
    // Tab.prototype.autoplay = function() {
    //     var _this = this;
    //     this.autotimer = setInterval(function() {
    //         _this.num++;
    //         if (_this.num > _this.tabtitle.length - 1) {
    //             _this.num = 0;
    //         }
    //         _this.tabswitch();
    //     }, 3000);
    // }


    window.Tab = Tab; //将构造函数暴露出来
})(window);