## React生命周期方法总结——使用方式和时机

[图1][./img/1.png]
以上就是React组件的生命周期，从出生（pre-mounting）到死亡（unmounting）。

React之美在于把复杂的UI分解为一个个很小的部分。这样我们不仅可以划分我们的app，还可以自定义每个部分。

通过生命周期方法，我们可以控制UI每一个部分render，update，重新渲染，以及消失的时候，做什么事情。

下面给大家逐一介绍。

### componentWillMount

你的组件将很快出现在屏幕上。那一大坨的render函数，包含着一堆令人愉快的、不愉快的JSX，即将被调用。你想要做什么呢？

答案是。。。可能没什么。抱歉啰嗦了这么多，但是componentWillMount函数确实没什么卵用。

在componentWillMount中，没有任何组件加载，所以你不能做任何与DOM相关的操作。一般来说，我们会在组件的构造函数中初始化组件的默认值。但是，在组件构造函数调用之后，到componentWillMount为止，也不会有任何的状态变化。

[图2][]
使用构造函数设定默认state

此时你的组件还处于默认状态。几乎所有的事情都应该由其他的组件代码来处理，而不是多余的生命周期方法。

有一个例外，任何只能在运行时完成的设置，也就是，连接外部API等。例如，你的app使用了Firebase，你需要在app第一次挂载之前就设定好连接。但关键的是，这种配置，应该在app的高阶组件（也就是root component）中完成。这也就意味着99%的组件应该用不到componentWillMount。

你可能会见到很多人在componentWillMount当中，发送AJAX请求来加载组件的数据。千万别这么做。我们会在componentDidMount做这件事，后面会解释原因。

**最常见用法：**root组件中做app的初始化配置

**是否能调用setState：**不能。最好使用默认state

### componentDidMount

现在我们假设，你的组件已经挂载完毕，并且马上可以使用了。现在该怎么办呢？

**这里**就是用来加载数据的地方。 看看[Tyler McGinnis][]是怎么解释的：

> 你不能保证AJAX请求和组件挂载，谁会先完成。如果AJAX先完成，意味着你在unmounted组件中setState，这样不仅setState不起作用，React还会给你报警告。在*componentDidMount*中发起AJAX，可以保证有组件可以更新state。

想看更详细的回答，可以点击[此处][]

ComponentDidMount中可以处理所有在组件没挂载时不能处理的事情。比如以下几种：

- 在刚render的<canvas>元素中画图
- 在一系列元素中，初始化masonry 网格布局
- 添加事件监听

基本上，componentDidMount中可以处理任何与DOM相关的设置，以及开始获取所有你需要的数据。

**最常见用法：**调用AJAX来加载组件的数据。

**是否可以调用setState：**是。


### componentWillReceiveProps

我们组件正运行着，忽然一连串的新props传进来，一切变得一团糟。

也许有些数据是父组件的componentDidMount当中传过来的，并且会进一步往下级组件传播。在我们组件使用新props做任何操作之前，会调用componentWillReceiveProps，第一个参数是nextProps。

[图3]

我们现在不仅可以通过nextProps访问next props，也能通过this.props访问当前props。

以下是我们应该在componentWillReceiveProps中做的事情：

1. 检测哪个props将要更新（componetWillReceiveProps的一个big caveat，有时候并没有任何改变，只是React想要check in）
2. If the props will change in a way that is significant, act on it

举个例子。假设我们有个canvas元素，要根据this.props.percent在上面画一个漂亮的圆圈.

[图4][]
恩，看上去不错

当我们收到新props时，如果percent改变了，我们想要重绘这个图。代码如下：

```js
componentWillReceiveProps(nextProps){
	if(this.props.percent !== nextProps.percent){
		this.setUpCircle(nextProps.percent);
	}
}
```

还有个提示：componentWillReceiveProps在初始render的时候，不会被调用。因为那时组件正在接受props，没有old props来做对比，所以，这次不算数。

**最常用场景：**作用于特定props改变而出发state更新
**是否可以调用setState：**是。

### shouldComponentUpdate

现在我们有了新的props。典型的React主义者认为，当组件收到新的props或者state的时候，就应该更新。

但是我们的组件有点不安，将会先询问是否允许。这就是我们要了解的————shouldComponentUpdate方法，带有两个参数：nextProps和nextState。

```js
shouldComponentUpdate(nextProps, nextState){
	return this.props.engagement !== nextProps.engagement
	|| nextState.input !== this.state.input
}
```

shouldComponentUpdate应该始终返回布尔值——作为对“should I render？”的回答。是的，小组件，你应该更新。此函数的默认返回值是true。

如果你担心有无用的render或者其他没意义的更新，shouldComponentUpdate是一个很好的提高性能的工具。我曾写过一篇关于shouldComponentUpdate的文章，通过这里查看：

[链接]

在该文章中，我们讨论一个拥有许多字段的表格。问题是表格重新渲染的时候，每个字段也都重新渲染了，导致展示很慢。shouldComponentUpdate允许我们定义：只在你关心的props改变的时候更新。

但是请谨记，如果你设置了它可能会引起别的问题，因为你的React组件已经不会正常更新了。所以请小心地使用。

**最常用场景：**精确地控制，组件是否该re-render。
**是否可以调用setState：**不可以。

### componentWillUpdate

现在组件马上要更新了。“需要我在re-render之前做些什么？”。“啥都没有，别烦我了。”

在整个MuseFund代码库中，我们从不使用componentWillUpdate。功能上来看，它和componentWillReceiveProps很像，除了你在componentWillUpdate中不能调用setState方法。

如果你使用shouldComponentUpdate方法，并且想要在props更新以后做些事，componentWillUpdate就正好能够派上用场。但是它可能不会给你多少有用的功能。

**最常用场景：**在使用了shouldComponentUpdate的组件中，用来代替componentWillReceiveProps（但是获取不到previous props）。
**是否可以调用setState：**不可以。

### componentDidUpdate

这里我们可以做和componentDidMount当中一样的事情。重置我们的布局，重绘canvas，等。

等等-我们没有在componentWillReceiveProps中重绘canvas吗？

有啊。为什么呢？因为在componentDidUpdate中，你无法知道组件是为什么更新的。

所以，如果我们的组件接收很多与canvas不相干的props时，我们不需要浪费时间，在每次组件update的时候都重绘canvas。

那并不表示componentDidUpdate就没有用了。回到我们masonry布局的例子中，我们想要在DOM更新的时候，重新排版grid，这时候就可以用到componentDidUpdate。

```js
componentDidUpdate(){
	this.createGrid();
}
```
### componentWillUnmount
你的组件将要消失。可能永远消失。

在它消失之前，会询问你是否有任何最后的请求。

这里你可以取消任何外部的网络请求，或者移除所有和组件相关的事件监听。

基本上，clean up anything to do that solely involves the component in question- when it's gone, it should be completely gone.

```js
componentWillUnmount(){
	window.removeEventListener('resize', this.resizeListener);
}
```

**最常用场景：**清除组件中的任何遗留垃圾。
**是否可以调用setState：**不可以。
### 总结

在理想情况下，我们不应该使用生命周期方法。所有渲染相关的操作都应该通过state和props来控制。

但这不是一个理想的世界，有时候你需要更准确地控制你的组件何时更新，如何更新。

保守并且小心地使用这些方法。

如果以上内容有帮到你，请点击一下的❤️帮忙转发给其他人，关注我的Medium和Twitter，获取更多React相关的文章和小贴士。

最后，如果你同意或不同意我的看法，请在文中评论，让我知道。









