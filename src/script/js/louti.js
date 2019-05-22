;
(function() {
    // 添加鼠标事件实现微信 app等图片的出现
    var $dd = $('.right-tool .dd');
    var $tp = $('.right-tool .tp')
    var $img = $('.right-tool .dd img');
    var $p = $('.right-tool .dd p')
        // $dd.on('mouseover', function() {
        //         $img.hide();
        //         $p.show();
        //     })
    $dd.hover(function() {
                $(this).find('img').hide();
                $(this).find('p').show();
                $(this).find('span').show();
                $(this).find('span img').show();
            },
            function() {
                // $img.show();
                // $p.hide();
                $(this).find('img').show();
                $(this).find('p').hide();
                $(this).find('span ').hide();
                $(this).find('span img').hide();;
            }
        )
        // $tp.hover(function() {
        //             $(this).find('span img').show();

    //         },
    //         function() {
    //             // $img.show();
    //             // $p.hide();
    //             $(this).find('span img').hide();;
    //         }
    //     )
    // 点击回到顶层，回到顶层
    $('.dc').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        });
    });
})();