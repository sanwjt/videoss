//适配iphoneX
/*判断 IOS or Android*/
//var u = navigator.userAgent;
//var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//
//var h = $(window).height();
//if(h>672 && isiOS){
//  // X 高度：724
//	//  $('.p-video').attr({'view-heigth':'1448'});
//  $('body').addClass('ipx');
//}

//var src='video.mp4';
var src=mediaURLData['2844'];
var videoPlayer=new MMD.VideoPlayer(
    {
        videoElement:document.getElementById('video'),//[必填],video元素;
        src:src,//[必填],video src;
        loop:false,//[可选],是否循环,默认false,true为循环;
        muted:true,//[可选],是否静音,默认false;
        poster:'',//[可选],video默认图片;
        timesParam:[
            {name:'skip',time: 3},
        ],//[可选],video currenttime时间点;
        onTimes:function(name){
            switch(name){
                case 'skip':
                    $('#wrap').css('display','block')
                    $('.skip-box').css('display','block');
                    break;
            }
        },//[可选],video currenttime回调;
        onStart:function(){
            videoPlayer.muted = false;
            $('#loading').css('display','none')
        },//[可选],video第一个画面出现回调;
        onEnd:function(){
            $('#wrap').css('display','block')
            $('.skip-box').css('display','none');
            $('#ending').css('display','block')
            console.log('video end');
        }//[可选],video播放完成回调;
    }
);

if(videoPlayer.isVideoCanAutoPlay)
{
    videoPlayer.pause();
}

//跳过
$('.skip-btn').on('click',function(){
    $('.skip-box').hide();
    videoPlayer.pause();
    $('#ending').css('display','block');
})

// loading
var imgPath = '//game.gtimg.cn/images/game/cp/a20180131festival/';
var arrImgOne = ['btn-icon1.png','btn-icon2.png','end.jpg','txt1.png','txt2.png','piao1.png','piao2.png','piao3.png','piao4.png','piao5.png','piao6.png','share-tips1.png','share-tips2.png'];
var percent = 0;

function loadFn(arrimg) {
    for (var i = 0; i < arrimg.length; i++) {
        arrimg[i] = (imgPath + arrimg[i]);
    };
    var loadImage = function (path, callback) {
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            callback(path);
        }
        img.src = path;
    }

    var imgLoader = function (imgs, callback) {
        var len = imgs.length, i = 0;
        while (imgs.length) {
            loadImage(imgs.shift(), function (path) {
                callback(path, ++i, len);
            })
        }
    }

    imgLoader(arrimg, function (path, curNum, total) {
        percent = curNum / total;
        console.log(percent)
        if (percent == 1) {
            setTimeout(function(){
                $('.txt1').fadeIn(1000)
            },1000)
            setTimeout(function(){
                $('.txt1').fadeOut(1000)
            },3000)
            setTimeout(function(){
                $('.txt2').fadeIn(1000)
                $('#btn_start b').addClass('dou')
            },4500)
            $('#btn_start').css('display','block');
            $('#btn_start').on('click',function(){
                $(this).css('display','none')
                $('.loading').addClass('ani')
                videoPlayer.play();
            })
        }
    })
};
loadFn(arrImgOne);

// 彩蛋
$(".ending .btn1").on('click', function () {
    $("#ending").css("display", "none");
    videoPlayer.src =mediaURLData['2851'];
    videoPlayer.currentTimeAndPlay = 0;
});


//分享提示层
$(".ending .btn2").on('click', function () {
    $(".share-bg,.share").css("display", "block");
});
$(".share").on('click', function() {
    $(".share-bg,.share").css('display','none');
});

// 页面禁止下拉
$('.p-video').on('scroll.elasticity',function(e) {
    e.preventDefault();
}).on('touchmove.elasticity',function(e) {
    e.preventDefault();
});

$(window).on('load',function(){
    $('.loading').show();
})

// 强制横竖屏
var set = null;hs = false;
$wrap = $("#wrap");
function orientationF() {
    var html = document.documentElement;
    var w = html.clientWidth, h = html.clientHeight;
    if (h < w) {//横屏
        html.style.fontSize = w / 1334 * 100 + "px";
        $wrap.css({ "width": "auto","height":"100%", "webkitTransform": "none", "transform": "none" });
        hs = false;
    }
    else {//竖屏
        html.style.fontSize = h / 1334 * 100 + "px";
        $wrap.css({ "width": h,"height":w, "webkitTransform": "rotate(90deg) translate(0,-" + w + "px)", "transform": "rotate(90deg) translate(0,-" + w + "px)" });
        hs = true;
    }
}

function orientationfn() {
    clearTimeout(set);
    orientationF();
    set = setTimeout(function () {
        orientationF()
    }, 300);
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationfn, false);
orientationfn();

TGMobileShare({
    shareTitle:'办公室里出现了一位神秘人', //不设置或设置为空时，页面有title，则调取title
    shareDesc:'他是谁？', //不设置或设置为空时，页面有Description，则调取Description
    shareImgUrl:'https://game.gtimg.cn/images/game/cp/a20180131festival/share.jpg', //分享图片尺寸200*200，且填写绝对路径
    shareLink:'', //分享链接要跟当前页面同域名(手Q分享有这个要求) ,不设置或设置为空时，默认调取当前URL
    actName:'a20180131festival' //点击流命名，用于统计分享量，专题一般采用目录名称如a20151029demo
});
