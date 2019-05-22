;
(function() {
    // 添加hover事件实现图片的放大和缩小
    var $list = $('.home img');
    $list.hover(function() {

        var $imgWidth = parseInt($list.css('width'))
            // $list.eq($(this).index()).animate({
            //     width: "1000px"

        // })
        $(this).animate({
            width: $imgWidth * 1.1
        })

    }, function() {
        $list.animate({
            // width: 200
        });
    })
})();