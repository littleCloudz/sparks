
async
await
# <span class="s3">异步</span>：现在与将来
* 很重要但常常被误解的一点是，如何表达和控制持续一段时间的程序行为。  
    * 这不仅仅是指从for循环开始到结束的过程，当然这也需要持续一段时间（几微秒或几毫秒）才能完成。   
  它是指程序的一部分现在运行，而另一部分则在将来运行——现在和将来之间有段间隙，在这段间隙中，程序没有活跃执行。  
    * 所有重要的程序（特别是JavaScript程序）都需要通过这样或那样的方法来管理这段时间间隙，这时可能是
      * 在等待用户输入
      * 从数据库或文件系统中请求数据
      * 通过网络发送数据并等待响应                                            
      * 在以固定时间间隔执行重复<span class="s1">任务</span>（比如动画）  
    在诸如此类的场景中，程序都需要管理这段时间间隙的状态。

* 事实上，程序中现在运行的部分和将来运行的部分之间的关系就是<span class="s3">异步</span>编程的核心。
    * 从一开始，JavaScript就涉及<span class="s3">异步</span>编程。但是，多数JavaScript开发者从来没有认真思考过
      * 自己程序中的<span class="s3">异步</span>到底是如何出现的                                            
      * 以及其为什么会出现                                           
      * 也没有探索过处理<span class="s3">异步</span>的其他方法                                           
    * 一直以来，低调的回调函数就算足够好的方法了。目前为止，还有很多人坚持认为回调函数完全够用。     
    为了满足这些需求，JavaScript的规模和复杂性也在持续增长，对<span class="s3">异步</span>的管理也越来越令人痛苦，这一切都迫切需要更强大、更合理的<span class="s3">异步</span>方法。   
    在接下来的几章中，我们会探讨各种新出现的JavaScript<span class="s3">异步</span>编程技术。

深入理解<span class="s3">异步</span>的概念及其在JavaScript中的运作模式。

## 1.1 分块的程序
  * 可以把JavaScript程序写在单个．js文件中，但是这个程序几乎一定是由多个块构成的。   
      * JavaScript程序总是至少分为两个块：                                            
        1. 第一块现在运行；                                          
          这些块中只有一个是现在执行，                                        
        2. 下一块将来运行，以响应某个事件。                                          
          其余的则会在将来执行。                                       
      * 尽管程序是一块一块执行的，但是所有这些块共享对程序作用域和状态的访问，所以对状态的修改都是在之前累积的修改之上进行的。                                           

       * 最常见的块单位是函数。                                           
  * 程序中将来执行的部分并不一定在现在运行的部分执行完之后就立即执行。   
    换句话说，现在无法完成的<span class="s1">任务</span>将会<span class="s3">异步</span>完成，因此并不会出现人们本能地认为会出现的或希望出现的阻塞行为。  
    ```javascript
    // ajax(..)是某个库中提供的某个Ajax函数                                       
    var data = ajax("http://some.url.1");                                       
    console.log(data);                                        
    // 啊哦！data通常不会包含Ajax结果    
    ```                                    
    * 标准Ajax请求不是<span class="s6">同步</span>完成的，这意味着ajax(..)函数还没有返回任何值可以赋给变量data。  
    如果ajax(..)能够阻塞到响应返回，那么data = ..赋值就会正确工作。                                        
    * 现在我们发出一个<span class="s3">异步</span>Ajax请求，然后在将来才能得到返回的结果。   
    从现在到将来的“等待”，最简单的方法（但绝对不是唯一的，甚至也不是最好的！）是使用一个通常称为回调函数的函数：
    ```javascript
    // ajax(..)是某个库中提供的某个Ajax函数                                       
    ajax("http://some.url.1", function myCallbackFunction(data) {                                       
      console.log(data);  // 耶！这里得到了一些数据！                                     
    });                
    ```                       
    * 可以发送<span class="s6">同步</span>Ajax请求。尽管技术上说是这样，但是，在任何情况下都不应该使用这种方式， 
    因为它会锁定浏览器UI（按钮、菜单、滚动条等），并阻塞所有的用户交互。这是一个可怕的想法，一定要避免。                                       
    但为了避免回调函数引起的混乱并不足以成为使用阻塞式<span class="s6">同步</span>Ajax的理由。                                       
    * <p class="underline">任何时候，只要把一段代码包装成一个函数，并指定它在响应某个事件</p>
        * <p class="underline">定时器</p>
        * <p class="underline">鼠标点击</p>
        * <p class="underline">Ajax响应等</p>
        <p class="underline">时执行，你就是在代码中创建了一个将来执行的块，也由此在这个程序中引入了<span class="s3">异步</span>机制。</p>
      ```javascript
      function now() {                                          
        return 21;                                        
      }                                         
      function later() {                                          
        answer = answer * 2;                                        
        console.log("Meaning of life:", answer);                                        
      }                                         
      var answer = now();                                         
      setTimeout(later, 1000); // Meaning of life: 42                 
      ```                        
      这个程序有两个块：                                         
        1. 现在执行的部分     
          ```javascript                                  
          function now() {                                      
            return 21;                                    
          }                                     
          function later() { .. }                                     
          var answer = now();                                     
          setTimeout(later, 1000); // Meaning of life: 42                                 
          ```    
          现在这一块在程序运行之后就会立即执行。                                     
        2. 将来执行的部分         
          ```javascript                              
          answer = answer * 2;                                      
          console.log("Meaning of life:", answer);             
          ```                         
          但是，setTimeout(..)还设置了一个事件（定时）在将来执行，所以函数later()的内容会在之后的某个时间（从现在起1000毫秒之后）执行。                                     

## <span class="s3">异步</span>控制台
  * 并没有什么规范或一组需求指定console.＊方法族如何工作——它们并不是JavaScript正式的一部分，而是由宿主环境（请参考本书的“类型和语法”部分）添加到JavaScript中的。 
    因此，不同的浏览器和JavaScript环境可以按照自己的意愿来实现，有时候这会引起混淆。  
  * 在某些条件下，某些浏览器的console.log(..)并不会把传入的内容立即输出。  
    出现这种情况的主要原因是，在许多程序（不只是JavaScript）中，I/O是非常低速的阻塞部分。                                         
    所以，（从页面/UI的角度来说）浏览器在后台<span class="s3">异步</span>处理控制台I/O能够提高性能，这时用户甚至可能根本意识不到其发生。                                         
    下面这种情景不是很常见，但也可能发生，从中（不是从代码本身而是从外部）可以观察到这种情况： 
    ```javascript
      var a = {                                       
        index: 1                                      
      }                                       
      // 然后                                       
      console.log(a); // ??                                       
      // 再然后                                        
      a.index++     
      ```                                  
      * 我们通常认为恰好在执行到console.log(..)语句的时候会看到a对象的快照，打印出类似于{ index: 1 }这样的内容，然后在下一条语句a.index++执行时将其修改，这句的执行会严格在a的输出之后。                                       
      多数情况下，前述代码在开发者工具的控制台中输出的对象表示与期望是一致的。      
      * 但是，这段代码运行的时候，浏览器可能会认为需要把控制台I/O延迟到后台，在这种情况下，等到浏览器控制台输出对象内容时，a.index++可能已经执行，因此会显示{ index: 2 }。  
      * 到底什么时候控制台I/O会延迟，甚至是否能够被观察到，这都是游移不定的。      
      如果在调试的过程中遇到对象在console.log(..)语句之后被修改，可你却看到了意料之外的结果，要意识到这可能是这种I/O的<span class="s3">异步</span>化造成的。                                          
        * 如果遇到这种少见的情况，                                        
            * 最好的选择是在JavaScript调试器中使用断点，而不要依赖控制台输出。  
            * 次优的方案是把对象序列化到一个字符串中，以强制执行一次“快照”，比如通过JSON.stringify(..)。                                     


## 1.2 **事件循环**
  * 直到最近（ES6）, JavaScript才真正内建有直接的<span class="s3">异步</span>概念              
    前面提到的“直到最近”是指ES6从本质上改变了在哪里管理**事件循环**。   
    本来它几乎已经是一种正式的技术模型了，但现在ES6精确指定了**事件循环**的工作细节，这意味着在技术上将其纳入了JavaScript引擎的势力范围，而不是只由宿主环境来管理。    
    * 这个改变的一个主要原因是ES6中<span class="s1">Promise</span>的引入，
    因为这项技术要求对**事件循环**队列的调度运行能够直接进行精细控制                                        
    （参见1.4.3节中对setTimeout(..0)的讨论），具体内容会在第3章中介绍。                                          
  * 一旦有事件需要运行，**事件循环**就会运行，直到队列清空。  
    所有这些环境都有一个共同“点”（thread，也指线程。不论真假与否，这都不算一个很精妙的<span class="s3">异步</span>笑话），即                                          
    它们都提供了一种机制来处理程序中多个块的执行，  
    且执行每块时调用JavaScript引擎，                                       
    这种机制被称为**事件循环**。                                        
    * 换句话说，JavaScript引擎本身并没有时间的概念，只是一个按需执行JavaScript任意代码片段的环境。                                        
    * “事件”（JavaScript代码执行）调度总是由包含它的环境进行。    
      * 举例来说，如果你的JavaScript程序发出一个Ajax请求，从服务器获取一些数据， 
      * 那你就在一个函数（通常称为回调函数）中设置好响应代码，   
      * 然后JavaScript引擎会通知宿主环境：“嘿，现在我要暂停执行，你一旦完成网络请求，拿到了数据，就请调用这个函数。”   
      * 然后浏览器就会设置侦听来自网络的响应，拿到要给你的数据之后，就会把回调函数插入到**事件循环**，以此实现对这个回调的调度执行。                                      
  * **事件循环**的每一轮称为一个tick。                                           
  * 用户交互、IO和定时器会向事件队列中加入事件。                                           
  * 任意时刻，一次只能从队列中处理一个事件。                                            
    JavaScript引擎本身所做的只不过是在需要的时候，在给定的任意时刻执行程序中的单个代码块。  
    “需要”，谁的需要？这正是关键所在！                                        
    * JavaScript引擎并不是独立运行的，它运行在宿主环境中，                                       
      * 对多数开发者来说通常就是Web浏览器。                                     
      * 经过最近几年（不仅于此）的发展，JavaScript已经超出了浏览器的范围，进入了其他环境，  
        * 比如通过像Node.js这样的工具进入服务器领域。                                   
        * 实际上，JavaScript现如今已经嵌入到了从机器人到电灯泡等各种各样的设备中。  
  * 执行事件的时候，可能直接或间接地引发一个或多个后续事件。                                            
  * 什么是**事件循环**？                                            
    通过一段伪代码了解一下这个概念：  
    ```javascript                                        
    // eventLoop是一个用作队列的数组                                          
    // （先进，先出）                                          
    var eventLoop = [];                                         
    var event;                                          
    // “永远”执行                                         
    while(true) {                                         
      // 一次tick                                       
      if(eventLoop.length > 0) {                                        
        // 拿到队列中的下一个事件                                      
        event = eventLoop.shift();                                      
        // 现在，执行下一个事件                                     
        try {                                     
          event();                                    
        }                                     
        catch(err) {                                      
          reportError(err);                                   
        }                                     
      }                                       
    }       
    ```                                  
    有一个用while循环实现的持续运行的循环，循环的每一轮称为一个tick。                                         
    对每个tick而言，如果在队列中有等待事件，那么就会从队列中摘下一个事件并执行。 
    这些事件就是你的回调函数。                                         

    * 一定要清楚，setTimeout(..)并没有把你的回调函数挂在**事件循环**队列中。    
      * 它所做的是设定一个定时器。                                       
      * 当定时器到时后，环境会把你的回调函数放在**事件循环**中，                                        
      * 这样，在未来某个时刻的tick会摘下并执行这个回调。                                        
    * 如果这时候**事件循环**中已经有20个项目了会怎样呢？                                        
      你的回调就会等待。                                     
      它得排在其他项目后面——通常没有抢占式的方式支持直接将其排到队首。                                     
      这也解释了为什么setTimeout(..)定时器的精度可能不高。                                     
      大体说来，只能确保你的回调函数不会在指定的时间间隔之前运行，但可能会在那个时刻运行，也可能在那之后运行，要根据事件队列的状态而定。                                     
    所以换句话说就是，程序通常分成了很多小块，在**事件循环**队列中一个接一个地执行。 
    严格地说，和你的程序不直接相关的其他事件也可能会插入到队列中。                                       

## 1.3 <span class="s4">并行</span>线程
  * 术语“<span class="s3">异步</span>”和“<span class="s4">并行</span>”常常被混为一谈，但实际上它们的意义完全不同。                                           
    * <span class="s3">异步</span>是关于现在和将来的时间间隙                                         
    * <span class="s4">并行</span>是关于能够同时发生的事情    
  * <span class="s4">并行</span>线程的交替执行和<span class="s3">异步</span>事件的交替调度，其粒度是完全不同的。
      
  * 示例   
  ```javascript
        var a = 20;                                       
        function foo() {                                        
          a = a + 1;                                      
        }                                       
        function bar() {                                        
          a = a * 2;                                      
        }                                       
        // ajax(..)是某个库中提供的某个Ajax函数                                       
        ajax("http://some.url.1", foo);                                       
        ajax("http://some.url.2", bar);    
   ```                                       
  * <span class="s4">并行</span>计算最常见的工具就是进程和线程。                                            
    进程和线程独立运行，并可能同时运行在不同的处理器，甚至不同的计算机上                                          
    但多个线程能够共享单个进程的内存     
    但如果是在<span class="s4">并行</span>系统中，同一个程序中可能有两个不同的线程在运转，这时很可能就会得到不确定的结果。
    如果共享同一数据的JavaScript事件<span class="s4">并行</span>执行的话，那么问题就变得更加微妙了。                                
    * 考虑foo()和bar()中代码运行的线程分别执行的是以下两段伪代码<span class="s1">任务</span>，然后思考一下如果它们恰好同时运行的话会出现什么情况。
      ```javascript                                     
      线程1（X和Y是临时内存地址）：                                      
        foo():                                    
          a. 把a的值加载到X                                 
          b. 把1保存在Y                                 
          c. 执行X加Y，结果保存在X                                 
          d. 把X的值保存在a                                 
      线程2（X和Y是临时内存地址）：                                      
        bar():                                    
          a. 把a的值加载到X                                 
          b. 把2保存在Y                                 
          c. 执行X乘Y， 结果保存在X                                  
          d. 把X的值保存在a   
      ```                              
      假设两个线程<span class="s4">并行</span>执行。                                     
      你可能已经发现了这个程序的问题，是吧？                                     
      它们在临时步骤中使用了共享的内存地址X和Y。                                      
    * 如果按照以下步骤执行，最终结果将会是什么样呢？  
      ```javascript
      1a（把a的值加载到X      ==>20）                                   
      2a（把a的值加载到X      ==>20）                                   
      1b（把1保存在Y      ==>1）                                    
      2b（把2保存在Y      ==>2)                                    
      1c（执行X加Y，结果保存在X      =>22）                                    
      1d（把X的值保存在a      ==> 22）                                    
      2c（执行X乘Y，结果保存在X      ==> 44)                                    
      2d（把X的值保存在a      ==> 44）    
      ```                                
    * 但如果按照以下顺序执行呢？                                     
      ```javascript
      1a（把a的值加载到X      ==>20）                                   
      2a（把a的值加载到X      ==>20）                                   
      2b（把2保存在Y      ==>2)                                    
      1b（把1保存在Y      ==>1）                                    
      2c（执行X乘Y，结果保存在X      ==> 20)                                    
      1c（执行X加Y，结果保存在X      =>21）                                    
      1d（把X的值保存在a      ==> 22）                                    
      2d（把X的值保存在a      ==> 44）  
      ```                                  
    * 多线程编程是非常复杂的。                                      
      因为如果不通过特殊的步骤来防止这种中断和交错运行的话，可能会得到出乎意料的、不确定的行为，通常这很让人头疼。                                    
     
  * 与之相对的是，**事件循环**把自身的工作分成一个个<span class="s1">任务</span>并顺序执行，不允许对共享内存的<span class="s4">并行</span>访问和修改。                                           
    * 通过分立线程中彼此合作的**事件循环**，<span class="s4">并行</span>和顺序执行可以共存。  
        * 举例来说：                                       
            ```javascript                                            
            funcstion later() {                                         
              answer = answer * 2;                                        
              console.log("Meaning of life:", answer);                                        
            }            
            ```                             
           尽管later()的所有内容被看作单独的一个**事件循环**队列表项，                                         
           但如果考虑到这段代码是运行在一个线程中，实际上可能有很多个不同的底层运算。 
          * 比如，answer = answer ＊ 2需要先加载answer的当前值                                      
          * 然后把2放到某处并执行乘法，                                        
          * 取得结果之后保存回answer                                       
        * 在单线程环境中，线程队列中的这些项目是底层运算确实是无所谓的，因为线程本身不会被中断。
        * 根据JavaScript的单线程运行特性，                                       
        如果foo()运行在bar()之前，a的结果是42，                                      
        而如果bar()运行在foo()之前的话，a的结果就是41。   
    * JavaScript从不跨线程共享数据，这意味着不需要考虑这一层次的不确定性。   
    但是这并不意味着JavaScript总是确定性的。                                       
    回忆一下前面提到的，foo()和bar()的相对顺序改变可能会导致不同结果（41或42）。   
   可能目前还不是很明显，但并不是所有的不确定性都是有害的。这有时无关紧要，但有时又是要刻意追求的结果。关于这一点，本章和后面几章会给出更多示例。                                        
        
## 完整运行
  * 由于JavaScript的单线程特性，foo()（以及bar()）中的代码具有原子性。    
    也就是说，一旦foo()开始运行，它的所有代码都会在bar()中的任意代码运行之前完成，或者相反。   
    这称为完整运行（run-to-completion）特性。                                         
  * 实际上，如果foo()和bar()中的代码更长，完整运行的语义就会更加清晰，比如： 
    ```javascript
    // 块1：                                          
    var a = 1;                                          
    var b = 2;                                          

    function foo() {                                          
      // 块2：                                        
      a++;                                        
      b = b * a;                                        
      a = b + 3;                                        
    }                                         
    function bar() {                                          
      // 块3：                                        
      b--;                                        
      a = 8 + b;                                        
      b = a * 2;                                        
    }                                         
    // ajax(..)是某个库中提供的某个Ajax函数                                         
    ajax("http://some.url.1", foo);                                         
    ajax("http://some.url.2", bar);  
    ```                                       
    由于foo()不会被bar()中断，bar()也不会被foo()中断，所以这个程序只有两个可能的输出，取决于这两个函数哪个先运行  
    如果存在多线程，且foo()和bar()中的语句可以交替运行的话，可能输出的数目将会增加不少！   
    块1是<span class="s6">同步</span>的（现在运行）                                          
    块2和块3是<span class="s3">异步</span>的（将来运行），也就是说，它们的运行在时间上是分隔的。                                         
    块2和块3哪个先运行都有可能，所以这个程序有两个可能输出。    
      输出1：            
      ```javascript                                     
      var a = 1;                                        
      var b = 2;                                        

      // foo()                                        
      a++;                                        
      b = b * a;                                        
      a = b + 3;                                        

      // bar()                                        
      b--;                                        
      a = 8 + b;                                        
      b = a * 2;                                        

      a; // 11                                        
      b; // 22   
      ```                                     
      输出2：
      ```javascript                                        
      var a = 1;                                        
      var b = 2;                                        

      // bar()                                        
      b--;                                        
      a = 8 + b;                                        
      b = a * 2;                                        

      // foo()                                        
      a++;                                        
      b = b * a;                                        
      a = b + 3;                                        

      a; // 183                                       
      b; // 180   
      ```                                    

  * 同一段代码有两个可能输出意味着还是存在不确定性！                                            
    但是，这种不确定性是在函数（事件）顺序级别上，                                         
    而不是多线程情况下的语句顺序级别（或者说，表达式运算顺序级别）。                                          
    换句话说，这一确定性要高于多线程情况。                                         

  * 在JavaScript的特性中，这种函数顺序的不确定性就是通常所说的<span class="s2">竞态条件</span>（race condition）,                                           
     foo()和bar()相互竞争，看谁先运行。                                         
    具体来说，因为无法可靠预测a和b的最终结果，所以才是<span class="s2">竞态条件</span>。   
  如果JavaScript中的某个函数由于某种原因不具有完整运行特性，那么可能的结果就会多得多，对吧？ 
    实际上，ES6就引入了这么一个东西（参见第4章），现在还不必为此操心，以后还会再探讨这一部分！ 

## 1.4 <span class="s5">并发</span>
* <span class="s5">并发</span>是指两个或多个事件链随时间发展交替执行，以至于从更高的层次来看，就像是同时在运行（尽管在任意时刻只处理一个事件）。  
* 现在让我们来设想一个展示状态更新列表（比如社交网络新闻种子）的网站，其随着用户向下滚动列表而逐渐加载更多内容。  
  要正确地实现这一特性，需要（至少）两个独立的“进程”同时运行（也就是说，是在同一段时间内，并不需要在同一时刻）。     
  这里的“进程”之所以打上引号，是因为这并不是计算机科学意义上的真正操作系统级进程。    
  这是虚拟进程，或者<span class="s1">任务</span>，表示一个逻辑上相关的运算序列。                                             
  之所以使用“进程”而不是“<span class="s1">任务</span>”，是因为从概念上来讲，“进程”的定义更符合这里我们使用的意义。                                             
   1. 第一个“进程”在用户向下滚动页面触发onscroll事件时响应这些事件（发起Ajax请求要求新的内容）。   
   2. 第二个“进程”接收Ajax响应（把内容展示到页面）。                                          
显然，如果用户滚动页面足够快的话，在等待第一个响应返回并处理的时候可能会看到两个或更多onscroll事件被触发，因此将得到快速触发彼此交替的onscroll事件和Ajax响应事件。                                             
* 两个或多个“进程”同时执行就出现了<span class="s5">并发</span>，不管组成它们的单个运算是否<span class="s4">并行</span>执行（在独立的处理器或处理器核心上同时运行）。    
* 可以把<span class="s5">并发</span>看作“进程”级（或者<span class="s1">任务</span>级）的<span class="s4">并行</span>，与运算级的<span class="s4">并行</span>（不同处理器上的线程）相对。                                            
* <span class="s5">并发</span>也引出了这些“进程”之间可能的彼此交互的概念。我们会在后面介绍。                                          
在给定的时间窗口内（用户滚动页面的几秒钟内），我们看看把各个独立的“进程”表示为一系列事件/运算是什么样的：

    ```javascript                                            
    “进程”1（onscroll事件）：                                          
        onscroll，请求1                                      
        onscroll，请求2                                      
        onscroll，请求3                                      
        onscroll，请求4                                      
        onscroll，请求5                                      
        onscroll，请求6                                      
        onscroll，请求7                                      
    “进程”2（Ajax响应事件）：                                          
        响应1                                     
        响应2                                     
        响应3                                     
        响应4                                     
        响应5                                     
        响应6                                     
        响应7           
    ```           
很可能某个onscroll事件和某个Ajax响应事件恰好同时可以处理。举例来说，假设这些事件的时间线是这样的： 
```javascript  
onscroll，请求1                                      
onscroll，请求2          响应1                                     
onscroll，请求3          响应2                                     
响应3                                     
onscroll，请求4                                      
onscroll，请求5                                      
onscroll，请求6          响应4                                     
onscroll，请求7                                      
响应6                                     
响应5                                     
响应7           
```                          
本章前面介绍过**事件循环**的概念，JavaScript一次只能处理一个事件，所以要么是onscroll，请求2先发生，要么是响应1先发生，但是不会严格地同时发生。                                       
下面列出了**事件循环**队列中所有这些交替的事件：       
```javascript                                   
onscroll，请求1          <---进程1启动                                     
onscroll，请求2
响应1                    <---进程2启动                                      
onscroll，请求3
响应2                                     
响应3                                     
onscroll，请求4                                      
onscroll，请求5                                      
onscroll，请求6
响应4                                     
onscroll，请求7          <---进程1结束                                     
响应6                                     
响应5                                     
响应7                    <---进程2结束       
```                               
“进程”1和“进程”2<span class="s5">并发</span>运行（<span class="s1">任务</span>级<span class="s4">并行</span>），但是它们的各个事件是在**事件循环**队列中依次运行的。                                     
单线程**事件循环**是<span class="s5">并发</span>的一种形式（当然还有其他形式，后面会介绍）。


## <span class="s5">并发</span>合作方式
### 1.4.1 非交互                                           
两个或多个“进程”在同一个程序内<span class="s5">并发</span>地交替运行它们的步骤/事件时，如果这些<span class="s1">任务</span>彼此不相关，就不一定需要交互。                                          
如果进程间没有相互影响的话，不确定性是完全可以接受的。   
```javascript                                      
var res = {};                                         
function foo(results) {                                         
  res.foo = results;                                        
}                                         
function bar(results) {                                         
  res.bar = results;                                        
}                                         
// ajax(..)是某个库提供的某个Ajax函数                                          
ajax("http://some.url.1", foo);                                         
ajax("http://some.url.2", bar);  
```                                       
foo()和bar()是两个<span class="s5">并发</span>执行的“进程”，按照什么顺序执行是不确定的。                                          
但是，我们构建程序的方式使得无论按哪种顺序执行都无所谓，因为它们是独立运行的，不会相互影响。                                          
这并不是<span class="s2">竞态条件</span>bug，因为不管顺序如何，代码总会正常工作。                                          
  
通常需要对这些<span class="s5">并发</span>执行的“进程”（有别于操作系统中的进程概念）进行某种形式的交互协调，比如   
### 需要确保执行顺序或者需要防止竞态出现——1.4.2 交互                                          
通过共享作用域中的值进行交互                                          
更常见的情况是，<span class="s5">并发</span>的“进程”需要相互交流，通过作用域或DOM间接交互。                                        
如果出现这样的交互，就需要对它们的交互进行协调以避免竞态的出现。                                        
1. 两个<span class="s5">并发</span>的“进程”通过隐含的顺序相互影响，这个顺序有时会被破坏： 
  ```javascript                                        
  var res = [];                                     
  function response(data) {                                     
    res.push(data);                                   
  }                                     
  ajax("http://some.url.1", response);                                      
  ajax("http://some.url.2", response);   
  ```                                   
  这里的<span class="s5">并发</span>“进程”是这两个用来处理Ajax响应的response()调用。它们可能以任意顺序运行。   
  我们假定期望的行为是res\[0\]中放调用"`http://some.url.1`"的结果，res\[1\]中放调用"`http://some.url.2`"的结果。  
  有时候可能是这样，但有时候却恰好相反，这要视哪个调用先完成而定。                                      
  这种不确定性很有可能就是一个<span class="s2">竞态条件</span>bug。                                      
   * 在这些情况下，你对可能做出的假定要持十分谨慎的态度。                                        
    比如，开发者可能会观察到对"`http://some.url.2`"的响应速度总是显著慢于对"`http://some.url.1`"的响应，这可能是由它们所执行<span class="s1">任务</span>的性质决定的（比如，一个执行数据库<span class="s1">任务</span>，而另一个只是获取静态文件），所以观察到的顺序总是符合预期。                                      
    即使两个请求都发送到同一个服务器，也总会按照固定的顺序响应，但对于响应返回浏览器的顺序，却没有人可以真正保证。                                     
   * 可以协调交互顺序来处理这样的<span class="s2">竞态条件</span>：        
      ```javascript                                
      var res = [];                                     
      function response(data) {                                     
        if(data.url == "http://some.url.1") {                                   
          res[0] = data;                                  
        } else if(data.url == "http://some.url.2") {                                    
          res[1] = data;                                  
        }                                   
      ajax("http://some.url.1", response);                                      
      ajax("http://some.url.2", response);  
      ```                                    
  不管哪一个Ajax响应先返回，我们都要通过查看data.url（当然，假定从服务器总会返回一个！）判断应该把响应数据放在res数组中的什么位置上。                                     
  res[0]总是包含"`http://some.url.1`"的结果，res[1]总是包含"`http://some.url.2`"的结果。  
  通过简单的协调，就避免了<span class="s2">竞态条件</span>引起的不确定性。                                      
2. 从这个场景推出的方法也可以应用于多个<span class="s5">并发</span>函数调用通过共享DOM彼此之间交互的情况， 
  比如一个函数调用更新某个`<div>`的内容，另外一个更新这个`<div>`的风格或属性（比如使这个DOM元素一有内容就显示出来）。                                      
  可能你并不想在这个DOM元素在拿到内容之前显示出来，                                      
  所以这种协调必须要保证正确的交互顺序。                                     
3. 有些<span class="s5">并发</span>场景如果不做协调，就总是（并非偶尔）会出错。考虑： 
  ```javascript                                       
  var a, b;                                     
  function foo(x) {                                     
    a = x * 2;                                    
    baz();                                    
  }                                     
  function bar(y) {                                     
    b = y * 2;                                    
    baz();                                    
  }                                     
  function baz() {                                      
    console.log(a + b);                                   
  }                                     
  ajax("http://some.url.1", foo);                                     
  ajax("http://some.url.2", bar); 
  ```                                    
  在这个例子中，无论foo()和bar()哪一个先被触发，总会使baz()过早运行（a或者b仍处于未定义状态）；                                     
  但对baz()的第二次调用就没有问题，因为这时候a和b都已经可用了。                                      
  * 要解决这个问题有多种方法。这里给出了一种简单方法：  
    ```javascript                                    
    var a, b;                                   
    function foo(x) {                                   
      a = x * 2;                                  
      if( a && b) {                                 
        baz();                                
      }                                 
    }                                   
    function bar(y) {                                   
      b = y * 2;                                  
      if(a && b) {                                  
        baz();                                
      }                                 
    }                                   
    function baz() {                                    
      console.log(a + b);                                 
    }                                   
    ajax("http://some.url.1", foo);                                   
    ajax("http://some.url.2", bar);  
    ```                                 
    包裹baz()调用的条件判断if (a && b)传统上称为门（gate），我们虽然不能确定a和b到达的顺序，但是会等到它们两个都准备好再进一步打开门（调用baz()）。                                   
4. 另一种可能遇到的<span class="s5">并发</span>交互条件有时称为竞态（race），但是更精确的叫法是门闩（latch）。  
  它的特性可以描述为“只有第一名取胜”。                                     
  在这里，不确定性是可以接受的，因为它明确指出了这一点是可以接受的：需要“竞争”到终点，且只有唯一的胜利者。 
  ```javascript 
  var a;                                      
  function foo(x) {                                     
    a = x * 2;                                    
    baz();                                    
  }                                     
  function bar(x) {                                     
    a = x / 2;                                    
    baz();                                    
  }                                     
  function baz() {                                      
    console.log(a);                                   
  }                                     
  ajax("http://some.url.1", foo);                                     
  ajax("http://some.url.2", bar);    
  ```                                 
  不管哪一个（foo()或bar()）后被触发，都不仅会覆盖另外一个给a赋的值，也会重复调用baz()（很可能并不是想要的结果）。
  * 可以通过一个简单的门闩协调这个交互过程，只让第一个通过： 
      ```javascript                                      
      var a;                                    
      function foo(x) {                                   
        if(!a) {                                  
          a = x * 2;                                
          baz();                                
        }                                 
      }                                   
      function bar(x) {                                   
        if(!a) {                                  
          a = x / 2;                                
          baz();                                
        }                                 
      }                                   
      function baz() {                                    
        console.log( a );                                 
      }                                   
      ajax("http://some.url.1", foo);                                   
      ajax("http://some.url.2", bar);    
      ```                               
  条件判断if (! a)使得只有foo()和bar()中的第一个可以通过，第二个（实际上是任何后续的）调用会被忽略。也就是说，第二名没有任何意义！                                   
出于简化演示的目的，在所有这些场景中，我们一直都使用了全局变量，但这对于此处的论证完全不是必需的。  
只要相关的函数（通过作用域）能够访问到这些变量，就会按照预期工作。                                       
依赖于词法作用域变量（参见本系列的《你不知道的JavaScript（上卷）》的“作用域和闭包”部分），实际上前面例子中那样的全局变量，对于这些类别的<span class="s5">并发</span>协调是一个明显的负面因素。                                       
随着后面几章内容的展开，我们会看到还有其他种类的更清晰的协调方式。                                       

### 这些“进程”也可以通过把自身分割为更小的块，以便其他“进程”插入进来。——1.4.3 协作                                         
还有一种<span class="s5">并发</span>合作方式，称为<span class="s5">并发</span>协作（cooperative concurrency）。                                       
这里的重点不再是通过共享作用域中的值进行交互（尽管显然这也是允许的！）。   
这里的目标是取到一个长期运行的“进程”，并将其分割成多个步骤或多批<span class="s1">任务</span>，使得其他<span class="s5">并发</span>“进程”有机会将自己的运算插入到**事件循环**队列中交替运行。                                        
考虑一个需要遍历很长的结果列表进行值转换的Ajax响应处理函数。    
  ```javascript                                     
  var res = [];                                     
  // response(..)从Ajax调用中取得结果数组                                     
  function response(data) {                                     
    // 添加到已有的res数组                                    
    res = res.concat(                                   
      // 创建一个新的变换数组把所有data值加倍                                 
      data.map(function (val) {                                 
        return val * 2;                               
      })                                  
    )                                   
  }                                     
  // ajax(..)是某个库中提供的某个Ajax函数                                     
  ajax("http://some.url.1", response);                                      
  ajax("http://some.url.2", response);   
  ```                                   
  * 如果"`http://some.url.1`"首先取得结果，那么整个列表会立刻映射到res中。  
  如果记录有几千条或更少，这不算什么。
  但是如果有像1000万条记录的话，就可能需要运行相当一段时间了  
     * 在高性能笔记本上需要几秒钟
     * 在移动设备上需要更长时间，等等                                      
  * 这样的“进程”运行时，页面上的其他代码都不能运行，包括不能有其他的response(..)调用或UI刷新，甚至是像滚动、输入、按钮点击这样的用户事件。这是相当痛苦的。                                     
  * 所以，要创建一个协作性更强更友好且不会霸占**事件循环**队列的<span class="s5">并发</span>系统，你可以<span class="s3">异步</span>地批处理这些结果。每次处理之后返回****事件循环****，让其他等待事件有机会运行。                                       
  这里给出一种非常简单的方法：       
  ```javascript                                
  var res = [];                                     
  // response(..)从Ajax调用中取得结果数组                                     
  function response(data) {                                     
    // 一次处理1000个                                    
    var chunk = data.splice(0, 1000);                                   
    // 添加到已有的res数组                                    
    res = res.concat(                                   
      chunk.map(function(val) {                                 
        return val * 2;                               
      })                                  
    );                                    
    // 还有剩下的需要处理吗？                                    
    if(data.length > 0) {                                   
      // <span class="s3">异步</span>调度下一次批处理                                 
      setTimeout(function() {                                 
        response(data)                                
      }, 0);                                  
    }                                   
  }                                     
  ajax("http://some.url.1", response);                                      
  ajax("http://some.url.2", response);  
  ```                                    
  我们把数据集合放在最多包含1000条项目的块中。                                      
  * 这样，我们就确保了“进程”运行时间会很短，即使这意味着需要更多的后续“进程”，因为**事件循环**队列的交替运行会提高站点/App的响应（性能）。                                   
  * 当然，我们并没有协调这些“进程”的顺序，所以结果的顺序是不可预测的。                                      
  * 如果需要排序的话，就要使用和前面提到类似的交互技术，或者本书后面章节将要介绍的技术。   
  * 这里使用setTimeout(..0)（hack）进行<span class="s3">异步</span>调度  
    基本上它的意思就是“把这个函数插入到当前**事件循环**队列的结尾处”。                                      
    严格说来，setTimeout(..0)并不直接把项目插入到**事件循环**队列。  
    定时器会在有机会的时候插入事件。                                   
    * 举例来说，两个连续的setTimeout(..0)调用不能保证会严格按照调用顺序处理，所以各种情况都有可能出现，比如定时器漂移，在这种情况下，这些事件的顺序就不可预测。                                    
    * 在Node.js中，类似的方法是process.nextTick(..)。  
    尽管它们使用方便（通常性能也更高），但并没有（至少到目前为止）直接的方法可以适应所有环境来确保<span class="s3">异步</span>事件的顺序。                                    
    下一小节我们会深入讨论这个话题。   

## 1.5 <span class="s1">任务</span>
  在ES6中，有一个新的概念建立在**事件循环**队列之上，叫作<span class="s1">任务</span>队列（jobqueue）。                                            
  这个概念给大家带来的最大影响可能是<span class="s1">Promise</span>的<span class="s3">异步</span>特性（参见第3章）。                                           
  遗憾的是，目前为止，这是一个没有公开API的机制，因此要展示清楚有些困难。所以我们目前只从概念上进行描述，等到第3章讨论<span class="s1">Promise</span>的<span class="s3">异步</span>特性时，你就会理解这些动作是如何协调和处理的。                                           
  * **事件循环**队列类似于一个游乐园游戏：玩过了一个游戏之后，你需要重新到队尾排队才能再玩一次。                                            
  * <span class="s1">任务</span>队列类似于玩过了游戏之后，插队接着继续玩。  
    * 对于<span class="s1">任务</span>队列最好的理解方式就是，它是挂在**事件循环**队列的每个tick之后的一个队列。                                           
      在**事件循环**的每个tick中，可能出现的<span class="s3">异步</span>动作不会导致一个完整的新事件添加到**事件循环**队列中，而会在当前tick的<span class="s1">任务</span>队列末尾添加一个项目（一个<span class="s1">任务</span>）。                                         
      这就像是在说：“哦，这里还有一件事将来要做，但要确保在其他任何事情发生之前就完成它。”                                         
    * 一个<span class="s1">任务</span>可能引起更多<span class="s1">任务</span>被添加到同一个队列末尾。                                          
    所以，理论上说，<span class="s1">任务</span>循环（job loop）可能无限循环（一个<span class="s1">任务</span>总是添加另一个<span class="s1">任务</span>，以此类推），进而导致程序的饿死，无法转移到下一个**事件循环**tick。  
    从概念上看，这和代码中的无限循环（就像while(true)..）的体验几乎是一样的。                                         
    * <span class="s1">任务</span>和setTimeout(..0) hack的思路类似，但是其实现方式的定义更加良好，对顺序的保证性更强：尽可能早的将来。                                          
  设想一个调度<span class="s1">任务</span>（直接地，不要hack）的API，称其为schedule(..)。考虑：  
    ```javascript                                           
    console.log("A");                                         
    setTimeout(function() {                                         
      console.log("B");                                       
    }, 0);                                          
    // 理论上的“<span class="s1">任务</span>API”                                          
    schedule(function() {                                         
      console.log("C");                                       
      schedule(function() {                                       
        console.log("D");                                     
      });                                       
    });          
    ```                               
    实际打印的结果是A C D B。                                          
      因为<span class="s1">任务</span>处理是在当前**事件循环**tick结尾处，                                        
      且定时器触发是为了调度下一个**事件循环**tick（如果可用的话！）。                                        
    在第3章中，我们将会看到，<span class="s1">Promise</span>的<span class="s3">异步</span>特性是基于<span class="s1">任务</span>的，所以一定要清楚它和**事件循环**特性的关系。                                         

