
var Nightmare = require('nightmare');

var nightmare = new Nightmare({
    width: 1600,
    height: 768,
    show: true
});
var fuc;
nightmare.goto('http://login.taobao.com/')
    .click('#J_Quick2Static')
    .type('#TPL_username_1', '用户名')
    .type('#TPL_password_1', '密码')
    .click('#J_SubmitStatic')
    .wait(1000)//登录后等待1秒，确保登录状态的Cookies已被设置

    //重新启动一个商品链接的Promise
    .then(function () {
        return  nightmare
            .goto('https://item.taobao.com/item.htm?id=522885181592')//重定向到商品链接
           // .click('a.J_LinkBuy')
            .then(function () {
                //设置一个定时器，定时刷新点击判断
                fuc = setInterval(function () {
                    nightmare
                        .evaluate(function () {
                            return document.querySelector('.tb-btn-buy a.J_LinkBuy').textContent.trim();
                        })
                        .then(function (text) {
                             console.log(text);
                            if (text==='立即购买') {//可以购买
                                clearInterval(fuc);
                                return nightmare
                                    .click('.tb-btn-buy a.J_LinkBuy');

                            }
                            else{
                                nightmare
                                    .refresh();
                            }
                        });
                },1000);
            })
            .then(function () {
               nightmare
                   .wait('a.go-btn')
                   .click('a.go-btn');

            })


    });

