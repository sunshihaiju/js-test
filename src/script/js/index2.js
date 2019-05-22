;
! function() {
    // 进行数据的拼接
    ! function() {
        //1.拼接数据
        $.ajax({
            url: '../php/index2data.php',
            dataType: 'json'
        }).done(function(data) {
            var $html = '<ul class="sp-row clr">';
            console.log(data);
            $.each(data, function(index, value) {
                $html += `
                    <li class="list-item four">
                        <a href="details.html?sid=${value.picid}" target="_blank">
                          <div class="item-img">
                             <img  class="lazyload img-fir nsdx" src="${value.url}">
                             <img  class="lazyload img-sec" src="${value.url}">
                          </div>
                          <div class="item_info">
                                <p class="icon"><i>新季</i></p>
                                <h3>MOSCHINO</h3>
                                <p class="item_name">
                                ${value.title} 
                                </p>
                                <p class="item_price">
                                    <em></em><span>
                        <span class="red_price">¥1164</span> <del class="sale_price">¥${value.price}</del>
                                    </span>
                                </p>
                            </div>
                        </a>
                    </li>
                `;
            });
            $html += '</ul>';
            $('.list-items').html($html);
        });
    }();




}();