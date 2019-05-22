;
(function($) {
    $.fn.extend({
        tab: function(option) {
            var setting = {
                activeclass: 'active',
                tabbtn: '.logo-nav li',
                tabcontent: 'tab_content-navbar .item',
                etype: 'mouseover',
            };
            var endoption = $.extend(setting, option); //配置参数覆盖默认参数
            $(this).each(function(index, value) {
                var _this = $(this);
                if (endoption.etype == 'mouseover' || endoption.etype != 'click') {
                    $(this).find(endoption.tabbtn).on(endoption.etype, function() {
                        $(this).addClass(endoption.activeclass).siblings().removeClass(endoption.activeclass);
                        _this.find(endoption.tabcontent).eq($(this).index()).addClass('show').siblings().removeClass('show');

                    })
                } else {
                    throw new Error;
                }
            })
        }
    })
})(jQuery);