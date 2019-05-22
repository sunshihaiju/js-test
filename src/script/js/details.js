! function() {
    //1.获取sid
    var picid = location.search.substring(1).split('=')[1];


    //2.将当前的id传给后端获取对应的数据
    $.ajax({
        url: '../php/detail.php',
        data: {
            sid: picid
        },
        dataType: 'json'
    }).done(function(data) { //data:后端返回的和id对应的数据
        console.log(data);
        $('#smallpic').attr('src', data.url);
        $('#bpic').attr('src', data.url);
        $('#smallpic').attr('sid', data.picid);
        // $('.loadtitle').html(data.titile);
        // $('.loadpcp').html(data.price);
        var arr1 = data.title.split(' ');
        console.log(arr1)
        $('.loadtitle1').html(arr1[0]);
        $('.loadtitle1').html(arr1[2]);
        $('.priceSpanTwo').html(data.price)
        var arr = data.urllist.split(',');
        console.log(arr);
        var str = '';
        $.each(arr, function(index, value) {
            str += '<div class="fdj-bullet fdj-bullet-active"><img src="' + value + '" alt="" width="70" height="93"/></div>';
        });
        $('.leftbox-inner').html(str);

    });

    //3.放大镜效果

    ! function() {

        $('#sf').width($('#spic').width() * $('#bf').width() / $('#bpic').width());
        $('#sf').height($('#spic').height() * $('#bf').height() / $('#bpic').height());
        var bili = $('#bpic').width() / $('#spic').width();
        $('#spic').hover(function() {
            $('#sf').css('visibility', 'visible');
            $('#bf').css('visibility', 'visible');
            $(this).on('mousemove', function(ev) {
                var $left = ev.pageX - $('.fdj-video').offset().left - $('#sf').width() / 2;
                var $top = ev.pageY - $('.fdj-video').offset().top - $('#sf').height() / 2;
                $(this).parents(".fdj").next().hide();
                if ($left < 0) {
                    $left = 0;
                } else if ($left >= $('#spic').width() - $('#sf').width()) {
                    $left = $('#spic').width() - $('#sf').width();
                }
                if ($top < 0) {
                    $top = 0;
                } else if ($top >= $('#spic').height() - $('#sf').height()) {
                    $top = $('#spic').height() - $('#sf').height();
                }
                $('#sf').css('left', $left);
                $('#sf').css('top', $top);
                $('#bpic').css('left', -$left * bili);
                $('#bpic').css('top', -$top * bili);
            });
            $(this).on('mouseout', function(ev) {
                $(this).parents(".fdj").next().show();
            })
        }, function() {
            $('#sf').css('visibility', 'hidden');
            $('#bf').css('visibility', 'hidden');
        });

        //     //点击小图切换
        $('.leftbox-inner').on('click', 'div', function() {
            var $imgurl = $(this).find('img').attr('src');
            $('#smallpic').attr('src', $imgurl);
            $('#bpic').attr('src', $imgurl);
        });

        //点击箭头进行切换
        var $num = 1; //放大镜显示3张。
        $('.butten-up').on('click', function() {
            var $list = $('.leftbox-inner div'); //8
            if ($list.length > $num) {
                $num++;
                // $('#left').css('color', '#333');
                // if ($list.length == $num) {
                //     $('#right').css('color', '#fff');
                // }
                $('.leftbox-inner').animate({
                    top: -($num - 1) * ($list.eq(0).innerHeight() + 14)
                })
            }
        });

        $('.butten-down').on('click', function() {
            var $list = $('.leftbox-inner div'); //8
            if ($num > 1) {
                $num--;
                // $('#right').css('color', '#333');
                // if ($num <= 3) {
                //     $('#left').css('color', '#fff');
                // }
                $('.leftbox-inner').animate({
                    top: -($num - 1) * ($list.eq(0).innerHeight() + 14)
                })
            }
        });
    }();

    //购物车的思路
    //存放商品的sid和商品的数量--数组实现。
    //如果商品第一次存购物车，存放的是商品的sid和商品的数量。
    //如果是第二次购买商品，从第二次开始改变数量。

    //疑问：判断商品是第一次存还是多次存储。

    //1.解决方式：提前获取cookie里面id和num
    //点击按钮将商品的数量和id存放cookie中
    var arrsid = []; //商品的sid
    var arrnum = []; //商品的数量
    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
            arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
            arrnum = getcookie('cookienum').split(','); //cookie商品的num
        }
    }

    //2.有了上面的方法，可以点击加入购物车按钮判断商品是否是第一次还是多次。

    $('.add-bag-btn').on('click', function() { //点击加入购物车按钮。

        //     //判断当前的商品sid是否存在购物车(cookie)
        //     //判断当前的按钮对应的商品的sid和取出的cookie里面的sid进行比较

        //     //获取当前的按钮对应的商品的sid
        var $sid = $(this).parents('.detail-pic-box').find('#smallpic').attr('sid');
        cookietoarray(); //获取已经存在的cookie值。

        if ($.inArray($sid, arrsid) != -1) { //商品存在，数量叠加 
            //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
            var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + 1;
            arrnum[$.inArray($sid, arrsid)] = num;
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie

        } else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
            arrsid.push($sid); //将当前的id存入数组
            addcookie('cookiesid', arrsid.toString(), 10); //数组存入cookie
            arrnum.push(1);
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie
        }
    });

}();