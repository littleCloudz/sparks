#[Javascript 的 Debounce 和 Throttle 的原理及实现](https://github.com/lishengzxc/bblog/issues/7)
## Debounce
> n. 防反跳
  按键防反跳（Debounce）为什么要去抖动呢？机械按键在按下时，并非按下就接触的很好，尤其是有簧片的机械开关，会在接触的瞬间反复的开合多次，直到开关状态完全改变。

在 Javascript 中，我们就希望频繁事件的回调函数在某段连续时间内，在事件触发后只执行一次。

我们希望开关只捕获到那次最后的精准的状态切换。

```javascript
function debound(fn, delay) {
	var timer;

	return function(){
		var context = this;
		var args = arguments;

		clearTimeout(timer);

		timer = setTimeout(function(){
			fn.call(context, args)
        }, delay)
	}
}
```

### underscore
### lodash


## Throttle
> n. 节流阀

throttle就是设置固定的函数执行速率，从而降低频繁事件回调的执行次数。
```javascript
function throttle(fn, threshhold){
	var timer;
	var last;

	threshhold || (threshhold = 250);


	return function(){
		var now = +new Date();
		var context = this;
		var args = arguments;

		if(last && now < last + threshhold) {
			clearTimeout(timer);

			timer = setTimeout(function(){
				last = now;
				fn.call(conxtext, args);
			}, threshhold)
		} else {
			last = now;
			fn.call(context, args);
		}
	}
}
```
### underscore
###[记一次在Vue中使用debounce遇到的坑](https://www.jianshu.com/p/d5de1c077105)

# [throttle debounce 总结](https://segmentfault.com/a/1190000010211209)