## 1.6 语句顺序

* 代码中语句的顺序和JavaScript引擎执行语句的顺序并不一定要一致。                                            
这门语言的规则和语法已经从程序的角度在语序方面规定了可预测和非常可靠的特性。     
所以，接下来我们要讨论的内容你应该无法在自己的JavaScript程序中观察到。   
* 如果你观察到了类似于我们将要展示的编译器对语句的重排序，
   * 那么这很明显违反了规范，而这一定是由所使用的JavaScript引擎中的bug引起的——该bug应该被报告和修正！                                           
   * 但是更可能的情况是，当你怀疑JavaScript引擎做了什么疯狂的事情时，实际上却是你自己代码中的bug（可能是<span class="s2">竞态条件</span>）引起的。                                           
所以首先要检查自己的代码，并且要反复检查。   
通过使用断点和单步执行一行一行地遍历代码，JavaScript调试器就是用来发现这样bug的最强大工具。
* 重点是，只要这个重新排序是不可见的，一切都没问题。   
  ```javascript 
  var a, b;                                         
  a = 10;                                         
  b = 30;                                         

  a = a + 1;                                          
  b = b + 1;                                          

  console.log(a + b); // 42          
  ```                               
  这段代码中没有显式的<span class="s3">异步</span>（除了前面介绍过的很少见的<span class="s3">异步</span>I/O!），所以很可能它的执行过程是从上到下一行行进行的。                                          
  JavaScript引擎在编译这段代码之后（是的，JavaScript是需要编译的）可能会发现通过（安全地）重新安排这些语句的顺序有可能提高执行速度。  
                                           
  * 比如，引擎可能会发现，其实这样执行会更快：       
      ```javascript                                     
      var a, b;                                       
    
      a = 10;                                       
      a++                                       
    
      b = 30;                                       
      b++;                                        
    
      console.log(a + b); // 42    
      ```                                   
  * 或者这样：              
      ```javascript                            
      var a, b;                                       
      
      a = 11;                                       
      b = 31;                                       
      
      console.log(a + b); // 42    
      ```                                   
  * 或者甚至这样：       
      ```javascript                                   
      // 因为a和b不会被再次使用                                       
      // 我们可以inline，从而完全不需要它们！                                        
      console.log( 42 ); // 42    
      ```                                    
  前面的所有情况中，JavaScript引擎在编译期间执行的都是安全的优化，最后可见的结果都是一样的。                                            
* 但是这里有一种场景，其中特定的优化是不安全的，因此也是不允许的（当然，不用说这其实也根本不能称为优化）：  
  ```javascript 
  var a, b;                                       
  a = 10;                                       
  b = 30;                                       

  // 我们需要a和b处于递增之前的状态！                                        
  console.log(a * b); // 300                                        

  a = a + 1;                                        
  b = b + 1;                                        

  console.log(a + b); // 42   
  ```                                    
* 还有其他一些例子，其中编译器重新排序会产生可见的副作用（因此必须禁止），比如    
  会产生副作用的函数调用（特别是getter函数）                                        
  ES6代理对象（参考本系列的《你不知道的JavaScript（下卷）》的“ES6 &Beyond”部分）。                       
  ```javascript                 
  function foo() {                                        
    console.log( b );                                     
    return 1;                                     
  }                                       

  var a, b, c;                                        

  // ES5.1 getter字面量语法                                        
  c = {                                       
    get bar() {                                     
      console.log(a);                                   
      return 1;                                   
    }                                     
  };                                        

  a = 10;                                       
  b = 30;                                       
  a += foo();  // 30                                        
  b += c.bar;  // 11                                        

  console.log(a + b);  // 42    
  ```                                    
  如果不是因为代码片段中的语句console.log(..)（只是作为一种方便的形式说明可见的副作用）, JavaScript引擎如果愿意的话，本来可以自由地把代码重新排序如下：          
  ```javascript                               
  // ...                                        
  a = 10 + foo();                                       
  b = 30 + c.bar;                                       
  // ...       
  ```        

                         
* 尽管JavaScript语义让我们不会见到编译器语句重排序可能导致的噩梦，这是一种幸运，但是代码编写的方式（从上到下的模式）和编译后执行的方式之间的联系非常脆弱，理解这一点也非常重要。                                        
编译器语句重排序几乎就是<span class="s5"><span class="s5">并发</span></span>和交互的微型隐喻。                                       
作为一个一般性的概念，清楚这一点能够使你更好地理解<span class="s3">异步</span>JavaScript代码流问题。                                       



# 回调
## 回调函数是JavaScript<span class="s3">异步</span>的基本单元。                   
  回调是这门语言中最基础的<span class="s3">异步</span>模式。                 
  到目前为止，回调是编写和处理JavaScript程序<span class="s3">异步</span>逻辑的最常用方式。                 
  无数JavaScript程序，甚至包括一些最为高深和复杂的，所依赖的<span class="s3">异步</span>基础也仅限于回调（当然，它们使用了第1章介绍的各种<span class="s5">并发</span>交互模式）。                 
  回调函数是JavaScript的<span class="s3">异步</span>主力军，并且它们不辱使命地完成了自己的任务。                  
## 通过回调表达程序<span class="s3">异步</span>和管理<span class="s5">并发</span>的两个主要缺陷：
  但是随着JavaScript越来越成熟，对于<span class="s3">异步</span>编程领域的发展，回调已经不够用了。                   
  回调函数也不是没有缺点。                  
  只有理解了某种抽象的目标和原理，才能有效地应用这种抽象机制。                  
  回调函数可以实现所有你想要的功能，但是你需要努力才行。这些努力通常比你追踪这样的代码能够或者应该付出的要多得多。 
  本章将深入探讨这两点，以便弄懂为什么更高级的<span class="s3">异步</span>模式（后续章节和附录B中将会讨论）是必需和备受期待的。       
### 1. 缺乏顺序性
 

大脑对于事情的计划方式是线性的、阻塞的、单线程的语义，但是回调表达<span class="s3">异步</span>流程的方式是非线性的、非顺序的，这使得正确推导这样的代码难度很大。难于理解的代码是坏代码，会导致坏bug。                  
我们需要一种更<span class="s6">同步</span>、更顺序、更阻塞的的方式来表达<span class="s3">异步</span>，就像我们的大脑一样。               

#### 2.1 <span class="s1">continuation</span>                
第1章中给出的<span class="s3">异步</span>回调的例子，为了突出重点，以下稍作了修改： 
```javascript             
// A            
ajax("..", function(..) {           
  // C          
});           
// B            
// A和// B表示程序的前半部分（也就是现在的部分）              
前半部分立刻执行，然后是一段时间不确定的停顿。           
// C标识了程序的后半部分（也就是将来的部分）。 
```            
在未来的某个时刻，如果Ajax调用完成，程序就会从停下的位置继续执行后半部分。           
回调函数包裹或者说封装了程序的延续（<span class="s1">continuation</span>）。            
让我们进一步简化这段代码：   
```javascript          
// A            
setTimeout(function() {           
  // C          
}, 1000);           
// B      
```      
思考一下你自己会如何（向对JavaScript运作机制不甚了解的某位人士）描述这段程序的运行方式。然后试着把你的描述大声说出来。            
这种不匹配既微妙又显著，也正是理解回调作为<span class="s3">异步</span>表达和管理方式的缺陷的关键所在。           
  一旦我们以回调函数的形式引入了单个<span class="s1">continuation</span>（或者几十个，就像很多程序所做的那样！），我们就容许了大脑工作方式和代码执行方式的分歧。         
  一旦这两者出现分歧（这远不是这种分歧出现的唯一情况，我想你明白这一点！），我们就得面对这样一个无法逆转的事实：代码变得更加难以理解、追踪、调试和维护。    

2.2 顺序的大脑 
* 我们最高级的大脑功能是以并行多线程的形式运行的吗？                
  答案可能出乎你的意料：很可能并不是这样。              
  我们更多是单任务执行者。实际上，在任何特定的时刻，我们只能思考一件事情。              
  我们在讨论的是此时处于意识前端的那些任务。             
  我们在假装并行执行多个任务时，实际上极有可能是在进行快速的上下文切换              
    我们是在两个或更多任务之间快速连续地来回切换，同时处理每个任务的微小片段。           
    我们切换得如此之快，以至于对外界来说，我们就像是在并行地执行所有任务。           
  这听起来是不是和<span class="s3">异步</span>事件<span class="s5">并发</span>机制（比如JavaScript中的形式）很相似呢              
  我们大脑的工作方式有点类似于**事件循环**队列。             
    我不会在每次可能被打断的时候都转而投入到其他“进程”中。            
    但是，中断的发生经常频繁到让我觉得我的大脑几乎是不停地切换到不同的上下文（即“进程”）中。很可能JavaScript引擎也是这种感觉。           

####  2.2.1 执行与计划               
  我们的大脑可以看作类似于单线程运行的**事件循环**队列，就像JavaScript引擎那样。              
  * 在我们如何计划各种任务和我们的大脑如何实际执行这些计划之间，还存在着很大的差别。              
    * 我心里大致的计划是写啊写啊一直写，依次完成我脑海中已经按顺序排好的一系列要点。           
      我并没有将任何中断或非线性的行为纳入到我的写作计划中。         
      然而，尽管如此，实际上我的大脑还是在不停地切换状态。   
      * 这个较高层级的思考（计划）过程看起来并不怎么符合<span class="s3">异步</span>事件方式。             
      实际上，我们认真思考的时候很少是以事件的形式进行的。            
      取而代之的是，我们按照顺序（A，然后B，然后C）仔细计划着，并且会假定有某种形式的临时阻塞来保证B会等待A完成，C会等待B完成。            
    * 虽然在执行的层级上，我们的大脑是以<span class="s3">异步</span>事件方式运作的，           
    但我们的任务计划似乎还是以顺序、<span class="s6">同步</span>的方式进行：“我要先去商店，然后买点牛奶，然后去一下干洗店。”           
  * 如果说<span class="s6">同步</span>的大脑计划能够很好地映射到<span class="s6">同步</span>代码语句              
    开发者编写代码的时候是在计划一系列动作的发生。           
      优秀的开发者会认真计划。          
      “我需要把z设为x的值，然后把x设为y的值”，等等。          
    编写<span class="s6">同步</span>代码的时候，语句是一条接一条执行的，其工作方式非常类似于待办任务清单。 
      ```javascript          
      // 交换x和y（通过临时变量z）         
      z = x;          
      x = y;          
      y = z;    
      ```      
      这三条语句是<span class="s6">同步</span>执行的，          
        所以x = y会等待z = x执行完毕，        
        然后y = z等待x = y执行完毕。       
      换个说法就是，这三条语句临时绑定按照特定顺序一个接一个地执行。         
  * 那么我们的大脑在规划<span class="s3">异步</span>代码方面又是怎样的呢？             
    * 答案是代码（通过回调）表达<span class="s3">异步</span>的方式并不能很好地映射到<span class="s6">同步</span>的大脑计划行为。           
      如果我们这样计划一天中要做什么以及按什么顺序来做的话，事实就会像听上去那样荒谬。          
      但是，在实际执行方面，我们的大脑就是这么运作的。记住，不是多任务，而是快速的上下文切换。          
    * 对我们程序员来说，编写<span class="s3">异步</span>事件代码，特别是当回调是唯一的实现手段时，困难之处就在于这种思考/计划的意识流对我们中的绝大多数来说是不自然的。           
      我们的思考方式是一步一步的，但是从<span class="s6">同步</span>转换到<span class="s3">异步</span>之后，可用的工具（回调）却不是按照一步一步的方式来表达的。         
  * 唯一比不知道代码为什么崩溃更可怕的事情是，不知道为什么一开始它是工作的！            
      这就是经典的“纸牌屋”心理：“它可以工作，可我不知道为什么，所以谁也别碰它！”         
      你可能听说过“他人即地狱”（萨特）这种说法，对程序员来说则是“他人的代码即地狱”。         
      而我深信不疑的是：“不理解自己的代码才是地狱。”回调就是主要元凶之一。         
                
####  2.2.2 嵌套回调与链式回调    
* 以这种方式线性地追踪这段代码还有几个问题  
   1. 这里我们得到了三个函数嵌套在一起构成的链，其中每个函数代表<span class="s3">异步</span>序列（任务，“进程”）中的一个步骤。             
   这种代码常常被称为回调地狱（callback hell），有时也被称为毁灭金字塔（pyramid of doom，得名于嵌套缩进产生的横向三角形状）。             
   但实际上回调地狱与嵌套和缩进几乎没有什么关系。它引起的问题要比这些严重得多。            
   本章后面的内容会就此类问题的现象和原因展开讨论。
    ```javascript           
    listen("click", function handler(evt) {             
    setTimeout(function request() {           
      ajax("http://some.url.1", function response(text) {         
        if(text == "hello") {       
          handler();      
        }       
        else if(text == "world") {        
          request();      
        }       
      });         
    }, 500);            
    });  
    ``` 
   
      * 一眼看去，这段代码似乎很自然地将其<span class="s3">异步</span>性映射到了顺序大脑计划。           
      一开始我们在等待click事件  
        首先（现在）我们有：          
        ```javascript
        listen("..", function handler(..) {         
          // ..       
        });      
        ``` 
        * 然后等待定时器启动  
        然后是将来，我们有：  
        ```javascript        
        setTimeout(function request(..) {         
          // ..       
        }, 500); 
        ```         
        * 然后等待Ajax响应返回  
        接着还是将来，我们有：
        ```javascript         
        ajax("..", function response(..) {          
          // ..       
        }); 
        ```        
        * 之后可能再重头开始  
        最后（最晚的将来），我们有： 
        ```javascript         
        if(..) {          
          // ..       
        }         
        else ..   
        ```      
      首先，例子中的步骤是按照1、2、3、4……的顺序，这只是一个偶然。         
      实际的<span class="s3">异步</span>JavaScript程序中总是有很多噪声，使得代码更加杂乱。       
      在大脑的演习中，我们需要熟练地绕过这些噪声，从一个函数跳到下一个函数。       
      对于这样满是回调的代码，理解其中的<span class="s3">异步</span>流不是不可能，但肯定不自然，也不容易，即使经过大量的练习也是如此。        
   2. 另外，其中还有一个隐藏更深的错误，但在代码例子中，这个错误并不明显。我们另外设计一个场景（伪代码）来展示这一点：   
      ```javascript
      doA(function() {        
        doB();      
        doC(function () {     
          doD();    
        })      
        doE();      
      });       
      doF();  
      ```      
      实际运行顺序是这样的： 
      ```javascript      
        doA()     
        doF()     
        doB()     
        doC()     
        doE()     
        doD()   
      ```  
      * 有些人可能会认为我的函数命名有意误导了大家，不过还是让我再试一次吧：
          ```javascript        
          doA(function() {        
            doC();      
            doD(function () {     
              doF();    
            })      
            doE();      
          });       
          doB();  
          ```      
      * 但即使你能够很轻松地得出结论，还是有一个可能导致严重问题的风险。你能够指出这一点吗？        
        如果doA(..)或doD(..)实际并不像我们假定的那样是<span class="s3">异步</span>的，情况会如何呢？     
        啊，那顺序就更麻烦了。     
        如果它们是<span class="s6">同步</span>的（或者根据程序当时的状态，只在某些情况下是<span class="s6">同步</span>的），那么现在运行顺序就是A→C→D→F→E→B。      
              
   3. 问题是出在嵌套上吗？是它导致跟踪<span class="s3">异步</span>流如此之难吗？确实，部分原因是这样。但是，让我们不用嵌套再把前面的嵌套事件/超时/Ajax的例子重写一遍吧：    
        ```javascript      
        listen("click:, handler);       
                
        function handler() {        
          setTimeout(request, 500);     
        }       
                
        function request() {        
          ajax("http://some.url.1", response);      
        }       
                
        function response(text) {       
          if(text == "hello") {     
            handler();    
          }     
          else if(text == "world") {      
            request();    
          }     
        }      
        ``` 
        * 这种组织形式的代码不像前面以嵌套/缩进的形式组织的代码那么容易识别了，但是它和回调地狱一样脆弱，易受影响。为什么？       
        在线性（顺序）地追踪这段代码的过程中，我们不得不从一个函数跳到下一个，再跳到下一个，在整个代码中跳来跳去以“查看”流程。        
        而且别忘了，这还是简化的形式，只考虑了最优情况。        
        我们都知道，真实的<span class="s3">异步</span>JavaScript程序代码要混乱得多，这使得这种追踪的难度会成倍增加。       
                
        * 还有一点需要注意：要把步骤2、步骤3和步骤4连接在一起让它们顺序执行，只用回调的话，代价可以接受的唯一方式是把步骤2硬编码到步骤1中，步骤3硬编码到步骤2中，步骤4硬编码到步骤3中，以此类推。        
        如果实际上步骤2总会引出步骤3是一个固定条件的话，硬编码本身倒不一定是坏事。      
        但是，硬编码肯定会使代码更脆弱一些，因为它并没有考虑可能导致步骤执行顺序偏离的异常情况。      
        比如，如果步骤2失败，就永远不会到达步骤3，不管是重试步骤2，还是跳转到其他错误处理流程，等等。      
  这些问题都可以通过在每个步骤中手工硬编码来解决，但这样的代码通常是重复的，并且在程序中的其他<span class="s3">异步</span>流中或其他步骤中无法复用。       
* 这才是回调地狱的真正问题所在！嵌套和缩进基本上只是转移注意力的枝节而已。
   * 尽管我们的大脑能够以顺序的方式（这个，然后这个，然后这个）计划一系列任务，但大脑运作的事件化的本质使得控制流的恢复/重试/复制几乎不费什么力气。      
      如果你出外办事的时候发现把购物清单落在了家里，那么这一天并不会因为你没有预知到这一点就成为世界末日了。你的大脑很容易就能针对这个小意外做出计划：回家拿清单，然后立刻返回商店就是了。    
   * 但是，手工硬编码（即使包含了硬编码的出错处理）回调的脆弱本性可就远没有这么优雅了。     
      一旦你指定（也就是预先计划）了所有的可能事件和路径，代码就会变得非常复杂，以至于无法维护和更新。    
   * 如果这还不够的话，我们还没有提及两个或更多回调<span class="s1">continuation</span>同时发生的情况，或者如果步骤3进入了带有gate或latch的并行回调的分支，还有……不行，我脑子转不动了，你怎么样？！       
   * 现在你抓住重点了吗？我们的顺序阻塞式的大脑计划行为无法很好地映射到面向回调的<span class="s3">异步</span>代码。
   这就是回调方式最主要的缺陷：对于它们在代码中表达<span class="s3">异步</span>的方式，我们的大脑需要努力才能<span class="s6">同步</span>得上。          


### 2. 缺乏可信任性
2.3 信任问题  
也是更重要的一点，回调会受到**控制反转**的影响，                 
因为回调暗中把控制权交给第三方（通常是不受你控制的第三方工具！）来调用你代码中的<span class="s1">continuation</span>。               
这种控制转移导致一系列麻烦的信任问题，比如回调被调用的次数是否会超出预期。               
顺序的人脑计划和回调驱动的<span class="s3">异步</span>JavaScript代码之间的不匹配只是回调问题的一部分。                
还有一些更深入的问题需要考虑。               
#### 回调最大的问题是**控制反转**  
它会导致信任链的完全断裂。如果你的代码中使用了回调，尤其是但也不限于使用第三方工具，而且你还没有应用某种逻辑来解决所有这些**控制反转**导致的信任问题，那你的代码现在已经有了bug，即使它们还没有给你造成损害。隐藏的bug也是bug。确实是地狱。               
  * 让我们再次思考一下程序中把回调当作<span class="s1">continuation</span>（也就是后半部分）的概念： 
    ```javascript             
    // A            
    ajax("..", function(..) {           
      // C          
    });           
    // B   
    ```         
    * // A和// B发生于现在，在JavaScript主程序的直接控制之下。           
    * // C会延迟到将来发生，并且是在第三方的控制下——在本例中就是函数ajax(..)。从根本上来说，这种控制的转移通常不会给程序带来很多问题。           
    但是，请不要被这个小概率迷惑而认为这种控制切换不是什么大问题。实际上，这是回调驱动设计最严重（也是最微妙）的问题。           
      它以这样一个思路为中心：有时候ajax(..)（也就是你交付回调<span class="s1">continuation</span>的第三方）不是你编写的代码，也不在你的直接控制下。多数情况下，它是某个第三方提供的工具。          
      我们把这称为**控制反转**（inversion of control），也就是把自己程序一部分的执行控制交给某个第三方。在你的代码和第三方工具（一组你希望有人维护的东西）之间有一份并没有明确表达的契约。          

#### 你开始沿着这个兔子洞深挖下去，考虑着他们调用你的回调时所有可能的出错情况。
这里粗略列出了你能想到的分析工具可能出错的情况：       
##### 调用回调过早（在追踪之前）；  
还有一个信任问题是调用过早。            
在特定应用的术语中，这可能实际上是指在某个关键任务完成之前调用回调。          
但是更通用地来说，对于既可能在现在（<span class="s6">同步</span>）也可能在将来（<span class="s3">异步</span>）调用你的回调的工具来说，这个问题是明显的。          

  * 这种由<span class="s6">同步</span>或<span class="s3">异步</span>行为引起的不确定性几乎总会带来极大的bug追踪难度。            
  在某些圈子里，人们用虚构的十分疯狂的恶魔Zalgo来描述这种<span class="s6">同步</span>/<span class="s3">异步</span>噩梦。          
  常常会有“不要放出Zalgo”这样的呼喊，而这也引出了一条非常有效的建议：永远<span class="s3">异步</span>调用回调，即使就在**事件循环**的下一轮，这样，所有回调就都是可预测的<span class="s3">异步</span>调用了。         
  关于Zalgo的更多信息，可以参考Oren Golan的“Don't ReleaseZalgo! ”（`https://github.com/oren/oren.github.io/blob/master/posts/zalgo.md`）以及Issac Z. Schlueter的“Designing APIs for Asynchrony”（`http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony`）。  
      
 ```javascript       
  function result(data) {         
    console.log(a);       
  }         
  var a = 0;          
  ajax("..pre-cached-url..", result);         
  a++;       
  ```   

  这段代码会打印出0（<span class="s6">同步</span>回调调用）还是1（<span class="s3">异步</span>回调调用）呢？这要视情况而定。          
  你可以看出Zalgo的不确定性给JavaScript程序带来的威胁。所以听上去有点傻的“不要放出Zalgo”实际上十分常用，并且也是有用的建议。永远要<span class="s3">异步</span>。          
  * 如果你不确定关注的API会不会永远<span class="s3">异步</span>执行怎么办呢？可以创建一个类似于这个“验证概念”版本的asyncify(..)工具：  
  ```javascript         
  function asyncify(fn) {         
    var origfn = fn,        
      intv = setTimeout(function() {      
        intv = null;    
        if(fn) fn();    
      }, 0)     
      fn = null;      
      return function() {     
        // 触发太快，在定时器intv触发指示<span class="s3">异步</span>转换发生之前？   
        if(intv) {    
          fn = origfn.bind.apply( 
            origfn,
            // 把封装器的this添加到bind(..)调用的参数中
            // 以及克里化（currying）所有传入参数
            [this].concat([].slice.call(arguments))
          );  
        }   
        // 已经是<span class="s3">异步</span>    
        else {    
          // 调用原来的函数  
          origfn.apply(this, arguments);  
        }   
      }     
  }     
  ```    
  可以像这样使用asyncify(..)：  
```javascript        
function result(data) {       
  console.log(a);     
}       
var a = 0;        
ajax("..pre-cached-url..", asyncify(result));       
a++;    
```    
  不管这个Ajax请求已经在缓存中并试图对回调立即调用，还是要从网络上取得，进而在将来<span class="s3">异步</span>完成，这段代码总是会输出1，而不是0——result(..)只能<span class="s3">异步</span>调用，这意味着a++有机会在result(..)之前运行。         
  好啊，又“解决”了一个信任问题！但这是低效的，而且也会带来膨胀的重复代码，使你的项目变得笨重。         
                
##### 调用回调过晚（或没有调用）；
那么完全不调用，这个信任问题又会怎样呢？如果这是个问题的话（可能应该是个问题！），你可能需要设置一个超时来取消事件。             
可以构造一个工具（这里展示的只是一个“验证概念”版本）来帮助实现这一点： 
```javascript           
function timeoutify(fn, delay) {            
  var intv = setTimeout(function() {          
    intv = null;        
    fn(new Error("Timeout!"));        
  }, delay);          
  return function() {         
    // 还没有超时？       
    if(intv) {        
      clearTimeout(intv);     
      fn.apply(this, arguments);      
    }       
  }         
}     
```         
以下是使用方式：           
```javascript 
// 使用“error-first风格“回调设计            
function foo(err, data) {           
  if(err) {         
    console.error(err);       
  }         
  else {          
    console.log(data);        
  }         
}           
ajax("http://some.url.1", timeoutify(foo, 500)); 
```           
                 
##### 调用回调的次数太少或太多（就像你遇到过的问题！）；  
2.3. 1 五个回调的故事
第三方工具           
可能现在还不能很明显地看出为什么这是一个大问题。让我构造一个有点夸张的场景来说明这种信任风险吧。            
在最后一页，当用户点击“确定”就可以购买电视时，你需要调用（假设由某个分析追踪公司提供的）第三方函数以便跟踪这个交易。你注意到，可能是为了提高性能，他们提供了一个看似用于<span class="s3">异步</span>追踪的工具，这意味着你需要传入一个回调函数。在传入的这个<span class="s1">continuation</span>中，你需要提供向客户收费和展示感谢页面的最终代码。 

```javascript         
analytics.trackPurchase( purchaseData, function() {       
  chargeCreditCard();     
  displayThankyouPage();      
});   
```    
你们的一位高级客户购买了一台电视，信用卡却被刷了五次          
分析公司的开发者开发了一些实验性的代码，在某种情况下，会在五秒钟内每秒重试一次传入的回调函数，然后才会因超时而失败。他们从来没打算把这段代码提交到产品中，但不知道为什么却这样做了         
你需要找到某种方法来保护结账代码，保证不再出问题。经过修补之后，你实现了像下面这样的简单临时代码，大家似乎也很满意：        
```javascript  
var tracked = false;        
analytics.trackPurchase(purchaseData, function() {        
  if(!tracked) {      
    tracked = true;   
    chargeCreditCard();   
    displayThankyouPage();    
  }     
}); 
```      
这里我们其实就是创建了一个latch来处理对回调的多个<span class="s5">并发</span>调用。   
   
##### 没有把所需的环境/参数成功传给你的回调函数；  
2.3.2 不只是别人的代码              
请思考这一点：你能够真正信任理论上（在自己的代码库中）你可以控制的工具吗？           
不妨这样考虑：多数人都同意，至少在某种程度上我们应该在内部函数中构建一些防御性的输入参数检查，以便减少或阻止无法预料的问题。            
过分信任输入：   
  ```javascript        
  function addNumbers(x, y) {         
    // +是可以重载的，通过类型转换，也可以是字符串连接       
    // 所以根据传入参数的不同，这个去处并不是严格安全的       
    return x + y;       
  }         
  addNumbers(21, 21); // 42         
  addNumbers(21, "21"); // "2121" 
  ```        
针对不信任输入的防御性代码：   
  ```javascript         
  function addNumbers(x, y) {         
    // 确保输入为数字        
    if(typeof x != "number" || typeof y != "number") {        
      throw Error("Bad parameters");      
    }       
    // 如果到达这里，可以通过+安全的进行数字相加        
    return x + y;       
  }         
  addNumbers(21, "21"); // "2121"         
  addNumbers(21, "21"); // Error: "Bad parameters"   
  ```       
            
依旧安全但更友好一些的：   
  ```javascript         
  function addNumbers(x, y) [         
    // 确保输入为数字        
    x = Number(x);        
    y = Number(y);        
    // +安全进行数字相加        
    return x + y;       
  }         
  addNumbers(21, 21); // 42         
  addNumbers(21, "21"); // 42  
  ```       
不管你怎么做，这种类型的检查/规范化的过程对于函数输入是很常见的，即使是对于理论上完全可以信任的代码。大体上说，这等价于那条地缘政治原则：“信任，但要核实。”           
所以，据此是不是可以推断出，对于<span class="s3">异步</span>函数回调的组成，我们应该要做同样的事情，而不只是针对外部代码，甚至是我们知道在我们自己控制下的代码？当然应该。           
但是，回调并没有为我们提供任何东西来支持这一点。我们不得不自己构建全部的机制，而且通常为每个<span class="s3">异步</span>回调重复这样的工作最后都成了负担。           
            
##### 吞掉可能出现的错误或异常；   
2.4 尝试挽救回调  
可以发明一些特定逻辑来解决这些信任问题，但是其难度高于应有的水平，可能会产生更笨重、更难维护的代码，并且缺少足够的保护，其中的损害要直到你受到bug的影响才会被发现。               
回调设计存在几个变体，意在解决前面讨论的一些信任问题（不是全部！）。这种试图从回调模式内部挽救它的意图是勇敢的，但却注定要失败。              
###### 1. 为了更优雅地处理错误，有些API设计提供了分离回调（一个用于成功通知，一个用于出错通知）：  
```javascript            
function success(data) {            
  console.log(data);          
}           
function failure(err) {           
  console.log(err);         
}           
ajax("http://some.url.1", success, failure);  
```          
在这种设计下，API的出错处理函数failure()常常是可选的，如果没有提供的话，就是假定这个错误可以吞掉。           
ES6 <span class="s1">Promise</span> API使用的就是这种分离回调设计。第3章会介绍ES6<span class="s1">Promise</span>的更多细节。           

###### 2. 还有一种常见的回调模式叫作“error-first风格”              
（有时候也称为“Node风格”，因为几乎所有Node.js API都采用这种风格），            
其中回调的第一个参数保留用作错误对象（如果有的话）。            
如果成功的话，这个参数就会被清空/置假（后续的参数就是成功数据）。           
不过，如果产生了错误结果，那么第一个参数就会被置起/置真（通常就不会再传递其他结果）：
  ```javascript           
  function response(err, data) {          
    // 出错？        
    if(err) {       
      console.error(err);     
    }       
    // 否则认为成功       
    else {        
      console.log(data);      
    }       
  }         
  ajax("http://some.url.1", response); 
  ```         
* 在这两种情况下，都应该注意到以下几点。             
   * 首先，这并没有像表面看上去那样真正解决主要的信任问题。           
   这并没有涉及阻止或过滤不想要的重复调用回调的问题。         
   现在事情更糟了，因为现在你可能同时得到成功或者失败的结果，或者都没有，并且你还是不得不编码处理所有这些情况。          
   * 另外，不要忽略这个事实：尽管这是一种你可以采用的标准模式，但是它肯定更加冗长和模式化，可复用性不高，所以你还得不厌其烦地给应用中的每个回调添加这样的代码。           
         
##### ……           
* 这感觉就像是一个麻烦列表，实际上它就是。你可能已经开始慢慢意识到，对于被传给你无法信任的工具的每个回调，你都将不得不创建大量的混乱逻辑。现在你应该更加明白回调地狱是多像地狱了吧。       
  
                  
     

      
* 我们需要一个通用的方案来解决这些信任问题。不管我们创建多少回调，这一方案都应可以复用，且没有重复代码的开销。                
                
## 我们需要比回调更好的机制。                   
  可能现在你希望有内建的API或其他语言机制来解决这些问题。最终，ES6带着一些极好的答案登场了                 
  很多开发者因为更好的<span class="s3">异步</span>模式<span class="s1">Promise</span>而激动不已。                 
  到目前为止，回调提供了很好的服务，但是未来的JavaScript需要更高级、功能更强大的<span class="s3">异步</span>模式。本书接下来的几章会深入探讨这些新型技术。                 
                    
								
# <span class="s1">Promise</span>
既然已经对问题有了充分的理解，那么现在是时候把注意力转向可以解决这些问题的模式了。									
								
## 这种范式就称为<span class="s1">Promise</span>
如果我们能够把控制反转再反转回来，会怎样呢？									
如果我们不把自己程序的<span class="s1">continuation</span>传给第三方，									
而是希望第三方给我们提供了解其任务何时结束的能力，									
然后由我们自己的代码来决定下一步做什么，那将会怎样呢？									
### 1. 3.3 <span class="s1">Promise</span>信任问题
<span class="s1">Promise</span>非常好，请使用。它们解决了我们因只用回调的代码而备受困扰的控制反转问题。
* 我们首先想要解决的是控制反转问题，其中，信任很脆弱，也很容易失去。									
我们用回调函数来封装程序中的<span class="s1">continuation</span>，然后把回调交给第三方（甚至可能是外部代码），接着期待其能够调用回调，实现正确的功能。								
通过这种形式，我们要表达的意思是：“这是将来要做的事情，要在当前的步骤完成之后发生。”								

* <span class="s1">Promise</span>模式构建的可能最重要的特性：信任。                
未来值和<span class="s6">完成</span>事件这两个类比在我们之前探讨的代码模式中很明显。                
但是，我们还不能一眼就看出<span class="s1">Promise</span>为什么以及如何用于解决2.3节列出的所有控制反转信任问题。               
稍微深入探究一下的话，我们就不难发现它提供了一些重要的保护，重新建立了第2章中已经毁掉的<span class="s3">异步</span>编码可信任性。               
* 先回顾一下只用回调编码的信任问题。把一个回调传入工具foo(..)时可能出现如下问题：               
<span class="s1">Promise</span>的特性就是专门用来为这些问题提供一个有效的可复用的答案。   

#### 3.3.1 调用回调过早；
这个问题主要就是担心代码是否会引入类似Zalgo这样的副作用（参见第2章）。              
在这类问题中，一个任务有时<span class="s6">同步</span><span class="s6">完成</span>，有时<span class="s3">异步</span><span class="s6">完成</span>，这可能会导致竞态条件。              
根据定义，<span class="s1">Promise</span>就不必担心这种问题，因为即使是立即<span class="s6">完成</span>的<span class="s1">Promise</span>（类似于new <span class="s1">Promise</span>(function(resolve){ resolve(42); })）也无法被<span class="s6">同步</span>观察到。              
也就是说，对一个<span class="s1">Promise</span>调用then(..)的时候，即使这个<span class="s1">Promise</span>已经**决议**，提供给then(..)的回调也总会被<span class="s3">异步</span>调用（对此的更多讨论，请参见1.5节）。             
不再需要插入你自己的setTimeout(..,0) hack, <span class="s1">Promise</span>会自动防止Zalgo出现。             
                  
#### 3.3.2 调用回调过晚；
和前面一点类似，<span class="s1">Promise</span>创建对象调用resolve(..)或reject(..)时，这个<span class="s1">Promise</span>的then(..)注册的观察回调就会被自动调度。 
  * 可以确信，这些被调度的回调在下一个<span class="s3">异步</span>事件点上一定会被触发（参见1.5节）。            
  * <span class="s6">同步</span>查看是不可能的，所以一个<span class="s6">同步</span>任务链无法以这种方式运行来实现按照预期有效延迟另一个回调的发生。            
  也就是说，一个<span class="s1">Promise</span>**决议**后，这个<span class="s1">Promise</span>上所有的通过then(..)注册的回调都会在下一个<span class="s3">异步</span>时机点上依次被立即调用（再次提醒，请参见1.5节）。这些回调中的任意一个都无法影响或延误对其他回调的调用。           
  举例来说：   
  ```javascript       
  p.then(function(){            
    p.then(function(){          
      console.log("C");       
    });         
    console.log("A");         
  });           
  p.then(function(){            
    console.log("B");         
  });           
  // A B C  
  ```         
  "C"无法打断或抢占"B"，这是因为<span class="s1">Promise</span>的运作方式。           
  * <span class="s1">Promise</span>调度技巧           
  还有很重要的一点需要指出，有很多调度的细微差别。            
    * 在这种情况下，两个独立<span class="s1">Promise</span>上链接的回调的相对顺序无法可靠预测。          
    * 如果两个<span class="s1">Promise</span> p1和p2都已经**决议**，那么p1.then(..); p2.then(..)应该最终会先调用p1的回调，然后是p2的那些。          
    * 但还有一些微妙的场景可能不是这样的，比如以下代码：     
    ```javascript   
    var p3 = new Promise(function(resolve, reject){         
      resolve("B");       
    });         
    var p1 = new Promise(function(resolve, reject){         
      resolve(p3);        
    });         
    var p2 = new Promise(function(resolve, reject){         
      resolve("A");       
    });         
    p1.then(function(v){          
      console.log(v);       
    });         
    p2.then(function(v){          
      console.log(v);       
    });         
    // A B. <-- 而不是像 你可能认为的B A    
    ```     
    后面我们还会深入介绍，但目前你可以看到，p1不是用立即值而是用另一个<span class="s1">Promise</span> p3**决议**，后者本身**决议**为值"B"。         
    规定的行为是把p3展开到p1，但是是<span class="s3">异步</span>地展开。          
    所以，在<span class="s3">异步</span>任务队列中，p1的回调排在p2的回调之后（参见1.5节）。         
    * 要避免这样的细微区别带来的噩梦，你永远都不应该依赖于不同<span class="s1">Promise</span>间回调的顺序和调度。         
    实际上，好的编码实践方案根本不会让多个回调的顺序有丝毫影响，可能的话就要避免。         
            
#### 3.3.3 回调不被调用
这个问题很常见，<span class="s1">Promise</span>可以通过几种途径解决。              
  * 首先，没有任何东西（甚至JavaScript错误）能阻止<span class="s1">Promise</span>向你通知它的**决议**（如果它**决议**了的话）。            
  如果你对一个<span class="s1">Promise</span>注册了一个<span class="s6">完成</span>回调和一个<span class="s2">拒绝</span>回调，那么<span class="s1">Promise</span>在**决议**时总是会调用其中的一个。            
  当然，如果你的回调函数本身包含JavaScript错误，那可能就会看不到你期望的结果，但实际上回调还是被调用了。            
  后面我们会介绍如何在回调出错时得到通知，因为就连这些错误也不会被吞掉。           
  * 但是，如果<span class="s1">Promise</span>本身永远不被**决议**呢？            
  即使这样，<span class="s1">Promise</span>也提供了解决方案，其使用了一种称为竞态的高级抽象机制： 
  ```javascript         
  // 用于超时一个Promise的工具           
  function timeoutPromise(delay) {            
    return new Promise(function(resolve, reject){         
      setTimeout(function(){        
        reject("Timeout!");     
      }, delay);        
    });         
  }           
  // 设置foo()超时            
  Promise.race([            
    foo(),  // 试着开始foo()          
    timeoutPromise(3000)   // 给它3秒种         
  ])            
  .then(            
    function(){         
      // foo(..)及时完成！       
    },          
    function(err){          
      // 或者foo()被拒绝，或者只是没能按时完成        
      // 查看err来了解是哪种情况        
    }         
  );    
  ```       
  关于这个<span class="s1">Promise</span>超时模式还有更多细节需要考量，后面我们会深入讨论。            
  很重要的一点是，我们可以保证一个foo()有一个输出信号，防止其永久挂住程序。           
              
