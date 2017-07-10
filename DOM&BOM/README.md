## BOM-DOM总结


### BOM

BOM浏览器对象模型（Browser Object Model）BOM对象是在Web中使用JavaScript的核心，该对象提供了与浏览器交互相关对象结构。BOM由多个子对象组成，其核心为window对象，它是BOM的顶层对象，表示在浏览器环境中的一个全局的顶级对象，所有在浏览器环境中使用的对象都是window对象的子对象。

#### 1. 浏览器对象模型

 ![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/bom.png)

#### 2. dom中的对象

- ##### window对象

window对象对象表示一个浏览器窗口或一个frame框架，它处于对象层次的最顶端，提供了处理浏览器窗口的方法和属性。js中的内置对象也是作为window的属性和方法出现的，浏览器环境中全局VO（变量对象）就是window，因此window上的属性和方法的作用域都是全局的。

-全局方法
  - 窗口操作
    - open, close
    - focus, blur
    - moveBy, moveTo
    - scrollBy, scrollTo
    - resizeBy, resizeTo
  - 弹窗类 alert， confirm， prompt
  ```
    alert("我是一个弹窗"); //浏览器弹出一个弹窗

    if(confirm("确认提交不后悔吗")){
      //确认操作
    }else{
      //取消，需要再思考下
    }

    var pwd = prompt("请输入6位数银行卡密码");

  ```

  - 定时器类
    - setTimeout，clearTimeout
    - setInterval，clearInterval
    - requestAnimationFrame
  ```
    setTimeout(function(){
      //1s后放到消息队列
    }, 1000);

    setInterval(function(){
      //每隔1s加到消息队列一次,如果回调已存在，不会重复添加
    }, 1000);

  ```

  - 编解码
    - ~~escape, unescape： 除了ASCII 字母和数字，和  - _ . ! ~ * ' ( ) 这些标点符号，其他都会被编码~~
    - encodeURI, decodeURI： 除了以上那些和uri上回出现的特殊符号，都会编码
    - encodeURIComponent, decodeURIComponent：所有uri的特殊符号，都会被编码
  ```
    escape("http://bj.lianjia.com")     //返回http%3A//bj.lianjia.com
    encodeURI("http://bj.lianjia.com")  //返回http://bj.lianjia.com
    encodeURI("http://bj.lianjia.com/xiao qu")  //返回http://bj.lianjia.com/xiao%20qu
    encodeURIComponent("http://bj.lianjia.com") //返回http%3A%2F%2Fbj.lianjia.com
  ```

  - 类型转换
    - parseInt, parseFloat
  - eval
  - 类型判定 isFinite, isNaN


- ##### document(DOM)


- ##### frames对象
frames对象是一个集合，表示当前页面中使用的子框架。如果页面中使用了框架，将产生一个框架集合frames，在集合中可以用数字下标（从0开始）或名字索引框架。集合中的每一个对象，包含了框架的页面布局信息，以及每一个框架所对应的window对象。
  - frames属性会以集合的方式返回当前窗口中包含的框架。

  ```
  frameList = window.frames;
  ```
  - frameList是一个frame对象的列表。它的类似于数组，有length属性且可以通过[i]的形式访问。
  - top parent 与self
- ##### navigator对象

- ##### history对象
history对象来保存浏览器历史记录信息，也就是用户访问的页面。浏览器的前进与后退功能本质上就是history的操作。history对象记录了用户浏览过的页面，通过该对象提供的API可以实现与浏览器前进/后退类似的导航功能。

- ##### location对象
window对像的location属性引用的是Location对象，它表示当前页面文档的URL。Location对象包括：hash 、host、hostname、origin 、port、pathname、protocal、search属性，及：assign、replace、reload方法。获取URL中的各种参数（如：querystring参数、锚点、网址等）都要使用此对象。

打印bj.lianjia.com页面的location信息如下所示
![image](https://github.com/linwei0201/Notes/blob/master/DOM&BOM/img/location.png)

| 属性 | 说明 | 居中对齐标题 |
| hash | URL的锚点内容，即："#"（第一个）之后的内容  | 稍微长一点的文本 |
| host | 主机名（域名）＋端口号  | 中等文本 |
| hostname | 主机名 | 稍微长一点的文本 |
| origin | 协议+主机名+端口   （IE不支持） | 中等文本 |
| port | 端口号 | 稍微长一点的文本 |
| pathname | 主机名后的部分 | 中等文本 |
| protocol | 协议 | 稍微长一点的文本 |
| search | 查询字符串 即：“?”（第一个）及其后的部分 | 中等文本 |


66

- ##### screen对象

| 左对齐标题 | 右对齐标题 | 居中对齐标题 |
| :------| ------: | :------: |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |
