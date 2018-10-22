$(function() {
    $('.article_content').find('table').each(function (idx, el) {
        $(el).wrap('<div class="table-overflow">')
    });

    function menuToggle()
    {
        $('#wrap').toggleClass('menu_on');
        $('.btn_menu').toggleClass('btn_menu_off');

        if ($('#wrap').has('menu_on')) {
            $('#container').removeClass('search_on');
            $('.area_search').hide();
        }
    }

    function searchToggle()
    {
        $('#container').toggleClass('search_on');
        $('.area_search').toggle();

        if ($('#container').has('search_on')) {
            $('#wrap').removeClass('menu_on');
        }
    }

    $('body').bind('click', function (e) {
        var $target = $(e.target);
        if ($target.closest('.btn_menu').length > 0) {
            menuToggle();
        } else if ($target.closest('.btn_search').length > 0) {
            searchToggle();
        } else if ($target.closest('.area_search').length == 0 && $target.closest('.area_menu').length == 0) {
            $('#wrap').removeClass('menu_on');
            $('.btn_menu').removeClass('btn_menu_off');
            $('#container').removeClass('search_on');
            $('.area_search').hide();
        }
    });

    $('#header .area_search .btn_search_del').bind('click', function() {
        var search_value = $('#header .area_search .inp_search').val();
    
        if(search_value) {
            $('#header .area_search .inp_search').val('').focus();
        } else {
            $('#header .area_search .inp_search').val('')
            searchToggle()
        }
    });

    $('.btn_fold').bind('click', function () {
        $('.box_comment_list').slideUp();
        $('.btn_fold').hide();
        $('.btn_spread').show();
    });
    $('.btn_spread').bind('click', function () {
        $('.box_comment_list').slideDown();
        $('.btn_spread').hide();
        $('.btn_fold').show();
    });

    $visitCounter = $('.visit_counter');
    $boxVisit = $('.box_visit');
    if ($visitCounter.length == false) {
        $boxVisit.hide();
    } else {
        $boxVisit.find('.data_today .item_visit').text($visitCounter.find('.today').text());
        $boxVisit.find('.data_yesterday .item_visit').text($visitCounter.find('.yesterday').text());
        $boxVisit.find('.data_total .item_visit').text($visitCounter.find('.total').text());
    }

    $('.menu_navigation').children('ul:first').addClass('list_gnb').find('a').addClass('link_gnb');
    $('.menu_navigation').children('.tt_category').children('li:first').children('a').hide();
    $('.menu_navigation').children('.tt_category').find('.category_list').addClass('list_gnb').children('li').children('a').addClass('link_gnb');
    $('.menu_navigation').find('.sub_category_list').addClass('list_lnb').find('a').addClass('link_lnb');

    var $relatedPost = $('.related_posts');
    if ($relatedPost.has()) {
        $('.related_posts_mobile').html($relatedPost.html());
    }
    var $aboutMe = $('.about_me_pc');
    if ($aboutMe.has()) {
        $('.about_me_mobile').html($aboutMe.html());
    }

    $('.menu_navigation').find('a').each(function () {
        $(this).addClass('link_lnb');
    });

    // index more post
    $('.index_type_common .list_gallery').each(function () {
        $container = $(this);
        if ($container.children('li').length >= 5) {
            $container.closest('.index_type_common').children('.btn_area').show();
        }
    });

    // index more post
    $('.index_type_common .list_horizontal').each(function () {
        $container = $(this);
        if ($container.children('li').length >= 3) {
            $container.closest('.index_type_common').children('.btn_area').show();
        }
    });

    // index more post
    $('.index_type_common.index_type_post').each(function (i) {
        $container = $(this);

        if ($container.children('div.article_content').length >= 2) {
            $container.closest('.index_type_common').children('.btn_area').show();
        }
    });

    $('.index_type_common .btn_post_more').bind('click', function () {
        var $btn = $(this),
            $container = $btn.closest('.index_type_common');
        
        if ($container.find('.index_list_container.list_gallery').length > 0) {
            $container.find('.index_list_container li.list_gallery_item:hidden').each(function(i) {
                var $o = $(this);
                if (i < 6) {
                    $o.slideDown();
                    $o.closest('.article_content').slideDown();
                    $o.css('display', 'inline-block');
                }
            });
        } else {
            $container.children('.index_list_container').children('li').slideDown();
            $container.children('.article_content').slideDown();
            $container.css('display', 'block');
        }
        
        // check, has hidden item
        if($container.children('.index_list_container').children('li:hidden').length == 0) {
            $btn.hide();
        }
    });

    $('.index_type_common .thumbnail_zone').each(function (i) {
        var $o = $(this);
        if ($o.children().length == 0) {
            $o.addClass('no-image');
        }
    });
    
    $('.category_list.index_type_common .article_content .thumbnail_post').each(function (i) {
        var path = $(this).css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        var pathname = $(location).attr('pathname'),
            base_path = window.TistoryBlog.url + pathname;
        
        if (path == base_path) {
            $(this).addClass('no_img');
        }
    });

    $('.inner_index h2.title_category').each(function (i) {
        var $o = $(this);
        if ($o.text() == '') {
            $o.hide();
        }
    });
});
