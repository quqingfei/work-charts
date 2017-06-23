var cid = getUrlParam("cid");
var uid = getUrlParam("userId");
var course = getUrlParam("course");
$(function() {

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
            var responseData = '';
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
    $('#commentAll').click(function() {
        window.location.href = 'comment.html?cid=' + cid;
    })
    $('.comment-show').hide();
    $.ajax({
        type: 'POST',
        url: '../CoachAction!isFocus.zk',
        data: {
            userId: uid,
            coachId: cid
        },
        success: function(data) {
            data = eval('(' + data + ')');
            if (data.isfocus == 'y') {
                following();
            } else {
                unfollow();
            }
        }
    })
    $.ajax({
        type: 'POST',
        url: '../GymGroupCourseAction!getCoachById.zk',
        data: {
            id: cid
        },
        success: function(data) {
            data = eval('(' + data + ')');
            var imgList = data.coach.coachPicture.split(',');
            for (var i = 0; i < imgList.length; i++) {
                imgList[i];
                // if (i == 0) {
                //     $('.swiper-int').css({
                //         'background': '#ccc url(\'../file/FileCenter!showImage2.zk?name=' + imgList[i] + '\')',
                //         'background-repeat': 'no-repeat',
                //         'background-size': 'cover',
                //         'background-position': 'center'
                //     });
                // } else {
                var li = $('<div>').attr('class', 'swiper-slide').css({
                    'background': '#ccc url(\'../file/FileCenter!showImage2.zk?name=' + imgList[i] + '\')',
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover',
                    'background-position': 'center'
                });
                $('.swiper-wrapper').append(li);
                // }
            }
            // swiper($('.swiper'), 2500);
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                // 如果需要分页器
                pagination: '.swiper-pagination'
            })
            $('#coachHead').css({
                'background': '#ccc url(\'../file/FileCenter!showImage2.zk?name=' + data.coach.headIcon + '\')',
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                'background-position': 'center'
            });
            coachLevel(data.coach.coachLevel);
            $('#coachInfo h3').text(data.coach.name);
            $('#coachInfo p').text(data.coach.signature);
            $('#coachIntro').html(data.coach.coachDetail.replace(/\n/g, "<br>"));
            var avgEvaluate = data.avgEvaluate[0];
            var major = parseInt(avgEvaluate.avgMajorEvaluate);
            $($('.expert span')[1]).text(avgEvaluate.avgMajorEvaluate.toFixed(1));
            for (var i = 0; i < major; i++) {
                $($('.expert .star img')[i]).attr('src', 'img/xing.png');
            }
            if (avgEvaluate.avgMajorEvaluate > major) {
                $($('.expert .star img')[major]).attr('src', 'img/xing1.png');
            }
            var service = parseInt(avgEvaluate.avgServiceEvaluate)
            $($('.service span')[1]).text(avgEvaluate.avgServiceEvaluate.toFixed(1));
            for (var i = 0; i < service; i++) {
                $($('.service .star img')[i]).attr('src', 'img/xing.png');
            }
            if (avgEvaluate.avgServiceEvaluate > service) {
                $($('.service .star img')[service]).attr('src', 'img/xing1.png');
            }

            var comments = data.comment;
            if (comments.length > 0) {
                //总评论数
                $('#commentCount').text(data.eCount);
                var comment = comments[0];
                // console.log(comment);
                $('.comment-show').show();
                if (comment.anonymous == 'n') {
                    $('#commentHead').css({
                        'background': '#ccc url(\'../file/FileCenter!showImage2.zk?name=' + comment.userIcon + '\')',
                        'background-repeat': 'no-repeat',
                        'background-size': 'cover',
                        'background-position': 'center'
                    });
                } else {
                    $('#commentHead').css({
                        'background': '#ccc url(\'img/demo.jpg\')',
                        'background-repeat': 'no-repeat',
                        'background-size': 'cover',
                        'background-position': 'center'
                    });
                }
                // $('#commentHead').css({
                //     'background': '#ccc url(\'../file/FileCenter!showImage2.zk?name=' + comment.userIcon + '\')',
                //     'background-repeat': 'no-repeat',
                //     'background-size': 'cover',
                //     'background-position': 'center'
                // });
                $('#commentInfo h3').text(comment.userName);
                $('#commentInfo p').text(comment.commentTime.replace(/-/g, '.'));

                //性别判断
                var sex = comment.userSex == 'M' ? 'img/male.png' : 'img/female.png';
                $('#commentSex').attr('src', sex);

                //VIP图标判断
                var vip = comment.isMember == 'y' ? 'img/vip.png' : '';
                $('#commentLogo').css('background-image', 'url(\'' + vip + '\')');

                //评星
                for (var i = 0; i < comment.majorEvaluate; i++) {
                    $($('#commentExp img')[i]).attr('src', 'img/xing.png');
                }
                for (var i = 0; i < comment.serviceEvaluate; i++) {
                    $($('#commentServ img')[i]).attr('src', 'img/xing.png');
                }

                $('#commentCont p').html((comment.userComment != undefined ? comment.userComment.replace(/\n/g, "<br>") : '无内容'));

                //评论图片
                if (!!comment.images) {
                    var commentPics = eval('(' + comment.images + ')');
                    // console.log(commentPics);
                    for (var i = 0; i < commentPics.length; i++) {
                        var pic = $('<div>').attr({
                            'class': 'comm-pic'
                        }).css({
                            'background': '#ccc url(\'../file/FileCenter!showImage2.zk?name=' + commentPics[i] + '\')',
                            'background-repeat': 'no-repeat',
                            'background-size': 'cover',
                            'background-position': 'center'
                        });
                        $('#commentPics').append(pic);
                    }
                }
            }
            $('#cover').hide();
        }
    });

    if (course == 1) {
        $('#courses').show();
        $.ajax({
            type: 'POST',
            url: '../CoachAction!getAllCourse.zk',
            data: {
                coachId: cid
            },
            success: function(data) {
                data = eval('(' + data + ')');
                var courseInfo = data.courseInfo;
                for (var i = 0; i < courseInfo.length; i++) {
                    var course = $('<div>').attr('class', 'course-item');
                    if (courseInfo[i].type) {
                        var courseType = '<div class="course-si">私教</div>';
                        var coursePrice = '<div class="course-price">￥' + courseInfo[i].price + '/节</div>';
                    } else {
                        var courseType = '<div class="course-tuan">群课</div>';
                        var coursePrice = '<div class="course-price">￥' + courseInfo[i].price + '</div>';
                    }
                    var courseName = '<div class="course-name">' + courseInfo[i].name + '</div>';


                    var courseYue = $('<a>').attr({
                        'href': 'javascript:;',
                        'data-course': courseInfo[i].couserId
                    }).text('约课').on('click', function() {
                        var csid = $(this).attr('data-course');
                        console.log(csid);
                        getSignData(csid);
                    });
                    course.append(courseType);
                    course.append(courseName);
                    course.append(coursePrice);
                    course.append(courseYue);
                    $('.courses').append(course);
                }
            }
        })
    }

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

