! function() {
    //1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.
    function goodslist(id, count) {
        $.ajax({
            url: '../php/index2data.php', //获取所有的接口数据
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (id == value.picid) { //遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                    var $clonebox = $('.domestic-goods:hidden').clone(true, true);
                    $clonebox.find('.td_item_img').find('img').attr('src', value.url);
                    $clonebox.find('.td_item_img').find('img').attr('sid', value.picid);
                    $clonebox.find('.goods-d-info').find('a').html(value.title.split(',')[0]);
                    $clonebox.find('.goods-d-info1').find('a').html(value.title.split(',')[1]);
                    console.log(value.title)
                    $clonebox.find('.td_price em').find('b').html(value.price);
                    $clonebox.find('.td_sum').find('span').html(value.price);
                    $clonebox.find('.amount_change').find('input').val(count);
                    //计算每个商品的价格。
                    $clonebox.find('.td td_sum').find('span').html((value.price * count).toFixed(2));
                    $clonebox.css('display', 'block');
                    $('.cart_content_table').append($clonebox);
                    priceall(); //计算总价的
                }
            });
        })
    }
    //2.获取cookie，执行渲染列表的函数
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        var s = getcookie('cookiesid').split(','); //数组sid
        var n = getcookie('cookienum').split(','); //数组num
        $.each(s, function(i, value) {
            goodslist(s[i], n[i]);
        });
    }

    //3.如果购物车为空，显示empty-cart盒子(购物车空空的)
    kong();

    function kong() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            $('.cart_empty').hide(); //cookie存在，购物车有商品，隐藏盒子。
        } else {
            $('.cart_empty').show();
        }
    }

    //4.计算总价和总的商品件数，必须是选中的商品。
    function priceall() {
        var $sum = 0;
        var $count = 0;
        $('.goods-item:visible').each(function(index, element) {
            if ($(element).find('.cart-checkbox input').prop('checked')) {
                $sum += parseInt($(element).find('.quantity-form').find('input').val());
                $count += parseFloat($(element).find('.td_sum').find('span').html());
            }
        });
        console.log($sum)
        console.log($count)
        $('.selectproduct_box').find('em').html($sum);
        $('.new_commodity_money').html('￥' + $count.toFixed(2));
    }

    //5.全选操作
    $('.checkAllBtn').on('change', function() {
        $('.domestic-goods:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.checkAllBtn').prop('checked', $(this).prop('checked'));
        priceall(); //取消选项，重算总和。
    });

    var $inputs = $('.domestic-goods:visible').find(':checkbox');
    $('.item-list').on('change', $inputs, function() { //事件的委托的this指向被委托的元素
        if ($('.domestic-goods:visible').find('input:checkbox').length == $('.domestic-goods:visible').find('input:checked').size()) {
            $('.checkAllBtn').prop('checked', true);
        } else {
            $('.checkAllBtn').prop('checked', false);
        }
        priceall(); //取消选项，重算总和。
    });

    //6.数量的改变
    //改变商品数量++
    $('.amount_plus ').on('click', function() {
        var $count = $(this).parents('.domestic-goods').find('.amount_change input').val(); //值
        $count++;
        if ($count >= 99) {
            $count = 99;
        }
        $(this).parents('.domestic-goods').find('.amount_change input').val($count); //赋值回去
        $(this).parents('.domestic-goods').find('.td_sum').find('span').html(singlegoodsprice($(this))); //改变后的价格
        priceall(); //重新计算总和。
        setcookie($(this)); //将改变的数量重新添加到cookie

    });

    //改变商品数量--
    $('.amount_minus').on('click', function() {
        var $count = $(this).parents('.domestic-goods').find('.amount_change input').val();
        $count--;
        if ($count <= 1) {
            $count = 1;
        }
        $(this).parents('.domestic-goods').find('.amount_change input').val($count);
        $(this).parents('.domestic-goods').find('.td_sum').find('span').html(singlegoodsprice($(this))); //改变后的价格
        priceall();
        setcookie($(this));
    });

    //直接输入改变数量
    $('.amount_change input').on('input', function() {
        var $reg = /^\d+$/g; //只能输入数字
        var $value = parseInt($(this).val());
        if ($reg.test($value)) { //是数字
            if ($value >= 99) { //限定范围
                $(this).val(99);
            } else if ($value <= 0) {
                $(this).val(1);
            } else {
                $(this).val($value);
            }
        } else { //不是数字
            $(this).val(1);
        }
        $(this).parents('.domestic-goods').find('.td_sum').find('span').html(singlegoodsprice($(this))); //改变后的价格
        priceall();
        setcookie($(this));
    });

    //7.计算数量改变后单个商品的价格
    function singlegoodsprice(obj) { //obj:当前元素
        var $dj = parseFloat(obj.parents('.domestic-goods').find('.td_price').find('b').html()); //单价
        var $cnum = parseInt(obj.parents('.domestic-goods').find('.amount_change input').val()); //数量
        return ($dj * $cnum).toFixed(2); //结果
    }

    //8.将改变后的数量的值存放到cookie
    //点击按钮将商品的数量和id存放cookie中
    var arrsid = []; //商品的id
    var arrnum = []; //商品的数量
    //提前获取cookie里面id和num
    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
            arrnum = getcookie('cookienum').split(','); //cookie商品的num
        }
    }

    function setcookie(obj) { //obj:当前操作的对象
        cookietoarray(); //得到数组
        var $index = obj.parents('.domestic-goods').find('img').attr('sid'); //通过id找数量的位置
        arrnum[$.inArray($index, arrsid)] = obj.parents('.domestic-goods').find('.amount_change input').val();
        addcookie('cookienum', arrnum.toString(), 7);
    }

    //9.删除操作
    //删除cookie
    function delgoodslist(sid, arrsid) { //sid：当前删除的sid，arrsid:cookie的sid的值
        var $index = -1;
        $.each(arrsid, function(index, value) { //删除的sid对应的索引位置。 index:数组项的索引
            if (sid == value) {
                $index = index; //如果传入的值和数组的值相同，返回值对应的索引。
            }
        });
        arrsid.splice($index, 1); //删除数组对应的值
        arrnum.splice($index, 1); //删除数组对应的值
        addcookie('cookiesid', arrsid.toString(), 7); //添加cookie
        addcookie('cookienum', arrnum.toString(), 7); //添加cookie
    }

    //删除单个商品的函数(委托)
    $('.cart_list_wp').on('click', '.op_delete', function(ev) {
        cookietoarray(); //得到数组,上面的删除cookie需要。
        if (confirm('你确定要删除吗？')) {
            $(this).first().parents('.domestic-goods').remove(); //通过当前点击的元素找到整个一行列表，删除
            console.log($(this).first())
        }
        delgoodslist($(this).first().parents('.domestic-goods').find('img').attr('sid'), arrsid);
        priceall();
    });


    //删除全部商品的函数
    $('.chk_box a:first').on('click', function() {
        cookietoarray(); //得到数组,上面的删除cookie需要。
        if (confirm('你确定要全部删除吗？')) {
            $('.domestic-goods:visible').each(function() {
                if ($(this).find('input:checkbox').is(':checked')) { //复选框一定是选中的
                    $(this).remove();
                    delgoodslist($(this).find('img').attr('sid'), arrsid);
                }
            });
            priceall();
        }
    });


}();