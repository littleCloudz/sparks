>[JavaScript权威指南（第6版）](https://weread.qq.com/web/reader/0513214059343c051f11bc8k32b321d024832bb90e89958)

# 第7章数组
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
 
 
# 数组的方法
>[《JavaScript入门经典（第7版）》](https://weread.qq.com/web/reader/50d324e07193f22050d8a31k32932b102423295c76ac7d9)  
8.1.3 数组的方法

>[《学习JavaScript数据结构与算法（第3版）》](https://weread.qq.com/web/reader/99732570718ff67e997e35bkc81322c012c81e728d9d180)  
第3章 数组


## 创建和初始化数组																														
### （1）new关键字		
```javascript																											
// {1} 使用new关键字，就能简单地声明并初始化一个数组																												
let daysOfWeek = new Array(); 																												
// {2} 用这种方式，还可以创建一个指定长度的数组																												
daysOfWeek = new Array(7); 																												
// {3} 也可以直接将数组元素作为参数传递给它的构造器																												
daysOfWeek = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'); 
```																													
### （2）中括号（[]）	
```javascript																												
// 用new创建数组并不是最好的方式。如果你想在JavaScript中创建一个数组，只用中括号（[]）的形式就行了																												
																												
let daysOfWeek = [];																												
// 也可使用一些元素初始化数组																												
"let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
'Friday', 'Saturday'];"																												
```																														
## 访问元素和迭代数组																														
### 要访问数组里特定位置的元素，可以用中括号传递数值位置，得到想知道的值或者赋新的值。																													
### 需要迭代数组中的元素，可以用循环语句来处理，例如for语句。																													
假如我们想输出数组daysOfWeek里的所有元素，可以通过循环迭代数组、打印元素。																					
```javascript
for (let i = 0; i < daysOfWeek.length; i++) {																												
	console.log(daysOfWeek[i]);																											
}					
```																							
求斐波那契数列的前20个数。已知斐波那契数列中的前两项是1，从第三项开始，每一项都等于前两项之和。																												
```javascript																			
const fibonacci = []; 							// {1} 声明并创建了一个数组																					
fibonacci[1] = 1; 							// {2} 把斐波那契数列中的前两个数分别赋给了数组的第二和第三个位置。（在JavaScript中，数组第一位的索引始终是0。因为斐波那契数列中不存在0，所以这里直接略过，从第二位开始分别保存斐波那契数列中对应位置的元素。）																					
																												
																												
fibonacci[2] = 1; 							// {3}																					
																												
for (let i = 3; i < 20; i++) {							// 用循环来处理，把数组中前两位上的元素相加，结果赋给当前位置上的元素——从数组中的索引3到索引19																					
																												
	fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]; 														// {4}													
}																												
																												
for (let i = 1; i < fibonacci.length; i++) { 															// {5}													
	console.log(fibonacci[i]); 														// {6}													
}		
```																										
现在如果想知道斐波那契数列其他位置上的值是多少，要怎么办呢？ 很简单，把之前循环条件中的终止变量从20改成你希望的值就可以了。																												
																													
																														
## 添加元素		
```javascript																												
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];																													
```
### 在数组末尾插入元素
```javascript
numbers[numbers.length] = 10;															// 在JavaScript中，数组是一个可以修改的对象。如果添加元素，它就会动态增长。在C和Java等其他语言里，我们要决定数组的大小，想添加元素就要创建一个全新的数组，不能简单地往其中添加所需的元素。														
```
```javascript																														
																														
numbers.push(11);															// 还有一个push方法，能把元素添加到数组的末尾。														
numbers.push(12, 13);															// 通过push方法，我们能添加任意个元素。														
```																											
### 在数组开头插入元素				
```javascript																									
Array.prototype.insertFirstPosition = function(value) {																													
	for (let i = this.length; i >= 0; i--) {																												
		this[i] = this[i - 1];																											
	}																												
	this[0] = value;																												
};																													
numbers.insertFirstPosition(-1);																													
																													
numbers.unshift(-2);																													
numbers.unshift(-4, -3);																													
```

## 删除元素																														
### 从数组末尾删除元素			
```javascript																										
numbers.pop();			
```																										
																														
### 从数组开头删除元素		
```javascript																											
for (let i = 0; i < numbers.length; i++) {															// 我们把数组里所有的元素都左移了一位，但数组的长度依然是17，这意味着数组中有额外的一个元素（值是undefined）。在最后一次循环里，i+1引用了数组里还未初始化的一个位置。在Java、C/C+或C#等一些语言里，这样写可能会抛出异常，因此不得不在numbers.length- 1处停止循环。														
	numbers[i] = numbers[i + 1];																												
}																													
```																							
																													
																													
```javascript
Array.prototype.reIndex = function(myArray) {															// 真正从数组中移除这个元素，我们需要创建一个新的数组，将所有不是undefined的值从原来的数组复制到新的数组中，并且将这个新的数组赋值给我们的数组。要完成这项工作，也可以像下面这样创建一个reIndex方法。														
	const newArray = [];																												
	for(let i = 0; i < myArray.length; i++ ) {																												
		if (myArray[i] !== undefined) {																											
		// console.log(myArray[i]);																											
		newArray.push(myArray[i]);													// 上面的代码只应该用作示范，不应该在真实项目中使用。														
		}																											
	}																												
	return newArray;																												
}																													
																													
// 手动移除第一个元素并重新排序																													
Array.prototype.removeFirstPosition = function() {																													
	for (let i = 0; i < this.length; i++) {																												
		this[i] = this[i + 1];																											
	}																												
	return this.reIndex(this);																												
};																													
																													
numbers = numbers.removeFirstPosition();																													
																													
```
```javascript																								
numbers.shift();															// 从数组开头删除元素														
```																							
																														
### 在任意位置添加或删除元素			
```javascript																										
numbers.splice(5,3);								// 删除了从数组索引5开始的3个元素																				
```
```javascript
numbers.splice(5, 0, 2, 3, 4);								// 把数2、3、4插入数组里，放到之前删除元素的位置上，可以再次使用splice方法																				
																												
								//splice方法接收的第一个参数，表示想要删除或插入的元素的索引值。																				
								// 第二个参数是删除元素的个数（这个例子里，我们的目的不是删除元素，所以传入0）																				
																												
								// 第三个参数往后，就是要添加到数组里的值（元素2、3、4）。																				
```
```javascript
numbers.splice(5, 3, 2, 3, 4);								// 从索引5开始删除了3个元素，但也从索引5开始添加了元素2、3、4				```


## 遍历（迭代）数组

### for语句
需要迭代数组中的元素，可以用循环语句来处理
```javascript
for (let i = 0; i < daysOfWeek.length; i++) {					
	console.log(daysOfWeek[i]);				
}					

```

### 迭代器函数   
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
#### [Array.filter(Boolean)](https://www.cnblogs.com/lishidefengchen/p/8757638.html)
Boolean 是一个函数，它会对遍历数组中的元素，并根据元素的真假类型，对应返回 true 或 false. 

### reduce
* 注意： reduce回调里最后一定要return acc, 否则acc的值就会断裂
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



### 编程范式：
#### 命令式编程																									
	在命令式编程中，我们按部就班地编写程序代码，详细描述要完成的事情以及完成的顺序。																								
#### 函数式编程（FP）		
##### 这三个方法（map、filter和reduce）是JavaScript函数式编程的基础
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

## 迭代（ES6）

### for...of
迭代数组值		
```javascript		
for (const n of numbers) {				
	console.log(n % 2 === 0 ? 'even' : 'odd');			
}				
```

### @@iterator					
返回一个包含数组键值对的迭代器对象，可以通过同步调用得到数组元素的键值对		
```javascript																		
let iterator = numbers[Symbol.iterator]();												// ES2015还为Array类增加了一个@@iterator属性。需要通过Symbol.iterator来访问								
																				
console.log(iterator.next().value); 												// 1 然后，不断调用迭代器的next方法，就能依次得到数组中的值。numbers数组中有15个值，因此需要调用15次iterator.next().value。								
																				
																				
console.log(iterator.next().value); 												// 2								
console.log(iterator.next().value); 												// 3								
console.log(iterator.next().value); 												// 4								
console.log(iterator.next().value); 												// 5								
```
```javascript												
iterator = numbers[Symbol.iterator]();																				
for (const n of iterator) {												// 输出numbers数组中的15个值。								
	console.log(n);											// 数组中的所有值都迭代完之后，iterator.next().value会返回undefined。								
}																				
```																									
  
## ES2015还增加了三种从数组中得到迭代器的方法
### ① entries					
entries方法返回包含键值对的@@iterator																							
使用集合、字典、散列表等数据结构时，能够取出键值对是很有用的。																							
```javascript
let aEntries = numbers.entries();										// 得到键值对的迭代器。numbers数组中都是数，key是数组中的位置，value是保存在数组索引的值。													
																							
console.log(aEntries.next().value); 										// [0, 1] - 位置0的值为1													
console.log(aEntries.next().value); 										// [1, 2] - 位置1的值为2													
console.log(aEntries.next().value); 										// [2, 3] - 位置2的值为3													
```
```javascript																
aEntries = numbers.entries();																							
for (const n of aEntries) {																							
	console.log(n);																						
}																							
```

### ② keys					
返回包含数组所有索引的@@iterator																							
keys方法返回包含数组索引的@@iterator																							
keys方法会返回numbers数组的索引。																							
一旦没有可迭代的值，aKeys.next()就会返回一个value属性为undefined、done属性为true的对象。如果done属性的值为false，就意味着还有可迭代的值。									
```javascript														
																							
const aKeys = numbers.keys(); 									// 得到数组索引的迭代器														
console.log(aKeys.next()); 									// {value: 0, done: false }														
console.log(aKeys.next()); 									// {value: 1, done: false }														
console.log(aKeys.next()); 									// {value: 2, done: false }														
```

### ③ values					
返回包含数组中所有值的@@iterator																							
values方法返回的@@iterator则包含数组的值。																							
```javascript
const aValues = numbers.values();																							
console.log(aValues.next()); 								// {value: 1, done: false }															
console.log(aValues.next()); 								// {value: 2, done: false }															
console.log(aValues.next()); 								// {value: 3, done: false }															
```


## 排序元素
### ① reverse					
颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在的第一个
反序输出数组numbers（它本来的排序是1, 2, 3, 4, ..., 15）																								
```javascript
numbers.reverse();						// [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]											
```

### ② sort					
按照字母顺序对数组排序，支持传入指定排序方法的函数作为参数																								
```javascript
numbers.sort();					// 结果会是[1, 10, 11, 12, 13, 14, 15, 2, 3, 4, 5, 6, 7, 8, 9]。因为sort方法在对数组做排序时，把元素默认成字符串进行相互比较																			
```
																													
* 可以传入自己写的比较函数		
```javascript																						
function compare(a, b) {									// 声明了一个用来比较数组元素的函数，使数组按升序排序。															
	if (a < b) {																							
		return -1;																						
	}																							
	if (a > b) {																							
		return 1;																						
	}																							
	// a必须等于b																							
	return 0;																							
}																								
numbers.sort(compare);
```																								
```javascript																		
numbers.sort((a, b) => a - b);									// 在b大于a时，这段代码会返回负数，反之则返回正数。如果相等的话，就会返回0。也就是说返回的是负数，就说明a比b小，这样sort就能根据返回值的情况对数组进行排序。															
```
																								
																								
* 自定义排序																								
可以对任何对象类型的数组排序，也可以创建compareFunction来比较元素。																								
对象Person有名字和年龄属性，我们希望根据年龄排序：	
```javascript																							
const friends = [																								
	{ name: 'John', age: 30 },																							
	{ name: 'Ana', age: 20 },																							
	{ name: 'Chris', age: 25 }, 							// ES2017允许存在尾逗号																
];																								
function comparePerson(a, b) {																								
	if (a.age < b.age) {																							
		return -1;																						
	}																							
	if (a.age > b.age) {																							
		return 1;																						
	}																							
	return 0;																							
}																								
console.log(friends.sort(comparePerson));												// 输出Ana(20), Chris(25), John(30)				
```								
																								
* 字符串排序		
```javascript																						
let names = ['Ana', 'ana', 'john', 'John'];											// ["Ana", "John", "ana", "john"] 因为JavaScript在做字符比较的时候，是根据字符对应的ASCII值来比较的。例如，A、J、a、j对应的ASCII值分别是65、74、97、106。													
console.log(names.sort());																																		
```
																								
```javascript																								
names = ['Ana', 'ana', 'john', 'John']; 												// 重置数组的初始状态												
console.log(names.sort((a, b) => {												// 给sort传入一个忽略大小写的比较函数，将输出["Ana", "ana", "John", "john"]。sort函数不会有任何作用。它会按照现在的大小写字母顺序排序。												
																								
																								
	if (a.toLowerCase() < b.toLowerCase()) {																							
		return -1;																						
	}																							
	if (a.toLowerCase() > b.toLowerCase()) {																							
		return 1;																						
	}																							
	return 0;																							
}));					
```																			
```javascript
names.sort((a, b) => a.localeCompare(b));												// 希望小写字母排在前面，那么需要使用localeCompare方法。输出结果将是["ana", "Ana", "john", "John"]。									
```
																								
																								
```javascript																					
const names2 = ['Maève', 'Maeve'];															// 假如对带有重音符号的字符做排序的话，也可以用localeCompare来实现。输出的结果将是["Maeve", "Maève"]									
																								
																								
console.log(names2.sort((a, b) => a.localeCompare(b)));	
```

## 搜索（ES5）

### ① indexOf
返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1																	
indexOf方法返回与参数匹配的第一个元素的索引
```javascript	
console.log(numbers.indexOf(10));										// 输出是9							
console.log(numbers.indexOf(100));										// 输出是9			
```				
																	
### ② lastIndexOf
返回在数组中搜索到的与给定参数相等的元素的索引里最大的值																	
lastIndexOf返回与参数匹配的最后一个元素的索引				
```javascript													
numbers.push(10);																	
console.log(numbers.lastIndexOf(10));											// 往数组里加入了一个新的元素10，因此第二行会输出15（数组中的元素是1到15，还有10）						
																	
console.log(numbers.lastIndexOf(100));											// 输出-1（因为100不在数组里）						
```

## 搜索（ES6）
### find					
根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素																				
### findIndex					
根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素在数组中的索引																				
find和findIndex方法接收一个回调函数，搜索一个满足回调函数条件的值。																				
find方法返回第一个满足条件的值，findIndex方法则返回这个值在数组里的索引。																				
如果没有满足条件的值，find会返回undefined，而findIndex返回-1			
```javascript																	
let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];																				
function multipleOf13(element, index, array) {													// 我们要从数组里找一个13的倍数。							
	return (element % 13 == 0);																			
}																				
console.log(numbers.find(multipleOf13));																				
console.log(numbers.findIndex(multipleOf13));																				
```

## 搜索（ECMAScript 7，E2016新增）
### includes					
#### 如果数组里存在某个元素，includes方法会返回true，否则返回false。
```javascript
Array.prototype.includes														
console.log(numbers.includes(15));  // includes(15)返回true				
console.log(numbers.includes(20));  // includes(20)返回false，因为numbers数组里没有20				
```
#### 如果给includes方法传入一个起始索引，搜索会从索引指定的位置开始。														
```javascript
let numbers2 = [7,6,5,4,3,2,1];														
console.log(numbers2.includes(4,5));  // 输出为false，因为数组索引5之后的元素不包含4。				
```

## 输出数组为字符串
### ① toString
将数组作为字符串返回																	
如果想把数组里所有元素输出为一个字符串，可以用toString方法。	
```javascript																
console.log(numbers.toString());	 // 1、2、3、4、5、6、7、8、9、10、11、12、13、14、15和10这些值都会在控制台中输出。								
```

																	
### ② join
将所有的数组元素连接成一个字符串																	
想用一个不同的分隔符（比如-）把元素隔开，可以用join方法																	
如果要把数组内容发送到服务器，或进行编码（知道了分隔符，解码也很容易），这会很有用。
```javascript																	
const numbersString = numbers.join('-');																	
console.log(numbersString);									// 1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-10								
```
## 其他（ES5）
### valueOf
和toString类似，将数组作为字符串返回																	
																	
### slice
传入索引值，将数组里对应索引范围内的元素作为新数组返回																															



### concat 合并多个数组
```javascript
var myOtherArray = ['Thursday', 'Friday'];
var myWeek = myArry.concat(myOtherArray);
```

concat					
连接2个或更多数组，并返回结果																									
有多个数组，需要合并起来成为一个数组。concat方法可以向一个数组传递数组、对象或是元素。数组会按照该方法传入的参数顺序连接指定数组。																									
```javascript																						
const zero = 0;																									
const positiveNumbers = [1, 2, 3];																									
const negativeNumbers = [-3, -2, -1];																									
let numbers = negativeNumbers.concat(zero, positiveNumbers);																		// -3、-2、-1、0、1、2和3。 							
```

### join 把多个数组元素合并为一个字符串
var longDay = myArray.join(); // MondayTuesdayWednesday
var longDay = myArray.join('-'); // Monday-Tuesday-Wednesday


### toString 以字符串形式返回数组
这个方法可以说是join()方法的一个特例。它返回由数组元素组成的字符串，用逗号分隔每个元素
var longDay = myArray.toString(); // Monday,Tuesday,Wednesday
 
### indexOf 在数组搜索指定元素
myArray.indexOf('Tuesday'); // 1
myArray.indexOf('Sunday'); // -1
 
### lastIndexOf 返回与搜索规则匹配的最后一个元素
返回指定元素在数组里最后一次出现的位置
 
### slice 根据指定的开始索引和结束索引返回一个新数组
如果想从当前数组中提取一个子集 
注意，在新的数组中，并不包含结束索引处的那个数组元素
var myWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var myShortWeek = myWeek.slice(1, 3);

可以给slice()传入负值作为开始的索引或结束的索引。JavaScript将把负值解释为从序列的末尾开始的偏移位置。
还要注意，两个参数都是可选的。如果没有指定开始索引，slice()将从索引0开始。如果没有提供结束索引，slice()将提取直到序列末尾的所有元素。
### sort 根据字母顺序或提供的函数对数组进行排序
```javascript
var myArray = [14, 9, 31, 22, 5];
alert(myArray.sort()); // 14, 22, 31, 5, 9
```
 
### splice 在数组指定索引处添加或删除一个或多个元素 
```javascript
array.splice(index, howmany, [new elements]);
```
这个方法的返回值是被删除的元素。
splice()方法会改变原数组。

## 其他（ES6）
### from					
根据已有数组创建一个新数组																								
Array.from方法根据已有的数组创建一个新数组。																								
#### 要复制numbers数组		
```javascript
let numbers2 = Array.from(numbers);	
```																							
#### 可以传入一个用来过滤值的函数	
```javascript																							
let evens = Array.from(numbers, x => (x % 2 == 0));														// 会创建一个evens数组，以及值true（如果在原数组中为偶数）或false（如果在原数组中为奇数）。										
```															
																													
																													
### of					
· 根据传入的参数创建一个新数组		
```javascript																						
let numbers3 = [1];																						
let numbers4 = [1, 2, 3, 4, 5, 6];														
```
```javascript
let numbers3 = Array.of(1);	
let numbers4 = Array.of(1, 2, 3, 4, 5, 6);	

```
																								
· 用该方法复制已有的数组
```javascript																								
Array.from(numbers4)												
```
```javascript
let numbersCopy = Array.of(...numbers4);										
```

### fill					
#### 用静态值填充数组		
```javascript																						
let numbersCopy = Array.of(1, 2, 3, 4, 5, 6);												// numbersCopy数组的length是6，也就是有6个位置。												
																								
numbersCopy.fill(0);						// numbersCopy数组所有位置上的值都会变成0（[0, 0, 0, 0, 0, 0]）																		
```																						
#### 可以指定开始填充的索引	
```javascript																							
numbersCopy.fill(2, 1);							// 数组中从1开始的所有位置上的值都是2（[0, 2, 2, 2, 2, 2]）									```					
																								
#### 可以指定结束填充的索引		
```javascript																						
numbersCopy.fill(1, 3, 5);							// 把1填充到数组索引3到5的位置（不包括5），得到的数组为[0, 2, 2, 1, 1, 2]。
```																	
																								
#### 创建数组并初始化值的时候，fill方法非常好用																								
```javascript
let ones = Array(6).fill(1);							// 创建了一个长度为6、所有值都是1的数组（[1, 1, 1, 1, 1, 1]）					
```	
																													
### copyWithin					
复制数组中一系列元素到同一数组指定的起始位置	
```javascript																							
let copyArray = [1, 2, 3, 4, 5, 6];																								
copyArray.copyWithin(0, 3);									// 把4、5、6三个值复制到数组前三个位置，得到[4, 5, 6, 4, 5, 6]这个数组															
																								
copyArray.copyWithin(1, 3, 5);									// 把4、5两个值（在位置3和4上）复制到位置1和2。把从位置3开始到位置5结束（不包括5）的元素复制到位置1，结果是得到数组[1, 4, 5, 4, 5, 6]															
```																					
																													


# [Array.isArray()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
用于确定传递的值是否是一个 Array。
if(!Array.isArray) {
    Array.isArray = function(arg){
        return Object.prototype.toString.call(arg) === '[Object Array]';

    }
    
}


# [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