#### 3.3.4 调用回调次数过少或过多；
  根据定义，回调被调用的正确次数应该是1。            
  * “过少”的情况就是调用0次，和前面解释过的“未被”调用是同一种情况。            
  * “过多”的情况很容易解释。           
  <span class="s1">Promise</span>的定义方式使得它只能被**决议**一次。           
  如果出于某种原因，<span class="s1">Promise</span>创建代码试图调用resolve(..)或reject(..)多次，或者试图两者都调用，那么这个<span class="s1">Promise</span>将只会接受第一次**决议**，并默默地忽略任何后续调用。            
  由于<span class="s1">Promise</span>只能被**决议**一次，所以任何通过then(..)注册的（每个）回调就只会被调用一次。           
  当然，如果你把同一个回调注册了不止一次（比如p.then(f);p.then(f);），那它被调用的次数就会和注册次数相同。响应函数只会被调用一次，但这个保证并不能预防你搬起石头砸自己的脚。           
#### 3.3.5 未能传递所需的环境（环境值）和参数；
  <span class="s1">Promise</span>至多只能有一个**决议**值（<span class="s6">完成</span>或<span class="s2">拒绝</span>）。           
  如果你没有用任何值显式**决议**，那么这个值就是undefined，这是JavaScript常见的处理方式。           
  * 但不管这个值是什么，无论当前或未来，它都会被传给所有注册的（且适当的<span class="s6">完成</span>或<span class="s2">拒绝</span>）回调。           
  * 还有一点需要清楚：如果使用多个参数调用resovle(..)或者reject(..)，第一个参数之后的所有参数都会被默默忽略。  
  这看起来似乎违背了我们前面介绍的保证，但实际上并没有，因为这是对<span class="s1">Promise</span>机制的无效使用。           
  对于这组API的其他无效使用（比如多次重复调用resolve(..)），也是类似的保护处理，所以这里的<span class="s1">Promise</span>行为是一致的（如果不是有点令人沮丧的话）。           
  如果要传递多个值，你就必须要把它们封装在单个值中传递，比如通过一个数组或对象。           
  * 对环境来说，JavaScript中的函数总是保持其定义所在的作用域的闭包，所以它们当然可以继续访问你提供的环境状态。            
  当然，对于只用回调的设计也是这样，因此这并不是<span class="s1">Promise</span>特有的优点——但不管怎样，这仍是我们可以依靠的一个保证。            
#### 3.3.6 吞掉可能出现的错误和异常。
  * 基本上，这部分是上个要点的再次说明。            
  如果<span class="s2">拒绝</span>一个<span class="s1">Promise</span>并给出一个理由（也就是一个出错消息），这个值就会被传给<span class="s2">拒绝</span>回调。           
  * 不过在这里还有更多的细节需要研究。           
  如果在<span class="s1">Promise</span>的创建过程中或在查看其**决议**结果过程中的任何时间点上出现了一个JavaScript异常错误，比如一个TypeError或ReferenceError，那这个异常就会被捕捉，并且会使这个<span class="s1">Promise</span>被<span class="s2">拒绝</span>。            
  举例来说：     
  ```javascript     
  var p = new Promise(function(resolve, reject){            
    foo.bar(); // foo未定义，所以会出错！         
    resolve(42); // 永远不会到达这里:(          
  });           
  p.then(           
    function fulfilled(){         
      // 永远不会到达这里:(       
    },          
    function rejected(err){         
      // err将会是一个来自foo.bar()这一行的TypeError异常对象       
    }         
  );    
  ```       
  foo.bar()中发生的JavaScript异常导致了<span class="s1">Promise</span><span class="s2">拒绝</span>，你可以捕捉并对其作出响应。           
    * 这是一个重要的细节，因为其有效解决了另外一个潜在的Zalgo风险，即出错可能会引起<span class="s6">同步</span>响应，而不出错则会是<span class="s3">异步</span>的。  
    <span class="s1">Promise</span>甚至把JavaScript异常也变成了<span class="s3">异步</span>行为，进而极大降低了竞态条件出现的可能。          
  * 但是，如果<span class="s1">Promise</span><span class="s6">完成</span>后在查看结果时（then(..)注册的回调中）出现了JavaScript异常错误会怎样呢？即使这些异常不会被丢弃，但你会发现，对它们的处理方式还是有点出乎意料，需要进行一些深入研究才能理解：   
  ```javascript       
  var p = new Promise(function(resolve, reject){            
    resolve(42);          
  });           
  p.then(           
    function fulfilled(msg){          
      foo.bar();        
      console.log(msg); // 永远不会到达这里:(       
    },          
    function rejected(err){         
      // 永远也不会到达这里:(        
    }         
  );    
  ```       
  等一下，这看起来像是foo.bar()产生的异常真的被吞掉了。           
  别担心，实际上并不是这样。           
  但是这里有一个深藏的问题，就是我们没有侦听到它。            
  p.then(..)调用本身返回了另外一个promise，正是这个promise将会因TypeError异常而被<span class="s2">拒绝</span>。           
  * 为什么它不是简单地调用我们定义的错误处理函数呢？            
  表面上的逻辑应该是这样啊。           
    * 如果这样的话就违背了<span class="s1">Promise</span>的一条基本原则，即<span class="s1">Promise</span>一旦**决议**就不可再变。         
    p已经<span class="s6">完成</span>为值42，所以之后查看p的**决议**时，并不能因为出错就把p再变为一个<span class="s2">拒绝</span>。          
    * 除了违背原则之外，这样的行为也会造成严重的损害。          
    因为假如这个promise p有多个then(..)注册的回调的话，有些回调会被调用，而有些则不会，情况会非常不透明，难以解释。      
  * 3.3.7 是可信任的<span class="s1">Promise</span>吗               
  基于<span class="s1">Promise</span>模式建立信任还有最后一个细节需要讨论。                
    * 你肯定已经注意到<span class="s1">Promise</span>并没有完全摆脱回调。它们只是改变了传递回调的位置。              
    我们并不是把回调传递给foo(..)，而是从foo(..)得到某个东西（外观上看是一个真正的<span class="s1">Promise</span>），然后把回调传给这个东西。   
    * 但是，为什么这就比单纯使用回调更值得信任呢？如何能够确定返回的这个东西实际上就是一个可信任的<span class="s1">Promise</span>呢？这难道不是一个（脆弱的）纸牌屋，在里面只能信任我们已经信任的？              
    关于<span class="s1">Promise</span>的很重要但是常常被忽略的一个细节是，<span class="s1">Promise</span>对这个问题已经有一个解决方案。包含在原生ES6 <span class="s1">Promise</span>实现中的解决方案就是<span class="s1">Promise</span>.resolve(..)。             
      * 如果向<span class="s1">Promise</span>.resolve(..)传递一个非<span class="s1">Promise</span>、非<span class="s5">thenable</span>的立即值，就会得到一个用这个值填充的promise。    
      下面这种情况下，promise p1和promise p2的行为是完全一样的：     
      ```javascript     
      var p1 = new Promise(function(resolve, reject){           
        resolve(42);          
      });           
      var p2 = Promise.resolve(42);   
      ```       
      * 而如果向Promise.resolve(..)传递一个真正的Promise，就只会返回同一个promise：  
      ```javascript         
      var p1 = Promise.resolve(42);           
      var p2 = Promise.resolve(p1);           
      p2 === p1; // true    
      ```       
      * 更重要的是，如果向<span class="s1">Promise</span>.resolve(..)传递了一个非<span class="s1">Promise</span>的<span class="s5">thenable</span>值，前者就会试图展开这个值，而且展开过程会持续到提取出一个具体的非类<span class="s1">Promise</span>的最终值。            
        * 这个p是一个<span class="s5">thenable</span>，但并不是一个真正的<span class="s1">Promise</span>。幸运的是，和绝大多数值一样，它是可追踪的。 
        ```javascript       
        var p = {         
          then: function(cb){       
            cb(42);     
          }       
        };          
        // 这可以工作，但只是因为幸运而已          
        p.          
        then(         
          function fulfilled(val){        
            console.log(val); // 42     
          },        
          function rejected(err){       
            // 永远不会到达这里     
          }       
        );      
        ```   
        * 但是，如果得到的是如下这样的值又会怎样呢： 
        ```javascript       
        var p = {         
          then: function(cb, errcb){        
            cb(42);     
            errcb("evil laugh");      
          }       
                  
        };          
        p         
        .then(          
          function fulfilled(val){        
            console.log(val); // 42     
          },        
          function rejected(err){       
            // 啊，不应该运行！     
            console.log(err); // evil laugh     
          }       
        );          
        ```
        这个p是一个<span class="s5">thenable</span>，但是其行为和promise并不完全一致。这是恶意的吗？还只是因为它不知道<span class="s1">Promise</span>应该如何运作？说实话，这并不重要。不管是哪种情况，它都是不可信任的。          
        尽管如此，我们还是都可以把这些版本的p传给<span class="s1">Promise</span>.resolve(..)，然后就会得到期望中的规范化后的安全结果： 
        ```javascript
        Promise.resolve(p)          
        .then(          
          function fulfilled(val){        
            console.log(val); // 42     
          },        
          function rejected(err){       
            // 永远不会到达这里     
          }       
        );        
        ``` 
    * 通过<span class="s1">Promise</span>.resolve(..)过滤来获得可信任性完全没有坏处。             
      * <span class="s1">Promise</span>.resolve(..)可以接受任何<span class="s5">thenable</span>，将其解封为它的非<span class="s5">thenable</span>值。            
      从<span class="s1">Promise</span>. resolve(..)得到的是一个真正的<span class="s1">Promise</span>，是一个可以信任的值。            
      * 如果你传入的已经是真正的<span class="s1">Promise</span>，那么你得到的就是它本身           
      * 假设我们要调用一个工具foo(..)，且并不确定得到的返回值是否是一个可信任的行为良好的<span class="s1">Promise</span>，但我们可以知道它至少是一个<span class="s5">thenable</span>。            
      <span class="s1">Promise</span>.resolve(..)提供了可信任的<span class="s1">Promise</span>封装工具，可以链接使用：   
      ```javascript       
      // 不要只是这么做：           
      foo(42)           
      .then(function(v){            
        console.log(v);         
      });           
      // 而要这么做：           
      Promise.resolve(foo(42))            
      .then(function(v){            
        console.log(v);         
      });   
      ```       
    * 对于用<span class="s1">Promise</span>.resolve(..)为所有函数的返回值（不管是不是<span class="s5">thenable</span>）都封装一层。另一个好处是，这样做很容易把函数调用规范为定义良好的<span class="s3">异步</span>任务。             
    如果foo(42)有时会返回一个立即值，有时会返回<span class="s1">Promise</span>，那么<span class="s1">Promise</span>.resolve( foo(42) )就能够保证总会返回一个<span class="s1">Promise</span>结果。              
    而且避免Zalgo就能得到更好的代码。             
                  
  * 3.3.8 建立信任                
  很可能前面的讨论现在已经完全“解决”（resolve，英语中也表示“**决议**”的意思）了你的疑惑：<span class="s1">Promise</span>为什么是可信任的，以及更重要的，为什么对构建健壮可维护的软件来说，这种信任非常重要。                
    * 可以用JavaScript编写<span class="s3">异步</span>代码而无需信任吗？当然可以。JavaScript开发者近二十年来一直都只用回调编写<span class="s3">异步</span>代码。  
    * 可一旦开始思考你在其上构建代码的机制具有何种程度的可预见性和可靠性时，你就会开始意识到回调的可信任基础是相当不牢靠。   
    <span class="s1">Promise</span>这种模式通过可信任的语义把回调作为参数传递，使得这种行为更可靠更合理。通过把回调的控制反转反转回来，我们把控制权放在了一个可信任的系统（<span class="s1">Promise</span>）中，这种系统的设计目的就是为了使<span class="s3">异步</span>编码更清晰。             
        


									
### 2. 它们并没有摈弃回调，只是把回调的安排转交给了一个位于我们和其他工具之间的可信任的中介机制。
### 3. 3.4 链式流
<span class="s1">Promise</span>链也开始提供（尽管并不完美）以顺序的方式表达<span class="s3">异步</span>流的一个更好的方法，这有助于我们的大脑更好地计划和维护<span class="s3">异步</span>JavaScript代码。我们将在第4章看到针对这个问题的一种更好的解决方案！

尽管我们之前对此有过几次暗示，但<span class="s1">Promise</span>并不只是一个单步执行this-then-that操作的机制。当然，那是构成部件，但是我们可以把多个<span class="s1">Promise</span>连接到一起以表示一系列<span class="s3">异步</span>步骤。                 
* 这种方式可以实现的关键在于以下两个<span class="s1">Promise</span>固有行为特性：                 
  1. 每次你对<span class="s1">Promise</span>调用then(..)，它都会创建并返回一个新的<span class="s1">Promise</span>，我们可以将其链接起来；                  
  2. 不管从then(..)调用的<span class="s6">完成</span>回调（第一个参数）返回的值是什么，它都会被自动设置为被链接<span class="s1">Promise</span>（第一点中的）的<span class="s6">完成</span>。   
* 先来解释一下这是什么意思，然后推导一下其如何帮助我们创建流程控制<span class="s3">异步</span>序列。                 
  * 考虑如下代码：       
  ```javascript       
  var p = Promise.resolve(21);                
  var p2 = p.then(function(v){                
    console.log(v); // 21             
    // 用值42填充p2             
    return v*2;             
  });               
  // 连接p2               
  p2.then(function(v){                
    console.log(v); // 42             
  });     
  ```         
  我们通过返回v ＊ 2(即42)，<span class="s6">完成</span>了第一个调用then(..)创建并返回的promise p2。                
  p2的then(..)调用在运行时会从return v ＊ 2语句接受<span class="s6">完成</span>值。               
  当然，p2.then(..)又创建了另一个新的promise，可以用变量p3存储。               
  * 但是，如果必须创建一个临时变量p2（或p3等），还是有一点麻烦的。谢天谢地，我们很容易把这些链接到一起：    
  ```javascript           
  var p = Promise.resolve(21);                
  p.                
  then(function(v){               
    console.log(v); // 21             
    // 用值42完成连接的promise             
    return v*2;             
  })                
  // 这里是链接的promise                
  .then(function(v){                
    console.log(v); // 42             
  });   
  ```           
  现在第一个then(..)就是<span class="s3">异步</span>序列中的第一步，第二个then(..)就是第二步。这可以一直任意扩展下去。只要保持把先前的then(..)连到自动创建的每一个<span class="s1">Promise</span>即可。                
  * 但这里还漏掉了一些东西。如果需要步骤2等待步骤1<span class="s3">异步</span>来<span class="s6">完成</span>一些事情怎么办？               
    * 我们使用了立即返回return语句，这会立即<span class="s6">完成</span>链接的promise。             
    使<span class="s1">Promise</span>序列真正能够在每一步有<span class="s3">异步</span>能力的关键是，回忆一下当传递给<span class="s1">Promise</span>. resolve(..)的是一个<span class="s1">Promise</span>或<span class="s5">thenable</span>而不是最终值时的运作方式。<span class="s1">Promise</span>. resolve(..)会直接返回接收到的真正<span class="s1">Promise</span>，或展开接收到的<span class="s5">thenable</span>值，并在持续展开<span class="s5">thenable</span>的同时递归地前进。     
    从<span class="s6">完成</span>（或<span class="s2">拒绝</span>）处理函数返回<span class="s5">thenable</span>或者<span class="s1">Promise</span>的时候也会发生同样的展开。    
    ```javascript         
    var p = Promise.resolve(21);              
    p.then(function(v){             
      console.log(v); // 21           
      // 创建一个promise并将其返回           
      return new Promise(function(resolve, reject){           
        // 用值42填充         
        resolve(v * 2);         
      });           
    })              
    .then(function(v){              
      console.log(v); // 42           
    });     
    ```       
    虽然我们把42封装到了返回的promise中，但它仍然会被展开并最终成为链接的promise的**决议**，因此第二个then(..)得到的仍然是42。              
    * 如果我们向封装的promise引入<span class="s3">异步</span>，一切都仍然会同样工作： 
    ```javascript           
    var p = Promise.resolve(21);              
    p.then(function(v){             
      console.log(v);           
      // 创建一个promise并返回           
      return new Promise(function(resolve, reject){           
        // 引入<span class="s3">异步</span>！          
        setTimeout(function(){          
          // 用值42填充       
          resolve(v * 2);       
        }, 100);          
      });           
    })              
    .then(function(v){              
      // 在前一步中的100ms延迟之后运行            
      console.log(v); // 42           
    });     
    ```       
    这种强大实在不可思议！现在我们可以构建这样一个序列：不管我们想要多少个<span class="s3">异步</span>步骤，每一步都能够根据需要等待下一步（或者不等！）。             
  * 当然，在这些例子中，一步步传递的值是可选的。如果不显式返回一个值，就会隐式返回undefined，并且这些promise仍然会以同样的方式链接在一起。这样，每个<span class="s1">Promise</span>的**决议**就成了继续下一个步骤的信号。                
  * 为了进一步阐释链接，让我们把延迟<span class="s1">Promise</span>创建（没有**决议**消息）过程一般化到一个工具中，以便在多个步骤中复用：
  ```javascript
  function delay(time){               
    return new Promise(function(resolve, reject){             
      setTimeout(resolve, time);            
    });             
  }               
  delay(100)  // 步骤1                
  .then(function STEP2(){               
    console.log("step 2 (after 100ms)");              
    return delay(200);              
  })                
  .then(function STEP3(){               
    console.log("step 3 (after another 200ms)");              
  })                
  .then(function STEP4(){               
    console.log("step 4 (next Job)");             
    return delay(50);             
  })                
  .then(function STEP5(){               
    console.log("step 5 (after another 50ms)");             
  })                
  ...   
  ```           
  调用delay(200)创建了一个将在200ms后<span class="s6">完成</span>的promise，然后我们从第一个then(..)<span class="s6">完成</span>回调中返回这个promise，这会导致第二个then(..)的promise等待这个200ms的promise。                
  如前所述，严格地说，这个交互过程中有两个promise:200ms延迟promise，和第二个then(..)链接到的那个链接promise。  
  但是你可能已经发现了，在脑海中把这两个promise合二为一之后更好理解，因为<span class="s1">Promise</span>机制已经自动为你把它们的状态合并在了一起。 
  这样一来，可以把return delay(200)看作是创建了一个promise，并用其替换了前面返回的链接promise。                
  * 但说实话，没有**消息传递**的延迟序列对于<span class="s1">Promise</span>流程控制来说并不是一个很有用的示例。               
  我们来考虑如下这样一个更实际的场景。                
  这里不用定时器，而是构造Ajax请求：   
  ```javascript           
  // 假定工具ajax({url}, {callback})存在                
  // <span class="s1">Promise</span>-aware ajax               
  function request(url){                
    return new Promise(function(resolve, reject){             
      // ajax(..)回调应该是我们这个promise的resolve(..)函数           
      ajax(url, resolve);           
    });             
  }       
  ```       
  我们首先定义一个工具request(..)，用来构造一个表示ajax(..)调用<span class="s6">完成</span>的promise：   
  ```javascript           
  request("http://some.url.1/")               
  .then(function(response1){                
    return request("http://some.url.2/?v=" + response1);              
  })                
  .then(function(response2){                
    console.log(response2);             
  });               
  ```
    * 开发者常会遇到这样的情况：他们想要通过本身并不支持<span class="s1">Promise</span>的工具（就像这里的ajax(..)，它接收的是一个回调）实现支持<span class="s1">Promise</span>的<span class="s3">异步</span>流程控制。             
    虽然原生ES6 <span class="s1">Promise</span>机制并不会自动为我们提供这个模式，但所有实际的<span class="s1">Promise</span>库都会提供。             
    通常它们把这个过程称为“提升”“promise化”或者其他类似的名称。我们稍后会再介绍这种技术。              
    * 利用返回<span class="s1">Promise</span>的request(..)，我们通过使用第一个URL调用它来创建链接中的第一步，并且把返回的promise与第一个then(..)链接起来。              
    * response1一返回，我们就使用这个值构造第二个URL，<span class="s5">并发</span>出第二个request(..)调用。              
    第二个request(..)的promise返回，以便<span class="s3">异步</span>流控制中的第三步等待这个Ajax调用<span class="s6">完成</span>。              
    最后，response2一返回，我们就立即打出结果。              
    * 我们构建的这个<span class="s1">Promise</span>链             
      * 不仅是一个表达多步<span class="s3">异步</span>序列的流程控制            
      * 还是一个从一个步骤到下一个步骤传递消息的消息通道            
  * 如果这个<span class="s1">Promise</span>链中的某个步骤出错了怎么办？               
  错误和异常是基于每个<span class="s1">Promise</span>的，这意味着可能在链的任意位置捕捉到这样的错误，而这个捕捉动作在某种程度上就相当于在这一位置将整条链“重置”回了正常运作：        
  ```javascript       
  // 步骤1：               
  request("http://some.url.1/")               
  // 步骤2：               
  .then(function(response1){                
    foo.bar(); // undefined, 出错！              
    // 永远不会到达这里             
    return request("http://some.url.2/?v=" + response1);              
  })                
  // 步骤3：               
  .then(                
    function fulfilled(response){             
      // 永远不会到达这里           
    },              
    // 捕捉错误的拒绝处理函数              
    function rejected(err){             
      console.log(err);           
      // 来自foo.bar()的错误TypeError            
      return 42;            
    }             
  )               
  // 步骤4：               
  .then(function(msg){                
    console.log(msg);  // 42              
  });   
  ```           
    * 第2步出错后，第3步的<span class="s2">拒绝</span>处理函数会捕捉到这个错误。              
    <span class="s2">拒绝</span>处理函数的返回值（这段代码中是42），如果有的话，会用来<span class="s6">完成</span>交给下一个步骤（第4步）的promise，这样，这个链现在就回到了<span class="s6">完成</span>状态。              
    * 正如之前讨论过的，当从<span class="s6">完成</span>处理函数返回一个promise时，它会被展开并有可能延迟下一个步骤。             
    从<span class="s2">拒绝</span>处理函数返回promise也是如此，             
    因此如果在第3步返回的不是42而是一个promise的话，这个promise可能会延迟第4步。             
    调用then(..)时的<span class="s6">完成</span>处理函数或<span class="s2">拒绝</span>处理函数如果抛出异常，都会导致（链中的）下一个promise因这个异常而立即被<span class="s2">拒绝</span>。             
  * 如果你调用promise的then(..)，并且只传入一个<span class="s6">完成</span>处理函数，一个默认<span class="s2">拒绝</span>处理函数就会顶替上来： 
  ```javascript             
  var p = new Promise(function(resolve, reject){                
    reject("Oops");             
  );                
  var p2 = p.then(                
    function fulfilled(){             
      // 永远不会到达这里           
    }             
    // 假定的拒绝处理函数，如果省略或者传入任何非函数值             
    // function (err){              
    //       throw err;             
    // }              
  );                
  ```
    * 如你所见，默认<span class="s2">拒绝</span>处理函数只是把错误重新抛出，这最终会使得p2（链接的promise）用同样的错误理由<span class="s2">拒绝</span>。              
    从本质上说，这使得错误可以继续沿着<span class="s1">Promise</span>链传播下去，直到遇到显式定义的<span class="s2">拒绝</span>处理函数。              
    * 稍后我们会介绍关于<span class="s1">Promise</span>错误处理的更多细节，因为还有其他一些微妙的细节需要考虑。              
  * 如果没有给then(..)传递一个适当有效的函数作为<span class="s6">完成</span>处理函数参数，还是会有作为替代的一个默认处理函数：   
  ```javascript           
  var p = Promise.resolve(42);                
  p.then(               
    // 假设的完成处理函数，如果省略或者传入任何非函数值             
    // function(v){             
    //       return v;              
    // }              
    null,               
    function rejected(err){             
      // 永远不会到达这里           
    }             
  );                
  ```
  你可以看到，默认的<span class="s6">完成</span>处理函数只是把接收到的任何传入值传递给下一个步骤（<span class="s1">Promise</span>）而已。               
  then(null, function(err){ .. })这个模式——只处理<span class="s2">拒绝</span>（如果有的话），但又把<span class="s6">完成</span>值传递下去——有一个缩写形式的API:catch(function(err){ .. })。下一小节会详细介绍catch(..)。                
                  
                  
* 让我们来简单总结一下使链式流程控制可行的<span class="s1">Promise</span>固有特性。                  
  * 调用<span class="s1">Promise</span>的then(..)会自动创建一个新的<span class="s1">Promise</span>从调用返回。                
  * 在<span class="s6">完成</span>或<span class="s2">拒绝</span>处理函数内部，如果返回一个值或抛出一个异常，新返回的（可链接的）<span class="s1">Promise</span>就相应地**决议**。                
  * 如果<span class="s6">完成</span>或<span class="s2">拒绝</span>处理函数返回一个<span class="s1">Promise</span>，它将会被展开，这样一来，不管它的**决议**值是什么，都会成为当前then(..)返回的链接<span class="s1">Promise</span>的**决议**值。               
* 尽管链式流程控制是有用的，但是对其最精确的看法是把它看作<span class="s1">Promise</span>组合到一起的一个附加益处，而不是主要目的。   
正如前面已经多次深入讨论的，<span class="s1">Promise</span>规范化了<span class="s3">异步</span>，并封装了时间相关值的状态，使得我们能够把它们以这种有用的方式链接到一起。   
* 当然，相对于第2章讨论的回调的一团乱麻，链接的顺序表达（this-then-this-then-this...）已经是一个巨大的进步。  
但是，仍然有大量的重复样板代码（then(..)以及function(){ ... }）。                 
在第4章，我们将会看到在顺序流程控制表达方面提升巨大的优美模式，通过<span class="s4">生成器</span>实现。                  
        

									
									
* 实际上，绝大多数JavaScript/DOM平台新增的<span class="s3">异步</span>API都是基于<span class="s1">Promise</span>构建的。									
									
* 本章经常会使用“立即”一词，通常用来描述某个<span class="s1">Promise</span>**决议**（resolution）动作。									
	但是，基本上在所有情况下，这个“立即”指任务队列行为（参见第1章）方面的意义，								
	而不是指严格<span class="s6">同步</span>的现在。								
									
## 3.1 什么是<span class="s1">Promise</span>
* 开发人员在学习新技术或新模式时，通常第一步就是“给我看看代码”。对我们来说，先跳进去学习细节是很自然的。									
* 但是，事实证明，只了解API会丢失很多抽象的细节。									
	<span class="s1">Promise</span>属于这样一类工具：通过某人使用它的方式，很容易分辨他是真正理解了这门技术，还是仅仅学习和使用API而已。								
* 所以，在展示<span class="s1">Promise</span>代码之前，我想先从概念上完整地解释<span class="s1">Promise</span>到底是什么。									
	希望这能够更好地指导你今后将<span class="s1">Promise</span>理论集成到自己的<span class="s3">异步</span>流中。								
									
## 给出了两个很强的类比，用于解释<span class="s1">Promise</span>在不同方面能为我们的<span class="s3">异步</span>代码做些什么。
关于<span class="s1">Promise</span>定义的两个不同类比：									
### 1. 3.1.1 未来值
* 设想一下这样一个场景：									
   * 我走到快餐店的柜台，点了一个芝士汉堡。我交给收银员1.47美元。通过下订单并付款，我已经发出了一个对某个值（就是那个汉堡）的请求。我已经启动了一次交易。								
   * 通常我不能马上就得到这个汉堡。收银员会交给我某个东西来代替汉堡：一张带有订单号的收据。订单号就是一个IOU（I owe you，我欠你的）承诺（promise），保证了最终我会得到我的汉堡。								
   所以我得好好保留我的收据和订单号。我知道这代表了我未来的汉堡							
   * 在等待的过程中，我可以做点其他的事情								
   我已经在想着未来的芝士汉堡了，尽管现在我还没有拿到手。我的大脑之所以可以这么做，是因为它已经把订单号当作芝士汉堡的占位符了。从本质上讲，这个占位符使得这个值不再依赖时间。这是一个未来值。							
   * 终于，我听到服务员在喊“订单113”，然后愉快地拿着收据走到柜台，把收据交给收银员，换来了我的芝士汉堡。								 
   换句话说，一旦我需要的值准备好了，我就用我的承诺值（value-promise）换取这个值本身。							
   但是，还可能有另一种结果。他们叫到了我的订单号，但当我过去拿芝士汉堡的时候，收银员满是歉意地告诉我：“不好意思，芝士汉堡卖完了。”我们还可以看到未来值的一个重要特性：它可能成功，也可能失败。							
* 在代码中，事情并非这么简单。这是因为，用类比的方式来说就是，订单号可能永远不会被叫到。									
在这种情况下，我们就永远处于一种未**决议**状态。后面会讨论如何处理这种情况。	

* 
	1. 现在值与将来值  
	但在具体解释<span class="s1">Promise</span>的工作方式之前，先来推导通过我们已经理解的方式——回调——如何处理未来值。                
	   * 当编写代码要得到某个值的时候，比如通过数学计算，不管你有没有意识到，你都已经对这个值做出了一些非常基本的假设，那就是，它已经是一个具体的现在值：                
		```javascript
		var x, y = 2;             
		console.log(x + y); // Nan <-- 因为x还没有设定  
		```           
	   * 运算x + y假定了x和y都已经设定。             
	   用术语简单地解释就是，这里我们假定x和y的值都是已**决议**的。  
	      * 期望运算符+本身能够神奇地检测并等待x和y都**决议**好（也就是准备好）再进行运算是没有意义的。  
	      如果有的语句现在<span class="s6">完成</span>，而有的语句将来<span class="s6">完成</span>，那就会在程序里引起混乱，对不对？           
		  * 如果两条语句的任何一个（或全部）可能还没有<span class="s6">完成</span>，你怎么可能追踪这两条语句的关系呢？             
		  如果语句2依赖于语句1的<span class="s6">完成</span>，那么就只有两个输出：             
		     * 要么语句1马上<span class="s6">完成</span>，一切顺利执行；           
		     * 要么语句1还未<span class="s6">完成</span>，语句2因此也将会失败。           
	   * 设想如果可以通过一种方式表达：“把x和y加起来，但如果它们中的任何一个还没有准备好，就等待两者都准备好。一旦可以就马上执行加运算。”                
	   可能你已经想到了回调。好吧，那么…… 
		```javascript
		function add(getX, getY, cb) {              
		  var x, y;           
		  getX(function(xVal) {           
		    x = xVal;         
		    // 两个都准备好了？         
		    if(y != undefined) {          
		      cb(x + y); // 发送和       
		    }         
		  });           
		  getY(function(yVal) {           
		    y = yVal;         
		    // 两个都准备好了？         
		    if(x != undefined) {          
		      cb(x + y); // 发送和       
		    }         
		  });           
		}             
		// fetchX() 和fetchY()是<span class="s6">同步</span>或者<span class="s3">异步</span>函数              
		add(fetchX, fetchY, function(sum) {             
		  console.log(sum); // 是不是很容易？            
		});   
		```          
	   尽管其中的丑陋不可否认，但这种<span class="s3">异步</span>模式体现出了一些非常重要的东西。             
	      * 在这段代码中，我们把x和y当作未来值，并且表达了一个运算add(..)。              
			  这个运算（从外部看）不在意x和y现在是否都已经可用。            
			  换句话说，它把现在和将来归一化了，因此我们可以确保这个add(..)运算的输出是可预测的。           
			  通过使用这个时间上一致的add(..)——从现在到将来的时间，它的行为都是一致的——大大简化了对这段<span class="s3">异步</span>代码的追踪。
			  说得更直白一些就是，为了统一处理现在和将来，我们把它们都变成了将来，即所有的操作都成了<span class="s3">异步</span>的。           
	      * 当然，这个粗糙的基于回调的方法还有很多不足。              
		  要体会追踪未来值的益处而不需要考虑其在时间方面是否可用，这只是很小的第一步。              
	2. <span class="s1">Promise</span>值								
	本章后面一定会深入介绍很多<span class="s1">Promise</span>的细节，因此这里如果读起来有些困惑的话，不必担心。								
	我们先来大致看一下如何通过<span class="s1">Promise</span>函数表达这个x + y的例子：	

	```javascript						
	function add(xPromise, yPromise) {								
	    // Promise.all([..])接受一个promise数组并返回一个新的promise,							
	    // 这个新promise等待数组中的所有promise完成							
	    return Promise.all([xPromise, yPromise])							
	    // 这个promise**决议**之后，我们取得收到的x和y值并加在一起							
	    .then(function(values) {							
	        // values是来自于之前**决议**的promise的消息数组						
	        return values[0] + values[1];						
	    });							
	}								
	// fetchX()和fetchY()返回相应值的promise，可能已经就绪，								
	// 也可能以后就绪								
	add(fetchX(), fetchY())								
	// 我们得到一个这两个数组的和的promise								
	// 现在链式调用then(..)来等待返回promise的**决议**								
	.then(function(sum){								
	    console.log(sum); // 这更简单！							
	});		
	```						
		* 这段代码中有两层<span class="s1">Promise</span>。								
			* fetchX()和fetchY()是直接调用的，它们的返回值（promise!）被传给add(..)。							
			这些promise代表的底层值的可用时间可能是现在或将来，但不管怎样，promise归一保证了行为的一致性。							
			我们可以按照不依赖于时间的方式追踪值X和Y。它们是未来值。							
			* 第二层是add(..)（通过<span class="s1">Promise</span>.all([ .. ])）创建并返回的promise。							
			我们通过调用then(..)等待这个promise。							
			add(..)运算<span class="s6">完成</span>后，未来值sum就准备好了，可以打印出来。							
			我们把等待未来值X和Y的逻辑隐藏在了add(..)内部。							
				* 在add(..)内部，						
					* <span class="s1">Promise</span>.all([ .. ])调用创建了一个promise（这个promise等待promiseX和promiseY的**决议**）。	
					* 链式调用．then(..)创建了另外一个promise。					
					这个promise由return values[0] + values[1]这一行立即**决议**（得到加运算的结果）。					
			* 因此，链add(..)调用终止处的调用then(..)——在代码结尾处——实际上操作的是返回的第二个promise，而不是由<span class="s1">Promise</span>.all([ .. ])创建的第一个promise。						
			 还有，尽管第二个then(..)后面没有链接任何东西，但它实际上也创建了一个新的promise，如果想要观察或者使用它的话就可以看到。						
			本章后面会详细介绍这种<span class="s1">Promise</span>链。						
		* 就像芝士汉堡订单一样，<span class="s1">Promise</span>的**决议**结果可能是<span class="s2">拒绝</span>而不是<span class="s6">完成</span>。								
			* <span class="s2">拒绝</span>值和<span class="s6">完成</span>的<span class="s1">Promise</span>不一样：							
				* <span class="s6">完成</span>值总是编程给出的						
				* <span class="s2">拒绝</span>值，通常称为<span class="s2">拒绝</span>原因（rejection reason），可能是程序逻辑直接设置的，也可能是从运行异常隐式得出的值。
			* 通过<span class="s1">Promise</span>，调用then(..)实际上可以接受两个函数，							
				* 第一个用于<span class="s6">完成</span>情况（如前所示）						
				* 第二个用于<span class="s2">拒绝</span>情况：	
				```javascript					
				add(fetchX(), fetchY())					
				.then(					
					// 完成处理函数				
					function(sum) {				
						console.log(sum);			
					},				
					// 拒绝处理函数				
					function(err) {				
						console.error(err); // 烦！			
					}				
				);		
				```			
				如果在获取X或Y的过程中出错，或者在加法过程中出错，add(..)返回的就是一个被<span class="s2">拒绝</span>的promise，传给then(..)的第二个错误处理回调就会从这个promise中得到<span class="s2">拒绝</span>值。
		* 从外部看，由于<span class="s1">Promise</span>封装了依赖于时间的状态——等待底层值的<span class="s6">完成</span>或<span class="s2">拒绝</span>，所以<span class="s1">Promise</span>本身是与时间无关的。	
		因此，<span class="s1">Promise</span>可以按照可预测的方式组成（组合），而不用关心时序或底层的结果。							
		* 另外，一旦<span class="s1">Promise</span>**决议**，它就永远保持在这个状态。								
		此时它就成为了不变值（immutable value），可以根据需求多次查看。							
		<span class="s1">Promise</span>**决议**后就是外部不可变的值，我们可以安全地把这个值传递给第三方，并确信它不会被有意无意地修改。	
		特别是对于多方查看同一个<span class="s1">Promise</span>**决议**的情况，尤其如此。							
		一方不可能影响另一方对<span class="s1">Promise</span>**决议**的观察结果。							
		不可变性听起来似乎一个学术话题，但实际上这是<span class="s1">Promise</span>设计中最基础和最重要的因素，我们不应该随意忽略这一点。	
			* 这是关于<span class="s1">Promise</span>需要理解的最强大也最重要的一个概念。							
* 经过大量的工作，你本可以通过丑陋的回调组合专门创建出类似的效果，但这真的不是一个有效的策略，特别是你不得不一次又一次重复操作。
* <span class="s1">Promise</span>是一种封装和组合未来值的易于复用的机制。									

