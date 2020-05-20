# 第7章数组
>[JavaScript权威指南（第6版）](https://weread.qq.com/web/reader/0513214059343c051f11bc8k32b321d024832bb90e89958)

## 7.11 类数组对象															
* JavaScript数组的有一些特性是其他对象所没有的：															
	* 当有新的元素添加到列表中时，自动更新length属性。														
	* 设置length为一个较小值将截断数组。														
	* 从Array.prototype中继承一些有用的方法。														
	* 其类属性为“Array”。														
	这些特性让JavaScript数组和常规的对象有明显的区别。														
	但是它们不是定义数组的本质特性。														
	一种常常完全合理的看法把拥有一个数值length属性和对应非负整数属性的对象看做一种类型的数组。														
* 实践中这些“类数组”对象实际上偶尔出现，															
	虽然不能在它们之上直接调用数组方法或者期望length属性有什么特殊的行为，														
	但是仍然可以用针对真正数组遍历的代码来遍历它们。														
    结论就是很多数组算法针对类数组对象工作得很好，就像针对真正的数组一样。													
    如果算法把数组看成只读的或者如果它们至少保持数组长度不变，也尤其是这种情况。													
* 以下代码为一个常规对象增加了一些属性使其变成类数组对象，然后遍历生成的伪数组的“元素”：			
	```javascript												
	var a = {}; // 从一个常规空对象开始														
	// 添加一些属性，称为“类数组”														
	var i = 0;														
	while(i < 10) {														
		a[i] = i * i;													
		i++;													
	}														
	a.length = i;														
	// 现在，当做真正的数组遍历它														
	var total = 0;														
	for(var j = 0; j < a.length; j++)														
		total += a[j];								
	```						
	8.3.2节描述的Arguments对象就是一个类数组对象。														
	在客户端JavaScript中，一些DOM方法（如document.getElementsByTagName（））也返回类数组对象。														
* 下面有一个函数可以用来检测类数组对象：	
	```javascript														
	// 判定o是否是一个类数组对象														
	// 字符串和函数有length属性，但是它们可以用typeof检测将其排除。在客户端JavaScript中，DOM文本节点也有length属性，需要用额外判断o.nodeType != 3 将其排除														
	function isArrayLike(o){														
		if(o &&			// o非null、undefined等										
			 typeof o === "object"  &&								// o是对象				
			isFinite(o.lenght) &&								// o.length是有限数值				
			o.length >= 0 &&								// o.length为非负值				
			o.length === Math.floor(o.length) &&												// o.length是整数
			o.length < 4294967296)							// o.length< 2^32					
			return true; // o是类数组对象 												
		else													
			return false; // 否则它不是												
	}								
	```						
	将在7.12节中看到在ECMAScript 5中字符串的行为与数组类似（并且有些浏览器在ECMAScript 5之前已经让字符串变成可索引的了）。														
	然而，类似上述的类数组对象的检测方法针对字符串常常返回false——它们通常最好当做字符串处理，而非数组。														
* JavaScript数组方法是特意定义为通用的，因此它们不仅应用在真正的数组而且在类数组对象上都能正确工作。															
	在ECMAScript 5中，所有的数组方法都是通用的。														
	在ECMAScript 3中，除了toString（）和toLocaleString（）以外的所有方法也是通用的。														
	（concat（）方法是一个特例：虽然可以用在类数组对象上，但它没有将那个对象扩充进返回的数组中。）														
	既然类数组对象没有继承自Array.prototype，那就不能在它们上面直接调用数组方法。尽管如此，可以间接地使用Function.call方法调用：														
	```javascript
	var a = {"0": "a", "1": "b", "2": "c", length: 3}; // 类数组对象														
	Array.prototype.join.call(a, "+") // "a+b+c"														
	Array.prototype.slice.call(a, 0) // ["a", "b", "c"] 真正数组的副本														
	Array.prototype.map.call(a, function(x){														
		return x.toUpperCase();								// ["A", "B", "C"]					
	})														
	```
	在7.10节的isArray（）方法之前我们就已经见过call（）技术。8.7.3节涵盖关于Function对象的call（）方法的更多内容。														
* ECMAScript 5数组方法是在Firefox 1.5中引入的。由于它们的写法的一般性，Firefox还将这些方法的版本在Array构造函数上直接定义为函数。使用这些方法定义的版本，上述例子就可以这样重写：			
	```javascript												
	var a = {"0": "a", "1": "b", "2": "c", length: 3}; // 类数组对象														
	Array.join(a, "+")														
	Array.slice(a, 0)														
	Array.map(a, function(x) { return x.toUpperCase();})		
	```												
* 当用在类数组对象上时，数组方法的静态函数版本非常有用。但既然它们不是标准的，不能期望它们在所有的浏览器中都有定义。可以这样书写代码来保证使用它们之前是存在的：		
	```javascript													
	Array.join = Array.join || function(a, sep){														
		return Array.prototype.join.call(a, sep);													
	};														
	Array.slice = Array.slice || function(a, from, to){														
		return Array.prototype.slice.call(a, from, to);													
	};														
	Array.map = Array.map || function(a, f, thisArg) {														
		return Array.prototype.map.call(a, f, thisArg);													
	};														
	```
 
 
 
 
# 8.1.3 数组的方法
>[《JavaScript入门经典（第7版）》](https://weread.qq.com/web/reader/50d324e07193f22050d8a31k32932b102423295c76ac7d9)
>[《学习JavaScript数据结构与算法（第3版）》](https://weread.qq.com/web/reader/99732570718ff67e997e35bkc81322c012c81e728d9d180)

## concat 合并多个数组
```javascript
var myOtherArray = ['Thursday', 'Friday'];
var myWeek = myArry.concat(myOtherArray);
```

## join 把多个数组元素合并为一个字符串
var longDay = myArray.join(); // MondayTuesdayWednesday
var longDay = myArray.join('-'); // Monday-Tuesday-Wednesday


## toString 以字符串形式返回数组
这个方法可以说是join()方法的一个特例。它返回由数组元素组成的字符串，用逗号分隔每个元素
var longDay = myArray.toString(); // Monday,Tuesday,Wednesday
 
## indexOf 在数组搜索指定元素
myArray.indexOf('Tuesday'); // 1
myArray.indexOf('Sunday'); // -1
 
## lastIndexOf 返回与搜索规则匹配的最后一个元素
返回指定元素在数组里最后一次出现的位置
 
## slice 根据指定的开始索引和结束索引返回一个新数组
如果想从当前数组中提取一个子集 
注意，在新的数组中，并不包含结束索引处的那个数组元素
var myWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var myShortWeek = myWeek.slice(1, 3);

可以给slice()传入负值作为开始的索引或结束的索引。JavaScript将把负值解释为从序列的末尾开始的偏移位置。
还要注意，两个参数都是可选的。如果没有指定开始索引，slice()将从索引0开始。如果没有提供结束索引，slice()将提取直到序列末尾的所有元素。
## sort 根据字母顺序或提供的函数对数组进行排序
 var myArray = [14, 9, 31, 22, 5];
 alert(myArray.sort()); // 14, 22, 31, 5, 9
 
## splice 在数组指定索引处添加或删除一个或多个元素 
array.splice(index, howmany, [new elements]);
这个方法的返回值是被删除的元素。
splice()方法会改变原数组。

## 排序

## 遍历（迭代）数组
### for语句
需要迭代数组中的元素，可以用循环语句来处理
```javascript
for (let i = 0; i < daysOfWeek.length; i++) {					
	console.log(daysOfWeek[i]);				
}					

```


迭代器函数
JavaScript内置了许多数组可用的迭代方法。													
* 假设数组中的值是从1到15													
```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];												```
	
* 如果数组里的元素可以被2整除（偶数），函数就返回true，否则返回false。													
```javascript
function isEven(x) {													
	// 如果x是2的倍数，就返回true												
	console.log(x);												
	return x % 2 === 0 ? true : false;									// return (x % 2 === 0)			
}		
```
或者
```javascript
const isEvent = x => x%2 === 0											
```

### every
对数组中的每个元素运行给定函数，如果该函数对每个元素都返回true，则返回true		

every方法会迭代数组中的每个元素，直到返回false。																									
```javascript
numbers.every(isEven); 	// 数组numbers的第一个元素是1，它不是2的倍数（1是奇数）， 
```
因此isEven函数返回false，然后every执行结束。																		
																														
																														
### some
对数组中的每个元素运行给定函数，如果任一元素返回true，则返回true
它和every的行为相反，会迭代数组的每个元素，直到函数返回true。
```javascript
numbers.some(isEven);	// numbers数组中第一个偶数是2（第二个元素）。第一个被迭代的元素是1，isEven会返回false。第二个被迭代的元素是2，isEven返回true——迭代结束。																		
```																														

### forEach
对数组中的每个元素运行给定函数。这个方法没有返回值																									
如果要迭代整个数组，可以用forEach方法。它和使用for循环的结果相同。
```javascript																							
numbers.forEach(x => console.log(x % 2 === 0));
```

两个会返回新数组的迭代方法

### map
对数组中的每个元素运行给定函数，返回每次函数调用的结果组成的数组	
```javascript																									
const myMap = numbers.map(isEven);  // 数组myMap里的值是：[false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]。它保存了传入map方法的isEven函数的运行结果。这样就很容易知道一个元素是否是偶数。比如，myMap[0]是false，因为1不是偶数；而myMap[1]是true，因为2是偶数。
```

* 可以使用map函数，把一个数据集合转换或映射成另一个数据集合																					

```javascript				
const daysOfWeek = [																								
	{name: 'Monday', value: 1},																							
	{name: 'Tuesday', value: 2},																							
	{name: 'Wednesday', value: 7}																							
];																								
																								
let daysOfWeekValues_ = [];																								
for (let i = 0; i < daysOfWeek.length; i++) {																								
	daysOfWeekValues_.push(daysOfWeek[i].value);																							
}																								
```	
	
```javascript													
const daysOfWeekValues = daysOfWeek.map(day => day.value);																								
console.log(daysOfWeekValues);																								
```

### filter
对数组中的每个元素运行给定函数，返回该函数会返回true的元素组成的数组																				
它返回的新数组由使函数返回true的元素组成。		
```javascript																			
const evenNumbers = numbers.filter(isEven);	// evenNumbers数组中的元素都是偶数：[2, 4, 6, 8, 10, 12, 14]。						
```	
																				
* 使用filter函数过滤一个集合的值				
```javascript																	
const positiveNumbers_ = function(array){																			
	let positive = [];																		
	for (let i = 0; i < array.length; i++) {																		
		if (array[i] >= 0){																	
			positive.push(array[i]);																
		}																	
	}																		
	return positive;																		
}																			
console.log(positiveNumbers_([-1,1,2,-2]));	
```
```javascript																				
const positiveNumbers = (array) => array.filter(num => (num >= 0));																			
console.log(positiveNumbers([-1,1,2,-2]));	
```																		

### reduce
* reduce方法接收一个有如下四个参数的函数：																						
	1.  previousValue																					
	2. currentValue																					
	3. index				// 因为index和array是可选的参数，所以如果用不到它们的话，可以不传。								
	4. array																					
这个函数会返回一个将被叠加到累加器的值，reduce方法停止执行后会返回这个累加器。如果要对一个数组中的所有元素求和，这就很有用。																						
			
```javascript																					
numbers.reduce((previous, current) => previous + current)																	// 120				
```	
* 可以使用reduce函数，把一个集合归约成一个特定的值																						
① 对一个数组中的值求和		
```javascript																			
const sumValues = function(array) {																					
	let total = array[0];																				
	for (let i = 1; i<array.length; i++) {																				
		total += array[i];																			
	}																				
	return total;																				
};																					
console.log(sumValues([1, 2, 3, 4, 5]));			
```
```javascript															
const sum_ = function(array){																					
	return array.reduce(function(a, b){																				
		return a + b;																			
	})																				
};																					
console.log(sum_([1, 2, 3, 4, 5]));		
```																			
```javascript											
const sum = arr => arr.reduce((a, b) => a + b);																			// 解构运算符和箭头函数		
console.log(sum([1, 2, 3, 4, 5]));		
```																			
																					
② 考虑我们需要写一个函数，把几个数组连接起来。		
```javascript																			
const mergeArrays_ = function(arrays){																					
	const count = arrays.length;																				
	let newArray = [];														// 可以创建另一个数组，用于存放其他数组的元素。						
	let k = 0;																				
	for (let i = 0; i < count; i++){														// 我们声明了变量，还使用了循环						
		for (var j = 0; j < arrays[i].length; j++){																			
			newArray[k++] = arrays[i][j];																		
		}																			
	}																				
	return newArray;																				
};																					
console.log(mergeArrays_([[1, 2, 3], [4, 5], [6]]));																			```
```javascript													
const mergeArraysConcat = function(arrays){																					
	return arrays.reduce( function(p,n){																				
		return p.concat(n);																			
	});																				
};																					
console.log(mergeArraysConcat([[1, 2, 3], [4, 5], [6]]));	
```
```javascript								
const mergeArrays = (...arrays) => [].concat(...arrays);																					
console.log(mergeArrays([1, 2, 3], [4, 5], [6]));																					
```



## 编程范式：																									
### 命令式编程																									
	在命令式编程中，我们按部就班地编写程序代码，详细描述要完成的事情以及完成的顺序。																								
### 函数式编程（FP）		
#### 这三个方法（map、filter和reduce）是JavaScript函数式编程的基础
我们将在第14章了解到。																									
如果你想更多地练习JavaScript函数式编程，可以试试这些习题，非常有意思：http://reactivex.io/learnrx/。	

函数式编程是一种曾经主要用于学术领域的范式，多亏了Python和Ruby等现代语言，它才开始在行业开发者中流行起来。	  
值得欣慰的是，借助ES2015的能力，JavaScript也能够进行函数式编程。																		
* 有一些很棒的JavaScript类库借助工具函数和函数式数据结构，对函数式编程提供支持（JavaScript 函数式类库和数据结构）																								
																								
	* Underscode.js     					http://underscorejs.org/																		
	* Bilby.js     					http://bilby.brianmckenna.org/																		
	* Lazy.js     					http://danieltao.com/lazy.js/																		
	* Bacon.js     					https://baconjs.github.io/																		
	* Fn.js     					http://eliperelman.com/fn.js/																		
	* Functional.js     					http://functionaljs.com/																		
	* Ramda.js     					http://ramdajs.com/0.20.1/index.html																		
	* Mori     					http://swannodette.github.io/mori/																		
在函数式编程中，函数就是摇滚明星。我们关注的重点是需要描述什么，而不是如何描述。																								
* 有以下几点要注意：																								
	* 函数式编程的主要目标是描述数据，以及要对数据应用的转换。																							
	* 在函数式编程中，程序执行顺序的重要性很低；而在命令式编程中，步骤和顺序是非常重要的。																							
																								
	* 函数和数据集合是函数式编程的核心。																							
	* 在函数式编程中，我们可以使用和滥用函数和递归；而在命令式编程中，则使用循环、赋值、条件和函数。																							
																								
	* 在函数式编程中，要避免副作用和可变数据，意味着我们不会修改传入函数的数据。如果需要基于输入返回一个解决方案，可以制作一个副本并返回数据修改后的副本。																							
																									
* 例子：																									
	* ① 假设我们想打印一个数组中所有的元素。		
		```javascript																						
		const printArray = function(array) {																							
			for(var i = 0; i < array.length; i++) {										// 我们迭代数组												
				console.log(array[i]);									// 打印每一项												
			}																						
		};																							
		printArray([1, 2, 3, 4, 5]);	
		```																						
																								
		回到这一句：“我们迭代数组，打印每一项。”那么，首先要关注的是迭代数据，然后进行操作，即打印数组项。			


		```javascript																							
		const forEach = function(array, action) {												// 下面的函数负责迭代数组。											
			for(var i = 0; i < array.length; i++) {																						
				action(array[i]);																					
			}																						
		};																							
		const logItem = function(item) {												// 接下来，要创建另一个负责把数组元素打印到控制台的函数（考虑为回调函数）											
			console.log(item);																						
		};																							
																									
		forEach([1, 2, 3, 4, 5], logItem);												// 最后，像下面这样使用声明的函数。											
														// 只需要上面这一行代码，就能描述我们要把数组的每一项打印到控制台。			
    ```																						
																									
		用ES2015语法重写第一个示例	
		```javascript																						
		const forEach = (array, action) => array.forEach(item => action(item));																							
		const logItem = (item) => console.log(item);																					
		```		
																									
	* ② 考虑我们要找出数组中最小的值。																								
		要用命令式编程完成这个任务，只要迭代数组，检查当前的最小值是否大于数组元素；如果是，就更新最小值				
		```javascript
		var findMinArray = function(array) {																							
			var minValue = array[0];																						
			for(var i = 1; i < array.length; i++) {																						
				if(minValue > array[i]) {																					
					minValue = array[i];																				
				}																					
			}																						
			return minValue;																						
		};																							
		console.log(findMinArray([8, 6, 4, 5, 9]));											// 输出4								
		```		
																									
		```javascript														
		const min_ = function(array) {											// 要用函数式编程完成相同的任务，可以使用Math.min函数，传入所有要比较的数组元素。												
																									
			return Math.min(...array)										// 使用ES2015的解构运算符（...），把数组转换成单个的元素												
		};																							
		console.log(min_([8, 6, 4, 5, 9]));																							
		```
		```javascript																		
		const min = arra => Math.min(...arr);											// 使用ES2015的箭头函数，可以进一步简化上面的代码。												
		console.log(min([8, 6, 4, 5, 9]));	
		```				
