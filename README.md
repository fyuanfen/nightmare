

# 初衷：
最近特别想吃淘宝的一家手作面包，正好店家做活动，明天发售圣诞节礼包。

为了在买面包大军中突破重围，我很无耻的想要借助脚本，写个抢面包demo。

因为我实在是太懒了，所以用了现成的JS框架。

总共只写了52行代码，完成了登录页面到商品简介到订单页面的跳转，不得不感叹工具的好用啊。

这特么要是纯手写估计要几百行代码啊，2333333~~~

不过呢，我的水平有限，所以这个秒杀脚本的速度真心感人的慢，和树懒有的一拼~

布吉岛明天能不能派上用场，反正权当是学习啦，O(∩_∩)O哈哈~


咳咳咳，下面正式介绍这个好用的工具nightmare~~~

---
# Nightmare介绍:

给你们黏贴一小段：

>nightmare是PhantomJS的高级封装，让你能够实现浏览器自动化任务。PhantomJS 是一个基于WebKit的服务器端 JavaScript API。它全面支持web而不需浏览器支持，其快速，原生支持各种Web标准： DOM 处理, CSS 选择器, JSON, Canvas, 和 SVG。PhantomJS可以用于页面自动化，网络监测，网页截屏，以及无界面测试等。

以上，反正就是特别强大简单又好用。言归正传，以下是我用这个的时候踩得几个坑，MARK一下：

# Nightmare使用

安装介绍可以参考[nightmare官方文档](https://github.com/segmentio/nightmare)
## 1. 在使用 nightmare 的时候，如果在忘记了在代码的最后调用 then 方法，会发现 nightmare 不会执行任何操作。

这是因为每一个 nightmare 实例都有一个操作队列，而这个操作队列保存着 nightmare 的一系列操作。而 nightmare 的每一个链式调用只是将操作保存到队列里面，并没有立刻执行操作。

例如下面这段代码：
```js
nightmare
    .goto('https://github.com')
    .wait(1000)
    .evaluate(function(){})
    .end()
 ```
如果仅仅执行这段代码，在打开浏览窗口之后不会有任何操作结果。这是因为，这段代码是将两个操作 goto 和 wait 放到了操作队列中，但是并没有执行这两个操作。而 end 的作用是在执行完队列中所有的操作之后，关闭 electron 进程即浏览窗口会被关闭(end 也是一个操作)。由于没有队列里面的操作没有执行，所以浏览窗口也会一直打开。

所有的队列里面的操作都是同步执行的，在操作执行完毕之后会调用回调函数。为了更好的支持异步，我们很少使用run 而是使用 then。可以参考文档[nightmare async operations loops](https://github.com/rosshinkley/nightmare-examples/blob/master/docs/common-pitfalls/async-operations-loops.md)。

## 2.利用then的异步性，实现登录页面后进行操作

then 方法返回的是一个 Promise,可以通过此方法进行不同页面的访问。如登录页面后进行操作
```js
var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
nightmare
    .goto('https://github.com')
    .then(function(e) {
        console.log('ok!!!');
    })
    .then(function(e) {
        return nightmare
                .goto('https://google.com')
                .end()
    })
    .then(function(e) {
        console.log('ok!!!');
    })
```

 # Reference:
[nightmare官方文档](https://github.com/segmentio/nightmare)

[nightmare API中文简单介绍](http://blog.yege.me/2016/web/nightmare-api-introduct)

[nightmare用例](https://github.com/rosshinkley/nightmare-examples)