### 2. 3.1.2 <span class="s6">完成</span>事件
* 如前所述，单独的<span class="s1">Promise</span>展示了未来值的特性。									
* 但是，也可以从另外一个角度看待<span class="s1">Promise</span>的**决议**：一种在<span class="s3">异步</span>任务中作为两个或更多步骤的流程控制机制，时序上的this-then-that。									
* 假定要调用一个函数foo(..)执行某个任务。									
	* 我们不知道也不关心它的任何细节。								
		* 这个函数可能立即<span class="s6">完成</span>任务，							
		* 也可能需要一段时间才能<span class="s6">完成</span>。							
	我们只需要知道foo(..)什么时候结束，这样就可以进行下一个任务。换句话说，我们想要通过某种方式在foo(..)<span class="s6">完成</span>的时候得到通知，以便可以继续下一步。								
	* 在典型的JavaScript风格中，如果需要侦听某个通知，你可能就会想到事件。								
		因此，可以把对通知的需求重新组织为对foo(..)发出的一个<span class="s6">完成</span>事件（completion event，或<span class="s1">continuation</span>事件）的侦听。							
		* 是叫<span class="s6">完成</span>事件还是叫<span class="s1">continuation</span>事件，取决于你的视角。							
		两种视角都是合理有用的。							
			* 你是更关注foo(..)发生了什么，						
			事件通知告诉我们foo(..)已经<span class="s6">完成</span>，						
			<span class="s6">完成</span>事件关注foo(..)更多一些，这也是目前主要的关注点，所以在后面的内容中，我们将其称为<span class="s6">完成</span>事件。						
			* 还是更关注foo(..)之后发生了什么？						
			也告诉我们现在可以继续进行下一步。						
			确实，传递过去的回调将在事件通知发生时被调用，这个回调本身之前就是我们之前所说的<span class="s1">continuation</span>。						
		* 使用回调的话，通知就是任务（foo(..)）调用的回调。							
		* 而使用<span class="s1">Promise</span>的话，我们把这个关系反转了过来，侦听来自foo(..)的事件，然后在得到通知的时候，根据情况继续。							
			* 考虑以下伪代码：	
			```javascript
			foo(x) {						
				// 开始做点可能耗时的工作					
			}						
			on(foo "completion") {						
				// 可以进行下一步了					
			}						
			on(foo "error") {						
				// 啊，foo(..)中出错了					
			}		
            ```
			我们调用foo(..)，然后建立了两个事件侦听器（foo(..)调用的两种可能结果）:						
				* 一个用于"completion"					
				* 一个用于"error"					
				从本质上讲，foo(..)并不需要了解调用代码订阅了这些事件，这样就很好地实现了关注点分离。					
			遗憾的是，这样的代码需要JavaScript环境提供某种魔法，而这种环境并不存在（实际上也有点不实际）。						
			* 以下是在JavaScript中更自然的表达方法：	
			```javascript					
			function foo(x) {						
				// 开始做点可能耗时的工作					
				// 构造一个listener事件通知处理对象来返回					
				return listener;					
			}						
			var evt = foo(42);						
			evt.on("completion", function() {						
				// 可以进行下一步了					
			});						
			evt.on("failure", function(err) {						
				// 啊，foo(..)中出错了					
			});	
            ```					
			foo(..)显式创建并返回了一个事件订阅对象，调用代码得到这个对象，并在其上注册了两个事件处理函数。						
				* 相对于面向回调的代码，这里的反转是显而易见的，而且这也是有意为之。这里没有把回调传给foo(..)，而是返回一个名为evt的事件注册对象，由它来接受回调。					
				如果你回想一下第2章的话，应该还记得回调本身就表达了一种控制反转。所以对回调模式的反转实际上是对反转的反转，或者称为反控制反转——把控制返还给调用代码，这也是我们最开始想要的效果。					
				* 一个很重要的好处是，可以把这个事件侦听对象提供给代码中多个独立的部分；在foo(..)<span class="s6">完成</span>的时候，它们都可以独立地得到通知，以执行下一步：					
				```javascript
                var evt = foo(42);					
				// 让bar(..)侦听foo(..)的完成					
				bar(evt);					
				// 并且让baz(..)侦听foo(..)的完成					
				baz(evt);	
                ```				
				* 对控制反转的恢复实现了更好的关注点分离，					
					* 其中bar(..)和baz(..)不需要牵扯到foo(..)的调用细节。				
					* 类似地，foo(..)不需要知道或关注bar(..)和baz(..)是否存在，或者是否在等待foo(..)的<span class="s6">完成</span>通知。				
					从本质上说，evt对象就是分离的关注点之间一个中立的第三方协商机制。				
* <span class="s1">Promise</span>“事件”									
事件侦听对象evt就是<span class="s1">Promise</span>的一个模拟。									
在基于<span class="s1">Promise</span>的方法中，前面的代码片段会让foo(..)创建并返回一个<span class="s1">Promise</span>实例，而且这个<span class="s1">Promise</span>会被传递到bar(..)和baz(..)。									
我们侦听的<span class="s1">Promise</span>**决议**“事件”严格说来并不算是事件（尽管它们实现目标的行为方式确实很像事件），通常也不叫作"completion"或"error"。事实上，我们通过then(..)注册一个"then"事件。或者可能更精确地说，then(..)注册"fullfillment"和/或"rejection"事件，尽管我们并不会在代码中直接使用这些术语。									
```javascript
function foo(x) {									
	// 开始一些可能耗时的工作								
	// 构造并返回一个promise								
	return new Promise(function(resolve, reject) {								
		// 最终调用resolve(..)或者reject(..)							
		// 这是这个promise的**决议**回调							
	});								
}									
var p = foo(42);									
bar(p);									
baz(p);		
```							
	* new <span class="s1">Promise</span>( function(..){ .. } )模式通常称为revealing constructor（`http://domenic.me/2014/02/13/the-revealing-constructor-pattern/`）。								
	传入的函数会立即执行（不会像then(..)中的回调一样<span class="s3">异步</span>延迟），								
	它有两个参数，这些是promise的**决议**函数。								
		* 在本例中我们将其分别称为resolve							
		resolve(..)通常标识<span class="s6">完成</span>							
		* reject							
		reject(..)则标识<span class="s2">拒绝</span>							
	* 你可能会猜测bar(..)和baz(..)的内部实现或许如下：
        ```javascript								
		function bar(fooPromise) {							
			// 侦听foo(..)完成						
			fooPromise.then(						
				function() {					
					// foo(..)已经完毕，所以执行bar(..)的任务				
				},					
				function() {					
					// 啊，foo(..)中出错了！				
				}					
			);						
		}							
		// 对于baz(..)也是一样	
        ```						
		<span class="s1">Promise</span>**决议**并不一定要像前面将<span class="s1">Promise</span>作为未来值查看时一样会涉及发送消息。它也可以只作为一种流程控制信号，就像前面这段代码中的用法一样。							
	* 另外一种实现方式是：
        ```javascript								
		function bar() {							
			// foo(..)肯定已经完成，所以执行bar(..)的任务						
		}							
		function oopsBar() {							
			// 啊，foo(..)中出错了，所以bar(..)没有运行						
		}							
		// 对于baz()和oopsBaz()也是一样							
		var p = foo(42);							
		p.then(bar, oopsBar);							
		p.then(baz, oopsBaz);	
        ```						
		* 如果以前有过基于<span class="s1">Promise</span>的编码经验的话，那你可能就会不禁认为前面代码的最后两行可以用链接的方式写作p.then( .. ).then( .. )，而不是p.then(..); p.then(..)。							
		但是，请注意，那样写的话意义就完全不同了！							
		目前二者的区别可能还不是很清晰，但与目前为止我们看到的相比，这确实是一种不同的<span class="s3">异步</span>模式——分割与复制。							
		别担心，对于这一点，本章后面还会深入介绍。							
		* 这里没有把promise p传给bar(..)和baz(..)，而是使用promise控制bar(..)和baz(..)何时执行，如果执行的话。							
	* 最主要的区别在于错误处理部分。								
		* 在第一段代码的方法里，不论foo(..)成功与否，bar(..)都会被调用。							
		并且如果收到了foo(..)失败的通知，它会亲自处理自己的回退逻辑。							
		显然，baz(..)也是如此。							
		* 在第二段代码中，bar(..)只有在foo(..)成功时才会被调用，否则就会调用oppsBar(..)。							
		baz(..)也是如此。							
	* 这两种方法本身并谈不上对错，只是各自适用于不同的情况。								
	不管哪种情况，都是从foo(..)返回的promise p来控制接下来的步骤。								
	* 另外，两段代码都以使用promise p调用then(..)两次结束。								
	这个事实说明了前面的观点，就是<span class="s1">Promise</span>（一旦**决议**）一直保持其**决议**结果（完成或<span class="s2">拒绝</span>）不变，可以按照需要多次查看。								
	一旦p**决议**，不论是现在还是将来，下一个步骤总是相同的。								
									
*  3.2 具有then方法的鸭子类型									
	* 在<span class="s1">Promise</span>领域，一个重要的细节是如何确定某个值是不是真正的<span class="s1">Promise</span>。或者更直接地说，它是不是一个行为方式类似于<span class="s1">Promise</span>的值？								
		* 既然<span class="s1">Promise</span>是通过new <span class="s1">Promise</span>(..)语法创建的，那你可能就认为可以通过p instanceof <span class="s1">Promise</span>来检查。但遗憾的是，这并不足以作为检查方法，原因有许多。							
			* 其中最主要的是，<span class="s1">Promise</span>值可能是从其他浏览器窗口（iframe等）接收到的。						
			这个浏览器窗口自己的<span class="s1">Promise</span>可能和当前窗口iframe的不同，因此这样的检查无法识别<span class="s1">Promise</span>实例。						
			* 还有，库或框架可能会选择实现自己的<span class="s1">Promise</span>，而不是使用原生ES6<span class="s1">Promise</span>实现。						
			实际上，很有可能你是在早期根本没有<span class="s1">Promise</span>实现的浏览器中使用由库提供的<span class="s1">Promise</span>。						
		* 在本章后面讨论<span class="s1">Promise</span>**决议**过程的时候，你就会了解为什么有能力识别和判断类似于<span class="s1">Promise</span>的值是否是真正的<span class="s1">Promise</span>仍然很重要。							
		不过，你现在只要先记住我的话，知道这一点很重要就行了。							
									
	* 因此，识别<span class="s1">Promise</span>（或者行为类似于<span class="s1">Promise</span>的东西）就是定义某种称为<span class="s5">thenable</span>的东西，将其定义为任何具有then(..)方法的对象和函数。								
	我们认为，任何这样的值就是<span class="s1">Promise</span>一致的<span class="s5">thenable</span>。								
	根据一个值的形态（具有哪些属性）对这个值的类型做出一些假定。这种类型检查（type check）一般用术语鸭子类型（duck typing）来表示——“如果它看起来像只鸭子，叫起来像只鸭子，那它一定就是只鸭子”（参见本书的“类型和语法”部分）。								
	于是，对<span class="s5">thenable</span>值的鸭子类型检测就大致类似于：		
  ```javascript						
	if(								
		p !== null &&							
		(							
			typeof p === "object" ||						
			typeof p === "function"						
		) &&							
		typeof p.then === "function"							
	) {								
		// 假定这是一个<span class="s5">thenable</span>!							
	} 								
	else {								
		// 不是<span class="s5">thenable</span>							
	}					
  ```			
		* 除了在多个地方实现这个逻辑有点丑陋之外，							
		* 其实还有一些更深层次的麻烦。							
			* 如果你试图使用恰好有then(..)函数的一个对象或函数值<span class="s6">完成</span>一个<span class="s1">Promise</span>，但并不希望它被当作<span class="s1">Promise</span>或<span class="s5">thenable</span>，那就有点麻烦了，因为它会自动被识别为<span class="s5">thenable</span>，并被按照特定的规则处理（参见本章后面的内容）。						
			即使你并没有意识到这个值有then(..)函数也是这样。比如：	
        ```javascript					
				var o = { then: function(){}};					
				// 让v[[Prototype]]-link到o					
				var v = Object.create(o);					
									
				v.someStuff = "cool";					
				v.otherStuff = "not so cool";					
									
				v.hasOwnProperty("then");   // false	
        ```				
				* v看起来根本不像<span class="s1">Promise</span>或<span class="s5">thenable</span>。					
				它只是一个具有一些属性的简单对象。					
				你可能只是想要像对其他对象一样发送这个值。					
				* 但你不知道的是，v还[[Prototype]]连接（参见《你不知道的JavaScript（上卷）》的“this和对象原型”部分）到了另外一个对象o，而后者恰好具有一个then(..)属性。					
				所以<span class="s5">thenable</span>鸭子类型检测会把v认作一个<span class="s5">thenable</span>。					
			* 甚至不需要是直接有意支持的：						
        ```javascript
				Object.prototype.then = function() {};					
				Array.prototype.then = function() {};					
									
				var v1 = { hello: "world" };					
				var v2 = [ "Hello", "World" ];		
        ```			
				* v1和v2都会被认作<span class="s5">thenable</span>。					
				* 如果有任何其他代码无意或恶意地给Object.prototype、Array.prototype或任何其他原生原型添加then(..)，你无法控制也无法预测。					
				并且，如果指定的是不调用其参数作为回调的函数，那么如果有<span class="s1">Promise</span>**决议**到这样的值，就会永远挂住！真是疯狂。					
				* 但是别忘了，在ES6之前，社区已经有一些著名的非<span class="s1">Promise</span>库恰好有名为then(..)的方法。					
				这些库中有一部分选择了重命名自己的方法以避免冲突（这真糟糕！）。					
				而其他的那些库只是因为无法通过改变摆脱这种冲突，就很不幸地被降级进入了“与基于<span class="s1">Promise</span>的编码不兼容”的状态。					
				* 标准决定劫持之前未保留的——听起来是完全通用的——属性名then。					
				这意味着所有值（或其委托），不管是过去的、现存的还是未来的，都不能拥有then(..)函数，不管是有意的还是无意的；否则这个值在<span class="s1">Promise</span>系统中就会被误认为是一个<span class="s5">thenable</span>，这可能会导致非常难以追踪的bug。					
									
	* 我并不喜欢最后还得用<span class="s5">thenable</span>鸭子类型检测作为<span class="s1">Promise</span>的识别方案。								
	还有其他选择，比如branding，甚至anti-branding。								
	可我们所用的似乎是针对最差情况的妥协。								
	但情况也并不完全是一片黯淡。								
	后面我们就会看到，<span class="s5">thenable</span>鸭子类型检测还是有用的。								
	只是要清楚，如果<span class="s5">thenable</span>鸭子类型误把不是<span class="s1">Promise</span>的东西识别为了<span class="s1">Promise</span>，可能就是有害的。								
					
## 术语：**决议**、<span class="s6">完成</span>以及<span class="s2">拒绝</span>	
对于术语**决议**（resolve）、<span class="s6">完成</span>（fulfill）和<span class="s2">拒绝</span>（reject），在更深入学习<span class="s1">Promise</span>之前，我们还有一些模糊之处需要澄清。									
### 先来研究一下构造器<span class="s1">Promise</span>(..)：
```javascript							
var p = new Promise(function(X, Y){									
	// X()用于完成								
	// Y()用于拒绝								
});		
```							
* 你可以看到，这里提供了两个回调（称为X和Y）。								
第一个通常用于标识<span class="s1">Promise</span>已经<span class="s6">完成</span>，第二个总是用于标识<span class="s1">Promise</span>被<span class="s2">拒绝</span>。								
这个“通常”是什么意思呢？对于这些参数的精确命名，这又意味着什么呢？								
	* 追根究底，这只是你的用户代码和标识符名称，对引擎而言没有意义。							
	所以从技术上说，这无关紧要，foo(..)或者bar(..)还是同样的函数。							
	但是，你使用的文字不只会影响你对这些代码的看法，也会影响团队其他开发者对代码的认识。							
	错误理解精心组织起来的<span class="s3">异步</span>代码还不如使用一团乱麻的回调函数。							
* 所以事实上，命名还是有一定的重要性的。								
	* 第二个参数名称很容易决定。							
	几乎所有的文献都将其命名为reject(..)，因为这就是它真实的（也是唯一的！）工作，所以这样的名字是很好的选择。	 
	我强烈建议大家要一直使用reject(..)这一名称。							
		* 前面提到的reject(..)不会像resolve(..)一样进行展开。						
		如果向reject(..)传入一个<span class="s1">Promise</span>/<span class="s5">thenable</span>值，它会把这个值原封不动地设置为<span class="s2">拒绝</span>理由。						
		后续的<span class="s2">拒绝</span>处理函数接收到的是你实际传给reject(..)的那个<span class="s1">Promise</span>/<span class="s5">thenable</span>，而不是其底层的立即值。						
	* 但是，第一个参数就有一些模糊了，<span class="s1">Promise</span>文献通常将其称为resolve(..)。							
	这个词显然和**决议**（resolution）有关，							
	而**决议**在各种文献（包括本书）中是用来描述“为<span class="s1">Promise</span>设定最终值/状态”。							
	前面我们已经多次使用“<span class="s1">Promise</span>**决议**”来表示<span class="s6">完成</span>或<span class="s2">拒绝</span><span class="s1">Promise</span>。							
		* 但是，如果这个参数是用来特指<span class="s6">完成</span>这个<span class="s1">Promise</span>，那为什么不用使用fulfill(..)来代替resolve(..)以求表达更精确呢？	 
			* 要回答这个问题，我们先来看看两个<span class="s1">Promise</span> API方法：					
				* var fulfilledPr = Promise.resolve(42);				
				Promise.resolve(..)创建了一个**决议**为输入值的<span class="s1">Promise</span>。				
				在这个例子中，42是一个非<span class="s1">Promise</span>、非<span class="s5">thenable</span>的普通值，所以<span class="s6">完成</span>后的promise fullfilledPr是为值42创建的。 	 
				* var rejectedPr = Promise.reject("Oops");				
				romise.reject("Oops")创建了一个被<span class="s2">拒绝</span>的promise rejectedPr，<span class="s2">拒绝</span>理由为"Oops"。				
			* 现在我们来解释为什么单词resolve（比如在<span class="s1">Promise</span>.resolve(..)中）如果用于表达结果可能是<span class="s6">完成</span>也可能是<span class="s2">拒绝</span>的话，既没有歧义，而且也确实更精确：					
      ```javascript
			var rejectedTh = {					
				then: function(resolved, rejected){				
					rejected("Oops");			
				}				
			};					
			var rejectedPr = Promise.resolve(rejectedTh);		
      ```			
			本章前面已经介绍过，<span class="s1">Promise</span>.resolve(..)会将传入的真正<span class="s1">Promise</span>直接返回，对传入的<span class="s5">thenable</span>则会展开。如果这个<span class="s5">thenable</span>展开得到一个<span class="s2">拒绝</span>状态，那么从<span class="s1">Promise</span>. resolve(..)返回的<span class="s1">Promise</span>实际上就是这同一个<span class="s2">拒绝</span>状态。					
			所以对这个API方法来说，<span class="s1">Promise</span>.resolve(..)是一个精确的好名字，因为它实际上的结果可能是<span class="s6">完成</span>或<span class="s2">拒绝</span>。	 
		* <span class="s1">Promise</span>(..)构造器的第一个参数回调会展开<span class="s5">thenable</span>（和<span class="s1">Promise</span>.resolve(..)一样）或真正的<span class="s1">Promise</span>：		
    ```javascript				
		var rejectedPr = new Promise(function(resolve, reject){						
			// 用一个被拒绝的promise完成这个promise					
			resolve(Promise.reject("Oops"));					
		});						
		rejectedPr.then(						
			function fulfilled(){					
				// 永远不会到达这里				
			},					
			function rejected(err){					
				console.log(err);  // "Oops"				
			}					
		);						
    ```
		现在应该很清楚了，<span class="s1">Promise</span>(..)构造器的第一个回调参数的恰当称谓是resolve(..)。						
								
### 不过，现在我们再来关注一下提供给then(..)的回调
它们（在文献和代码中）应该怎么命名呢？									
我的建议是fulfilled(..)和rejected(..)：		
```javascript							
function fulfilled(msg){									
	console.log(msg);								
}									
function rejected(err){									
	console.error(err);								
}									
p.then(									
	fulfilled,								
	rejected								
);		
```							
对then(..)的第一个参数来说，毫无疑义，总是处理<span class="s6">完成</span>的情况，所以不需要使用标识两种状态的术语“resolve”。									
这里提一下，ES6规范将这两个回调命名为onFulfilled(..)和onRejected(..)，所以这两个术语很准确。									
									
									
## 3.5 错误处理
前面已经展示了一些例子，用于说明在<span class="s3">异步</span>编程中<span class="s1">Promise</span><span class="s2">拒绝</span>（调用reject(..)有意<span class="s2">拒绝</span>或JavaScript异常导致的无意<span class="s2">拒绝</span>）如何使得错误处理更完善。									
我们来回顾一下，并明确解释一下前面没有明说的几个细节。									
###1. 对多数开发者来说，错误处理最自然的形式就是<span class="s6">同步</span>的try..catch结构。遗憾的是，它只能是<span class="s6">同步</span>的，无法用于<span class="s3">异步</span>代码模式：
```javascript
function foo(){									
	setTimeout(function(){								
		baz.bar();							
	}, 100);								
}									
try {									
	foo();								
	// 后面从`baz.bar()`抛出全局错误								
}									
catch(err){									
	// 永远不会到达这里								
}									
```
try..catch当然很好，但是无法跨<span class="s3">异步</span>操作工作。也就是说，还需要一些额外的环境支持，我们会在第4章关于<span class="s4">生成器</span>的部分介绍这些环境支持。				

###2.  在回调中，一些模式化的错误处理方式已经出现，最值得一提的是error-first回调风格：
```javascript							
function foo(cb){									
	setTimeout(function(){								
		try {							
			var x = baz.bar();						
			cb(null, x); // 成功！						
		}							
		catch(err){							
			cb(err);						
		}							
	}, 100);								
}									
foo(function(err, val){									
	if(err){								
		console.error(err); // 烦：（							
	}								
	else {								
		console.log(val);							
	}								
});									
```
* 只有在baz.bar()调用会<span class="s6">同步</span>地立即成功或失败的情况下，这里的try..catch才能工作。									
如果baz.bar()本身有自己的<span class="s3">异步</span><span class="s6">完成</span>函数，其中的任何<span class="s3">异步</span>错误都将无法捕捉到。									
* 传给foo(..)的回调函数保留第一个参数err，用于在出错时接收到信号。									
	* 如果其存在的话，就认为出错；								
	* 否则就认为是成功。								
* 严格说来，这一类错误处理是支持<span class="s3">异步</span>的，但完全无法很好地组合。									
多级error-first回调交织在一起，再加上这些无所不在的if检查语句，都不可避免地导致了回调地狱的风险（参见第2章）。

###3. 我们回到<span class="s1">Promise</span>中的错误处理，其中<span class="s2">拒绝</span>处理函数被传递给then(..)。
* <span class="s1">Promise</span>没有采用流行的error-first回调设计风格，而是使用了分离回调（split-callback）风格。									
一个回调用于<span class="s6">完成</span>情况，一个回调用于<span class="s2">拒绝</span>情况：			
```javascript						
var p = Promise.reject("Oops");									
p.then(									
	function fulfilled(){								
		// 永远不会到达这里							
	},								
	function rejected(err){								
		console.log(err);  // "Oops"							
	}								
);									
```
	* 尽管表面看来，这种出错处理模式很合理，但彻底掌握<span class="s1">Promise</span>错误处理的各种细微差别常常还是有些难度的。		
  ```javascript						
	var p = Promise.resolve(42);								
	p.then(								
		function fulfilled(msg){							
			// 数字没有string函数，所以会抛出错误						
			console.log(msg.toLowerCase());						
		},							
		function rejected(err){							
			// 永远不会到达这里						
		}							
	);							
  ```	
		* 如果msg.toLowerCase()合法地抛出一个错误（事实确实如此！），为什么我们的错误处理函数没有得到通知呢？							
		正如前面解释过的，这是因为那个错误处理函数是为promise p准备的，而这个promise已经用值42填充了。promise p是不可变的， 
		所以唯一可以被通知这个错误的promise是从p.then(..)返回的那一个，							
		但我们在此例中没有捕捉。							
		* 这应该清晰地解释了为什么<span class="s1">Promise</span>的错误处理易于出错。这非常容易造成错误被吞掉，而这极少是出于你的本意。							
	* 如果通过无效的方式使用<span class="s1">Promise</span> API，并且出现一个错误阻碍了正常的<span class="s1">Promise</span>构造，那么结果会得到一个立即抛出的异常，而不是一个被<span class="s2">拒绝</span>的<span class="s1">Promise</span>。 
	这里是一些错误使用导致<span class="s1">Promise</span>构造失败的例子：								
		* newPromise(null)							
		* Promise.all()							
		* Promise.race(42)							
		* 等等。							
	如果一开始你就没能有效使用<span class="s1">Promise</span> API真正构造出一个<span class="s1">Promise</span>，那就无法得到一个被<span class="s2">拒绝</span>的<span class="s1">Promise</span>！	 
* 绝望的陷阱									
	* 3.5.1 Jeff Atwood多年前曾提出：通常编程语言构建的方式是，默认情况下，开发者陷入“绝望的陷阱”（pit of despair）（`http://blog.codinghorror.com/falling-into-the-pit-of-success`），要为错误付出代价，只有更努力才能做对。	 
	他呼吁我们转而构建一个“成功的坑”（pit of success），其中默认情况下你能够得到想要的结果（成功），想出错很难。		 
	* 毫无疑问，<span class="s1">Promise</span>错误处理就是一个“绝望的陷阱”设计。								
	默认情况下，它假定你想要<span class="s1">Promise</span>状态吞掉所有的错误。								
	如果你忘了查看这个状态，这个错误就会默默地（通常是绝望地）在暗处凋零死掉。								
	* 为了避免丢失被忽略和抛弃的<span class="s1">Promise</span>错误，一些开发者表示，<span class="s1">Promise</span>链的一个最佳实践就是最后总以一个catch(..)结束，比如：	 
  ```javascript
	var p = Promise.resolve(42);								
	p.then(								
		function fulfilled(msg){							
			// 数字没有string函数，所以会抛出错误						
			console.log(msg.toLowerCase());						
		}							
	)								
	.catch(handleErrors);								
  ```
	* 因为我们没有为then(..)传入<span class="s2">拒绝</span>处理函数，所以默认的处理函数被替换掉了，而这仅仅是把错误传递给了链中的下一个promise。								
	因此，进入p的错误以及p之后进入其**决议**（就像msg.toLowerCase()）的错误都会传递到最后的handleErrors(..)。								
	问题解决了，对吧？没那么快！								
	* 如果handleErrors(..)本身内部也有错误怎么办呢？谁来捕捉它？还有一个没人处理的promise:catch(..)返回的那一个。								
	我们没有捕获这个promise的结果，也没有为其注册<span class="s2">拒绝</span>处理函数。								
	你并不能简单地在这个链尾端添加一个新的catch(..)，因为它很可能会失败。								
	任何<span class="s1">Promise</span>链的最后一步，不管是什么，总是存在着在未被查看的<span class="s1">Promise</span>中出现未捕获错误的可能性，尽管这种可能性越来越低。								
	看起来好像是个无解的问题吧？								
									
									
### 3.5.2 处理未捕获的情况
这不是一个容易彻底解决的问题。									
还有其他（很多人认为是更好的）一些处理方法。									
* ##### 有些<span class="s1">Promise</span>库增加了一些方法，用于注册一个类似于“全局未处理<span class="s2">拒绝</span>”处理函数的东西，这样就不会抛出全局错误，而是调用这个函数。
但它们辨识未捕获错误的方法是定义一个某个时长的定时器，比如3秒钟，在<span class="s2">拒绝</span>的时刻启动。								
如果<span class="s1">Promise</span>被<span class="s2">拒绝</span>，而在定时器触发之前都没有错误处理函数被注册，那它就会假定你不会注册处理函数，进而就是未被捕获错误。								
	* 在实际使用中，对很多库来说，这种方法运行良好，因为通常多数使用模式在<span class="s1">Promise</span><span class="s2">拒绝</span>和检查<span class="s2">拒绝</span>结果之间不会有很长的延迟。							
	* 但是这种模式可能会有些麻烦，因为3秒这个时间太随意了（即使是经验值），也因为确实有一些情况下会需要<span class="s1">Promise</span>在一段不确定的时间内保持其<span class="s2">拒绝</span>状态。							
	而且你绝对不希望因为这些误报（还没被处理的未捕获错误）而调用未捕获错误处理函数。							
* ##### 更常见的一种看法是：Promsie应该添加一个done(..)函数，从本质上标识Promsie链的结束。
done(..)不会创建和返回<span class="s1">Promise</span>，所以传递给done(..)的回调显然不会报告一个并不存在的链接<span class="s1">Promise</span>的问题。								
那么会发生什么呢？								
它的处理方式类似于你可能对未捕获错误通常期望的处理方式：done(..)<span class="s2">拒绝</span>处理函数内部的任何异常都会被作为一个全局未处理错误抛出（基本上是在开发者终端上）。								
代码如下：					
```javascript			
var p = Promise.resolve(42);								
p.then(								
	function fulfilled(msg){							
		// 数字没有string函数，所以会抛出错误						
		console.log(msg.toLowerCase());						
	}							
)								
.done(null, handleErrors);			
// 如果handleErrors(..)引发了自身的异常，会被全局抛出到这里
```								
	* 相比没有结束的链接或者任意时长的定时器，这种方案看起来似乎更有吸引力。							
	* 但最大的问题是，它并不是ES6标准的一部分，所以不管听起来怎么好，要成为可靠的普遍解决方案，它还有很长一段路要走。							
	那我们就这么被卡住了？不完全是。							
* ##### 浏览器有一个特有的功能是我们的代码所没有的：它们可以跟踪并了解所有对象被丢弃以及被垃圾回收的时机。
所以，浏览器可以追踪<span class="s1">Promise</span>对象。								
如果在它被垃圾回收的时候其中有<span class="s2">拒绝</span>，浏览器就能够确保这是一个真正的未捕获错误，进而可以确定应该将其报告到开发者终端。								
	* 在编写本书时候，Chrome和Firefox对于这种（追踪）未捕获<span class="s2">拒绝</span>功能都已经有了早期的实验性支持，尽管还不完善。							
	* 但是，如果一个<span class="s1">Promise</span>未被垃圾回收——各种不同的代码模式中很容易不小心出现这种情况——浏览器的垃圾回收嗅探就无法帮助你知晓和诊断一个被你默默<span class="s2">拒绝</span>的<span class="s1">Promise</span>。							
	还有其他办法吗？有。							
* ##### 3.5.3 成功的坑
接下来的内容只是理论上的，关于未来的<span class="s1">Promise</span>可以变成什么样。								
  * 我相信它会变得比现在我们所拥有的高级得多。								
  我认为这种改变甚至可能是后ES6的，因为我觉得它不会打破与ES6 <span class="s1">Promise</span>的web兼容性。								
  还有，如果你认真对待的话，它可能是可以polyfill/prollyfill的。我们来看一下。								
  	* 默认情况下，Promsie在下一个任务或时间循环tick上（向开发者终端）报告所有<span class="s2">拒绝</span>，如果在这个时间点上该<span class="s1">Promise</span>上还没有注册错误处理函数。							
  	* 如果想要一个被<span class="s2">拒绝</span>的<span class="s1">Promise</span>在查看之前的某个时间段内保持被<span class="s2">拒绝</span>状态，可以调用defer()，这个函数优先级高于该<span class="s1">Promise</span>的自动错误报告。							
  * 如果一个<span class="s1">Promise</span>被<span class="s2">拒绝</span>的话，默认情况下会向开发者终端报告这个事实（而不是默认为沉默）。								
  可以选择隐式（在<span class="s2">拒绝</span>之前注册一个错误处理函数）或者显式（通过defer()）禁止这种报告。								
  在这两种情况下，都是由你来控制误报的情况。	
  ```javascript							
  var p = Promise.reject("Oops").defer();								
  // foo(..)是支持Promise的								
  foo(42)								
  .then(								
  	function fulfilled(){							
  		return p;						
  	},							
  	function rejected(err){							
  		// 处理foo(..)错误						
  	}							
  );								
  ...								
  ```
  	* 这种设计就是成功的坑。							
  		* 默认情况下，所有的错误要么被处理要么被报告，这几乎是绝大多数情况下几乎所有开发者会期望的结果。						
  		从foo(..)返回的promise立刻就被关联了一个错误处理函数，所以它也隐式消除了出错全局报告。						
  		但是，从then(..)调用返回的promise没有调用defer()，也没有关联错误处理函数，所以如果它（从内部或**决议**处理函数）<span class="s2">拒绝</span>的话，就会作为一个未捕获错误被报告到开发者终端。						
  		* 你要么必须注册一个处理函数要么特意选择退出，并表明你想把错误处理延迟到将来。你这时候是在为特殊情况主动承担特殊的责任。						
  		创建p的时候，我们知道需要等待一段时间才能使用或查看它的<span class="s2">拒绝</span>结果，所以我们就调用defer()，这样就不会有全局报告出现。为了便于链接，defer()只是返回这同一个promise。						
  	* 这种方案唯一真正的危险是，如果你defer()了一个<span class="s1">Promise</span>，但之后却没有成功查看或处理它的<span class="s2">拒绝</span>结果。							
  	但是，你得特意调用defer()才能选择进入这个绝望的陷阱（默认情况下总是成功的坑）。所以这是你自己的问题，别人也无能为力。
    * 我认为<span class="s1">Promise</span>错误处理还是有希望的（后ES6）。								
    我希望权威组织能够重新思考现状，考虑一下这种修改。								
    同时，你也可以自己实现这一点（这是一道留给大家的挑战性习题！），或者选择更智能的<span class="s1">Promise</span>库为你实现！								
    	* 这个错误处理/报告的精确模板是在我的asynquence <span class="s1">Promise</span>抽象库中实现的。							
    	本部分的附录A中详细讨论了这个库。							
								
									
## 3.6 <span class="s1">Promise</span>模式
前文我们无疑已经看到了使用<span class="s1">Promise</span>链的顺序模式（this-then-this-then-that流程控制），但是可以基于<span class="s1">Promise</span>构建的<span class="s3">异步</span>模式抽象还有很多变体。									
这些模式是为了简化<span class="s3">异步</span>流程控制，这使得我们的代码更容易追踪和维护，即使在程序中最复杂的部分也是如此。									
原生ES6 <span class="s1">Promise</span>实现中直接支持了两个这样的模式，所以我们可以免费得到它们，用作构建其他模式的基本块。									
### 1. 3.6.1 <span class="s1">Promise</span>.all([ .. ])
* 在<span class="s3">异步</span>序列中（<span class="s1">Promise</span>链），任意时刻都只能有一个<span class="s3">异步</span>任务正在执行——步骤2只能在步骤1之后，步骤3只能在步骤2之后。但是，如果想要同时执行两个或更多步骤（也就是“并行执行”），要怎么实现呢？									
	* 在经典的编程术语中，门（gate）是这样一种机制要等待两个或更多并行/<span class="s5">并发</span>的任务都<span class="s6">完成</span>才能继续。								
	它们的<span class="s6">完成</span>顺序并不重要，但是必须都要<span class="s6">完成</span>，门才能打开并让流程控制继续。								
	* 在<span class="s1">Promise</span> API中，这种模式被称为all([ .. ])。								
* 假定你想要同时发送两个Ajax请求，等它们不管以什么顺序全部<span class="s6">完成</span>之后，再发送第三个Ajax请求。考虑：			

```javascript						
// request(..)是一个Promise-aware Ajax工具									
// 就像我们在本章前面定义的一样									
var p1 = request("http://some.url.1/");									
var p2 = request("http://some.url.2/");									
									
Promise.all([p1, p2])									
.then(function(msgs)[									
	// 这里，p1和p2完成并把它们的消息传入								
	return request("http://some.url.3/?v=" + msgs.join(", "));								
})									
.then(function(msg){									
	console.log(msg);								
});								
```	
* <span class="s1">Promise</span>.all([ .. ])需要一个参数，是一个数组，通常由<span class="s1">Promise</span>实例组成。									
从<span class="s1">Promise</span>. all([ .. ])调用返回的promise会收到一个<span class="s6">完成</span>消息（代码片段中的msg）。									
这是一个由所有传入promise的<span class="s6">完成</span>消息组成的数组，与指定的顺序一致（与<span class="s6">完成</span>顺序无关）。									
	* 严格说来，传给<span class="s1">Promise</span>.all([ .. ])的数组中的值可以是<span class="s1">Promise</span>、<span class="s5">thenable</span>，甚至是立即值。								
	就本质而言，列表中的每个值都会通过<span class="s1">Promise</span>. resolve(..)过滤，以确保要等待的是一个真正的<span class="s1">Promise</span>，所以立即值会被规范化为为这个值构建的<span class="s1">Promise</span>。								
	如果数组是空的，主<span class="s1">Promise</span>就会立即<span class="s6">完成</span>。								
* 从<span class="s1">Promise</span>.all([ .. ])返回的主promise在且仅在所有的成员promise都<span class="s6">完成</span>后才会<span class="s6">完成</span>。									
如果这些promise中有任何一个被<span class="s2">拒绝</span>的话，主<span class="s1">Promise</span>.all([ .. ])promise就会立即被<span class="s2">拒绝</span>，并丢弃来自其他所有promise的全部结果。									
* 永远要记住为每个promise关联一个<span class="s2">拒绝</span>/错误处理函数，特别是从<span class="s1">Promise</span>.all([ .. ])返回的那一个。									
									
### 2. 3.6.2 <span class="s1"><span class="s1">Promise</span></span>.race([ .. ])
* 尽管<span class="s1">Promise</span>.all([ .. ])协调多个<span class="s5">并发</span><span class="s1">Promise</span>的运行，并假定所有<span class="s1">Promise</span>都需要<span class="s6">完成</span>，但有时候你会想只响应“第一个跨过终点线的<span class="s1">Promise</span>”，而抛弃其他<span class="s1">Promise</span>。									
* 这种模式传统上称为门闩，但在<span class="s1">Promise</span>中称为竞态。									
* 虽然“只有第一个到达终点的才算胜利”这个比喻很好地描述了其行为特性，但遗憾的是，由于竞态条件通常被认为是程序中的bug（参见第1章），									
所以从某种程度上说，“竞争”这个词已经是一个具有固定意义的术语了。									
不要混淆了<span class="s1">Promise</span>.race([..])和竞态条件。									
* <span class="s1"><span class="s1">Promise</span></span>.race([ .. ])也接受单个数组参数。									
这个数组由一个或多个<span class="s1">Promise</span>、<span class="s5">thenable</span>或立即值组成。									
立即值之间的竞争在实践中没有太大意义，因为显然列表中的第一个会获胜，就像赛跑中有一个选手是从终点开始比赛一样！									
* 与<span class="s1">Promise</span>.all([ .. ])类似，									
	* 一旦有任何一个<span class="s1">Promise</span>**决议**为<span class="s6">完成</span>，<span class="s1"><span class="s1">Promise</span></span>.race([ .. ])就会<span class="s6">完成</span>；								
	* 一旦有任何一个<span class="s1">Promise</span>**决议**为<span class="s2">拒绝</span>，它就会<span class="s2">拒绝</span>。								
	* 一项竞赛需要至少一个“参赛者”。所以，如果你传入了一个空数组，主race([..]) <span class="s1">Promise</span>永远不会**决议**，而不是立即**决议**。								
	这很容易搬起石头砸自己的脚！								
	ES6应该指定它<span class="s6">完成</span>或<span class="s2">拒绝</span>，抑或只是抛出某种<span class="s6">同步</span>错误。								
	遗憾的是，因为<span class="s1">Promise</span>库在时间上早于ES6 <span class="s1">Promise</span>，它们不得已遗留了这个问题，所以，要注意，永远不要递送空数组。								