function following() {
    $('#coachFollow').text('已关注');
    $('#coachFollow').css({
        'background-color': '#fff',
        'color': '#49badc'
    })
    $('#coachFollow').off('click').on('click', function() {
        $.ajax({
            type: 'POST',
            url: '../CoachAction!unFocusUser.zk',
            data: {
                userId: uid,
                coachId: cid
            },
            success: function(data) {
                data = eval('(' + data + ')');
                if (data.STATUS) {
                    unfollow();
                } else {
                    following();
                }
            }
        })
    })
}

function unfollow() {
    $('#coachFollow').text('+关注');
    $('#coachFollow').css({
        'background-color': '#49badc',
        'color': '#fff'
    })
    $('#coachFollow').off('click').on('click', function() {
        $.ajax({
            type: 'POST',
            url: '../CoachAction!focusCoach.zk',
            data: {
                userId: uid,
                coachId: cid
            },
            success: function(data) {
                data = eval('(' + data + ')');
                if (data.STATUS) {
                    following();
                } else {
                    unfollow();
                }
            }
        })
    })
}

function coachLevel(level) {
    switch (level) {
        case 0:
            $('#coachLogo').css('background-image', 'url(\'img/mingxing.png\')');
            $('#coachLevel').text('明星教练');
            break;
        case 1:
            $('#coachLogo').css('background-image', 'url(\'img/koubei.png\')');
            $('#coachLevel').text('口碑教练');
            break;
        case 2:
            $('#coachLogo').css('background-image', 'url()');
            $('#coachLevel').text('实习教练');
            break;
        case 3:
            $('#coachLogo').css('background-image', 'url(\'img/mng.png\')');
            $('#coachLevel').css('background-color', '#78BBE3');
            $('#coachLevel').text('教练经理');
            break;
    }
}

function getSignData(courseId) {
    console.log(courseId);
    if (!window.WebViewJavascriptBridge) {
        return false;
    }
    window.WebViewJavascriptBridge.callHandler('appointingCourse', courseId,
        function(responseData) {
            deviceData = responseData;
        });

    return deviceData;
}

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge);
        }, false);
    }
}

// function swiper(ele, time) {
//     var slideLeft = {
//         '-webkit-transform': 'translate3d(-100%, 0px, 0px)',
//         '-webkit-transition': '-webkit-transform 400ms cubic-bezier(0.42, 0, 0.58, 1.0) 0.1s'
//     };
//     var slideCenter = {
//         '-webkit-transform': 'translate3d(0%, 0px, 0px)',
//         '-webkit-transition': '-webkit-transform 350ms cubic-bezier(0.42, 0, 0.58, 1.0) 0.1s'
//     };
//     var slideRight = {
//         '-webkit-transform': 'translate3d(100%, 0px, 0px)',
//         '-webkit-transition': '-webkit-transform 350ms cubic-bezier(0.42, 0, 0.58, 1.0) 0.1s'
//     };
//     var len = ele.length;
//     var n = 0;
//     setInterval(function() {
//         $(ele[n]).css(slideLeft);
//         if (n == len - 1) {
//             for (var i = 1; i < len; i++) {
//                 $(ele[i]).css(slideRight);
//             }
//             $(ele[0]).css(slideCenter);
//             n = 0;
//         } else {
//             $(ele[n + 1]).css(slideCenter);
//             n++;
//         }
//     }, time);
// }