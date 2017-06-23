/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';
import App from 'components/app.vue';
Vue.use(vueResource);
Vue.use(VueRouter);
Vue.http.options.emulateJSON = true;
// 开启debug模式
Vue.config.debug = true;

// 路由配置
var router = new VueRouter({
    // 是否开启HTML5的history模式,开启后,需服务端支持,否则404
    history: false
});

router.map({
    '/index': {
        name: 'index',
        component: function (resolve) {
            require(['./routers/index.vue'], resolve);
        }
    },
    '/choca': {
        name: 'choca',
        component: function(resolve) {
            require(['./routers/choca.vue'], resolve);
        }
    },
    '/news': {
        name: 'news',
        component: function(resolve) {
            require(['./routers/news.vue'], resolve);
        }
    },
    '/join': {
        name: 'join',
        component: function(resolve) {
            require(['./routers/join.vue'], resolve);
        }
    },
    '/detial': {
        name: 'detial',
        component: function(resolve) {
            require(['./routers/detial.vue'], resolve);
        }
    },
    '/form': {
        name: 'form',
        component: function(resolve) {
            require(['./routers/form.vue'], resolve);
        }
    },
    '/goods': {
        name: 'goods',
        component: function(resolve) {
            require(['./routers/goods.vue'], resolve);
        }
    },
    '/success': {
        name: 'success',
        component: function(resolve) {
            require(['./routers/success.vue'], resolve);
        }
    },
    '/faild': {
        name: 'faild',
        component: function(resolve) {
            require(['./routers/faild.vue'], resolve);
        }
    },
    '/aticle': {
        name: 'aticle',
        component: function(resolve) {
            require(['./routers/aticle.vue'], resolve);
        }
    },
    '/xhlist': {
        name: 'xhlist',
        component: function(resolve) {
            require(['./routers/xhlist.vue'], resolve);
        }
    },
    '/noinformation': {
        name: 'noinformation',
        component: function(resolve) {
            require(['./routers/noinformation.vue'], resolve);
        }
    }
});

router.beforeEach(function () {
//    window.scrollTo(0, 0);
});

router.afterEach(function (transition) {

});

router.redirect({
    '*': "/index"
});
router.start(App, '#app');
//100rem
!(function(doc,win) {
var docEle=doc.documentElement,evt='onorientationchange' in window?'orientationchange': 'resize'
,timer,fn=function(){
    clearTimeout(timer); setTimeout(function(){  setRemSize(doc.body.clientWidth || win.screen.availWidth);  }, 50)
},fnIni=function(){
      setRemSize(doc.body.clientWidth || win.screen.availWidth); 
},setRemSize = function(size){
    docEle.style.fontSize=100*(size/750)+'px';
};
win.addEventListener(evt,fn,false);
doc.addEventListener('DOMContentLoaded',fnIni,false);
}(document,window));