* 再回顾一下前面的<span class="s5">并发</span>Ajax例子，不过这次的p1和p2是竞争关系：		
  ```javascript							
	// request(..)是一个支持<span class="s1">Promise</span>的Ajax工具								
	// 就像我们在本章前面定义的一样								
	var p1 = request("http://some.url.1/");								
	var p2 = request("http://some.url.2/");								
									
	Promise.race([p1, p2])								
	.then(function(msg){								
		// p1或者p2将赢得这场竞赛							
		return request("http://some.url.3/?v=" + msg);							
	})								
	.then(function(msg){								
		console.log(msg);							
	});'								
  ```
	因为只有一个promise能够取胜，所以<span class="s6">完成</span>值是单个消息，而不是像对<span class="s1">Promise</span>.all([ .. ])那样的是一个数组。								
									
#### 1. 超时竞赛
我们之前看到过这个例子，其展示了如何使用<span class="s1">Promise</span>.race([ .. ])表达<span class="s1">Promise</span>超时模式：			
```javascript						
// foo()是一个支持Promise的函数									
// 前面定义的timeoutPromise(..)返回一个promise，									
// 这个promise会在指定延时之后拒绝									
// 为foo()设定超时									
Promise.race([									
	foo(),   // 启动foo()								
	timeoutPromise(3000)    // 给它3秒钟								
])									
.then(									
	function(){								
		// foo(..)按时完成							
	},								
	function(err){								
		// 要么foo()被拒绝，要么只是没能够按时完成，							
		// 因此要查看err了解具体原因							
	}								
);									
```
在多数情况下，这个超时模式能够很好地工作。但是，还有一些微妙的情况需要考虑，并且坦白地说，对于<span class="s1">Promise</span>.race([ .. ])和<span class="s1">Promise</span>.all([ .. ])也都是如此。									
									
#### 2. finally
* 一个关键问题是：“那些被丢弃或忽略的promise会发生什么呢？”									
我们并不是从性能的角度提出这个问题的——通常最终它们会被垃圾回收——而是从行为的角度（副作用等）。									
<span class="s1">Promise</span>不能被取消，也不应该被取消，因为那会摧毁3.8.5节讨论的外部不变性原则，所以它们只能被默默忽略。									
* 那么如果前面例子中的foo()保留了一些要用的资源，但是出现了超时，导致这个promise被忽略，这又会怎样呢？									
在这种模式中，会有什么为超时后主动释放这些保留资源提供任何支持，或者取消任何可能产生的副作用吗？									
如果你想要的只是记录下foo()超时这个事实，又会如何呢？									
	* 有些开发者提出，<span class="s1">Promise</span>需要一个finally(..)回调注册，这个回调在<span class="s1">Promise</span>**决议**后总是会被调用，并且允许你执行任何必要的清理工作。								
	目前，规范还没有支持这一点，不过在ES7+中也许可以。只好等等看了。								
	它看起来可能类似于：								
  ```javascript
	var p = Promise.resolve(42);								
	p.then(something)								
	.finally(cleanup)								
	.then(another)								
	.finallY(cleanup)		
  ```						
	* 在各种各样的<span class="s1">Promise</span>库中，finally(..)还是会创建并返回一个新的<span class="s1">Promise</span>（以支持链接继续）。								
	如果cleanup(..)函数要返回一个<span class="s1">Promise</span>的话，这个promise就会被连接到链中，这意味着这里还是会有前面讨论过的未处理<span class="s2">拒绝</span>问题。								
	* 同时，我们可以构建一个静态辅助工具来支持查看（而不影响）<span class="s1">Promise</span>的**决议**：			
  ```javascript					
	// polyfill安全的guard检查								
	if(!Promise.observe){								
		Promise.observe = function(pr, cb){							
			// 观察pr的**决议**						
			pr.then(						
				function fulfilled(msg){					
					// 安排<span class="s3">异步</span>回调（作为Job）				
					Promise.resolve(msg).then(cb);				
				},					
				function rejected(err){					
					// 安排<span class="s3">异步</span>回调（作为Job）				
					Promise.resolve(err).then(cb);				
				}					
			);						
			// 返回最初的promise						
			return pr;						
		};							
	}								
  ```
	下面是如何在前面的超时例子中使用这个工具：	
  ```javascript							
	Promise.race([								
		Promise.observe(							
			foo(),  // 试着运行foo()						
			function cleanup(msg){						
				// 在foo()之后清理，即使它没有胡超时之前完成					
			}						
		),							
		timeoutPromise(3000)    // 给它3秒钟							
									
	])					
  ```			
		* 这个辅助工具<span class="s1">Promise</span>.observe(..)只是用来展示可以如何查看<span class="s1">Promise</span>的<span class="s6">完成</span>而不对其产生影响。							
		* 其他的<span class="s1">Promise</span>库有自己的解决方案。							
		* 不管如何实现，你都很可能遇到需要确保<span class="s1">Promise</span>不会被意外默默忽略的情况。							
									
#### 3. 3.6.3 all([ .. ])和race([ .. ])的变体
* 虽然原生ES6 <span class="s1">Promise</span>中提供了内建的<span class="s1">Promise</span>.all([ .. ])和<span class="s1">Promise</span>.race([.. ])，但这些语义还有其他几个常用的变体模式。									
	* none([ .. ])								
	这个模式类似于all([ .. ])，不过<span class="s6">完成</span>和<span class="s2">拒绝</span>的情况互换了。所有的<span class="s1">Promise</span>都要被<span class="s2">拒绝</span>，即<span class="s2">拒绝</span>转化为<span class="s6">完成</span>值，反之亦然。								
	* any([ .. ])								
	这个模式与all([ .. ])类似，但是会忽略<span class="s2">拒绝</span>，所以只需要<span class="s6">完成</span>一个而不是全部。								
	* first([ .. ])								
	这个模式类似于与any([ .. ])的竞争，即只要第一个<span class="s1">Promise</span><span class="s6">完成</span>，它就会忽略后续的任何<span class="s2">拒绝</span>和<span class="s6">完成</span>。								
	* last([ .. ])								
	这个模式类似于first([ .. ])，但却是只有最后一个<span class="s6">完成</span>胜出。								
* 有些<span class="s1">Promise</span>抽象库提供了这些支持，但也可以使用<span class="s1">Promise</span>、race([ .. ])和all([ .. ])这些机制，你自己来实现它们。									
比如，可以像这样定义first([ .. ])：			
```javascript						
// polyfill安全的guard检查									
if(!Promise.first){									
	Promise.first = function(prs){								
		return new Promise(function(resolve, reject){							
			// 在所有promise上循环						
			prs.forEach(function(pr){						
				// 把值规整化					
				Promise.resolve(pr)					
				// 不管哪个最先完成，就**决议**主promise					
				.then(resolve);					
			});						
		});							
	};								
}					
```				
	* 在这个first(..)实现中，如它的所有promise都<span class="s2">拒绝</span>的话，它不会<span class="s2">拒绝</span>。								
	它只会挂住，非常类似于<span class="s1">Promise</span>.race([])。								
	如果需要的话，可以添加额外的逻辑跟踪每个promise<span class="s2">拒绝</span>。								
	如果所有的promise都被<span class="s2">拒绝</span>，就在主promise上调用reject()。								
	这个实现留给你当练习。								
									
#### 4. 3.6.4 <span class="s5">并发</span>迭代
* 有些时候会需要在一列<span class="s1">Promise</span>中迭代，并对所有<span class="s1">Promise</span>都执行某个任务，非常类似于对<span class="s6">同步</span>数组可以做的那样（比如forEach(..)、map(..)、some(..)和every(..)）。									
如果要对每个<span class="s1">Promise</span>执行的任务本身是<span class="s6">同步</span>的，那这些工具就可以工作，就像前面代码中的forEach(..)。									
* 但如果这些任务从根本上是<span class="s3">异步</span>的，或者可以/应该<span class="s5">并发</span>执行，那你可以使用这些工具的<span class="s3">异步</span>版本，许多库中提供了这样的工具。									
举例来说，让我们考虑一下一个<span class="s3">异步</span>的map(..)工具。									
	* 它接收一个数组的值（可以是<span class="s1">Promise</span>或其他任何值），								
	外加要在每个值上运行一个函数（任务）作为参数。								
	map(..)本身返回一个promise，其<span class="s6">完成</span>值是一个数组，该数组（保持映射顺序）保存任务执行之后的<span class="s3">异步</span><span class="s6">完成</span>值：		
  ```javascript						
	if(!Promise.map){								
		Promise.map = function(vals, cb){							
			// 一个等待所有map的promise的新promise						
			return Promise.all(						
				// 注：一般数组map(..)把值数组转换为promise数组					
				vals.map(function(val){					
					// 用val<span class="s3">异步</span>map之后**决议**的新promise替换val				
					return new Promise(function(resolve){				
						cb(val, resolve);			
					});				
				})					
			);						
		};							
	}			
  ```					
	在这个map(..)实现中，不能发送<span class="s3">异步</span><span class="s2">拒绝</span>信号，但如果在映射的回调（cb(..)）内出现<span class="s6">同步</span>的异常或错误，主<span class="s1">Promise</span>.map(..)返回的promise就会<span class="s2">拒绝</span>。								
	* 下面展示如何在一组<span class="s1">Promise</span>（而非简单的值）上使用map(..)：	
  ```javascript							
	var p1 = Promise.resolve(21);								
	var p2 = Promise.resolve(42);								
	var p3 = Promise.reject("Oops");								
	// 把列表中的值加倍，即使是在Promise中								
	Promise.map([p1, p2, p3], function(pr, done){								
		// 保证这一条本身是一个Promise							
		Promise.resolve(pr)							
		.then(							
			// 提取值作为v						
			function(v){						
				// map完成的v到新值					
				done(v*2);					
			},						
			// 或者map到promise拒绝消息						
			done						
		);							
	})								
	.then(function(vals){								
		console.log(vals);  // [42, 84, "Oops"]							
	});			
  ```					
									
									
## 3.7 <span class="s1">Promise</span> API概述
本章已经在多处零零碎碎地展示了ES6 <span class="s1">Promise</span> API，现在让我们来总结一下。									
* 下面的API只对于ES6是原生的，									
* 但是有符合规范的适配版（不只是对<span class="s1">Promise</span>库的扩展），其定义了<span class="s1">Promise</span>及它的所有相关特性，这样你在前ES6浏览器中也可以使用原生<span class="s1">Promise</span>。									
这样的适配版之一是NativePromise Only（`http://github.com/getify/native-promise-only`），是我写的。									
									
### 3.7.1 new <span class="s1">Promise</span>(..)构造器
有启示性的构造器<span class="s1">Promise</span>(..)									
	* 必须和new一起使用，								
	* 并且必须提供一个函数回调。								
	这个回调是<span class="s6">同步</span>的或立即调用的。								
	* 这个函数接受两个函数回调，用以支持promise的**决议**。								
	通常我们把这两个函数称为resolve(..)和reject(..)：	
  ```javascript							
	var p = new Promise(function(resolve, reject){								
		// resolve(..)用于**决议**/完成这个promise							
		// reject(..)用于拒绝这个promise							
	});							
  ```	
		* reject(..)就是<span class="s2">拒绝</span>这个promise；							
		* 但resolve(..)既可能<span class="s6">完成</span>promise，也可能<span class="s2">拒绝</span>，要根据传入参数而定。							
			* 如果传给resolve(..)的是一个非<span class="s1">Promise</span>、非<span class="s5">thenable</span>的立即值，这个promise就会用这个值<span class="s6">完成</span>。						
			* 但是，如果传给resolve(..)的是一个真正的<span class="s1">Promise</span>或<span class="s5">thenable</span>值，这个值就会被递归展开，并且（要构造的）promise将取用其最终**决议**值或状态。						
### 3.7.2 <span class="s1"><span class="s1">Promise</span></span>.resolve(..)和<span class="s1">Promise</span>.reject(..)	
	* 创建一个已被<span class="s2">拒绝</span>的<span class="s1">Promise</span>的快捷方式是使用<span class="s1">Promise</span>.reject(..)，所以以下两个promise是等价的：	
  ```javascript							
	var p1 = new Promise(function(resolve, reject){								
		reject("Oops");							
	});								
	var p2 = Promise.reject("Oops");	
  ```							
	* <span class="s1">Promise</span>.resolve(..)常用于创建一个已<span class="s6">完成</span>的<span class="s1">Promise</span>，使用方式与<span class="s1">Promise</span>.reject(..)类似。								
		* 但是，<span class="s1">Promise</span>.resolve(..)也会展开<span class="s5">thenable</span>值（前面已多次介绍）。							
		在这种情况下，返回的<span class="s1">Promise</span>采用传入的这个<span class="s5">thenable</span>的最终**决议**值，可能是<span class="s6">完成</span>，也可能是<span class="s2">拒绝</span>：	
    ```javascript						
		var fulfilledTh = {							
			then: function(cb) { cb(42); }						
		};							
		var rejectedTh = {							
			then: function(cb, errCb){						
				errCb("Oops");					
			}						
		};							
		var p1 = Promise.resolve(fulfilledTh);							
		var p2 = Promise.resolve(rejectedTh);							
		// p1是完成的promise							
		// p2是拒绝的promise	
    ```						
		* 还要记住，如果传入的是真正的<span class="s1">Promise</span>, <span class="s1">Promise</span>.resolve(..)什么都不会做，只会直接把这个值返回。							
		所以，对你不了解属性的值调用<span class="s1">Promise</span>.resolve(..)，如果它恰好是一个真正的<span class="s1">Promise</span>，是不会有额外的开销的。							
### 3.7.3 then(..)和catch(..)
	* 每个<span class="s1">Promise</span>实例（不是<span class="s1">Promise</span> API命名空间）都有then(..)和catch(..)方法，通过这两个方法可以为这个<span class="s1">Promise</span>注册<span class="s6">完成</span>和<span class="s2">拒绝</span>处理函数。								
	<span class="s1">Promise</span>**决议**之后，立即会调用这两个处理函数之一，但不会两个都调用，而且总是<span class="s3">异步</span>调用（参见1.5节）。								
	* then(..)接受一个或两个参数：								
	如果两者中的任何一个被省略或者作为非函数值传入的话，就会替换为相应的默认回调。								
	p.then(fulfilled);								
	p.then(fulfilled, rejected);								
		* 第一个用于<span class="s6">完成</span>回调，							
		而默认<span class="s2">拒绝</span>回调则只是重新抛出（传播）其接收到的出错原因。							
		* 第二个用于<span class="s2">拒绝</span>回调。							
		默认<span class="s6">完成</span>回调只是把**消息传递**下去，							
	* 就像刚刚讨论过的一样，catch(..)只接受一个<span class="s2">拒绝</span>回调作为参数，并自动替换默认<span class="s6">完成</span>回调。换句话说，它等价于then(null, ..)：
  ```javascript								
	p.catch(rejected);  // 或者p.then(null, rejected)		
  ```						
	* then(..)和catch(..)也会创建并返回一个新的promise，								
	这个promise可以用于实现<span class="s1">Promise</span>链式流程控制。								
		* 如果<span class="s6">完成</span>或<span class="s2">拒绝</span>回调中抛出异常，返回的promise是被<span class="s2">拒绝</span>的。							
		* 如果任意一个回调返回非<span class="s1">Promise</span>、非<span class="s5">thenable</span>的立即值，这个值会被用作返回promise的<span class="s6">完成</span>值。							
		* 如果<span class="s6">完成</span>处理函数返回一个promise或<span class="s5">thenable</span>，那么这个值会被展开，并作为返回promise的**决议**值。							
### 3.7.4 <span class="s1">Promise</span>.all([ .. ])和<span class="s1">Promise</span>.race([ .. ])
ES6 <span class="s1">Promise</span> API静态辅助函数<span class="s1">Promise</span>.all([ .. ])和<span class="s1">Promise</span>.race([ .. ])都会创建一个<span class="s1">Promise</span>作为它们的返回值。这个promise的**决议**完全由传入的promise数组控制。									
	* 对<span class="s1">Promise</span>.all([ .. ])来说，只有传入的所有promise都<span class="s6">完成</span>，返回promise才能<span class="s6">完成</span>。								
	如果有任何promise被<span class="s2">拒绝</span>，返回的主promise就立即会被<span class="s2">拒绝</span>（抛弃任何其他promise的结果）。								
	如果<span class="s6">完成</span>的话，你会得到一个数组，其中包含传入的所有promise的<span class="s6">完成</span>值。								
	对于<span class="s2">拒绝</span>的情况，你只会得到第一个<span class="s2">拒绝</span>promise的<span class="s2">拒绝</span>理由值。								
	这种模式传统上被称为门：所有人都到齐了才开门。								
	* 对<span class="s1">Promise</span>.race([ .. ])来说，只有第一个**决议**的promise（<span class="s6">完成</span>或<span class="s2">拒绝</span>）取胜，并且其**决议**结果成为返回promise的**决议**。这								
	种模式传统上称为门闩：第一个到达者打开门闩通过。考虑：	
  ```javascript							
	var p1 = Promise.resolve(42);								
	var p2 = Promise.resolve("Hello World");								
	var p3 = Promise.reject("Oops");								
									
	Promise.race([p1, p2, p3])								
	.then(function(msg){								
		console.log(msg);  // 42							
	});								
									
	Promise.all([p1, p2, p3])								
	.catch(function(err){								
		console.error(err);  // "Oops"							
	});								
									
	Promise.all([p1, p2])								
	.then(function(msgs){								
		console.log(msgs); // [42, "Hello World"]							
	});		
  ```						
	* 当心！若向<span class="s1">Promise</span>.all([ .. ])传入空数组，它会立即<span class="s6">完成</span>，但<span class="s1">Promise</span>. race([ .. ])会挂住，且永远不会**决议**。								
* ES6 <span class="s1">Promise</span> API非常简单直观。它至少足以处理最基本的<span class="s3">异步</span>情况，并且如果要重新整理，把代码从回调地狱解救出来的话，它也是一个很好的起点。									
但是，应用常常会有很多更复杂的<span class="s3">异步</span>情况需要实现，而<span class="s1">Promise</span>本身对此在处理上具有局限性。									
下一节会深入探讨这些局限，理解<span class="s1">Promise</span>库出现的动机。									
									
									
## 3.8 <span class="s1">Promise</span>局限性	
这一节讨论的许多细节本章之前都已经有所提及，不过我们还是一定要专门总结这些局限性才行。									
### 1. 3.8.1 顺序错误处理	
本章前面已经详细介绍了适合<span class="s1">Promise</span>的错误处理。									
* <span class="s1">Promise</span>的设计局限性（具体来说，就是它们链接的方式）造成了一个让人很容易中招的陷阱，即<span class="s1">Promise</span>链中的错误很容易被无意中默默忽略掉。									
* 关于<span class="s1">Promise</span>错误，还有其他需要考虑的地方。									
由于一个<span class="s1">Promise</span>链仅仅是连接到一起的成员<span class="s1">Promise</span>，没有把整个链标识为一个个体的实体，这意味着没有外部方法可以用于观察可能发生的错误。									
如果构建了一个没有错误处理函数的<span class="s1">Promise</span>链，链中任何地方的任何错误都会在链中一直传播下去，直到被查看（通过在某个步骤注册<span class="s2">拒绝</span>处理函数）。									
在这个特定的例子中，只要有一个指向链中最后一个promise的引用就足够了（下面代码中的p），因为你可以在那里注册<span class="s2">拒绝</span>处理函数，而且这个处理函数能够得到所有传播过来的错误的通知：		
```javascript							
// foo(..), STEP2(..)以及STEP3(..)都是支持promise的工具									
var p = foo(42)									
.then( STEP2 )									
.then( STEP3 );		
```							
	* 虽然这里可能有点鬼祟、令人迷惑，但是这里的p并不指向链中的第一个promise（调用foo(42)产生的那一个），而是指向最后一个promise，即来自调用then(STEP3)的那一个。								
	* 还有，这个<span class="s1">Promise</span>链中的任何一个步骤都没有显式地处理自身错误。这意味着你可以在p上注册一个<span class="s2">拒绝</span>错误处理函数，对于链中任何位置出现的任何错误，这个处理函数都会得到通知：								
	p.catch( handleErrors );								
	但是，如果链中的任何一个步骤事实上进行了自身的错误处理（可能以隐藏或抽象的不可见的方式），那你的handleErrors(..)就不会得到通知。								
	这可能是你想要的——毕竟这是一个“已处理的<span class="s2">拒绝</span>”——但也可能并不是。								
	完全不能得到（对任何“已经处理”的<span class="s2">拒绝</span>错误的）错误通知也是一个缺陷，它限制了某些用例的功能。								
	* 基本上，这等同于try..catch存在的局限：try..catch可能捕获一个异常并简单地吞掉它。								
	所以这并不是<span class="s1">Promise</span>独有的局限性，但可能是我们希望绕过的陷阱。								
		* 遗憾的是，很多时候并没有为<span class="s1">Promise</span>链序列的中间步骤保留的引用。							
		因此，没有这样的引用，你就无法关联错误处理函数来可靠地检查错误。							
									
### 2. 3.8.2 单一值
* 根据定义，<span class="s1">Promise</span>只能有一个<span class="s6">完成</span>值或一个<span class="s2">拒绝</span>理由。在简单的例子中，这不是什么问题，但是在更复杂的场景中，你可能就会发现这是一种局限了。									
	* 一般的建议是构造一个值封装（比如一个对象或数组）来保持这样的多个信息。								
	这个解决方案可以起作用，但要在<span class="s1">Promise</span>链中的每一步都进行封装和解封，就十分丑陋和笨重了。		

#### 1. 分裂值	
有时候你可以把这一点当作提示你可以/应该把问题分解为两个或更多<span class="s1">Promise</span>的信号。									
* 设想你有一个工具foo(..)，它可以<span class="s3">异步</span>产生两个值（x和y）：		

```javascript							
function getY(x){									
	return new Promise(function(resolve, reject){								
		setTimeout(function(){							
			resolve((3*x)-1);						
		}, 100);							
	});								
}									
									
function foo(bar, baz){									
	var x = bar * baz;								
	return getY(x)								
	.then(function(y){								
		// 把两个值封装到容器中							
		return [x, y];							
	});								
}									
									
foo(10, 20)									
.then(function(msgs){									
	var x = msgs[0];								
	var y = msgs[1];								
	console.log(x, y);  // 200599								
});					
```		

* 首先，我们重新组织一下foo(..)返回的内容，这样就不再需要把x和y封装到一个数组值中以通过promise传输。取而代之的是，我们可以把每个值封装到它自己的promise：		
```javascript							
function foo(bar, baz){									
	var x = bar * baz;								
	// 返回两个promise								
	return [								
		Promise.resolve(x),							
		getY(x)							
	];								
}									
Promise.all(									
	foo(10, 20)								
)									
.then(function(msgs){									
	var x = msgs[0];								
	var y = msgs[1];								
	console.log(x, y); 								
});				
```					
从语法的角度来说，这算不上是一个改进。									
	* 一个promise数组真的要优于传递给单个promise的一个值数组吗？								
	* 但是，这种方法更符合<span class="s1">Promise</span>的设计理念。								
	如果以后需要重构代码把对x和y的计算分开，这种方法就简单得多。								
	由调用代码来决定如何安排这两个promise，而不是把这种细节放在foo(..)内部抽象，这样更整洁也更灵活。								
	这里使用了<span class="s1">Promise</span>.all([ .. ])，当然，这并不是唯一的选择。								
									
#### 2. 展开/传递参数	
* var x = .．和var y = .．赋值操作仍然是麻烦的开销。我们可以在辅助工具中采用某种函数技巧（感谢Reginald Braithwaite，推特：@raganwald）：							
```javascript		
function spread(fn){									
	return Function.apply.bind(fn, null);								
}									
Promise.all(									
	foo(10, 20)								
)									
.then(									
	spread(function(x, y){								
		console.log(x, y);  // 200599							
	})				
```				
* 这样会好一点！当然，你可以把这个函数戏法在线化，以避免额外的辅助工具：		
```javascript							
Promise.all(									
	foo(10, 20)								
)									
.then(Function.apply.bind(									
	function(x, y){								
		console.log(x, y); // 200599							
	},								
	null								
));	
```								
* 这些技巧可能很灵巧，但ES6给出了一个更好的答案：解构。数组解构赋值形式看起来是这样的：
```javascript									
Promise.all(									
	foo(10, 20)								
)									
.then(function(msgs){									
	var [x, y] = msgs;								
	console.log(x, y);    // 200599								
});			
```						
* 不过最好的是，ES6提供了数组参数解构形式：	
```javascript								
Promise.all(									
	foo(10, 20)								
)									
.then(function([x, y]){									
	console.log(x, y);    // 200599								
});					
```				
现在，我们符合了“每个<span class="s1">Promise</span>一个值”的理念，并且又将重复样板代码量保持在了最小！									
关于ES6解构形式的更多信息，请参考本系列的《你不知道的JavaScript（下卷）》的“ES6 & Beyond”部分。									
									
### 3. 3.8.3 单**决议**
* <span class="s1">Promise</span>最本质的一个特征是：<span class="s1">Promise</span>只能被**决议**一次（<span class="s6">完成</span>或<span class="s2">拒绝</span>）。									
在许多<span class="s3">异步</span>情况中，你只会获取一个值一次，所以这可以工作良好。									
* 但是，还有很多<span class="s3">异步</span>的情况适合另一种模式——一种类似于事件和/或数据流的模式。									
在表面上，目前还不清楚<span class="s1">Promise</span>能不能很好用于这样的用例，如果不是完全不可用的话。									
如果不在<span class="s1">Promise</span>之上构建显著的抽象，<span class="s1">Promise</span>肯定完全无法支持多值**决议**处理。									
* 设想这样一个场景：你可能要启动一系列<span class="s3">异步</span>步骤以响应某种可能多次发生的激励（就像是事件），比如按钮点击。									
这样可能不会按照你的期望工作：									
```javascript
// click(..)把“click”事件绑定到一个DOM元素									
// request(..)是前面定义的支持Promise的Ajax									
var p = new Promise(function(resolve, reject){									
	click("#mybtn", resolve);								
});									
p.then(function(evt){									
	var btnID = evt.currentTarget.id;								
	return request("http://some.url.1/?id=" + btnID);								
})									
.then(function(text){									
	console.log(text);								
})l				
```					
	* 只有在你的应用只需要响应按钮点击一次的情况下，这种方式才能工作。								
	* 如果这个按钮被点击了第二次的话，promise p已经**决议**，因此第二个resolve(..)调用就会被忽略。								
* 因此，你可能需要转化这个范例，为每个事件的发生创建一整个新的<span class="s1">Promise</span>链：	
```javascript								
click("#mybtn", function(evt){									
	var btnID = evt.currentTarget.id;								
	request("http://some.url.1/?id=" + btnID)								
	.then(function(text){								
		console.log(text);							
	});								
});					
```				
	* 这种方法可以工作，因为针对这个按钮上的每个"click"事件都会启动一整个新的<span class="s1">Promise</span>序列。								
	* 由于需要在事件处理函数中定义整个<span class="s1">Promise</span>链，这很丑陋。								
	除此之外，这个设计在某种程度上破坏了关注点与功能分离（SoC）的思想。你很可能想要把事件处理函数的定义和对事件的响应（那个<span class="s1">Promise</span>链）的定义放在代码中的不同位置。如果没有辅助机制的话，在这种模式下很难这样实现。								
* 另外一种清晰展示这种局限性的方法是：如果能够构建某种“可观测量”（observable），可以将一个<span class="s1">Promise</span>链对应到这个“可观测量”就好了。									
有一些库已经创建了这样的抽象（比如RxJS,`http://rxjs.codeplex.com`），但是这种抽象看起来非常笨重，以至于你甚至已经看不到任何<span class="s1">Promise</span>本身的特性。这样厚重的抽象带来了一些需要考虑的重要问题，比如这些机制（无<span class="s1">Promise</span>）是否像<span class="s1">Promise</span>本身设计的那样可以信任。附录B会再次讨论这种“可观测量”模式。									
									
### 4. 3.8.4 惯性
* 要在你自己的代码中开始使用<span class="s1">Promise</span>的话，一个具体的障碍是，现存的所有代码都还不理解<span class="s1">Promise</span>。									
如果你已经有大量的基于回调的代码，那么保持编码风格不变要简单得多。									
* “运动状态（使用回调的）的代码库会一直保持运动状态（使用回调的），直到受到一位聪明的、理解<span class="s1">Promise</span>的开发者的作用。”									
* <span class="s1">Promise</span>提供了一种不同的范式，因此，编码方式的改变程度从某处的个别差异到某种情况下的截然不同都有可能。									
你需要刻意的改变，因为<span class="s1">Promise</span>不会从目前的编码方式中自然而然地衍生出来。									
* 考虑如下的类似基于回调的场景：				
```javascript					
function foo(x, y, cb){									
	ajax(								
		http://some.url.1/?x= + x + "&y=" + y, 							
		cb							
	);								
}									
foo(11, 31, function(err, text){									
	if(err){								
		console.error(err);							
	}								
	else {								
		console.log(text);							
	}								
});		
```							
	* 能够很快明显看出要把这段基于回调的代码转化为基于<span class="s1">Promise</span>的代码应该从哪些步骤开始吗？								
	这要视你的经验而定。实践越多，越会觉得得心应手。								
	但可以确定的是，<span class="s1">Promise</span>并没有明确表示要如何实现转化。								
	没有放之四海皆准的答案，责任还是在你的身上。								
	* 如前所述，我们绝对需要一个支持<span class="s1">Promise</span>而不是基于回调的Ajax工具，可以称之为request(..)。								
	你可以实现自己的版本，就像我们所做的一样。								
	但是，如果不得不为每个基于回调的工具手工定义支持<span class="s1">Promise</span>的封装，这样的开销会让你不太可能选择支持<span class="s1">Promise</span>的重构。		

		* <span class="s1">Promise</span>没有为这个局限性直接提供答案。							
		* 多数<span class="s1">Promise</span>库确实提供辅助工具，							
		* 但即使没有库，也可以考虑如下的辅助工具：	
    ```javascript						
		// polyfill安全的guard检查							
		if(!Promise.wrap){							
			Promise.wrap = function(fn){						
				return function(){					
					var args = [].slice.call(arguments);				
					return new Promise(function(resolve, reject){				
						fn.apply(			
							null, 		
							args.concat(function(err, v){		
								if(err) {	
									reject(err);
								}	
								else {	
									resolve(v);
								}	
							})		
						);			
					});				
				};					
			};						
		}				
    ```			
			* 好吧，这不只是一个简单的小工具。然而，尽管它看起来有点令人生畏，但是实际上并不像你想的那么糟糕。						
				* 它接受一个函数，这个函数需要一个error-first风格的回调作为第一个参数，					
				* 并返回一个新的函数。返回的函数自动创建一个<span class="s1">Promise</span>并返回，并替换回调，连接到<span class="s1">Promise</span><span class="s6">完成</span>或<span class="s2">拒绝</span>。					
			* 与其花费太多时间解释这个<span class="s1">Promise</span>.wrap(..)辅助工具的工作原理，还不如直接看看其使用方式：	
      ```javascript					
			var request = Promise.wrap(ajax);						
			request("http://some.url.1/")						
			.then(..)						
			..				
      ```		
			哇，非常简单！						
				* <span class="s1">Promise</span>.wrap(..)并不产出<span class="s1">Promise</span>。它产出的是一个将产生<span class="s1">Promise</span>的函数。					
				在某种意义上，产生<span class="s1">Promise</span>的函数可以看作是一个<span class="s1">Promise</span>工厂。我提议将其命名为“promisory”（“<span class="s1"><span class="s1">Promise</span></span>”+“factory”）。					
					* promisory并不是编造的。它是一个真实的单词，意思是包含或传输一个promise。这正是这些函数所做的，所以这个术语与其意义匹配得很完美。				
				* 把需要回调的函数封装为支持<span class="s1">Promise</span>的函数，这个动作有时被称为“提升”或“<span class="s1">Promise</span>工厂化”。					
				但是，对于得到的结果函数来说，除了“被提升函数”似乎就没有什么标准术语可称呼了。所以我更喜欢“promisory”这个词，我认为它的描述更准确。					
				* 于是，<span class="s1"><span class="s1">Promise</span></span>.wrap(ajax)产生了一个ajax(..) promisory，我们称之为request(..)					
				这个promisory为Ajax响应生成<span class="s1">Promise</span>。					
				* 如果所有函数都已经是promisory，我们就不需要自己构造了，所以这个额外的步骤有点可惜。					
				但至少这个封装模式（通常）是重复的，所以我们可以像前面展示的那样把它放入<span class="s1">Promise</span>.wrap(..)辅助工具，以帮助我们的promise编码。					
									
* 回到前面的例子，我们需要为ajax(..)和foo(..)都构造一个promisory：	

```javascript							
// 为ajax(..)构造一个promisory									
var request = Promise.wrap(ajax);									
									
// 重构foo(..)， 但使其外部成为基于外部回调的，									
// 与目前代码的其他部分保持通用									
// ——只在内部使用request(..)的promise									
function foo(x, y, cb){									
	request( "http://some.url.1/?x=" + x + "&y=" + y)								
	.then(								
		function fulfilled(text){							
			cb(null, text);						
		},							
		cb							
	);								
}									
// 现在，为了这段代码的目的，为foo(..)构造一个promisory									
var betterFoo = Promise.wrap(foo);									
									
// 并使用这个promisory									
betterFoo(11, 31)									
.then(									
	function fulfilled(text){								
		console.log(text);							
	},								
	function rejected(err){								
		console.error(err);							
	}								
);						
```			

* 当然，尽管我们在重构foo(..)以使用新的request(..) promisory，但是也可以使foo(..)本身成为一个promisory，而不是保持基于回调的形式并需要构建和使用后续的betterFoo(..) promisory。									
这个决策就取决于foo(..)是否需要保持与代码库中其他部分兼容的基于回调的形式。									
现在foo(..)也是一个promisory，因为它委托了request(..) promisory				
```javascript					
function foo(x, y){									
	return request("http://some.url.1/?x=" + x + "&y=" + y);								
}									
foo(11, 31)									
.then(..)									
..							
```		
* 尽管原生ES6 <span class="s1">Promise</span>并没有提供辅助函数用于这样的promisory封装，但多数库都提供了这样的支持，或者你也可以构建自己的辅助函数。									
不管采用何种方式，解决<span class="s1">Promise</span>这个特定的限制都不需要太多代价（可对比回调地狱给我们带来的痛苦！）。									
									
### 5. 3.8.5 无法取消的<span class="s1">Promise</span>
* 一旦创建了一个<span class="s1">Promise</span>并为其注册了<span class="s6">完成</span>和/或<span class="s2">拒绝</span>处理函数，如果出现某种情况使得这个任务悬而未决的话，你也没有办法从外部停止它的进程。									
	* 很多<span class="s1">Promise</span>抽象库提供了工具来取消<span class="s1">Promise</span>，但这个思路很可怕！								
	* 很多开发者希望<span class="s1">Promise</span>的原生设计就具有外部取消功能，但问题是，这可能会使<span class="s1">Promise</span>的一个消费者或观察者影响其他消费者查看这个<span class="s1">Promise</span>。								
		* 这违背了未来值的可信任性（外部不变性），							
		* 但更坏的是，这是“远隔作用”（action at a distance）反模式的体现（`http://en.wikipedia.org/wiki/Action_at_a_distance_%28computer_programming%29`）。							
		不管看起来如何有用，这实际上会导致你重陷与使用回调同样的噩梦。							
* 考虑前面的<span class="s1">Promise</span>超时场景：					
  ```javascript				
	var p = foo(42);								
	Promise.race([								
		p,							
		timeoutPromise(3000)							
	])								
	.then(								
		doSomething,							
		handleError							
	);								
	p.then(function(){								
		// 即使在超时的情况下也会发生：（							
	});		
  ```						
	这个“超时”相对于promise p是外部的，所以p本身还会继续运行，这一点可能并不是我们所期望的。								
	一种选择是侵入式地定义你自己的**决议**回调：		
  ```javascript						
	var OK = true;								
	var p = foo(42);								
	Promise.race([								
		p, timeoutPromise(3000)							
		.catch(function(err){							
			OK = false;						
			throw err;						
		})							
	])								
	.then(								
		doSomething,							
		handleError							
	);								
									
	p.then(function(){								
		if(OK){							
			// 只在没有超时情况下才会发生：）						
		}							
	});		
  ```						
		* 这很丑陋。它可以工作，但是离理想实现还差很远。一般来说，应避免这样的情况。							
		* 但如果没法避免的话，这个解决方案的丑陋应该是一个线索，它提示取消这个功能属于<span class="s1">Promise</span>之上更高级的抽象。							
		我建议你应查看<span class="s1">Promise</span>抽象库以获得帮助，而不是hack自己的版本。							
			* 我的<span class="s1">Promise</span>抽象库asynquence提供了这样一个抽象，还有一个为序列提供的abort()功能，这些内容都会在本部分的附录A中讨论。						
* 单独的<span class="s1">Promise</span>不应该可取消，但是取消一个序列是合理的，因为你不会像对待<span class="s1">Promise</span>那样把序列作为一个单独的不变值来传送。									
	* 单独的一个<span class="s1">Promise</span>并不是一个真正的流程控制机制（至少不是很有意义），这正是取消所涉及的层次（流程控制）。这就是为什么<span class="s1">Promise</span>取消总是让人感觉很别扭。								
	* 相比之下，集合在一起的<span class="s1">Promise</span>构成的链，我喜欢称之为一个“序列”，就是一个流程控制的表达，因此将取消定义在这个抽象层次上是合适的。								
									
### 6. 3.8.6 <span class="s1">Promise</span>性能
* 这个特定的局限性既简单又复杂。									
	* 把基本的基于回调的<span class="s3">异步</span>任务链与<span class="s1">Promise</span>链中需要移动的部分数量进行比较。								
	很显然，<span class="s1">Promise</span>进行的动作要多一些，这自然意味着它也会稍慢一些。								
	请回想<span class="s1">Promise</span>提供的信任保障列表，再与你要在回调之上建立同样的保护自建的解决方案来比较一下。								
	* 更多的工作，更多的保护。这些意味着<span class="s1">Promise</span>与不可信任的裸回调相比会更慢一些。这是显而易见的，也很容易理解。								
