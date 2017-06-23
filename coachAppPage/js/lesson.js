$(function() {
    // swiper($('.swiper'), 2500);
    var id = getUrlParam("id");
    var _viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (_viewPortWidth == 640 || _viewPortWidth < 320) {
        $('.media320').show();
    }
    $.ajax({
        type: 'POST',
        url: '../GymRaiseCourseAction!getById.zk',
        data: {
            id: id
        },
        success: function(data) {
            data = eval('(' + data + ')');
            var coachInfo = data.gymRaiseCourse;
            $('#coachName').text(coachInfo.coachName);
            $('#maxP').text(coachInfo.maxPerson);
            $('#minp').text(coachInfo.minPerson);
            $('.swiper-int').css({
                'background': '#F4F4F4 url(\'../file/FileCenter!showImage2.zk?name=' + coachInfo.cover + '\')',
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                'background-position': 'center'
            });
            $('.lesson-info h2').html(coachInfo.name+"<h2 style='float:right;color:#49badc'>"+coachInfo.price+"元</h2>");
            $('#people').text(coachInfo.hasInvite);
            $('#month').text(coachInfo.minuteLong);
            $('#level span').text(coachInfo.strengthLevel);
            for (var i = 0; i < coachInfo.strengthLevel; i++) {
                $($('#power img')[i]).attr('src', 'img/Lightning_sel.png');
            }
            $('#introPic').attr('src', '../file/FileCenter!showImage2.zk?name=' + coachInfo.courseDetail);
            $('#cover').hide();
        }
    });
    connectWebViewJavascriptBridge(function(bridge) {
        // 初始化
        bridge.init(function(message, responseCallback) {
            var data = {
                'Javascript Responds': 'backBefore'
            };
            responseCallback(data);
        });
        // oc调用js方法
        bridge.registerHandler('zkBackEvent', function(data, responseCallback) {
            history.back();
            var responseData = 'success';
            responseCallback(responseData);
        });
        bridge.registerHandler('readyBack', function(data, responseCallback) {
            readyBack();
            var responseData = {
                'Javascript Says': 'readBack!'
            };
            responseCallback(responseData);
        });
    });
})

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge);
        }, false);
    }
}

function swiper(ele, time) {
    var slideLeft = {
        '-webkit-transform': 'translate3d(-100%, 0px, 0px)',
        '-webkit-transition': '-webkit-transform 400ms cubic-bezier(0.42, 0, 0.58, 1.0) 0.1s'
    };
    var slideCenter = {
        '-webkit-transform': 'translate3d(0%, 0px, 0px)',
        '-webkit-transition': '-webkit-transform 350ms cubic-bezier(0.42, 0, 0.58, 1.0) 0.1s'
    };
    var slideRight = {
        '-webkit-transform': 'translate3d(100%, 0px, 0px)',
        '-webkit-transition': '-webkit-transform 350ms cubic-bezier(0.42, 0, 0.58, 1.0) 0.1s'
    };
    var len = ele.length;
    var n = 0;
    setInterval(function() {
        $(ele[n]).css(slideLeft);
        if (n == len - 1) {
            for (var i = 1; i < len; i++) {
                $(ele[i]).css(slideRight);
            }
            $(ele[0]).css(slideCenter);
            n = 0;
        } else {
            $(ele[n + 1]).css(slideCenter);
            n++;
        }
    }, time);
}