* 但会慢多少呢？呃，实际上，要精确回答这个问题极其困难。									
坦白地说，这有点像是拿苹果和桔子相比，所以这可能就是一个错误的问题。									
实际上，应该比较的是提供了同样保护的手工自建回调系统是否能够快于<span class="s1">Promise</span>实现。									
* 如果说<span class="s1">Promise</span>确实有一个真正的性能局限的话，那就是它们没有真正提供可信任性保护支持的列表以供选择（你总是得到全部）。									
* 虽然如此，如果我们承认<span class="s1">Promise</span>通常要比其非<span class="s1">Promise</span>、非可信任回调的等价系统稍微慢一点（假定有些情况下你认为可以接受可信任性的缺乏），这是否意味着应该完全避免<span class="s1">Promise</span>，就好像你整个应用的唯一驱动力就是必须采用尽可能快的代码呢？									
	* 合理性检查：如果你的代码有合理的理由这样要求，那么JavaScript是否真的是实现这样任务的正确语言呢？								
	我们可以优化JavaScript，使其高性能运行应用（参见第5章和第6章）。								
	但是，耿耿于<span class="s1">Promise</span>微小的性能损失而无视它提供的所有优点，真的合适吗？								
	* 另外一个微妙的问题是：<span class="s1">Promise</span>使所有一切都成为<span class="s3">异步</span>的了，即有一些立即（<span class="s6">同步</span>）<span class="s6">完成</span>的步骤仍然会延迟到任务的下一步（参见第1章）。								
	这意味着一个<span class="s1">Promise</span>任务序列可能比完全通过回调连接的同样的任务序列运行得稍慢一点。								
	当然，这里的问题是：本章介绍的<span class="s1">Promise</span>的这些优点是否值得付出这些微小的性能损失。								
	* 我的观点是：几乎所有那些你可能认为<span class="s1">Promise</span>性能会慢到需要担心的情况，实际上都是通过绕开<span class="s1">Promise</span>可信任性和可组合性优化掉了它们带来的好处的反模式。								
		* 取而代之的是，在默认情况下，你应该在代码中使用它们，然后对你应用的热路径进行性能分析。<span class="s1">Promise</span>真的是性能瓶颈呢，还是只有理论上的性能下降呢？只有这样，具备了真实有效的性能测评（参见第6章），在这些识别出来的关键区域分离出<span class="s1">Promise</span>才是审慎负责的。							
		* <span class="s1">Promise</span>稍慢一些，但是作为交换，你得到的是大量内建的可信任性、对Zalgo的避免以及可组合性。可能局限性实际上并不是它们的真实表现，而是你缺少发现其好处的眼光呢？							                    


# <span class="s4">生成器</span>
* 在第2章里，我们确定了用回调表达<span class="s3">异步</span>控制流程的两个关键缺陷：                              
  * 基于回调的<span class="s3">异步</span>不符合大脑对任务步骤的规划方式；                           
  * 由于控制反转，回调并不是可信任或可组合的。在第3章里，我们详细介绍了<span class="s1">Promise</span>如何把回调的控制反转反转回来，恢复了可信任性/可组合性。现在我们把注意力转移到一种顺序、看似<span class="s6">同步</span>的<span class="s3">异步</span>流程控制表达风格。使这种风格成为可能的“魔法”就是ES6<span class="s4">生成器</span>（generator）。                           
* 在第3章里，我们详细介绍了<span class="s1">Promise</span>如何把回调的控制反转反转回来，恢复了可信任性/可组合性。                              
* 现在我们把注意力转移到一种顺序、看似<span class="s6">同步</span>的<span class="s3">异步</span>流程控制表达风格。使这种风格成为可能的“魔法”就是ES6<span class="s4">生成器</span>（generator）。                              
                              
## 4.1 打破完整运行
* 在第1章中，我们解释了JavaScript开发者在代码中几乎普遍依赖的一个假定：一个函数一旦开始执行，就会运行到结束，期间不会有其他代码能够打断它并插入其间。                             
* 可能看起来似乎有点奇怪，不过ES6引入了一个新的函数类型，它并不符合这种运行到结束的特性。这类新的函数被称为<span class="s4">生成器</span>。                              
  * 考虑如下这个例子来了解其含义： 
  ```javascript                          
  var x = 1;                            
  function foo(){                           
    x++;                          
    bar();   // <--这一行是什么作用？                          
    console.log("x:", x);                         
  }                           
  function bar(){                           
    x++;                          
  }                           
  foo();     // x:3     
  ```                            
    * 在这个例子中，我们确信bar()会在x++和console.log(x)之间运行。但是，如果bar()并不在那里会怎样呢？显然结果就会是2，而不是3。                         
    * 现在动脑筋想一下。如果bar()并不在那儿，但出于某种原因它仍然可以在x++和console.log(x)语句之间运行，这又会怎样呢？这如何才会成为可能呢？                          
      * 如果是在抢占式多线程语言中，从本质上说，这是可能发生的，bar()可以在两个语句之间打断并运行。 
      * 但JavaScript并不是抢占式的，（目前）也不是多线程的。                       
      然而，如果foo()自身可以通过某种形式在代码的这个位置指示暂停的话，那就仍然可以以一种合作式的方式实现这样的中断（<span class="s5">并发</span>）。                        
        * 这里我之所以使用了“合作式的”一词，不只是因为这与经典<span class="s5">并发</span>术语之间的关联（参见第1章）；                      
        还因为你将会在下一段代码中看到的，ES6代码中指示暂停点的语法是<span class="s2">yield</span>，这也礼貌地表达了一种合作式的控制放弃。                     
        * 下面是实现这样的合作式<span class="s5">并发</span>的ES6代码：
        ```javascript                      
        var x = 1;                      
        function *foo(){                      
          x++;                    
          yield: // 暂停！                   
          console.log("x:", x);                   
        }                     
        function bar(){                     
          x++;                    
        }       
        ```              
          * 很可能你看到的其他多数JavaScript文档和代码中的<span class="s4">生成器</span>声明格式都是function＊ foo() { .. }，                    
          * 而不是我这里使用的function ＊foo() { .. }：唯一区别是＊位置的风格不同。                    
          这两种形式在功能和语法上都是等同的，                    
          * 还有一种是function＊foo(){ .. }（没有空格）也一样。                   
          两种风格，各有优缺，但总体上我比较喜欢function ＊foo.．的形式，                    
          因为这样在使用＊foo()来引用<span class="s4">生成器</span>的时候就会比较一致。                   
          如果只用foo()的形式，你就不会清楚知道我指的是<span class="s4">生成器</span>还是常规函数。                   
          这完全是一个风格偏好问题。                   
        * 现在，我们要如何运行前面的代码片段，使得bar()在＊foo()内部的<span class="s2">yield</span>处执行呢？  
        ```javascript                   
        // 构造一个迭代器it来控制这个生成器                      
        var it = foo();                     
        // 这里启动foo()!                     
        it.netx();                      
        x;    // 2                      
        bar();                      
        x;   // 3                     
        it.next(); // x:3    
        ```                 
          * (1) it = foo()运算并没有执行<span class="s4">生成器</span>＊foo()，而只是构造了一个<span class="s5">迭代器</span>（iterator），这个<span class="s5">迭代器</span>会控制它的执行。后面会介绍<span class="s5">迭代器</span>。                   
          * (3) ＊foo()在<span class="s2">yield</span>语句处暂停，在这一点上第一个it.<span class="s3">next</span>()调用结束。                   
          此时＊foo()仍在运行并且是活跃的，但处于暂停状态。                   
          * (7) 最后的it.<span class="s3">next</span>()调用从暂停处恢复了<span class="s4">生成器</span>＊foo()的执行，并运行console.log(..)语句，这条语句使用当前x的值3。  
          * 好吧，这两段代码中有很多新知识，可能会让人迷惑，所以这里有很多东西需要学习。                    
            * 在解释ES6<span class="s4">生成器</span>的不同机制和语法之前，                  
            * 我们先来看看运行过程。                 
              1. (2) 第一个it.<span class="s3">next</span>()启动了<span class="s4">生成器</span>＊foo()，并运行了＊foo()第一行的x++。                
              2. (4) 我们查看x的值，此时为2。                
              3. (5) 我们调用bar()，它通过x++再次递增x。               
              4. (6) 我们再次查看x的值，此时为3。                
              显然，＊foo()启动了，但是没有完整运行，它在<span class="s2">yield</span>处暂停了。后面恢复了＊foo()并让它运行到结束，但这不是必需的。                
  * 因此，<span class="s4">生成器</span>就是一类特殊的函数，可以一次或多次启动和停止，并不一定非得要完成。                           
  尽管现在还不是特别清楚它的强大之处，但随着对本章后续内容的深入学习，我们会看到它将成为用于构建以<span class="s4">生成器</span>作为<span class="s3">异步</span>流程控制的代码模式的基础构件之一。   

  * 4.1.1 输入和输出                           
    1. <span class="s4">生成器</span>函数是一个特殊的函数，具有前面我们展示的新的执行模式。                         
    但是，它仍然是一个函数，这意味着它仍然有一些基本的特性没有改变。                          
    比如，它仍然可以接受参数（即输入），也能够返回值（即输出）。    
    ```javascript                      
    function *foo(x,y){                         
      return x*y;                       
    }                         
    var it = foo(6, 7);                         
    var res = it.next();                          
    res.value; // 42      
    ```                    
    我们向＊foo(..)传入实参6和7分别作为参数x和y。                          
    ＊foo(..)向调用代码返回42。                          
      * 现在我们可以看到<span class="s4">生成器</span>和普通函数在调用上的一个区别。                        
        * 显然foo(6,7)看起来很熟悉。但难以理解的是，<span class="s4">生成器</span>＊foo(..)并没有像普通函数一样实际运行。                     
        * 事实上，我们只是创建了一个<span class="s5">迭代器</span>对象，把它赋给了一个变量it，用于控制<span class="s4">生成器</span>＊foo(..)。                     
        然后调用it.<span class="s3">next</span>()，指示<span class="s4">生成器</span>＊foo(..)从当前位置开始继续运行，停在下一个<span class="s2">yield</span>处或者直到<span class="s4">生成器</span>结束。                      
        * 这个<span class="s3">next</span>(..)调用的结果是一个对象，它有一个value属性，持有从＊foo(..)返回的值（如果有的话）。                      
        换句话说，<span class="s2">yield</span>会导致<span class="s4">生成器</span>在执行过程中发送出一个值，这有点类似于中间的return。                     
      * 目前还不清楚为什么需要这个完整的间接<span class="s5">迭代器</span>对象来控制<span class="s4">生成器</span>。会清楚的，我保证。                       
                              
    2. 迭代**消息传递**                         
    除了能够接受参数并提供返回值之外，<span class="s4">生成器</span>甚至提供了更强大更引人注目的内建消息输入输出能力，通过<span class="s2">yield</span>和<span class="s3">next</span>(..)实现。  
      ```javascript
      function *foo(x){                         
        var y = x * (yield);                        
        return y;                       
      }                         
      var it = foo(6);                          
                                
      // 启动foo(..)                          
      it.next();                          
                                
      var res = it.next(7);                         
                                
      res.value;  // 42  
      ```                       
      * 首先，传入6作为参数x。                        
      * 然后调用it.<span class="s3">next</span>()，这会启动＊foo(..)。                       
      在＊foo(..)内部，开始执行语句var y = x ..，但随后就遇到了一个<span class="s2">yield</span>表达式。                       
      它就会在这一点上暂停＊foo(..)（在赋值语句中间！），并在本质上要求调用代码为<span class="s2">yield</span>表达式提供一个结果值。                       
      接下来，调用it.<span class="s3">next</span>( 7 )，这一句把值7传回作为被暂停的<span class="s2">yield</span>表达式的结果。                       
      所以，这时赋值语句实际上就是var y = 6 ＊ 7。现在，return y返回值42作为调用it.<span class="s3">next</span>( 7 )的结果。                        
      * 注意，这里有一点非常重要，但即使对于有经验的JavaScript开发者也很有迷惑性：根据你的视角不同，<span class="s2">yield</span>和<span class="s3">next</span>(..)调用有一个不匹配。一般来说，需要的<span class="s3">next</span>(..)调用要比<span class="s2">yield</span>语句多一个，前面的代码片段有一个<span class="s2">yield</span>和两个<span class="s3">next</span>(..)调用。                        
      为什么会有这个不匹配？                       
        * 因为第一个<span class="s3">next</span>(..)总是启动一个<span class="s4">生成器</span>，并运行到第一个<span class="s2">yield</span>处。                     
        * 不过，是第二个<span class="s3">next</span>(..)调用完成第一个被暂停的<span class="s2">yield</span>表达式，第三个<span class="s3">next</span>(..)调用完成第二个<span class="s2">yield</span>，以此类推。                      
                              
    3. 两个问题的故事——双向**消息传递**系统                          
    实际上，你首先考虑的是哪一部分代码将会影响这个不匹配是否被察觉到。                         
      * 只考虑<span class="s4">生成器</span>代码：                        
      ```javascript 
      var y = x * (yield);                          
      return y;                
      ```         
        * 第一个<span class="s2">yield</span>基本上是提出了一个问题：“这里我应该插入什么值？”                       
        谁来回答这个问题呢？                        
          * 第一个<span class="s3">next</span>()已经运行，使得<span class="s4">生成器</span>启动并运行到此处，所以显然它无法回答这个问题。                      
          * 因此必须由第二个<span class="s3">next</span>(..)调用回答第一个<span class="s2">yield</span>提出的这个问题。                      
          看到不匹配了吗——第二个对第一个？                     
                                
      * 把视角转化一下：不从<span class="s4">生成器</span>的视角看这个问题，而是从<span class="s5">迭代器</span>的角度。                          
      为了恰当阐述这个视角，我们还需要解释一下：消息是双向传递的——<span class="s2">yield</span>.．作为一个表达式可以发出消息响应<span class="s3">next</span>(..)调用，<span class="s3">next</span>(..)也可以向暂停的<span class="s2">yield</span>表达式发送值。                         
      考虑下面这段稍稍调整过的代码：  
        ```javascript                        
        function *foo(x){                         
          var y = x * (yield "Hello");   // <--- yield一个值!                        
          return y;                       
        }                         
        var it = foo(6);                          
                                  
        var res = it.next();   // 第一个next()，并不传入任何东西                          
        res.value;  // "Hello"                          
        res = it. next(7); // 向等待的yield传入7                          
        res.value;  // 42   
        ```                      
        * <span class="s2">yield</span> .．和next(..)这一对组合起来，在<span class="s4">生成器</span>的执行过程中构成了一个双向**消息传递**系统。                       
        * 那么只看下面这一段<span class="s5">迭代器</span>代码：  
        ```javascript                     
        var res = it.next();   // 第一个next()，并不传入任何东西                        
        res.value;  // "Hello"                        
        res = it. next(7); // 向等待的yield传入7                        
        res.value;  // 42               
        ```        
        我们并没有向第一个<span class="s3">next</span>()调用发送值，这是有意为之。                        
        只有暂停的<span class="s2">yield</span>才能接受这样一个通过<span class="s3">next</span>(..)传递的值，而在<span class="s4">生成器</span>的起始处我们调用第一个<span class="s3">next</span>()时，还没有暂停的<span class="s2">yield</span>来接受这样一个值。                       
        规范和所有兼容浏览器都会默默丢弃传递给第一个<span class="s3">next</span>()的任何东西。                        
        传值过去仍然不是一个好思路，因为你创建了沉默的无效代码，这会让人迷惑。                       
        因此，启动<span class="s4">生成器</span>时一定要用不带参数的<span class="s3">next</span>()。                       
          * 第一个<span class="s3">next</span>()调用（没有参数的）基本上就是在提出一个问题：“<span class="s4">生成器</span>＊foo(..)要给我的下一个值是什么”。                      
          谁来回答这个问题呢？第一个<span class="s2">yield</span> "hello"表达式。                      
          看见了吗？这里没有不匹配。                     
      * 根据你认为提出问题的是谁，<span class="s2">yield</span>和<span class="s3">next</span>(..)调用之间要么有不匹配，要么没有。                         
      * 但是，稍等！与<span class="s2">yield</span>语句的数量相比，还是多出了一个额外的<span class="s3">next</span>()。所以，最后一个it.<span class="s3">next</span>(7)调用再次提出了这样的问题：<span class="s4">生成器</span>将要产生的下一个值是什么。                         
      但是，再没有<span class="s2">yield</span>语句来回答这个问题了，是不是？那么谁来回答呢？                          
      return语句回答这个问题！                         
        * 如果你的<span class="s4">生成器</span>中没有return的话——在<span class="s4">生成器</span>中和在普通函数中一样，return当然不是必需的——总有一个假定的/隐式的return;（也就是return undefined;），它会在默认情况下回答最后的it.<span class="s3">next</span>(7)调用提出的问题。                        
      * 这样的提问和回答是非常强大的：通过<span class="s2">yield</span>和<span class="s3">next</span>(..)建立的双向**消息传递**。                         
      但目前还不清楚这些机制是如何与<span class="s3">异步</span>流程控制联系到一起的。会清楚的！                         
                                
  * 4.1.2 多个<span class="s5">迭代器</span>                           
  从语法使用的方面来看，通过一个<span class="s5">迭代器</span>控制<span class="s4">生成器</span>的时候，似乎是在控制声明的<span class="s4">生成器</span>函数本身。                            
    * 但有一个细微之处很容易忽略：每次构建一个<span class="s5">迭代器</span>，实际上就隐式构建了<span class="s4">生成器</span>的一个实例，通过这个<span class="s5">迭代器</span>来控制的是这个<span class="s4">生成器</span>实例。                            
    * 同一个<span class="s4">生成器</span>的多个实例可以同时运行，它们甚至可以彼此交互：     
      ```javascript                        
      function *foo(){                            
        var x = yield 2;                          
        z++;                          
        var y = yield(x * z);                         
        console.log(x, y, z);                         
      }                           
                                  
      var z = 1;                            
                                  
      var it1 = foo();                            
      var it2 = foo();                            
                                  
      var val1 = it1.next().value;   // 2 <-- yield 2                           
      var val2 = it2.next().value;   // 2 <-- yield 2                           
                                  
      var1 = it1.next(val2 * 10).value;   // 40. <-- x:20, z:2                            
      val2 = it2.next(val1 * 5).value;     // 600 <-- x:200, z:3                            
      it1.next(val2 / 2);  // y:300     // 203003                           
      it2.next(val1 / 4);  // y:10.      // 200 103   
      ```                        
      * 同一个<span class="s4">生成器</span>的多个实例<span class="s5">并发</span>运行的最常用处并不是这样的交互，而是<span class="s4">生成器</span>在没有输入的情况下，可能从某个独立连接的资源产生自己的值。                         
      下一节中我们会详细介绍值产生。                         
      * 我们简单梳理一下执行流程。                         
        1. ＊foo()的两个实例同时启动，两个<span class="s3">next</span>()分别从<span class="s2">yield</span> 2语句得到值2。                        
        2. val2 ＊ 10也就是2 ＊ 10，发送到第一个<span class="s4">生成器</span>实例it1，因此x得到值20。                        
        z从1增加到2，然后20 ＊ 2通过<span class="s2">yield</span>发出，将val1设置为40。                       
        3. val1 ＊ 5也就是40 ＊ 5，发送到第二个<span class="s4">生成器</span>实例it2，因此x得到值200。                        
        z再次从2递增到3，然后200 ＊ 3通过<span class="s2">yield</span>发出，将val2设置为600。                       
        4. val2 / 2也就是600 / 2，发送到第一个<span class="s4">生成器</span>实例it1，因此y得到值300，然后打印出x y z的值分别是20300 3。                        
        5. val1 / 4也就是40 / 4，发送到第二个<span class="s4">生成器</span>实例it2，因此y得到值10，然后打印出x y z的值分别为200 10 3。                       
        在脑海中运行一遍这个例子很有趣。理清楚了吗？                        
        * 交替执行                        
          * 如果是普通的JavaScript函数的话，显然，要么是foo()首先运行完毕，要么是bar()首先运行完毕，但foo()和bar()的语句不能交替执行。所以，前面的程序只有两种可能的输出。                      
          回想一下1.3节中关于完整运行的这个场景：       
            ```javascript                
            var a = 1;                      
            var b = 2;                      
            function foo(){                     
              a++;                    
              b = b * a;                    
              a = b + 3;                    
            }                     
                                  
            function bar(){                     
              b--;                    
              a = 8 + b;                    
              b = a * 2;                    
            }      
            ```               
                                
          * 但是，使用<span class="s4">生成器</span>的话，交替执行（甚至在语句当中！）显然是可能的：    
            ```javascript                    
            var a = 1;                      
            bar b = 2;                      
                                  
            function *foo(){                      
              a++;                    
              yield;                    
              b = b * a;                    
              a = (yield b) + 3;                    
            }                     
                                  
            function *bar(){                      
              b--;                    
              yield;                    
              a = (yield 8) + b;                    
              b = a * (yield 2);                    
            }   
            ```                  
          根据<span class="s5">迭代器</span>控制的＊foo()和＊bar()调用的相对顺序不同，前面的程序可能会产生多种不同的结果。                     
          换句话说，通过两个<span class="s4">生成器</span>在共享的相同变量上的迭代交替执行，我们实际上可以（以某种模拟的方式）印证第1章讨论的理论上的多线程竞态条件环境。                      
            * 首先，来构建一个名为step(..)的辅助函数，用于控制<span class="s5">迭代器</span>：   
            ```javascript                 
            function step(gen){                  
              var it = gen();                 
              var last ;                  
                                
              return function(){                  
                // 不管yield出来的是什么，下一次都把它原样传回去！               
                last = it.next(last).value;               
              };                  
            }      
            ```             
            step(..)初始化了一个<span class="s4">生成器</span>来创建<span class="s5">迭代器</span>it，                    
            然后返回一个函数，这个函数被调用的时候会将<span class="s5">迭代器</span>向前迭代一步。                   
            另外，前面的<span class="s2">yield</span>发出的值会在下一步发送回去。                   
            于是，<span class="s2">yield</span> 8就是8，而<span class="s2">yield</span> b就是b（<span class="s2">yield</span>发出时的值）。                    
            * 现在，只是为了好玩，我们来试验一下交替运行＊foo()和＊bar()代码块的效果。                   
              * 我们从乏味的基本情况开始，确保＊foo()在＊bar()之前完全结束（和第1章中做的一样）：    
                ```javascript                
                // 确保重新设置a和b                  
                a = 1;                  
                b = 2;                  
                                  
                var s1 = step(foo);                 
                var s2 = step(bar);                 
                                  
                // 首次运行*foo()                 
                s1();                 
                s1();                 
                s1();                 
                                  
                // 现在运行*bar()                 
                s2();                 
                s2();                 
                s2();                 
                s2();                 
                                  
                console.log(a, b);  // 11 22       
                ```           
              最后的结果是11和22，和第1章中的版本一样。                 
              * 现在交替执行顺序，看看a和b的值是如何改变的：   
                ```javascript              
                // 确保重新设置a和b                  
                a = 1;                  
                b = 2;                  
                                  
                var s1 = step(foo);                 
                var s2 = step(bar);                 
                                  
                s2();   // b--;                 
                s2();   // yield 8                  
                s1();   // a++;                 
                s2();   // a = 8 + b;     // yield 2                  
                s1();   // b = b * a;     // yield b                  
                s1();   // a = b + 3;                 
                s2();   // b = a * 2;          
                ```
              在告诉你结果之前，你能推断出前面的程序运行后a和b的值吗？不要作弊！ 
              ```javascript                
              console.log(a, b);   // 12   18   
              ```              
                                
            * 作为留给大家的练习，请试着重新安排s1()和s2()的调用顺序，看看还能够得到多少种结果组合。                   
            不要忘了，你总是需要3次s1()调用和4次s2()调用。回忆一下前面关于<span class="s3">next</span>()和<span class="s2">yield</span>匹配的讨论，想想为什么。                    
              * 当然，你基本不可能故意创建让人迷惑到这种程度的交替运行实际代码，因为这给理解代码带来了极大的难度。                 
              但这个练习很有趣，对于理解多个<span class="s4">生成器</span>如何在共享的作用域上<span class="s5">并发</span>运行也有指导意义，因为这个功能有很多用武之地。                 
              我们将在4.6节中更深入讨论<span class="s4">生成器</span><span class="s5">并发</span>。                  
                                
## 4.2 <span class="s4">生成器</span>产生值
在前面一节中，我们提到<span class="s4">生成器</span>的一种有趣用法是作为一种产生值的方式。                             
这并不是本章的重点，但是如果不介绍一些基础的话，就会缺乏完整性了，特别是因为这正是“<span class="s4">生成器</span>”这个名称最初的使用场景。                              
下面要偏一下题，先介绍一点<span class="s5">迭代器</span>，不过我们还会回来介绍它们与<span class="s4">生成器</span>的关系以及如何使用<span class="s4">生成器</span>来生成值。                              
### 4.2.1 生产者与<span class="s5">迭代器</span>
假定你要产生一系列值，其中每个值都与前面一个有特定的关系。                             
要实现这一点，需要一个有状态的生产者能够记住其生成的最后一个值。                              
  * 可以实现一个直接使用函数闭包的版本，类似如下：   
  ```javascript                        
  var gimmeSomething = (function(){                           
    var nextVal;                          
    return function(){                          
      if(nextVal === undefined){                        
        nextVal = 1;                      
      }                       
      else {                        
        nextVal = (3* nextVal) + 6;                     
      }                       
      return nextVal;                       
    };                          
  })();                           
                              
  gimmeSomething();   // 1                            
  gimmeSomething();   // 9                            
  gimmeSomething();   // 33                           
  gimmeSomething();   // 105  
  ```                          
    * 这里nextVal的计算逻辑已经简化了，                          
    但是从概念上说，我们希望直到下一次gimmeSomething()调用发生时才计算下一个值（即nextVal）。                          
    否则，一般来说，对更持久化或比起简单数字资源更受限的生产者来说，这可能就是资源泄漏的设计。                         
    * 生成任意数字序列并不是一个很实际的例子。                          
    但如果是想要从数据源生成记录呢？                          
    可以采用基本相同的代码。                          
  * 实际上，这个任务是一个非常通用的设计模式，通常通过<span class="s5">迭代器</span>来解决。                            
  <span class="s5">迭代器</span>是一个定义良好的接口，用于从一个生产者一步步得到一系列值。                            
  JavaScript<span class="s5">迭代器</span>的接口，与多数语言类似，就是每次想要从生产者得到下一个值的时候调用<span class="s3">next</span>()。                           
    1. 可以为我们的数字序列<span class="s4">生成器</span>实现标准的<span class="s5">迭代器</span>接口：    
      ```javascript                       
      var something = (function(){                          
        var nextVal;                        
                                
        return {                        
          // for..of循环需要                      
          [Symbol.iterator]: function(){ return this; },                      
          // 标准迭代器接口方法                      
          next: function(){                     
            if(nextVal === undefined){                    
              nextVal = 1;                  
            }                   
            else {                    
              nextVal = (3 * nextVal) + 6;                  
            }                   
            return { done: false, value: nextVal };                   
          }                     
        }                       
      })();                         
                                
      something.next().value;   // 1                          
      something.next().value;   // 9                          
      something.next().value;   // 33                         
      something.next().value;   // 105      
      ```                    
      * 我们将在4.2.2节解释为什么在这段代码中需要[<span class="s8">Symbol.iterator</span>]: .．这一部分。                       
      从语法上说，这涉及了两个ES6特性。                        
        * 首先，[ .. ]语法被称为计算属性名（参见本系列的《你不知道的JavaScript（上卷）》的“this和对象原型”部分）。                     
        这在对象术语定义中是指，指定一个表达式并用这个表达式的结果作为属性的名称。                     
        * 另外，<span class="s8">Symbol.iterator</span>是ES6预定义的特殊Symbol值之一（参见本系列的《你不知道的JavaScript（下卷）》的“ES6& Beyond”部分）。                     
      * <span class="s3">next</span>()调用返回一个对象。这个对象有两个属性：                       
        * done是一个boolean值，标识<span class="s5">迭代器</span>的完成状态；                     
        * value中放置迭代值。                      
    2. ES6还新增了一个for..of循环，这意味着可以通过原生循环语法自动迭代标准<span class="s5">迭代器</span>：    
    ```javascript                      
    for(var v of something){                          
      console.log(v);                       
                              
      // 不要死循环！                       
      if(v > 500){                        
        break;                      
      }                       
    }                         
    // 1 9 33105 321969   
    ```                      
    因为我们的<span class="s5">迭代器</span>something总是返回done:false，因此这个for..of循环将永远运行下去，这也就是为什么我们要在里面放一个break条件。                         
    <span class="s5">迭代器</span>永不结束是完全没问题的，但是也有一些情况下，<span class="s5">迭代器</span>会在有限的值集合上运行，并最终返回done:true。                         
      * for..of循环在每次迭代中自动调用<span class="s3">next</span>()，                        
      它不会向<span class="s3">next</span>()传入任何值，                        
      并且会在接收到done:true之后自动停止。                       
      这对于在一组数据上循环很方便。                       
    3. 当然，也可以手工在<span class="s5">迭代器</span>上循环，调用<span class="s3">next</span>()并检查done:true条件来确定何时停止循环： 
    ```javascript                        
    for(                          
      var ret;                        
      (ret = something.next()) && !ret.done;                        
    ) {                         
      console.log(ret.value);                       
                              
      // 不要死循环！                       
      if(ret.value > 500){                        
        break;                      
      }                       
    }                         
    // 1 9 33105 321969 
    ```                        
    这种手工for方法当然要比ES6的for..of循环语法丑陋，                         
    但其优点是，这样就可以在需要时向<span class="s3">next</span>()传递值。                          
    4. 除了构造自己的<span class="s5">迭代器</span>，许多JavaScript的内建数据结构（从ES6开始），比如array，也有默认的<span class="s5">迭代器</span>：
      ```javascript
      var a = [1, 3, 5, 7, 9];                          
                                
      for(var v of a){                          
        console.log(v);                       
      }                         
      // 1 3 5 7 9                      
      ```    
    for..of循环向a请求它的<span class="s5">迭代器</span>，并自动使用这个<span class="s5">迭代器</span>迭代遍历a的值。                         
      * 这里可能看起来像是ES6一个奇怪的缺失，不过一般的object是故意不像array一样有默认的<span class="s5">迭代器</span>。                       
      这里我们并不会深入探讨其中的缘由。                       
      如果你只是想要迭代一个对象的所有属性的话（不需要保证特定的顺序），可以通过Object.keys(..)返回一个array，类似于for (var k of Object.keys(obj)) { .．这样使用。                        
      这样在一个对象的键值上使用for..of循环与for..in循环类似，                       
        * 除了Object.keys(..)并不包含来自于[[Prototype]]链上的属性，                     
        * 而for..in则包含（参见本系列的《你不知道的JavaScript（上卷）》的“this和对象原型”部分）。


* 4.2.2 <span class="s6">iterable</span>                              
  * 前面例子中的something对象叫作<span class="s5">迭代器</span>，因为它的接口中有一个<span class="s3">next</span>()方法。                            
  * 而与其紧密相关的一个术语是<span class="s6">iterable</span>（可迭代），即指一个包含可以在其值上迭代的<span class="s5">迭代器</span>的对象。                           
    * 从ES6开始，从一个<span class="s6">iterable</span>中提取<span class="s5">迭代器</span>的方法是：                         
    <span class="s6">iterable</span>必须支持一个函数，其名称是专门的ES6符号值<span class="s8">Symbol.iterator</span>。                          
    调用这个函数时，它会返回一个<span class="s5">迭代器</span>。                          
    通常每次调用会返回一个全新的<span class="s5">迭代器</span>，虽然这一点并不是必须的。                          
    * 前面代码片段中的a就是一个<span class="s6">iterable</span>。                          
    for..of循环自动调用它的<span class="s8">Symbol.iterator</span>函数来构建一个<span class="s5">迭代器</span>。                         
    我们当然也可以手工调用这个函数，然后使用它返回的<span class="s5">迭代器</span>： 
      ```javascript                         
      var a = [1, 3, 5, 7, 9];                          
                                
      var it = a[Symbol.iterator]();                          
                                
      it.next().value;   // 1                         
      it.next().value;   // 3                         
      it.next().value;   // 5                         
      ..                          
      ```
      * 前面的代码中列出了定义的something，你可能已经注意到了这一行：                       
      [<span class="s8">Symbol.iterator</span>]: function(){ return this; }                       
        * 这段有点令人疑惑的代码是在将something的值（<span class="s5">迭代器</span>something的接口）也构建成为一个<span class="s6">iterable</span>。                      
        现在它既是<span class="s6">iterable</span>，也是<span class="s5">迭代器</span>。                      
      * 然后我们把something传给for..of循环： 
      ```javascript                       
      for(var v of something) {                       
        ..                      
      }              
      ```         
      for..of循环期望something是<span class="s6">iterable</span>，于是它寻找并调用它的<span class="s8">Symbol.iterator</span>函数。                        
      我们将这个函数定义为就是简单的return this，也就是把自身返回，而for..of循环并不知情。                       
                              
###  4.2.3 <span class="s4">生成器</span><span class="s5">迭代器</span>
了解了<span class="s5">迭代器</span>的背景，让我们把注意力转回<span class="s4">生成器</span>上。                              
可以把<span class="s4">生成器</span>看作一个值的生产者，我们通过<span class="s5">迭代器</span>接口的<span class="s3">next</span>()调用一次提取出一个值。                             
所以，严格说来，<span class="s4">生成器</span>本身并不是<span class="s6">iterable</span>，尽管非常类似——当你执行一个<span class="s4">生成器</span>，就得到了一个<span class="s5">迭代器</span>：
```javascript
function *foo(){..}                             
var it = foo();         
```                    
* 可以通过<span class="s4">生成器</span>实现前面的这个something无限数字序列生产者，类似这样： 
```javascript                             
function *something(){                              
  var nextVal;                            
                              
  while(true){                            
    if(nextVal === undefined){                          
      nextVal = 1;                        
    }                         
    else {                          
      nextVal = (3 * nextVal) + 6;                        
    }                         
                              
    yield nextVal;                          
  }                           
}     
```                        
  * 通常在实际的JavaScript程序中使用while..true循环是非常糟糕的主意，至少如果其中没有break或return的话是这样，                           
  因为它有可能会<span class="s6">同步</span>地无限循环，并阻塞和锁住浏览器UI。                           
  但是，如果在<span class="s4">生成器</span>中有<span class="s2">yield</span>的话，使用这样的循环就完全没有问题。                            
  因为<span class="s4">生成器</span>会在每次迭代中暂停，通过<span class="s2">yield</span>返回到主程序或事件循环队列中。                           
  简单地说就是：“<span class="s4">生成器</span>把while..true带回了JavaScript编程的世界！”                           
  * 这样就简单明确多了，是不是？                            
  因为<span class="s4">生成器</span>会在每个<span class="s2">yield</span>处暂停，函数＊something()的状态（作用域）会被保持，即意味着不需要闭包在调用之间保持变量状态。                            
  这段代码不仅更简洁，我们不需要构造自己的<span class="s5">迭代器</span>接口，                            
  * 实际上也更合理，因为它更清晰地表达了意图。                           
  比如，while..true循环告诉我们这个<span class="s4">生成器</span>就是要永远运行：只要我们一直索要，它就会一直生成值。                           
                              
* 现在，可以通过for..of循环使用我们雕琢过的新的＊something()<span class="s4">生成器</span>。                              
你可以看到，其工作方式基本是相同的：                  
```javascript            
for(var v of something()){                              
  console.log(v);                           
                              
  // 不要死循环！                           
  if(v > 500){                            
    break;                          
  }                           
}                             
// 1 9 33105 321969  
```                           
但是，不要忽略了这段for (var v of something()) .. ！                             
我们并不是像前面的例子那样把something当作一个值来引用，                              
而是调用了＊something()<span class="s4">生成器</span>以得到它的<span class="s5">迭代器</span>供for.. of循环使用。                              
                              
* 如果认真思考的话，你也许会从这段<span class="s4">生成器</span>与循环的交互中提出两个问题。                             
  1. 为什么不能用for (var v of something) .. ？                            
  因为这里的something是<span class="s4">生成器</span>，并不是<span class="s6">iterable</span>。                           
  我们需要调用something()来构造一个生产者供for..of循环迭代。                            
  2. something()调用产生一个<span class="s5">迭代器</span>，但for..of循环需要的是一个<span class="s6">iterable</span>，对吧？                            
  是的。                           
  <span class="s4">生成器</span>的<span class="s5">迭代器</span>也有一个<span class="s8">Symbol.iterator</span>函数，基本上这个函数做的就是return this，和我们前面定义的<span class="s6">iterable</span>something一样。                            
  换句话说，<span class="s4">生成器</span>的<span class="s5">迭代器</span>也是一个<span class="s6">iterable</span>！                           
                              
* 停止<span class="s4">生成器</span>                             
  * 在前面的例子中，看起来似乎＊something()<span class="s4">生成器</span>的<span class="s5">迭代器</span>实例在循环中的break调用之后就永远留在了挂起状态。                           
  其实有一个隐藏的特性会帮助你管理此事。                           
    * for..of循环的“异常结束”（也就是“提前终止”），通常由break、return或者未捕获异常引起，会向<span class="s4">生成器</span>的<span class="s5">迭代器</span>发送一个信号使其终止。                         
    * 严格地说，在循环正常结束之后，for..of循环也会向<span class="s5">迭代器</span>发送这个信号。                         
    对于<span class="s4">生成器</span>来说，这本质上是没有意义的操作，因为<span class="s4">生成器</span>的<span class="s5">迭代器</span>需要先完成for..of循环才能结束。                         
    但是，自定义的<span class="s5">迭代器</span>可能会需要从for..of循环的消费者那里接收这个额外的信号。                         
  * 尽管for..of循环会自动发送这个信号，但你可能会希望向一个<span class="s5">迭代器</span>手工发送这个信号。                           
  可以通过调用return(..)实现这一点。                            
  * 如果在<span class="s4">生成器</span>内有try..finally语句，它将总是运行，即使<span class="s4">生成器</span>已经外部结束。                            
  如果需要清理资源的话（数据库连接等），这一点非常有用：     
  ```javascript                      
  function *something(){                            
    try{                          
      var nextVal;                        
                              
      while(true){                        
        if(nextVal === undefined){                      
          nextVal =1 ;                    
        }                     
        else {                      
          nextVal = (3 * nextVal) + 6;                    
        }                     
        yield nextVal;                      
      }                       
    }                         
    // 清理子句                         
    finally {                         
      console.log("cleaning up!");                        
    }                         
  }         
  ```                  
  之前的例子中，for..of循环内的break会触发finally语句。                            
  * 但是，也可以在外部通过return(..)手工终止<span class="s4">生成器</span>的<span class="s5">迭代器</span>实例：   
  ```javascript                        
  var it = soemthing();                           
  for(var v of it){                           
    console.log(v);                         
                              
    // 不要死循环！                         
    if(v > 500){                          
      console.log(                        
        // 完成<span class="s4">生成器</span>的<span class="s5">迭代器</span>                      
        it.return("Hello World").value                      
      );                        
      // 这里不需要break                       
    }                         
  }                           
  // 1 9 33105 321969                           
  // cleaning up!                           
  // Hello World    
  ```                        
  调用it.return(..)之后，它会立即终止<span class="s4">生成器</span>，这当然会运行finally语句。                            
  另外，它还会把返回的value设置为传入return(..)的内容，这也就是"HelloWorld"被传出去的过程。                            
  现在我们也不需要包含break语句了，因为<span class="s4">生成器</span>的<span class="s5">迭代器</span>已经被设置为done:true，所以for..of循环会在下一个迭代终止。                           
* <span class="s4">生成器</span>的名字大多来自这种消费生产值（consuming produced values）的用例。                              
但是，这里要再次申明，这只是<span class="s4">生成器</span>的用法之一，坦白地说，甚至不是这本书重点关注的用途。                             
既然对<span class="s4">生成器</span>的工作机制有了更完整的理解，那接下来就可以把关注转向如何把<span class="s4">生成器</span>应用于<span class="s3">异步</span><span class="s5">并发</span>了。                             
                              
## 4.3 <span class="s3">异步</span>迭代<span class="s4">生成器</span>
<span class="s4">生成器</span>与<span class="s3">异步</span>编码模式及解决回调问题等，有什么关系呢？让我们来回答这个重要的问题。                              
<span class="s4">生成器</span><span class="s2">yield</span>暂停的特性意味着                              
### 1. 我们不仅能够从<span class="s3">异步</span>函数调用得到看似<span class="s6">同步</span>的返回值
  * 我们应该重新讨论第3章中的一个场景。回想一下回调方法： 
  ```javascript                          
  function foo(x, y, cb){                           
    ajax(                         
      "http://some.url.1/?x=" + x + "&y=" + y,                        
      cb                        
    );                          
  });                           
  foo(11, 31, function(err, text){                            
    if(err){                          
      console.error(err);                       
    }                         
    else {                          
      console.log(text);                        
    }                         
  });              
  ```             
  * 如果想要通过<span class="s4">生成器</span>来表达同样的任务流程控制，可以这样实现： 
  ```javascript                          
  function foo(x, y) {                            
    ajax(                         
      "http://some.url.1/?x=" + x + "&y=" + y,                        
      function(err, data){                        
        if(err){                      
          // 向*main()抛出一个错误                   
          it.throw(err);                    
        }                     
        else {                      
          // 用收到的data恢复*main()                    
          it.next(data);                    
        }                     
      }                       
    );                          
  }                           
  function *main(){                           
    try {                         
      var text = yield foo(11, 31);                       
      console.log(text);                        
    }                         
    catch(err){                         
      console.error(err);                       
    }                         
  }                           
  var it = main();                            
                              
  // 这里启动！                            
  it.next();    
  ```                        
  第一眼看上去，与之前的回调代码对比起来，这段代码更长一些，可能也更复杂一些。但是，不要被表面现象欺骗了！                            
  <span class="s4">生成器</span>代码实际上要好得多！                           
  不过要解释这一点还是比较复杂的。                            
    * 首先，让我们查看一下最重要的这段代码：   
    ```javascript                      
    var text = yield foo(11, 31);                         
    console.log(text);       
    ```                   
    请先花点时间思考一下这段代码是如何工作的。                         
    我们调用了一个普通函数foo(..)，而且显然能够从Ajax调用中得到text，即使它是<span class="s3">异步</span>的。                          
    * 这怎么可能呢？如果你回想一下第1章的开始部分的话，我们给出了几乎相同的代码： 
    ```javascript                         
    var data = ajax("..url 1..");                         
    console.log(data);         
    ```                 
    但是，这段代码不能工作！                          
    * 你能指出其中的区别吗？                         
    区别就在于<span class="s4">生成器</span>中使用的<span class="s2">yield</span>。                          
    这就是奥秘所在！正是这一点使得我们看似阻塞<span class="s6">同步</span>的代码，实际上并不会阻塞整个程序，它只是暂停或阻塞了<span class="s4">生成器</span>本身的代码。                          
      * 在<span class="s2">yield</span> foo(11,31)中，首先调用foo(11,31)，它没有返回值（即返回undefined），所以我们发出了一个调用来请求数据，但实际上之后做的是<span class="s2">yield</span> undefined。                       
      这没问题，因为这段代码当前并不依赖<span class="s2">yield</span>出来的值来做任何事情。本章后面会再次讨论这一点。                        
    * 这里并不是在**消息传递**的意义上使用<span class="s2">yield</span>，而只是将其用于流程控制实现暂停/阻塞。                         
    实际上，它还是会有**消息传递**，但只是<span class="s4">生成器</span>恢复运行之后的单向**消息传递**。                          
    所以，<span class="s4">生成器</span>在<span class="s2">yield</span>处暂停，本质上是在提出一个问题：“我应该返回什么值来赋给变量text? ”谁来回答这个问题呢？                         
      * 看一下foo(..)。如果这个Ajax请求成功，我们调用：                       
      it.<span class="s3">next</span>(data);                        
      这会用响应数据恢复<span class="s4">生成器</span>，意味着我们暂停的<span class="s2">yield</span>表达式直接接收到了这个值。                       
      然后随着<span class="s4">生成器</span>代码继续运行，这个值被赋给局部变量text。                       
    * 回头往前看一步，思考一下这意味着什么。                         
      * 我们在<span class="s4">生成器</span>内部有了看似完全<span class="s6">同步</span>的代码（除了<span class="s2">yield</span>关键字本身），但隐藏在背后的是，在foo(..)内的运行可以完全<span class="s3">异步</span>。                        
      * 这是巨大的改进！                        
      对于我们前面陈述的回调无法以顺序<span class="s6">同步</span>的、符合我们大脑思考模式的方式表达<span class="s3">异步</span>这个问题，这是一个近乎完美的解决方案。                        
      * 从本质上而言，我们把<span class="s3">异步</span>作为实现细节抽象了出去，使得我们可以以<span class="s6">同步</span>顺序的形式追踪流程控制：“发出一个Ajax请求，等它完成之后打印出响应结果。”                        
      并且，当然，我们只在这个流程控制中表达了两个步骤，而这种表达能力是可以无限扩展的，以便我们无论需要多少步骤都可以表达。                       
      这是一个很重要的领悟，回过头去把上面三段重读一遍，让它融入你的思想吧！  

### 2. 还可以<span class="s6">同步</span>捕获来自这些<span class="s3">异步</span>函数调用的错误！
<span class="s6">同步</span>错误处理                              
#### 我们可以把错误抛入<span class="s4">生成器</span>中
前面的<span class="s4">生成器</span>代码甚至还给我们带来了更多其他的好处。                             
让我们把注意力转移到<span class="s4">生成器</span>内部的try..catch：     
```javascript                        
try {                             
  var text = yield foo(11, 31);                           
  console.log(text);                            
}                             
catch(err){                             
  console.error(err);                           
}             
```                
  * 这是如何工作的呢？                           
    * 调用foo(..)是<span class="s3">异步</span>完成的，难道try..catch不是无法捕获<span class="s3">异步</span>错误，就像我们在第3章中看到的一样吗？                         
    * 我们已经看到<span class="s2">yield</span>是如何让赋值语句暂停来等待foo(..)完成，使得响应完成后可以被赋给text。                         
    精彩的部分在于<span class="s2">yield</span>暂停也使得<span class="s4">生成器</span>能够捕获错误。                         
    通过这段前面列出的代码把错误抛出到<span class="s4">生成器</span>中：    
    ```javascript                      
    if(err){                          
      // 向*main()抛出一个错误                       
      it.throw(err);                        
    }               
    ```

#### 不过如果是从<span class="s4">生成器</span>向外抛出错误呢？
正如你所料：        
```javascript                      
function *main(){                             
  var x = yield "Hello World";                            
  yield x.toLowerCase();  // 引发一个异常！                            
}                             
                              
var it = main();                              
                              
it.next().value;  // Hello World                              
                              
tyr {                             
  it.next(42);                            
}                             
catch(err){                             
  console.error(err);  // TypeError                           
}         
```                    
  * 当然，也可以通过throw .．手工抛出一个错误，而不是通过触发异常。                           
  * 甚至可以捕获通过throw(..)抛入<span class="s4">生成器</span>的同一个错误，基本上也就是给<span class="s4">生成器</span>一个处理它的机会；                            
  如果没有处理的话，<span class="s5">迭代器</span>代码就必须处理：  
  ```javascript                          
  function *main(){                           
    var x = yield "Hello World";                          
    // 永远不会到达这里                         
    console.log(x);                         
  }                           
  var it = main();                            
                              
  it.next();                            
                              
  try{                            
    // *main()会处理这个错误吗？看看吧！                         
    it.throw("Oops");                         
  }                           
  catch(err){                           
    // 不行，没有处理！                         
    console.error(err);   // Oops                         
  }         
  ```                  
  在<span class="s3">异步</span>代码中实现看似<span class="s6">同步</span>的错误处理（通过try..catch）在可读性和合理性方面都是一个巨大的进步。                           
                              
## 4.4 <span class="s4">生成器</span>+<span class="s1">Promise</span> 
在前面的讨论中，我们展示了如何<span class="s3">异步</span>迭代<span class="s4">生成器</span>，这是一团乱麻似的回调在顺序性和合理性方面的巨大进步。                             
但我们错失了很重要的两点：<span class="s1">Promise</span>的可信任性和可组合性（参见第3章）！                              
别担心，我们还会重获这些。                             
ES6中最完美的世界就是<span class="s4">生成器</span>（看似<span class="s6">同步</span>的<span class="s3">异步</span>代码）和<span class="s1">Promise</span>（可信任可组合）的结合。                              
### <span class="s1">Promise</span>+<span class="s4">生成器</span>下的单步<span class="s3">异步</span>流程
* 但如何实现呢？                             
回想一下第3章里在运行Ajax例子中基于<span class="s1">Promise</span>的实现方法：
  ```javascript                             
  function foo(x, y){                             
    return request(                           
      "http://some.url.1/?x=" + x + "&y=" + y                         
    );                            
  }                             
                                
  foo(11, 31)                             
  .then(                              
    function(text){                           
      console.log(text);                          
    },                            
    function(err){                            
      console.error(err);                         
    }                           
  );           
  ```                   
  * 在前面的运行Ajax例子的<span class="s4">生成器</span>代码中，foo(..)没有返回值（undefined），并且我们的<span class="s5">迭代器</span>控制代码并不关心<span class="s2">yield</span>出来的值。                            
  * 而这里支持<span class="s1">Promise</span>的foo(..)在发出Ajax调用之后返回了一个promise。                            
    * 这暗示我们可以通过foo(..)构造一个promise，                          
    * 然后通过<span class="s4">生成器</span>把它<span class="s2">yield</span>出来，                         
    * 然后<span class="s5">迭代器</span>控制代码就可以接收到这个promise了。                          
  * 但<span class="s5">迭代器</span>应该对这个promise做些什么呢？                            
  它应该侦听这个promise的决议（完成或拒绝），                           
    * 然后要么使用完成消息恢复<span class="s4">生成器</span>运行，                          
    * 要么向<span class="s4">生成器</span>抛出一个带有拒绝原因的错误。                          
  * 我再重复一遍，因为这一点非常重要。获得<span class="s1">Promise</span>和<span class="s4">生成器</span>最大效用的最自然的方法就是<span class="s2">yield</span>出来一个<span class="s1">Promise</span>，然后通过这个<span class="s1">Promise</span>来控制<span class="s4">生成器</span>的<span class="s5">迭代器</span>。                            
  让我们来试一下！                            
    * 首先，把支持<span class="s1">Promise</span>的foo(..)和<span class="s4">生成器</span>＊main()放在一起：
    ```javascript                         
    function foo(x, y){                         
      return request("http://some.url.1/?x=" + x + "&y=" + y);                        
    }                         
    function *main(){                         
      try {                       
        var text = yield foo(11, 31);                     
        console.log(text);                      
      }                       
      catch(err){                       
        console.error(err);                     
      }                       
    }           
    ```              
    这次重构代码中最有力的发现是，＊main()之中的代码完全不需要改变！                         
    在<span class="s4">生成器</span>内部，不管什么值<span class="s2">yield</span>出来，都只是一个透明的实现细节，所以我们甚至没有意识到其发生，也不需要关心。                         
    * 但现在如何运行＊main()呢？                          
    还有一些实现细节需要补充，来实现接收和连接<span class="s2">yield</span>出来的promise，使它能够在决议之后恢复<span class="s4">生成器</span>。                          
      * 先从手工实现开始：
        ```javascript                       
        var it = main();                        
                                
        var p = it.next().value;                        
                                
        // 等待promise p决议                        
        p.then(                       
          function(text){                     
            it.next(text);                    
          },                      
          function(err){                      
            it.throw(err);                    
          }                     
        );      
        ```                  
        * 实际上，这并没有那么令人痛苦，对吧？                      
        * 这段代码看起来应该和我们前面手工组合通过error-first回调控制的<span class="s4">生成器</span>非常类似。                      
        除了没有if (err) { it.throw.., promise已经为我们分离了完成（成功）和拒绝（失败），否则的话，<span class="s5">迭代器</span>控制是完全一样的。                     
        * 现在，我们已经隐藏了一些重要的细节。                      
        * 最重要的是，我们利用了已知＊main()中只有一个需要支持<span class="s1">Promise</span>的步骤这一事实。                      
        如果想要能够实现<span class="s1">Promise</span>驱动的<span class="s4">生成器</span>，不管其内部有多少个步骤呢？                     
        我们当然不希望每个<span class="s4">生成器</span>手工编写不同的<span class="s1">Promise</span>链！                      
        如果有一种方法可以实现重复（即循环）迭代控制，每次会生成一个<span class="s1">Promise</span>，等其决议后再继续，那该多好啊。                     
        * 还有，如果在it.<span class="s3">next</span>(..)调用过程中<span class="s4">生成器</span>（有意或无意）抛出一个错误会怎样呢？                     
        是应该退出呢，还是应该捕获这个错误<span class="s5">并发</span>送回去呢？                      
        类似地，如果通过it.throw(..)把一个<span class="s1">Promise</span>拒绝抛入<span class="s4">生成器</span>中，但它却没有受到处理就被直接抛回了呢？                     
      * 4.4.1 支持<span class="s1">Promise</span>的Generator Runner                        
      随着对这条道路的深入探索，你越来越会意识到：“哇，如果有某个工具为我实现这些就好了。”                       
      关于这一点，你绝对没错。这是如此重要的一个模式，你绝对不希望搞错（或精疲力竭地一次又一次重复实现），所以最好是使用专门设计用来以我们前面展示的方式运行<span class="s1">Promise</span>-<span class="s2">yield</span>ing<span class="s4">生成器</span>的工具。                        
        * 有几个<span class="s1">Promise</span>抽象库提供了这样的工具，包括我的asynquence库及其runner(..)，本部分的附录A中会介绍。                      
        * 但是，为了学习和展示的目的，我们还是自己定义一个独立工具，叫作run(..)：
        ```javascript                     
        // 在些感谢Benjamin Gruenbaum (@benjamingr on GitHub)的巨大改进                      
        function run(gen){                      
          var args = [].slice.call(arguments, 1), it;                   
          // 在当前上下文中初始化生成器                    
          it = gen.apply(this, args);                   
          // 返回一个promise用于生成器完成                   
          return Promise.resolve()                    
            .then(function handleNext(value){                 
              // 对下个yield出的值运行                
              var next = it.next(value);                
              return (function handleResult(next){                
                // 生成器运行完毕了吗？             
                if(next.done){              
                  return next.value;            
                }             
                // 否则继续运行             
                else {              
                  return Promise.resolve(next.value)            
                        .then(      
                          // 成功就烣复<span class="s3">异步</span>循环    
                          handleNext,   
                          // 如果value是被拒绝的promise，   
                          // 就把错误传回生成器进行出错处理    
                          function handleErr(err){    
                            return Promise.resolve( 
                              it.throw(err)
                            ) 
                            .then(handleResult);  
                          }   
                        );      
                }             
              })(next);               
            });                 
        }         
        ```            
          * 诚如所见，你可能并不愿意编写这么复杂的工具，并且也会特别不希望为每个使用的<span class="s4">生成器</span>都重复这段代码。所以，一个工具或库中的辅助函数绝对是必要的。                    
          尽管如此，我还是建议你花费几分钟时间学习这段代码，以更好地理解<span class="s4">生成器</span>+<span class="s1">Promise</span>协同运作模式。                   
    * 如何在运行Ajax的例子中使用run(..)和＊main()呢？ 
      ```javascript                         
      function *main(){                         
        // ..                       
      }                         
                                
      run(main); 
      ```                         
    就是这样！这种运行run(..)的方式，它会自动<span class="s3">异步</span>运行你传给它的<span class="s4">生成器</span>，直到结束。                          
    我们定义的run(..)返回一个promise，一旦<span class="s4">生成器</span>完成，这个promise就会决议，或收到一个<span class="s4">生成器</span>没有处理的未捕获异常。                         
    这里并没有展示这种功能，但我们会在本章后面部分再介绍这一点。                          
                              
* ES7:async与await?                              
前面的模式——<span class="s4">生成器</span><span class="s2">yield</span>出<span class="s1">Promise</span>，然后其控制<span class="s4">生成器</span>的<span class="s5">迭代器</span>来执行它，直到结束——是非常强大有用的一种方法。
如果我们能够无需库工具辅助函数（即run(..)）就能够实现就好了。                              
关于这一点，可能有一些好消息。在编写本书的时候，对于后ES6、ES7的时间框架，在这一方面增加语法支持的提案已经有了一些初期但很强势的支持。显然，现在确定细节还太早，但其形式很可能会类似如下：  
  ```javascript                            
  function foo(x, y){                             
    return request("http://some.url.1/?x=" + x + "&y=" + y);                            
  }                             
  async function main(){                              
    try{                            
      var text = await foo(11, 31);                         
      console.log(text);                          
    }                           
    catch(err){                           
      console.error(err);                         
    }                           
                                
  }                             
  main(); 
  ```                            
  * 可以看到，                           
    * 这里没有通过run(..)调用（意味着不需要库工具！）来触发和驱动main()，它只是被当作一个普通函数调用。                         
    * 另外，main()也不再被声明为<span class="s4">生成器</span>函数了，它现在是一类新的函数：async函数。                          
    * 最后，我们不再<span class="s2">yield</span>出<span class="s1">Promise</span>，而是用await等待它决议。                         
    如果你await了一个<span class="s1">Promise</span>, async函数就会自动获知要做什么，它会暂停这个函数（就像<span class="s4">生成器</span>一样），直到<span class="s1">Promise</span>决议。                          
    我们并没有在这段代码中展示这一点，但是调用一个像main()这样的async函数会自动返回一个promise。                         
    在函数完全结束之后，这个promise会决议。                         
      * 有C#经验的人可能很熟悉async/await语法，因为它们基本上是相同的。                        
  * 从本质上说，这个提案就是把前面我们已经推导出来的模式写进规范，使其进入语法机制：组合<span class="s1">Promise</span>和看似<span class="s6">同步</span>的流程控制代码。这是两个最好的世界的结合，有效地实际解决了我们列出的回调方案的主要问题。                            
  这样的ES7提案已经存在，并有了初期的支持和热情，仅仅是这个事实就极大增加了这个<span class="s3">异步</span>模式对其未来重要性的信心。                           
                              
                              
### 4.4.2 <span class="s4">生成器</span>中的<span class="s1">Promise</span><span class="s5">并发</span>
现实世界中的代码常常会有多个<span class="s3">异步</span>步骤                              
如果不认真对待的话，<span class="s4">生成器</span>的这种看似<span class="s6">同步</span>的风格可能会让你陷入对自己<span class="s3">异步</span><span class="s5">并发</span>组织方式的自满中，进而导致并不理想的性能模式。                              
所以我们打算花点时间来研究一下各种方案。                              
* 想象这样一个场景：你需要从两个不同的来源获取数据，然后把响应组合在一起以形成第三个请求，最终把最后一条响应打印出来。                              
第3章已经用<span class="s1">Promise</span>研究过一个类似的场景，但是让我们在<span class="s4">生成器</span>的环境下重新考虑一下这个问题吧。                             
你的第一直觉可能类似如下：   
  ```javascript                          
  function *foo(){                              
    var r1 = yield request("http://some.url.1");                            
    var r2 = yield request("http://some.url.2");                            
    var r3 = yield request("http://some.url.3/?v=" + r1 + ", " + r2);                           
    console.log(r3);                            
  }                             
                                
  // 使用前面定义的工具run(..)                             
  run(foo); 
  ```                            
  * 这段代码可以工作，但是针对我们特定的场景而言，它并不是最优的。你能指出原因吗？                           
  因为请求r1和r2能够——出于性能考虑也应该——<span class="s5">并发</span>执行，但是在这段代码中，它们是依次执行的；                           
  直到请求URL"`http://some.url.1`"完成后才会通过Ajax获取URL"`http://some.url.2`"。                            
  这两个请求是相互独立的，所以性能更高的方案应该是让它们同时运行。                            
  * 但是，到底如何通过<span class="s4">生成器</span>和<span class="s2">yield</span>实现这一点呢？我们知道<span class="s2">yield</span>只是代码中一个单独的暂停点，并不可能同时在两个点上暂停。                            
  最自然有效的答案就是让<span class="s3">异步</span>流程基于<span class="s1">Promise</span>，特别是基于它们以时间无关的方式管理状态的能力（参见3.1.1节）。                            
    * 最简单的方法：      
    ```javascript                   
    function *foo(){                          
      // 让两请求“并行”                       
      var p1 = request("http://some.url.1");                        
      var p2 = request("http://some.url.2");                        
                              
      // 等待两个promise都决议                       
      var r1 = yield p1;                        
      var r2 = yield p2;                        
                              
      var r3 = yield request("http://some.url.3/?v=" + r1 + ", " + r2);                       
                              
      console.log(r3);                        
    }                         
    // 使用前面定义的工具run(..)                         
    run(foo);           
    ```              
      * 为什么这和前面的代码片段不同呢？                        
        * 观察一下<span class="s2">yield</span>的位置。                     
        p1和p2是<span class="s5">并发</span>执行（即“并行”）的用于Ajax请求的promise。                     
        哪一个先完成都无所谓，因为promise会按照需要在决议状态保持任意长时间。                      
        * 然后我们使用接下来的两个<span class="s2">yield</span>语句等待并取得promise的决议（分别写入r1和r2）。                      
        如果p1先决议，那么<span class="s2">yield</span> p1就会先恢复执行，然后等待<span class="s2">yield</span>p2恢复。                      
        如果p2先决议，它就会耐心保持其决议值等待请求，但是<span class="s2">yield</span>p1将会先等待，直到p1决议。                      
        不管哪种情况，p1和p2都会<span class="s5">并发</span>执行，无论完成顺序如何，两者都要全部完成，然后才会发出r3 = <span class="s2">yield</span> request..Ajax请求。                      
      * 这种流程控制模型如果听起来有点熟悉的话，是因为这基本上和我们在第3章中通过<span class="s1">Promise</span>.all([ .. ])工具实现的gate模式相同。                        
    * 因此，也可以这样表达这种流程控制：
      ```javascript                         
      function *foo(){                          
        // 让两个请求“并行”，并等待两个promise都决议                        
        var results = yield Promise.all([                       
          request("http://some.url.1"),                     
          request("http://some.url.2")                      
        ]);                       
                                
        var r1 = results[0];                        
        var r2 = reuslts[1];                        
                                
        var r3 = yield request("http://some.url.3/?v=" + r1 + ", " + r2);                       
                                
        console.log(r3);                        
                                
      }                         
      // 使用前面定义的工具run(..)                         
      run(foo); 
      ```                        
      * 就像我们在第3章中讨论过的，我们甚至可以通过ES6解构赋值，把varr1 = .. var r2 = .．赋值语句简化为var [r1, r2] = results。                       
      * 换句话说，<span class="s1">Promise</span>所有的<span class="s5">并发</span>能力在<span class="s4">生成器</span>+<span class="s1">Promise</span>方法中都可以使用。                        
      所以无论在什么地方你的需求超过了顺序的this-then-that<span class="s3">异步</span>流程控制，<span class="s1">Promise</span>很可能都是最好的选择。                        
    * 隐藏的<span class="s1">Promise</span>                          
    作为一个风格方面的提醒：要注意你的<span class="s4">生成器</span>内部包含了多少<span class="s1">Promise</span>逻辑。                         
    我们介绍的使用<span class="s4">生成器</span>实现<span class="s3">异步</span>的方法的全部要点在于创建简单、顺序、看似<span class="s6">同步</span>的代码，将<span class="s3">异步</span>的细节尽可能隐藏起来。                          
    比如，这可能是一个更简洁的方案：  
      ```javascript                        
      // 注：普通函数，不是生成器                         
      function bar(url1, url2){                         
        return Promise.all([                        
          request(url1),                      
          request(url2)                     
        ]);                       
      }                         
                                
      function *foo(){                          
        // 隐藏bar(..)内部基于Promise的并发细节                        
        var results = yield bar(                        
          "http://some.url.1",                      
          "http://some.url.2"                     
        );                        
                                
        var r1 = results[0];                        
        var r2 = results[1];                        
                                
        var r3 = yield request("http://some.url.3/?v=" + r1 + ", " + r2);                       
                                
        console.log(r3);                        
      }                         
      // 使用前面定义的工具run(..)                         
      run(foo);
      ```                         
    在＊foo()内部，我们所做的一切就是要求bar(..)给我们一些results，并通过<span class="s2">yield</span>来等待结果，这样更简洁也更清晰。                         
    我们不需要关心在底层是用<span class="s1">Promise</span>.all([ .. ]) <span class="s1">Promise</span>组合来实现这一切。                          
    我们把<span class="s3">异步</span>，实际上是<span class="s1">Promise</span>，作为一个实现细节看待。                         
      * 如果想要实现一系列高级流程控制的话，那么非常有用的做法是：                       
      把你的<span class="s1">Promise</span>逻辑隐藏在一个只从<span class="s4">生成器</span>代码中调用的函数内部。                       
      比如：                       
      ```javascript
      function bar(){                       
        Promise.all([                     
          baz(..)                   
          .then(..),                    
          Promise.race([..])                    
        ])                      
        .then(..)                     
      }      
      ```                 
      有时候会需要这种逻辑，而如果把它直接放在<span class="s4">生成器</span>内部的话，那你就失去了几乎所有一开始使用<span class="s4">生成器</span>的理由。                        
      应该有意将这样的细节从<span class="s4">生成器</span>代码中抽象出来，以避免它把高层次的任务表达变得杂乱。                        
* 创建代码除了要实现功能和保持性能之外，你还应该尽可能使代码易于理解和维护。                             
* 对编程来说，抽象并不总是好事，很多时候它会增加复杂度以换取简洁性。                             
但是在这个例子里，我相信，对<span class="s4">生成器</span>+<span class="s1">Promise</span><span class="s3">异步</span>代码来说，相比于其他实现，这种抽象更加健康。                             
尽管如此，还是建议大家要注意具体情况具体分析，为你和你的团队作出正确的决定。                              
                              
## 4.5 <span class="s4">生成器</span>委托
* 在前面一节中，我们展示了从<span class="s4">生成器</span>内部调用常规函数，以及这如何对于把实现细节（就像<span class="s3">异步</span><span class="s1">Promise</span>流）抽象出去还是一种有用的技术。                             
* 但是，用普通函数实现这个任务的主要缺点是                              
它必须遵守普通函数的规则，也就意味着它不能像<span class="s4">生成器</span>一样用<span class="s2">yield</span>暂停自己。                              
  * 可能出现的情况是，你可能会从一个<span class="s4">生成器</span>调用另一个<span class="s4">生成器</span>，使用辅助函数run(..)，就像这样：
  ```javascript                           
  function *foo(){                            
    var r2 = yield request("http://some.url.2");                          
    var r3 = yield request("http://some.url.3/?v=" + r2);                         
    return r3;                          
  }                           
  function *bar(){                            
    var r1 = yield request("http://some.url.1");                          
    // 通过run(..)“委托”给*foo()                         
    var r3 = yield run(foo);                          
    console.log(r3);                          
  }                           
  run(bar);      
  ```                     
    * 我们再次通过run(..)工具从＊bar()内部运行＊foo()。                         
    这里我们利用了如下事实：                          
    我们前面定义的run(..)返回一个promise，这个promise在<span class="s4">生成器</span>运行结束时（或出错退出时）决议。                         
    因此，如果从一个run(..)调用中<span class="s2">yield</span>出来一个promise到另一个run(..)实例中，它会自动暂停＊bar()，直到＊foo()结束。                         
  * 但其实还有一个更好的方法可以实现从＊bar()调用＊foo()，称为<span class="s2">yield</span>委托。                            
  <span class="s2">yield</span>委托的具体语法是：<span class="s2">yield</span> ＊（注意多出来的＊）。                           
  在我们弄清它在前面的例子中的使用之前，先来看一个简单点的场景：    
    ```javascript                           
    function *foo(){                            
      console.log("*foo() starting");                         
      yield 3;                          
      yield 4;                          
      console.log("*foo() finished");                         
    }                           
                                
    function *bar(){                            
      yield 1;                          
      yield 2;                          
      yield *foo();  // yield委托！                          
      yield 5;                          
    }                           
                                
    var it = bar();                           
                                
    it.next().value;  // 1                            
    it.next().value;  // 2                            
    it.next().value;  // *foo() starting   // 3                           
    it.next().value;  // 4                            
    it.next().value;  // *foo() finisehd   // 5 
    ```                          
    * 在本章前面的一条提示中，我解释了为什么我更喜欢function ＊foo()..，而不是function＊ foo() ..。                         
    类似地，我也更喜欢——与这个主题的多数其他文档不同——使用<span class="s2">yield</span> ＊foo()而不是<span class="s2">yield</span>＊ foo()。                         
    ＊的位置仅关乎风格，由你自己来决定使用哪种。                          
    不过我发现保持风格一致是很吸引人的。                          
    * 这里的<span class="s2">yield</span> ＊foo()委托是如何工作的呢？                         
      * 首先，和我们以前看到的完全一样，调用foo()创建一个<span class="s5">迭代器</span>。                       
      * 然后<span class="s2">yield</span>＊把<span class="s5">迭代器</span>实例控制（当前＊bar()<span class="s4">生成器</span>的）委托给/转移到了这另一个＊foo()<span class="s5">迭代器</span>。                        
      所以，前面两个it.<span class="s3">next</span>()调用控制的是＊bar()。                       
      * 但当我们发出第三个it.<span class="s3">next</span>()调用时，＊foo()现在启动了，我们现在控制的是＊foo()而不是＊bar()。                        
      这也是为什么这被称为委托：＊bar()把自己的迭代控制委托给了＊foo()。                        
      一旦it<span class="s5">迭代器</span>控制消耗了整个＊foo()<span class="s5">迭代器</span>，it就会自动转回控制＊bar()。                       
    * 现在回到前面使用三个顺序Ajax请求的例子：   
      ```javascript                       
      function *foo(){                          
        var r2 = yield request("http://some.url.2");                        
        var r3 = yield request("http://some.url.3/?v=" + r2);                       
        return r3;                        
      }                         
                                
      function *bar(){                          
        var r1 = yield request("http://some.url.1");                        
        // 通过yield* “委托”给*foo()                       
        var r3 = yield *foo();                        
                                
        console.log(r3);                        
      }                         
                                
      run(bar); 
      ```                        
      * 这段代码和前面版本的唯一区别就在于使用了<span class="s2">yield</span> ＊foo()，而不是前面的<span class="s2">yield</span> run(foo)。                        
      * <span class="s2">yield</span> ＊暂停了迭代控制，而不是<span class="s4">生成器</span>控制。                        
      当你调用＊foo()<span class="s4">生成器</span>时，现在<span class="s2">yield</span>委托到了它的<span class="s5">迭代器</span>。                        
      但实际上，你可以<span class="s2">yield</span>委托到任意<span class="s6">iterable</span>, <span class="s2">yield</span> ＊[1,2,3]会消耗数组值[1,2,3]的默认<span class="s5">迭代器</span>。                        
* 4.5.1 为什么用委托                              
* <span class="s2">yield</span>委托的主要目的是代码组织，以达到与普通函数调用的对称。                              
  * 想像一下有两个模块分别提供了方法foo()和bar()，其中bar()调用了foo()。                            
  一般来说，把两者分开实现的原因是该程序的适当的代码组织要求它们位于不同的函数中。                            
  比如，可能有些情况下是单独调用foo()，另外一些地方则由bar()调用foo()。                            
  * 同样是出于这些原因，保持<span class="s4">生成器</span>分离有助于程序的可读性、可维护性和可调试性。                           
  在这一方面，<span class="s2">yield</span> ＊是一个语法上的缩写，用于代替手工在＊foo()的步骤上迭代，不过是在＊bar()内部。                            
  * 如果＊foo()内的步骤是<span class="s3">异步</span>的话，这样的手工方法将会特别复杂，这也是你可能需要使用run(..)工具来做某些事情的原因。                           
  就像我们已经展示的，<span class="s2">yield</span> ＊foo()消除了对run(..)工具的需要（就像run(foo)）。                           
                              
* 4.5.2 消息委托                              
  * 你可能会疑惑，这个<span class="s2">yield</span>委托是如何不只用于<span class="s5">迭代器</span>控制工作，                           
  * 也用于双向**消息传递**工作的呢。                            
  认真跟踪下面的通过<span class="s2">yield</span>委托实现的消息流出入： 
    ```javascript                          
    function *foo(){                            
      console.log("inside *foo():", yield "B");                         
      console.log("inside *foo():", yield "C");                         
      return "D";                         
    }                           
                                
    function *bar(){                            
      console.log("inside *bar():", yield "A");                         
      // yield 委托！                          
      console.log("inside *bar():", yield *foo());                          
      console.log("insdie *bar():", yield "E");                         
      return "F";                         
    }                           
                                
    var it = bar();                           
                                
    console.log("outside:", it.next().value);                           
    // outside: A                           
                                
    console.log("outside:", it.next(1).value);                            
    //inside *bar(): 1                            
    // outside: B                           
                                
    console.log("outside:", it.next(2).value);                            
    // inside *foo(): 3                           
    // inside *bar(): D                           
    // outside: E                           
                                
    console.log("outside:", it.next(4).value);                            
    // inside *bar(): 4                           
    // outside: F   
    ```                        
    * 要特别注意it.<span class="s3">next</span>(3)调用之后的执行步骤。                         
      1. 值3（通过＊bar()内部的<span class="s2">yield</span>委托）传入等待的＊foo()内部的<span class="s2">yield</span>"C"表达式。                       
      2.  然后＊foo()调用return "D"，但是这个值并没有一直返回到外部的it.<span class="s3">next</span>(3)调用。                        
      3. 取而代之的是，值"D"作为＊bar()内部等待的<span class="s2">yield</span>＊foo()表达式的结果发出——这个<span class="s2">yield</span>委托本质上在所有的＊foo()完成之前是暂停的。                       
      所以"D"成为＊bar()内部的最后结果，并被打印出来。                        
      4.  <span class="s2">yield</span> "E"在＊bar()内部调用，值"E"作为it.<span class="s3">next</span>(3)调用的结果被<span class="s2">yield</span>发出。                       
    * 从外层的<span class="s5">迭代器</span>（it）角度来说，是控制最开始的<span class="s4">生成器</span>还是控制委托的那个，没有任何区别。                         
    * 实际上，<span class="s2">yield</span>委托甚至并不要求必须转到另一个<span class="s4">生成器</span>，它可以转到一个非<span class="s4">生成器</span>的一般<span class="s6">iterable</span>。比如：
      ```javascript
      function *bar(){                          
        console.log("inside *bar():", yield "A");                       
        // yield委托给非生成器！                        
        console.log("inside *bar():", yield * ["B", "C", "D"]);                       
        console.log("insdie *bar():", yield "E");                       
        return "F";                       
      }                         
                                
      var it = bar();                         
      console.log("outside:", it.next().value);   // outside: A                         
      console.log("outside:", it.next(1).value); // inside *bar():1   // outside: B                         
      console.log("outside:", it.next(2).value);   // outside: C                          
      console.log("outside:", it.next(3).value);  // outside: D                         
      console.log("outside:", it.next(4).value);  // inside *bar():undefined  // outside: E                         
      console.log("outside:", it.next(5).value);  // insdie *bar(): 5   // outside: F     
      ```                    
      * 注意这个例子和之前那个例子在消息接收位置和报告位置上的区别。                        
      最显著的是，默认的数组<span class="s5">迭代器</span>并不关心通过<span class="s3">next</span>(..)调用发送的任何消息，所以值2、3和4根本就被忽略了。                        
      还有，因为<span class="s5">迭代器</span>没有显式的返回值（和前面使用的＊foo()不同），所以<span class="s2">yield</span> ＊表达式完成后得到的是一个undefined。                        
  * 异常也被委托！                           
  和<span class="s2">yield</span>委托透明地双向传递消息的方式一样，错误和异常也是双向传递的： 
    ```javascript                           
    function *foo(){                            
      try{                          
        yield "B";                        
      }                         
      catch(err){                         
        console.log("error caught inside *foo():", err);                        
      }                         
      yield "C";                          
      throw "D";                          
    }                           
                                
    function *bar(){                            
      yield "A";                          
                                
      try {                         
        yield *foo();                       
      }                         
      catch(err){                         
        console.log("error caught inside *bar():", err);                        
      }                         
      yield "E";                          
                                
      yield *baz();                         
                                
      // 注：不会到达这里！                          
      yield "G";                          
    }                           
                                
    function *baz(){                            
      throw "F";                          
    }                           
                                
    var it = bar();                           
                                
    console.log("outside:", it.next().value);  // outside: A                            
    console.log("outside:", it.next(1).value); // outside: B                            
    console.log("outside:", it.throw(2).value);  // error caught inside *foo(): 2    // outside: C                            
    console.log("outside:", it.next(3).value);  // error caught inside *bar(): D      // outside: E                           
    try {                           
      console.log("outside:", it.next(4).value);                          
    }                           
    catch(err){                           
      console.log("error caught outside:", err);                          
    }                           
    // error caught outside: F   
    ```                         
    * 这段代码中需要注意以下几点。                          
      1. 调用it.throw(2)时，它会发送错误消息2到＊bar()，它又将其委托给＊foo()，后者捕获并处理它。                        
      然后，<span class="s2">yield</span> "C"把"C"发送回去作为it.throw(2)调用返回的value。                        
      2. 接下来从＊foo()内throw出来的值"D"传播到＊bar()，这个函数捕获并处理它。然后<span class="s2">yield</span> "E"把"E"发送回去作为it.<span class="s3">next</span>(3)调用返回的value。                       
      3. 然后，从＊baz() throw出来的异常并没有在＊bar()内被捕获——所以＊baz()和＊bar()都被设置为完成状态。                       
      这段代码之后，就再也无法通过任何后续的<span class="s3">next</span>(..)调用得到值"G", <span class="s3">next</span>(..)调用只会给value返回undefined。                       
                              
* 4.5.3 <span class="s3">异步</span>委托                              
我们终于回到前面的多个顺序Ajax请求的<span class="s2">yield</span>委托例子：
  ```javascript                              
  function *foo(){                              
    var r2 = yield request("http://some.url.2");                            
    var r3 = yield request("http://some.url.3/?v=" + r2);                           
    return r3;                            
  }                             
                                
  function *bar(){                              
    var r1 = yield request("http://some.url.1");                            
    var r3 = yield *foo();                            
    console.log(r3);                            
  }                             
  run(bar);
  ```                             
这里我们在＊bar()内部没有调用<span class="s2">yield</span> run(foo)，而是调用<span class="s2">yield</span> ＊foo()。                             
在这个例子之前的版本中，使用了<span class="s1">Promise</span>机制（通过run(..)控制）把值从＊foo()内的return r3传递给＊bar()中的局部变量r3。现在，这个值通过<span class="s2">yield</span> ＊机制直接返回。                             
除此之外的行为非常相似。                              
                              
* 4.5.4 递归委托                              
当然，<span class="s2">yield</span>委托可以跟踪任意多委托步骤，只要你把它们连在一起。                             
甚至可以使用<span class="s2">yield</span>委托实现<span class="s3">异步</span>的<span class="s4">生成器</span>递归，即一个<span class="s2">yield</span>委托到它自身的<span class="s4">生成器</span>：
  ```javascript                             
  function *foo(val){                             
    if(val > 1){                            
      // 生成器递归                          
      val = yield *foo(val -1);                         
    }                           
    return yield request("http://some.url/?v=" + val);                            
  }                             
                                
  function *bar(){                              
    var r1 = yield *foo(3);                           
    console.log(r1);                            
  }                             
                                
  run(bar);       
  ```                      
  * run(..)工具可以通过run( foo, 3 )调用，因为它支持额外的参数和<span class="s4">生成器</span>一起传入。但是，这里使用了没有参数的＊bar()，以展示<span class="s2">yield</span> ＊的灵活性。                           
  * 这段代码后面的处理步骤是怎样的呢？坚持一下，接下来的细节描述可能会非常复杂。                            
    1. run(bar)启动<span class="s4">生成器</span>＊bar()。                         
    2. foo(3)创建了一个＊foo(..)的<span class="s5">迭代器</span>，并传入3作为其参数val。                          
    3. 因为3 > 1，所以foo(2)创建了另一个<span class="s5">迭代器</span>，并传入2作为其参数val。                          
    4. 因为2 > 1，所以foo(1)又创建了一个新的<span class="s5">迭代器</span>，并传入1作为其参数val。                          
    5. 因为1 > 1不成立，所以接下来以值1调用request(..)，并从这第一个Ajax调用得到一个promise。                          
    6. 这个promise通过<span class="s2">yield</span>传出，回到＊foo(2)<span class="s4">生成器</span>实例。                         
    7. <span class="s2">yield</span> ＊把这个promise传出回到＊foo(3)<span class="s4">生成器</span>实例。                         
    另一个<span class="s2">yield</span> ＊把这个promise传出回到＊bar()<span class="s4">生成器</span>实例。                          
    再有一个<span class="s2">yield</span> ＊把这个promise传出回到run(..)工具，这个工具会等待这个promsie（第一个Ajax请求）的处理。                          
    8. 这个promise决议后，它的完成消息会发送出来恢复＊bar()；                          
    后者通过<span class="s2">yield</span> ＊转入＊foo(3)实例；                         
    后者接着通过<span class="s2">yield</span> ＊转入＊foo(2)<span class="s4">生成器</span>实例；                          
    后者再接着通过<span class="s2">yield</span> ＊转入＊foo(3)<span class="s4">生成器</span>实例内部的等待着的普通<span class="s2">yield</span>。                         
    9. 第一个调用的Ajax响应现在立即从＊foo(3)<span class="s4">生成器</span>实例中返回。                          
    这个实例把值作为＊foo(2)实例中<span class="s2">yield</span> ＊表达式的结果返回，赋给它的局部变量val。                          
    10. 在＊foo(2)中，通过request(..)发送了第二个Ajax请求。                          
    它的promise通过<span class="s2">yield</span>发回给＊foo(1)实例，然后通过<span class="s2">yield</span> ＊一路传递到run(..)（再次进行步骤7）。                          
    这个promise决议后，第二个Ajax响应一路传播回到＊foo(2)<span class="s4">生成器</span>实例，赋给它的局部变量val。                         
    11. 最后，通过request(..)发出第三个Ajax请求，它的promise传出到run(..)，然后它的决议值一路返回，然后return返回到＊bar()中等待的<span class="s2">yield</span> ＊表达式。                          
    噫！这么多疯狂的脑力杂耍，是不是？这一部分你可能需要多读几次，然后吃点零食让大脑保持清醒！                         
                              
                              
## 4.6 <span class="s4">生成器</span><span class="s5">并发</span>
就像我们在第1章和本章前面都讨论过的一样，两个同时运行的进程可以合作式地交替运作，而很多时候这可以产生（双关，原文为<span class="s2">yield</span>：既指产生又指<span class="s2">yield</span>关键字）非常强大的<span class="s3">异步</span>表示。                             
* 坦白地说，本部分前面的多个<span class="s4">生成器</span><span class="s5">并发</span>交替执行的例子已经展示了如何使其看起来令人迷惑。                              
但是，我们已经暗示过了，在一些场景中这个功能会很有用武之地的。                             
回想一下第1章给出的一个场景：其中两个不同<span class="s5">并发</span>Ajax响应处理函数需要彼此协调，以确保数据交流不会出现竞态条件。我们把响应插入到res数组中，就像这样：    
```javascript                          
function response(data) {                             
  if(data.url == "http://some.url.1"){                            
    res[0] = data;                          
  }                           
  else if(data.url == "http://some.url.2"){                           
    res[1] = data;                          
  }                           
}         
```                    
但是这种场景下如何使用多个<span class="s5">并发</span><span class="s4">生成器</span>呢？  
  ```javascript                            
  // request(..)是一个支持Promise的Ajax工具                             
  var res = [];                             
                                
  function *reqData(url){                             
    res.push(                           
      yield request(url)                          
    };                            
  }    
  ```                         
  * 这里我们将使用<span class="s4">生成器</span>＊reqData(..)的两个实例，但运行两个不同<span class="s4">生成器</span>的实例也没有任何区别。                           
  两种方法的过程几乎一样。                            
  稍后将会介绍两个不同<span class="s4">生成器</span>的彼此协调。                           
  * 这里不需要手工为res[0]和res[1]赋值排序，而是使用合作式的排序，使得res. push(..)把值按照预期以可预测的顺序正确安置。这样，表达的逻辑给人感觉应该更清晰一点。                            
  * 但是，实践中我们如何安排这些交互呢？                            
    * 首先，使用<span class="s1">Promise</span>手工实现：   
      ```javascript                      
      var it1 = reqData("http://some.url.1");                         
      var it2 = reqData("http://some.url.2");                         
                                
      var p1 = it1.next();                          
      var p2 = it2.next();                          
                                
      p1                          
      .then(function(data){                         
        it1.next(data);                       
        return p2;                        
      })                          
      .then(function(data){                         
        it2.next(data);                       
      });       
      ```                  
      ＊reqData(..)的两个实例都被启动来发送它们的Ajax请求，然后通过<span class="s2">yield</span>暂停。                        
      然后我们选择在p1决议时恢复第一个实例，                        
      然后p2的决议会重启第二个实例。                        
      通过这种方式，我们使用<span class="s1">Promise</span>配置确保res[0]中会放置第一个响应，而res[1]中会放置第二个响应。                       
    * 但是，坦白地说，这种方式的手工程度非常高，并且它也不能真正地让<span class="s4">生成器</span>自己来协调，而那才是真正的威力所在。                          
    让我们换一种方法试试：  
      ```javascript                       
      // request(..)是一个支持Promise的Ajax工具                         
                                
      var res = [];                         
                                
      function *reqData(url){                         
        var data = yield request(url);                        
                                
        // 控制转移                       
        yield;                        
                                
        res.push(data);                       
      }                         
                                
      var it1 = reqData("http://some.url.1");                         
      var it2 = reqData("http://some.url.2");                         
                                
      var p1 = it1.next();                          
      var p2 = it2.next();                          
                                
      p1.then(function(data){                         
        it1.next(data);                       
      });                         
                                
      p2.then(function(data){                         
        it2.next(data);                       
      });                         
                                
      Promise.all([p1, p2])                         
      .then(function(){                         
        it1.next();                       
        it2.next();                       
      });     
      ```                    
      * 好吧，这看起来好一点（尽管仍然是手工的！），因为现在＊reqData(..)的两个实例确实是<span class="s5">并发</span>运行了，而且（至少对于前一部分来说）是相互独立的。                       
      * 在前面的代码中，第二个实例直到第一个实例完全结束才得到数据。                        
      但在这里，两个实例都是各自的响应一回来就取得了数据，然后每个实例再次<span class="s2">yield</span>，用于控制传递的目的。                        
      然后我们在<span class="s1">Promise</span>.all([ .. ])处理函数中选择它们的恢复顺序。                       
    * 可能不那么明显的是，因为对称性，这种方法以更简单的形式暗示了一种可重用的工具。                         
    还可以做得更好。来设想一下使用一个称为runAll(..)的工具： 
      ```javascript                        
      // request(..)是一个支持Promise的Ajax工具                         
                                
      var res = [];                         
                                
      runAll(                         
        function *(){                       
          var p1 = request("http://some.url.1");                      
                                
          // 控制转移                     
          yield;                      
                                
          res.push(yield p1);                     
        },                        
        function *(){                       
          var p2 = request("http://some.url.2");                      
                                
          // 控制转移                     
          yield;                      
                                
          res.push(yield p2);                     
        }                       
      );           
      ```               
    们不准备列出runAll(..)的代码，不仅是因为其可能因太长而使文本混乱，也因为它是我们在前面run(..)中实现的逻辑的一个扩展。                         
    所以，我们把它作为一个很好的扩展练习，请试着从run(..)的代码演进实现我们设想的runAll(..)的功能。                          
    我的asynquence库也提供了一个前面提过的runner(..)工具，其中已经内建了对类功能的支持，这将在本部分的附录A中讨论。                          
      * 以下是runAll(..)内部运行的过程。                       
        1. 第一个<span class="s4">生成器</span>从第一个来自于"`http://some.url.1`"的Ajax响应得到一个promise，然后把控制<span class="s2">yield</span>回runAll(..)工具。                      
        2. 第二个<span class="s4">生成器</span>运行，对于"`http://some.url.2`"实现同样的操作，把控制<span class="s2">yield</span>回runAll(..)工具。                     
        3. 第一个<span class="s4">生成器</span>恢复运行，通过<span class="s2">yield</span>传出其promise p1。                     
        在这种情况下，runAll(..)工具所做的和我们之前的run(..)一样，因为它会等待这个promise决议，然后恢复同一个<span class="s4">生成器</span>（没有控制转移！）。                      
        p1决议后，runAll(..)使用这个决议值再次恢复第一个<span class="s4">生成器</span>，然后res[0]得到了自己的值。                      
        接着，在第一个<span class="s4">生成器</span>完成的时候，有一个隐式的控制转移。                     
        4. 第二个<span class="s4">生成器</span>恢复运行，通过<span class="s2">yield</span>传出其promise p2，并等待其决议。                      
        一旦决议，runAll(..)就用这个值恢复第二个<span class="s4">生成器</span>，设置res[1]。                      
      * 在这个例子的运行中，我们使用了一个名为res的外层变量来保存两个不同的Ajax响应结果，我们的<span class="s5">并发</span>协调使其成为可能。                        
    * 但是，如果继续扩展runAll(..)来提供一个内层的变量空间，以使多个<span class="s4">生成器</span>实例可以共享，将是非常有帮助的，                         
    比如下面这个称为data的空对象。                         
    还有，它可以接受<span class="s2">yield</span>的非<span class="s1">Promise</span>值，并把它们传递到下一个<span class="s4">生成器</span>。  
      ```javascript                        
      // request(..)是一个支持Promise的Ajax工具                         
      runAll(                         
        function *(data){                       
          data.res = [];                      
                                
          // 控制转移（以及消息传递）                     
          var url1 = yield "http://some.url.2";                     
          var p1 = request(url1);  // "http://some.url.1"                     
                                
          // 控制转移                     
          yield;                      
                                
          data.res.push(yield p1);                      
        },                        
        function *(data){                       
          // 控制转移（以及消息传递）                     
          var url2 = yield "http://some.url.1";                     
          var p2 = request(url2);  // "http://some.url.2"                     
                                
          // 控制转移                     
          yield;                      
                                
          data.res.push(yield p2);                      
        }                       
      );       
      ```                   
    在这一方案中，实际上两个<span class="s4">生成器</span>不只是协调控制转移，还彼此通信，通过data.res和<span class="s2">yield</span>的消息来交换url1和url2的值。真是极其强大！                          
    这样的实现也为被称作通信顺序进程（Communicating SequentialProcesses, CSP）的更高级<span class="s3">异步</span>技术提供了一个概念基础。对此，我们将在本部分的附录B中详细讨论。                          
                              
## 4.7 形实转换程序
* 目前为止，我们已经假定从<span class="s4">生成器</span><span class="s2">yield</span>出一个<span class="s1">Promise</span>，并且让这个<span class="s1">Promise</span>通过一个像run(..)这样的辅助函数恢复这个<span class="s4">生成器</span>，这是通过<span class="s4">生成器</span>管理<span class="s3">异步</span>的最好方法。要知道，事实的确如此。                              
* 但是，我们忽略了另一种广泛使用的模式。为了完整性，我们来简要介绍一下这种模式。                             
  * 在通用计算机科学领域，有一个早期的前JavaScript概念，称为形实转换程序（<span class="s1">thunk</span>）。                           
  我们这里将不再陷入历史考据的泥沼，而是直接给出形实转换程序的一个狭义表述：                           
  JavaScript中的<span class="s1">thunk</span>是指一个用于调用另外一个函数的函数，没有任何参数。                            
  换句话说，你用一个函数定义封装函数调用，包括需要的任何参数，来定义这个调用的执行，那么这个封装函数就是一个形实转换程序。                            
  之后在执行这个<span class="s1">thunk</span>时，最终就是调用了原始的函数。                           
  * <span class="s6">同步</span>的<span class="s1">thunk</span>是非常简单的。                           
  举例来说：            
    ```javascript               
    function foo(x, y){                           
      return x + y;                         
    }                           
                                
    function fooThunk(){                            
      return foo(3, 4);                         
    }                           
                                
    // 将来                           
    console.log(fooThunke());  // 7  
    ```                         
    * 但如果是<span class="s3">异步</span>的thunk呢？                            
      * 我们可以把这个狭窄的thunk定义扩展到包含让它接收一个回调。 
        ```javascript                        
        function foo(x, y, cb){                         
          setTimeout(function(){                        
            cb(x + y);                      
          }, 1000);                       
        }                         
                                  
        function fooThunk(cb){                          
          foo(3, 4, cb);                        
        }                         
                                  
        // 将来                         
        fooThunk(function(sum){                         
          console.log(sum);  // 7                       
        });  
        ```                       
    正如所见，fooThunk(..)只需要一个参数cb(..)，因为它已经有预先指定的值3和4（分别作为x和y）可以传给foo(..)。                         
    <span class="s1">thunk</span>就耐心地等待它完成工作所需的最后一部分：那个回调。                          
    * 但是，你并不会想手工编写<span class="s1">thunk</span>。所以，我们发明一个工具来做这部分封装工作。
      ```javascript                         
      function thunkify(fn){                          
        var args = [].slice.call(arguments, 1);                       
        return function(cb){                        
          args.push(cb);                      
          return fn.apply(null, args);                      
        };                        
      }                         
                                
      var fooThunk = thunkify(foo, 3, 4);                         
                                
      // 将来                         
      fooThunk(function(sum){                         
        console.log(sum);   // 7                        
      });                 
      ```        
      * 这里我们假定原始（foo(..)）函数原型需要的回调放在最后的位置，其他参数都在它之前。                        
      对<span class="s3">异步</span>JavaScript函数标准来说，这可以说是一个普遍成立的标准。你可以称之为“callback-last风格”。                       
      如果出于某种原因需要处理“callback-first风格”原型，你可以构建一个使用args.unshift(..)而不是args.push(..)的工具。                        
      * 前面<span class="s7">thunkify</span>(..)的实现接收foo(..)函数引用以及它需要的任意参数，并返回<span class="s1">thunk</span>本身（fooThunk(..)）。                        
      但是，这并不是JavaScript中使用<span class="s1">thunk</span>的典型方案。                       
    * 典型的方法——如果不令人迷惑的话——并不是<span class="s7">thunkify</span>(..)构造<span class="s1">thunk</span>本身，而是<span class="s7">thunkify</span>(..)工具产生一个生成<span class="s1">thunk</span>的函数。
      ```javascript
      function thunkify(fn){                          
        return function(){                        
          var args = [].slice.call(arguments);                      
          return function(cb){                      
            args.push(cb);                    
            return fn.apply(null, args);                    
          };                      
        }                       
      }        
      ```                 
    此处主要的区别在于多出来的return function() { .. }这一层。                         
      * 以下是用法上的区别：
        ```javascript                        
        var whatIsThis = thunkify(foo);                       
        var fooThunk = whatIsThis(3, 4);                        
                                
        // 将来                       
        fooThunk(function(sum){                       
          console.log(sum);  // 7                     
        });   
        ```                    
      * 显然，这段代码暗藏的一个大问题是：whatIsThis调用的是什么。                        
      并不是这个<span class="s1">thunk</span>，而是某个从foo(..)调用产生<span class="s1">thunk</span>的东西。                        
      这有点类似于<span class="s1">thunk</span>的“工厂”。                       
      似乎还没有任何标准约定可以给这样的东西命名。                        
      * 所以我的建议是thunkory（thunk+factory）。                       
      于是就有，<span class="s7">thunkify</span>(..)生成一个thunkory，然后thunkory生成<span class="s1">thunk</span>。                        
      这和第3章中我提议promisory出于同样的原因：     
        ```javascript                   
        var fooThunkory = thunkify(foo);                        
                                
        var fooThunk1 = fooThunkory(3, 4);                        
        var fooThunk2 = fooThunkory(5, 6);                        
                                
        // 将来                       
        fooThunk1(function(sum){                        
          console.log(sum);   // 7                      
        });                       
                                
        fooThunk2(function(sum){                        
          console.log(sum);  // 11                      
        });            
        ```           
        * foo(..)例子要求回调的风格不是error-first风格。                      
        当然，error-first风格要常见得多。                      
        如果foo(..)需要满足一些正统的错误生成期望，可以把它按照期望改造，使用一个error-first回调。                      
        后面的<span class="s7">thunkify</span>(..)机制都不关心回调的风格。                     
        使用上唯一的区别将会是fooThunk1(function(err, sum){..。                     
        * 暴露thunkory方法——而不是像前面的<span class="s7">thunkify</span>(..)那样把这个中间步骤隐藏——似乎是不必要的复杂性。                     
        但是，一般来说，在程序开头构造thunkory来封装已有的API方法，并在需要<span class="s1">thunk</span>时可以传递和调用这些thunkory，是很有用的。                     
        两个独立的步骤保留了一个更清晰的功能分离。                     
        以下代码可说明这一点：      
          ```javascript               
          // 更简洁：                     
          var fooThunkory = thunkify(foo);                      
                                
          var fooThunk1 = fooThunkory(3, 4);                      
          var fooThunk2 = fooThunkory(5, 6);                      
                                
          // 而不是：                     
          var fooThunk1 = thunkify(foo, 3, 4);                      
          var fooThunk2 = thunkify(foo, 5, 6);  
          ```                    
        不管你是否愿意显式地与thunkory打交道，<span class="s1">thunk</span> fooThunk1(..)和fooThunk2(..)的用法都是一样的。                     
        s/promise/thunk/                      
          * 那么所有这些关于<span class="s1">thunk</span>的内容与<span class="s4">生成器</span>有什么关系呢？                   
            * 可以把<span class="s1">thunk</span>和promise大体上对比一下：它们的特性并不相同，所以并不能直接互换。                  
            <span class="s1">Promise</span>要比裸<span class="s1">thunk</span>功能更强、更值得信任。                  
              * 但从另外一个角度来说，它们都可以被看作是对一个值的请求，回答可能是<span class="s3">异步</span>的。               
              回忆一下，在第3章里我们定义了一个工具用于promise化一个函数，我们称之为<span class="s1">Promise</span>.wrap(..)，也可以将其称为<span class="s7">promisify</span>(..)！               
              这个<span class="s1">Promise</span>封装工具并不产生<span class="s1">Promise</span>，它生成的是promisory，而promisory则接着产生<span class="s1">Promise</span>。               
              这和现在讨论的thunkory和<span class="s1">thunk</span>是完全对称的。                
              为了说明这种对称性，我们要首先把前面的foo(..)例子修改一下，改成使用error-first风格的回调：
                ```javascript                
                function foo(x, y, cb){               
                  setTimeout(function(){              
                    // 假定cb(..)是error-first风格的            
                    cb(null, x + y);            
                  }, 1000);             
                }           
                ```    
              * 现在我们对比一下<span class="s7">thunkify</span>(..)和<span class="s7">promisify</span>(..)（即第3章中的<span class="s1">Promise</span>.wrap(..)）的使用：
                ```javascript                
                // 对称：构造问题提问者               
                var fooThunkory = thunkify(foo);                
                var fooPromisory = promisify(foo);                
                                
                // 对称：提问                
                var fooThunk = fooThunkory(3, 4);               
                var fooPromise = fooPromisory(3, 4);                
                                
                // 得到答案               
                fooThunk(function(err, sum){                
                  if(err){              
                    console.error(err);           
                  }             
                  else {              
                    console.log(sum);  // 7           
                  }             
                });               
                                
                // 得到promise答案                
                fooPromise                
                .then(                
                  function(sum){              
                    console.log(sum);   // 7            
                  },              
                  function(err){              
                    console.error(err);           
                  }             
                );    
                ```            
              thunkory和promisory本质上都是在提出一个请求（要求一个值），分别由<span class="s1">thunk</span> fooThunk和promise fooPromise表示对这个请求的未来的答复。这样考虑的话，这种对称性就很清晰了。                
            * 了解了这个视角之后，就可以看出，<span class="s2">yield</span>出<span class="s1">Promise</span>以获得<span class="s3">异步</span>性的<span class="s4">生成器</span>，也可以为<span class="s3">异步</span>性而<span class="s2">yield</span> <span class="s1">thunk</span>。                  
            我们所需要的只是一个更智能的run(..)工具（就像前面的一样），不但能够寻找和链接<span class="s2">yield</span>出来的<span class="s1">Promise</span>，还能够向<span class="s2">yield</span>出来的<span class="s1">thunk</span>提供回调。   
            ```javascript               
            function *foo(){                  
              var val = yield request("http://some.url.1");               
              console.log(val);               
            }                 
            run(foo);  
            ```               
              * 在这个例子中，request(..)可能是一个返回promise的promisory，也可能是一个返回<span class="s1">thunk</span>的thunkory。从<span class="s4">生成器</span>内部的代码逻辑的角度来说，我们并不关心这个实现细节，这一点是非常强大的！                
              * 于是，request(..)可能是以下两者之一：       
              ```javascript         
              // promisory request(..)（参见第3章）               
              var request = Promise.wrap(ajax);               
                              
              // vs.                
                              
              // thunkory request(..)               
              var request = thunkify(ajax);  
              ```             
* 最后，作为前面run(..)工具的一个支持<span class="s1">thunk</span>的补丁，我们还需要这样的逻辑：
```javascript                             
// ..                             
// 我们收到返回的thunk了吗？                              
else if(typeof next.value == "function"){                             
  return new Promise(function(resolve, reject){                           
    // 用error-first回调调用这个thunk                          
    next.value(function(err, msg){                          
      if(err){                        
                    reject(err);          
      }                       
      else {                        
                    resolve(msg);         
      }                       
    });                         
  })                            
  .then(                            
    hanldeNext,                         
    function handleErr(err){                          
      return Promise.resolve(                       
                    it.throw(err)         
      )                       
      .then(handleResult);                        
    }                         
  );                            
}           
```                  
  * 现在，我们的<span class="s4">生成器</span>可以调用promisory来<span class="s2">yield</span> <span class="s1">Promise</span>，也可以调用thunkory来<span class="s2">yield</span> <span class="s1">thunk</span>。                           
  不管哪种情况，run(..)都能够处理这个值，并等待它的完成来恢复<span class="s4">生成器</span>运行。                           
* 从对称性来说，这两种方案看起来是一样的。                              
但应该指出，这只是从代表<span class="s4">生成器</span>的未来值continuation的<span class="s1">Promise</span>或<span class="s1">thunk</span>的角度说才是正确的。                             
* 从更大的角度来说，<span class="s1">thunk</span>本身基本上没有任何可信任性和可组合性保证，而这些是<span class="s1">Promise</span>的设计目标所在。                              
单独使用<span class="s1">thunk</span>作为Pormise的替代在这个特定的<span class="s4">生成器</span><span class="s3">异步</span>模式里是可行的，但是与<span class="s1">Promise</span>具备的优势（参见第3章）相比，这应该并不是一种理想方案。                              
* 如果可以选择的话，你应该使用<span class="s2">yield</span> pr而不是<span class="s2">yield</span> th。                              
但对run(..)工具来说，对两种值类型都能提供支持则是完全正确的。                              
* 我的asynquence库（详见附录A）中的runner(..)工具可以处理<span class="s1">Promise</span>、<span class="s1">thunk</span>和asynquence序列的<span class="s2">yield</span>                              
                              
## 4.8 ES6之前的<span class="s4">生成器</span>
现在，希望你已经相信，<span class="s4">生成器</span>是<span class="s3">异步</span>编程工具箱中新增的一种非常重要的工具。                              
但是，这是ES6中新增的语法，这意味着你没法像对待<span class="s1">Promise</span>（这只是一种新的API）那样使用<span class="s4">生成器</span>。                              
* 所以如果不能忽略ES6前的浏览器的话，怎么才能把<span class="s4">生成器</span>引入到我们的浏览器JavaScript中呢？                             
对ES6中所有的语法扩展来说，都有工具（最常见的术语是transpiler，指trans-compiler，翻译编译器）用于接收ES6语法并将其翻译为等价（但是显然要丑陋一些！）的前ES6代码。                             
因此，<span class="s4">生成器</span>可以被翻译为具有同样功能但可以工作于ES5及之前的代码。                              
* 可怎么实现呢？显然<span class="s2">yield</span>的“魔法”看起来并不那么容易翻译。                             
实际上，我们之前在讨论基于闭包的<span class="s5">迭代器</span>时已经暗示了一种解决方案。                              
### 4.8.1 手工变换                             
在讨论transpiler之前，先来推导一下对<span class="s4">生成器</span>来说手工变换是如何实现的。                             
这不只是一个理论上的练习，因为这个练习实际上可以帮助我们更深入理解其工作原理。   
  ```javascript                          
  // request(..)是一个支持Promise的Ajax工具                             
  function *foo(url){                             
    try {                           
      console.log("requesting:", url);                          
      var val = yield request(url);                         
      console.log(val);                         
    }                           
    catch(err){                           
      console.log("Oops:", err);                          
      return false;                         
    }                           
  }                           
                                
  var it = foo("http://some.url.1");  
  ```                            
  * 首先要观察到的是，我们仍然需要一个可以调用的普通函数foo()，它仍然需要返回一个<span class="s5">迭代器</span>。                           
  因此，先把非<span class="s4">生成器</span>变换的轮廓刻画出来：
    ```javascript                           
    function foo(url){                            
      // ..                         
                                
      // 构造并返回一个迭代器                         
      return {                          
        next: function(v) {                       
          // ..                     
        },                        
        throw: function(e){                       
          // ..                     
        }                       
      };                          
    }                           
                                
    var it = foo("http://some.url.1");    
    ```                        
  * 接下来要观察到的是，<span class="s4">生成器</span>是通过暂停自己的作用域/状态实现它的“魔法”的。                           
  可以通过函数闭包（参见本系列的《你不知道的JavaScript（上卷）》的“作用域和闭包”部分）来模拟这一点。                           
  为了理解这样的代码是如何编写的，我们先给<span class="s4">生成器</span>的各个部分标注上状态值：
    ```javascript                           
    // request(..)是一个支持Promise的Ajax工具                           
    function *foo(url){                           
      // 状态1                          
      try{                          
        console.log("requesting:", url);                        
        var TMP1 = request(url);                        
                                
        // 状态2                        
        var val = yield TMP1;                       
        console.log(val);                       
      }                         
      catch(err){                         
        // 状态3                        
        console.log("Oops:", err);                        
        return false;                       
      }                         
    }           
    ```                
    * 为了更精确地展示，我们使用临时变量TMP1把val = <span class="s2">yield</span> request.．语句分成了两个部分。                         
    request(..)在状态1发生，其完成值赋给val发生在状态2。                          
    当我们把代码转换成其非<span class="s4">生成器</span>等价时，会去掉这个中间变量TMP1。                          
    * 换句话说，                         
      * 1是起始状态，                       
      * 2是request(..)成功后的状态，                        
      * 3是request(..)失败的状态。                       
      你大概能够想象出如何把任何额外的<span class="s2">yield</span>步骤编码为更多的状态。                        
    * 回到我们翻译的<span class="s4">生成器</span>，让我们在闭包中定义一个变量state用于跟踪状态：  
      ```javascript                        
      function foo(url){                          
        // 管理生成器状态                        
        var state;                        
        // ..                       
      }           
      ```              
  * 现在在闭包内定义一个内层函数，称为process(..)，使用switch语句处理每个状态：
    ```javascript                            
    // request(..)是一个支持Promise的Ajax工具                           
    function foo(url){                            
      // 管理生成器状态                          
      var state;                          
                                
      // 生成器范围变量声明                          
      var val;                          
                                
      function process(v){                          
        switch(state){                        
          case 1:                     
            console.log("requesting:", url);                    
            return request(url);                    
          case 2:                     
            val = v;                    
            console.log(val);                   
            return;                   
          case 3:                     
            var err = v;                    
            console.log("Oops:", err);                    
            return false;                   
        }                       
      }                         
                                
      // ..                         
    }         
    ```                  
    * 我们<span class="s4">生成器</span>的每个状态都在switch语句中由自己的case表示。每次需要处理一个新状态的时候就会调用process(..)。                          
    稍后我们将会回来介绍这是如何工作的。                          
    * 对于每个<span class="s4">生成器</span>级的变量声明（val），我们都把它移动为process(..)外的一个val声明，这样它们就可以在多个process(..)调用之间存活。                          
    不过块作用域的变量err只在状态3中需要使用，所以把它留在原来的位置。                         
    *                           
      1. 在状态1，没有了<span class="s2">yield</span> resolve(..)，我们所做的是return resolve(..)。                        
      2. 在终止状态2，没有显式的return，所以我们只做一个return，这等价于return undefined。                        
      3. 在终止状态3，有一个return false，因此就保留这一句。                       
                              
  * 现在需要定义<span class="s5">迭代器</span>函数的代码，使这些函数正确调用process(..)： 
  ```javascript                           
  function foo(url){                            
    // 管理生成器状态                          
    var state;                          
                              
    // 生成器变量范围声明                          
    var val;                          
                              
    function process(v){                          
      switch(state){                        
        case 1:                     
          console.log("requesting:", url);                    
          return request(url);                    
        case 2:                     
          val = v;                    
          console.log(val);                   
          return;                   
        case 3:                     
          var err = v;                    
          console.log("Oops:", err);                    
          return false;                   
      }                       
    }                         
    // 构造并返回一个迭代器                         
    return {                          
      next: function(v){                        
        // 初始状态                     
        if(!state){                     
          state = 1;                    
          return {                    
            done: false,                  
            value: process()                  
          };                    
        }                     
        // yield 成功烣复                     
        else if(state == 1){                      
          state = 2;                    
          return {                    
            done: true,                 
            value: process(v)                 
          }                   
        }                     
        // 生成器已经完成                      
        else {                      
          return {                    
            done: true,                 
            value: undefined                  
          };                    
        }                     
      },                        
      "throw": function(e){                       
        // 唯一的错误处理在状态1                      
        if(state == 1){                     
          state = 3;                    
          return {                    
            done: ture,                 
            value: process(e)                 
          };                    
        }                     
        // 否则错误就不会处理，所以只把它抛回                      
        else {                      
          throw e;                    
        }                     
      };                        
    };                          
  }       
  ```                    
    * 这段代码是如何工作的呢？                          
      1. 对<span class="s5">迭代器</span>的<span class="s3">next</span>()的第一个调用会把<span class="s4">生成器</span>从未初始化状态转移到状态1，然后调用process()来处理这个状态。                        
      request(..)的返回值是对应Ajax响应的<span class="s1">Promise</span>，作为value属性从<span class="s3">next</span>()调用返回。                        
      2. 如果Ajax请求成功，第二个<span class="s3">next</span>(..)调用应该发送Ajax响应值进来，这会把状态转移到状态2。                       
      再次调用process(..)（这次包括传入的Ajax响应值），从<span class="s3">next</span>(..)返回的value属性将是undefined。                       
      3. 然而，如果Ajax请求失败的话，就会使用错误调用throw(..)，这会把状态从1转移到3（而非2）。                        
      再次调用process(..)，这一次包含错误值。这个case返回false，被作为throw(..)调用返回的value属性。                        
    * 从外部来看（也就是说，只与<span class="s5">迭代器</span>交互），这个普通函数foo(..)与<span class="s4">生成器</span>＊foo(..)的工作几乎完全一样。                         
    所以我们已经成功地把ES6<span class="s4">生成器</span>转为了前ES6兼容代码！                          
  * 然后就可以手工实例化<span class="s4">生成器</span>并控制它的<span class="s5">迭代器</span>了，调用var it = foo("..")和it.<span class="s3">next</span>(..)等。                           
  甚至更好的是，我们可以把它传给前面定义的工具run(..)，就像run(foo, "..")。                           
                              
### 4.8.2 自动转换
前面的ES6<span class="s4">生成器</span>到前ES6等价代码的手工推导练习，向我们教授了概念上<span class="s4">生成器</span>是如何工作的。                             
但是，这个变换非常复杂，并且对于代码中的其他<span class="s4">生成器</span>而言也是不可移植的。                             
这部分工作通过手工实现十分不实际，会完全抵消<span class="s4">生成器</span>的一切优势。                             
* 但幸运的是，已经有一些工具可以自动把ES6<span class="s4">生成器</span>转化为前面小节中我们推导出来的结果那样的代码。                             
它们不仅会为我们完成这些笨重的工作，还会处理我们忽略的几个枝节问题。                              
  * regenerator就是这样的一个工具（`http://facebook.github.io/regenerator/`），出自Facebook的几个聪明人。                            
  如果使用regenerator来转换前面的<span class="s4">生成器</span>的话，以下是产生的代码（本书写作之时）：
  ```javascript                            
  // request(..)是一个支持Promise的Ajax工具                           
  var foo = regneratorRuntime.mark(function foo(url){                           
    var val;                          
    return regeneratorRuntime.wrap(funciton foo$(context$1$0){                          
      while(1) switch(context$1$0.prev = context$1$0){                        
        case 0:                     
          context$1$0.prev = 0;                   
          console.log("requesting:", url);                    
          context$1$0.next = 4;                   
          return request(url);                    
        case 4:                     
          val = context$1$0.sent;                   
          console.log(val);                   
          context$1$0.next = 12;                    
          break;                    
        case 8:                     
          context$1$0.prev = 8;                   
          context$1$0.t0 = context$1$0.catch(0);                    
          console.log("Oops:", context$1$0.t0);                   
          return context$1$0.abrup("return", false);                    
        case 12:                      
        case "end":                     
          return context$1$0.stop();                    
      }                       
    }, foo, this, [[0, 8]]);                          
  });                   
  ```        
    * 这与我们手工推导的结果有一些明显的相似之处，                          
      * 比如那些switch/case语句，                        
      * 而且我们甚至看到了移出闭包的val，就像我们做的一样。                       
    * 当然，一个不同之处是，regenerator的变换需要一个辅助库regeneratorRuntime，其中包含了管理通用<span class="s4">生成器</span>和<span class="s5">迭代器</span>的所有可复用逻辑。                          
    这些重复代码中有很多和我们的版本不同，但即使这样，很多概念还是可以看到的，比如context$1$0.<span class="s3">next</span> = 4记录<span class="s4">生成器</span>的下一个状态。                         
    主要的收获是，<span class="s4">生成器</span>不再局限于只能在ES6+环境中使用。                          
    一旦理解了这些概念，就可以在代码中使用，然后使用工具将其变换为与旧环境兼容的代码。                         
* 这比仅仅将修改后的<span class="s1">Promise</span> API用作前ES6 <span class="s1">Promise</span>所做的工作要多得多，                              
但是，付出的代价是值得的，                             
因为在实现以合理的、明智的、看似<span class="s6">同步</span>的、顺序的方式表达<span class="s3">异步</span>流程方面，<span class="s4">生成器</span>的优势太多了。                              
* 一旦迷上了<span class="s4">生成器</span>，就再也不会想回到那一团乱麻的<span class="s3">异步</span>回调地狱中了。                              
                              
## 4.9 小结
* <span class="s4">生成器</span>是ES6的一个新的函数类型，它并不像普通函数那样总是运行到结束。取而代之的是，<span class="s4">生成器</span>可以在运行当中（完全保持其状态）暂停，并且将来再从暂停的地方恢复运行。                              
* 这种交替的暂停和恢复是合作性的而不是抢占式的，这意味着<span class="s4">生成器</span>具有独一无二的能力来暂停自身，这是通过关键字<span class="s2">yield</span>实现的。不过，只有控制<span class="s4">生成器</span>的<span class="s5">迭代器</span>具有恢复<span class="s4">生成器</span>的能力（通过<span class="s3">next</span>(..)）。                              
* <span class="s2">yield</span>/<span class="s3">next</span>(..)这一对不只是一种控制机制，实际上也是一种双向**消息传递**机制。<span class="s2">yield</span> .．表达式本质上是暂停下来等待某个值，接下来的<span class="s3">next</span>(..)调用会向被暂停的<span class="s2">yield</span>表达式传回一个值（或者是隐式的undefined）。                             
* 在<span class="s3">异步</span>控制流程方面，<span class="s4">生成器</span>的关键优点是：<span class="s4">生成器</span>内部的代码是以自然的<span class="s6">同步</span>/顺序方式表达任务的一系列步骤。其技巧在于，我们把可能的<span class="s3">异步</span>隐藏在了关键字<span class="s2">yield</span>的后面，把<span class="s3">异步</span>移动到控制<span class="s4">生成器</span>的<span class="s5">迭代器</span>的代码部分。                              
* 换句话说，<span class="s4">生成器</span>为<span class="s3">异步</span>代码保持了顺序、<span class="s6">同步</span>、阻塞的代码模式，这使得大脑可以更自然地追踪代码，解决了基于回调的<span class="s3">异步</span>的两个关键缺陷之一。                              

