> [Vue.js快跑：构建触手可及的高性能Web应用](https://weread.qq.com/web/reader/82032410718487828207501kc81322c012c81e728d9d180)

# 第1章 Vue.js基础

# 第2章 Vue.js组件                                                           
* Vue.js允许并鼓励你将代码拆分为多个可在代码库中复用的组件。                                                            
这一章将详细阐述如何创建一个易于维护和理解的代码库。                                                            
* 那么什么是组件呢？                                                           
  * 组件是一段独立的、代表了页面的一个部分的代码片段。                                                         
  * 它拥有自己的数据、JavaScript脚本，以及样式标签。                                                         
  * 组件可以包含其他的组件，并且它们之间可以相互通信。                                                         
  * 组件可以是按钮或者图标这样很小的元素，                                                         
  也可以是一个更大的元素，比如在整个网站或者整个页面上重复使用的表单。                                                          
* 将代码从页面中分离到组件中的主要优势是，                                                            
  * 负责页面每一部分的代码都很靠近该组件中的其余代码。                                                         
  因此当你想要知道哪个元素有添加事件监听器，不必再在一堆JavaScript文件中搜索相应的选择器，因为JavaScript代码就在对应的HTML旁边！                                                         
  * 而且由于组件是独立的，还可以确保组件中的代码不会影响任何其他组件或产生任何副作用。                                                         
                                                            
## 组件基础
编写组件                                                            
### 1. 用对象语法定义组件                                                            
使用Vue.component()编写组件或是将它们作为对象存储可能会有点混乱，特别是处理更加复杂的组件时，你肯定不想在组件的template属性中编写大量的HTML代码。                                                            
  * 也可以注册一个全局的组件，只需像下面这样调用Vue.component()方法
    ```javascript
    Vue.component('custom-button', {                                                        
      template: '<button>自定义按钮</button>'                                                      
    });                          
    ```                             
    然后就可以在模板中使用这个组件了，和前面示例中的使用方式相同，                                                       
    但是你不需要在components配置对象中指定它了，它现在随处可用。                                                       
  * 可以通过components配置对象，将这个组件传入你的app
    ```javascript         
    <div id="app">                                                        
      <custom-button></custom-button>                                                     
    </div>                                                        
    <script>                                                        
      const CustomButton = {                                                      
        template: '<buttonn>自定义按钮</button>'                                                   
      };                                                      
      new Vue({                                                     
        el: '#app',                                                   
        components: {                                                   
          CustomButton                                                  
        }                                                   
      });                                                     
    </script> 
    ```                                                      
### 2. vue-loader和.vue文件                                                            
  vue-loader提供了一种方法，可以在.vue文件中以有条理并且易于理解的语法编写基于单个文件的组件。                                                         
  如果vue-loader已经设置好了，你就可以对这个前面出现过的组件进行处理：
  ```javascript
  Vue.component('display-number', {                                                         
    template: '<p>当前数字是{{ number }}</p>',                                                       
    props: {                                                        
      number: {                                                     
        type: Number,                                                   
        required: true                                                    
      }                                                     
    }                                                       
  });      
  ```                                                   
  把它修改成这样： 
  ```html                                                         
  // display-number.vue                                                         
  <template>                                                          
    <p>当前数字是{{ number }}</p>                                                        
  </template>                                                         
  <script>                                                          
    export default {                                                        
      props: {                                                      
        number: {                                                   
          type: Number,                                                 
          required: true                                                  
        }                                                   
      }                                                     
    };                                                        
  </script> 
  ```                                                        
  可以将其导入到应用中并使用它，就好像你用对象语法定义了它一样：
  ```html                                                         
  <div id="app">                                                          
    <display-number></display-number>                                                       
  </div>                                                          
  <script>                                                          
    import DisplayNumber from './components/display-number.vue';                                                        
    new Vue({                                                       
      components: {                                                     
        DisplayNumber                                                   
      }                                                     
    });                                                       
  </script>  
  ```                                                       
  经过webpack和vue-loader处理后，上面的代码的执行效果就和之前示例中的display-number组件一样。你必须使用预处理器，因为它无法直接在浏览器中工作。                                                          
  将组件分离到文件可以让你的代码更加容易维护。                                                          
  可以不必将所有的组件放在同一个大文件中，而是将它们分别保存在几个文件中，并放在相关名称的目录下，同时以它们所在的网站部分来命名，或者以组件的类型或规模来命名。                                                         
                                                            
## 数据、方法和计算属性
* 每个组件可以拥有它们自己的数据、方法和计算属性，以及所有在前面章节中出现过的属性——就像Vue实例一样。
* 定义组件的对象与我们用来定义Vue实例的对象相似，它们在很多地方可以互用。  
定义并注册一个包含数据和计算属性的全局组件：

```javascript                                                            
Vue.component('positive-numbers', {                                                           
  template: '<p>有{{ positiveNumbers.length }}个正数</p>',                                                          
  data() {                                                          
                                                            
                                                            
    return {                                                        
      numbers: [-5, 0, 2, -1, 1, 0.5]                                                     
    };                                                        
  },                                                          
  computed: {                                                         
    positiveNumbers() {                                                       
      return this.numbers.filter((number) => number >= 0);                                                      
    }                                                       
  }                                                         
});   
```    

  * 然后就可以在Vue模板的任何地方，通过<positive-numbers></positive-numbers>标签来使用这个组件。 
  *  Vue实例中的data属性是一个对象，然而组件中的data属性是一个函数。 
    * 这是因为一个组件可以在同一个页面上被多次引用，你大概不希望它们共享一个data对象 
    (因为同一个组件的每个实例的data属性是同一个对象的引用，当该组件的某个实例修改了自身的data属性，相当于所有实例的data属性都被修改了)                                                        
    * 所以组件的data属性应该是一个函数，在组件初始化时Vue会调用这个函数来生成data对象。 
    如果忘记将组件的data属性设置为函数，Vue会抛出一个警告。        
                                                            
## 传递数据
组件很有用，但当你开始传递数据到它内部时，组件才真正地展示出力量。                                                           
1. 可以使用props属性来传递数据                                                           
    1. Props是通过HTML属性传入组件的                                                          
    color="red"                                                         
      * 传递一个的简单数组，来表明组件可以接收的属性的名称
      ```html
      <div id="app">                                                      
        <color-preview color="red"></color-preview>                                                   
        <color-preview color="blue"></color-preview>                                                    
      </div>                                                      
      <script>                                                      
        Vue.component('color-preview', {                                                    
          template: '<div class="color-preview" :style="style"></div>',                                                 
          props: ['color'],                                                 
          computed: {                                                 
            style() {                                        
              return { backgroundColor: this.color };                                             
            }                                               
          }                                                 
        });                                                   
        new Vue({                                                   
          el: '#app',                                                 
        });                                                   
      </script> 
      ``` 
      以上示例代码会输出如下HTML片段： 
      ```html                                                     
      <div id="app">                                                    
        <div class="color-preview" style="background-color: red"></div>                                                 
        <div class="color-preview" style="background-color: blue"></div>                                                  
      </div>        
      ```                                            
      * 也可以传递一个对象，                                                        
          * 来描述属性的信息，                                                     
            * 比如它的类型、                                                   
            * 是否必须、                                                   
            * 默认值                                                   
            * 用于高级验证的自定义验证函数。                                                   
          * 要指定一个prop的类型，                                                     
            * 可以为它传递一个原生的构造函数，例如Number、 String或者Object
              ```javascript
              Vue.component('price-display', {                                                  
                props: {                                                
                  price: Number,                                              
                  unit: String                                              
                }                                               
              });                        
              ```                         
              如果price不是一个数字，或者unit不是一个字符串，Vue就会抛出一个警告。                                                  
              * 如果一个prop可以是多个类型中的一个，                                                  
              你就可以为它传递一个包含所有有效类型的数组，                                                  
              例如price: [Number, String, Price]                                                  
              （这里的Price是一个自定义的构造函数）。                                                  
            * 也可以指定一个prop是否是必需的，或者在没有传入值时，给它设定一个默认值。                                                  
            为此，可以传递给它一个对象而不是像前面那样的构造函数，并通过该对象的type属性来设置prop的类型：
              ```javascript
              Vue.component('price-display', {                                                
                props: {                                              
                  price: {                                            
                    type: Number,                                         
                    required: true                                          
                  },                                            
                  unit: {                                           
                    type: String,                                         
                    default: '$'                                          
                  }                                           
                }                                             
              })                          
              ```                      
              * price是一个必需的prop，如果没有传递值给它，就会抛出警告。                                               
              * unit不是必需的，但是有个默认值$，如果你没有传入任何值，在component内this.unit将会等于$                                               
            * 可以传递一个验证函数，                                                 
            该函数以prop的值为参数，在prop有效时应该返回true，而无效时则返回false。
              ```javascript
              price: {                                                
                type: Number,                                             
                required: true,                                             
                validator(value) {                                              
                  return value >= 0;                                            
                }                                             
              }          
              ```                                     
              验证了price是否大于零，这样你就不会在无意间为商品设置一个负数的价格                                                  
    2. 之后在组件内部，props属性的值表示可以传入组件的属性的名称                                                          
    这个例子中，就只有color。                                                         
    3. 然后，在组件内部就可以通过this.color来获取属性的值了。

  * Prop的大小写                                                            
  Vue都为我们处理好了。                                                            
  在HTML中通过kebab形式指定的属性，会在组件内部自动转换为camel形式：  
    ```html  
    <div id="app">                                                          
      <price-display percentage-discount="20%"></price-display>                                                       
    </div>                                                          
    <script>                                                          
      Vue.component('price-display', {                                                        
        props: {                                                      
          percentageDiscount: Number                                                    
        }                                                     
      });                                                       
      new Vue({                                                       
        el: '#app'                                                      
      });                                                       
    </script>                       
    ```                                  
                                                              
  * 响应式                                                           
    * 对于data对象、方法还有计算属性，当它们的值发生变化时，模板也会更新；                                                          
    * 同样，props也是这样的                                                         
      * 在父级实例中设定prop的值时，可以使用v-bind指令将该prop与某个值绑定。                                                       
      那么无论何时只要这个值发生变化，在组件内任何使用该prop的地方都会更新。                                                       
      如果prop的值不是字符串，那么就必须使用v-bind指令。                                                        
        * 比如下面的示例代码会抛出一个警告：                                                     
          <display-number number="10"></display-number>                             // 会抛出一个警告                      
          * 因为传递给number的是一个字符串，而不是数字。                                                   
          * 如果要传入一个数字，就要使用v-bind指令，                                                   
            * 它会把传入的值当作表达式求值，                                                 
            * 然后再传递给prop                                                  
    * 举个简单例子                                                          
      * 创建一个组件，它会显示设置在某个属性上的数字
        ```javascript             
        Vue.component('display-number', {                                                     
          template: '<p>当前数字是{{ number }}</p>',                                                   
          props: {                                                    
            number: {                                                 
              type: Number,                                               
              required: true                                                
            }                                                 
          }                                                   
        });            
        ```                                         
      * 然后将这个组件显示到页面，同时将它的值每秒加1：
        ```html             
        <div id="app">                                                      
          <display-number v-bind:number="number"></display-number>                                      // 如果prop的值不是字符串，那么就必须使用v-bind指令              
        </div>                                                      
        <script>                                                      
          new Vue({                                                   
            el: '#app',                                                 
            data: {                                                 
              number: 0                                               
            },                                                  
            created() {       // created函数在实例创建后执行                                          
              setInterval(() => {                                               
                this.number++;                                              
              }, 1000);                                               
            }                                                 
          });                                                   
        </script>       
        ```                                              
        传递给display-number的数字会每秒增加1，于是对应的prop也会每秒变化一次。                                                     
                                                              
  * 数据流和.sync修饰符                                                            
    * 数据通过prop从父级组件传递到子组件中，当父级组件中的数据更新时，传递给子组件的prop也会更新。                                                          
    但是你不可以在子组件中修改prop。                                                          
    这就是所谓的单向下行绑定，防止子组件在无意中改变父级组件的状态。                                                          
    * 如果想要使用双向绑定，可以使用一个修饰符来实现：.sync修饰符。                                                         
      * 它只是一个语法糖                
      ```javascript                                        
      <count-from-number :number.sync="numberToDisplay" />                           
      ```                             
      上面的代码等效于：         
      ```javascript                                              
      <count-from-number :number="numberToDisplay" @update:number="val => numberToDisplay = val" />      
      ```                                                 
      如果想要更改父级组件的值，需要触发update:number事件，该指令的参数——示例中为number——是将要更新的值的名称                                                       
      1. 通过触发事件来改变值                                                       
        如何实现一个CountFromNumber组件，它获取一个初始值并开始计数，同时更新父级组件的值：
        ```javascript
        Vue.component('count-from-number', {                                                      
          template: '<p>当前数字是{{ number }}</p>',                                                   
          props: {                                                    
            number: {                                                 
              type: Number,                                               
              required: true                                                
            }                                                 
          },                                                    
          mounted() {                                                   
            setInterval(() => {                                                 
              this.$emit('update:number', this.number + 1);                                               
            }, 1000);                                                 
          }                                                   
        });             
        ```                                        
        组件内部的值根本就不会变化，但是它改变了父级组件的值，这个值会通过prop传递回子组件。                                                      
      2. 使用计算属性来改变值                                                       
      在某些情况下，将触发事件的逻辑封装到计算属性中会有利于代码的组织
        ```javascript 
        Vue.component('count-from-number', {                                                      
          template: '<p>当前数字是{{ localNumber }}</p>',                                                    
          props: {                                                    
            number: {                                                 
              type: Number,                                               
              required: true                                                
            }                                                 
          },                                                    
          computed: {                                                   
            localNumber: {                                                  
              get() {                                               
                return this.number                                              
              },                                                
              set(value) {                                                
                this.$emit('update:number', value);                                             
              }                                               
            }                                                 
          },                                                    
          mounted() {                                                   
            setInterval(() => {                                                 
              this.localNumber++;                                               
            }, 1000);                                                 
          }                                                   
        });   
        ```                                                  
          * localNumber在效果上等同于number。                                                   
            * 它获取prop的值                                                 
            * 并且为localNumber设置新的值时，会触发事件来更新父级组件的值（父级组件中更新后的值会再次传递到子组件中）                                                 
          * 需要注意的是，这样有可能引发无限循环：                                                   
          如果父级组件与子组件都对同一个值的更新做出反应，并且在处理更新的过程中再次改变这个值，这会让你的应用程序出现问题！                                                   
    * 如果仅仅想要更新从prop传入的值，而不关心父级组件的值的更新，你可以在一开始的data函数中通过this来引用prop的值，将它复制到data对象中     
      ```javascript                                                    
      Vue.componet('count-from-number', {                                                       
        template: '<p>当前数字是{{ number }}</p>',                                                     
        porps: {                                                      
          initialNumber: {                                                    
            type: Number,                                                 
            required: true                                                  
          }                                                   
        },                                                      
        data() {                                                      
          return {                                                    
            number: this.initialNumber                                                  
          }                                                   
        },                                                      
        mounted() {                                                     
          setInterval(() => {                                                   
            this.number++;                                                  
          }, 1000);                                                   
        }                                                     
      });         
      ```                                              
        * 需要注意的是，如果prop的值更新了，组件内部并不会更新，因为它引用的是另外一个值。                                                      
        * 如果你想要根据新提供的数值重新开始计数，可以为initialNumber添加一个侦听器，将新的值复制给number。                                                      
                                                                
  * 自定义输入组件与v-model                                                           
  与.sync修饰符相似，可以在组件上使用v-model指令来创建自定义输入组件。                                                            
    * 这里同样也是一个语法糖             
      ```html                                            
      <input-username v-model="username" />          
      ```                                             
      上面的代码等效于：         
      ```html                                              
      <input-username :value="username" @input="value => username = value" />                                                       
      ```
    * 为了创建InputUsername组件，我们需要它做两件事情：                                                         
      1. 首先，它需要通过value属性获取初始值，                                                        
      2. 然后不论何时，只要value的值发生变化，它必须触发一个input事件。                                                       
      在这个例子中，我们要让组件将value的值转化为小写形式，再通过事件将它传递出去。                                                       
        * 在之前例子中使用的方法（通过触发事件来改变值或使用计算属性）将不再有效。                                                      
        * 这里，必须监听输入框元素的input事件         
        ```javascript                                             
        Vue.component('input-username', {                                                     
          template: '<input type="text" :value="value" @input="handleInput">',                                                    
          props: {                                                    
            value: {                                                  
              type: String,                                               
              required: true                                                
            }                                                 
          },                                                    
          methods: {                                                    
            handleInput(e) {                                                  
              const value = e.target.value.toLowerCase();                                               
              // 如果value发生变化，input的值也要更新                                                
              if(value != e.target.value) {                                               
                e.target.value = value;                                             
              }                                               
              this.$emit('input', value);                                               
            }                                                 
          }                                                   
        });         
        ```                                            
        * 现在可以像使用input元素一样使用这个组件了，v-model的用法还是不变。                                                     
        * 唯一的区别是无法输入大写字母！                                                     
          * 上面的示例存在一个问题：如果输入一个大写字母，光标会移动到文字的末尾。这在第一次输入内容时并不会有什么问题。但是如果回退光标去修改内容，光标将会出现跳动。                                                   
          这是一个很容易解决的问题，                                                   
          只需在设置e.target.value的值之前，保存当前光标的位置，                                                    
          在做出修改之后，再次设置光标的位置。
2. 使用插槽（slot）将内容传递给组件                                                           
    * 除了将数据作为prop传入到组件中，Vue也允许传入HTML。                                                           
    * 不仅可以传入字符串                                                         
      * 假如想要创建一个自定义按钮元素，                                                        
        * 你可能会通过一个属性来设置按钮的文本   
          ```html                                                   
          <custom-button text="单击我！"></custom-button>  
          ```                                                 
        * 不过下面这种方式会更加自然：  
          ```html                                                    
          <custom-button>单击我！</custom-button>   
          ```                                                
          * 要在组件中使用这个文本内容，可以像下面这样使用<slot>标签：
            ```javascript                                                    
            Vue.component('custom-button', {                                                  
              template: '<button class="custom-button"><slot></slot></button>'                                                
            })
            ```                                                  
          这样会生成如下HTML片段： 
            ```html                                                   
            <button class="custom-button">单击我！</button>       
            ```                                          
    * 也可以传入任何你想要的HTML，甚至是其他的Vue组件                                                         
      * 这样可以创建复杂的页面，而不至于让组件的体积变得过于庞大。                                                       
      可以把页面分割为一个头部组件、一个侧边栏组件和一个内容组件                                                       
      模板可以像下面这样：  
        ```html                                                      
        <div class="app">                                                     
          <site-header></site-header>                                                   
          <div class="container">                                                   
            <site-sidebar>                                                  
              ...这里是侧边栏的内容...                                               
            </site-sidebar>                                                 
            <site-main>                                                 
              ...这里是正文的内容...                                                
            </site-main>                                                  
          </div>                                                    
        </div>  
        ```                                                    
      这是一个构建网站的好方法，特别是当你开始使用局部CSS和vue-router时                                                       
                                                              
    * 默认内容                                                            
    如果为<slot>元素设定了内容，那么该内容会在组件没有接收到内容时被当作默认内容使用。                                                            
    1. 单个插槽                                                         
    这可能是插槽最普遍的用法，当然也是最容易理解的：                                                          
    传递给组件的内容会替换掉它里面的<slot>元素输出到页面上。                                                         
    为<custom-button>组件设置一些文本作为默认内容：                                                         
      * template属性只在非常简单的例子中才显得有用。
        ```javascript                                                        
        Vue.component('custom-button', {                                                      
          template: '<button class="custom-button"><slot><span class="default-text">默认的按钮文本</span></slot></button>'                                                   
                                                              
        });  
        ```                                                   
      * 在“vue-loader与.vue文件”一节中，将会讲到如何将HTML代码从组件对象中分离出去。                                                        
      在template的字符串中编写HTML会显得笨重，所以再来看看这个例子，不过这次是在HTML代码中：
        ```html
        <button class="custom-button">                                                      
          <slot>                                                    
            <span class="default-text">默认的按钮文本</span>                                                 
          </slot>                                                   
        </button>                                        
        ```             
      <slot>元素內有默认的文本，而且文本还被一个有着default-text类名的span元素包裹着。                                                       
      这完全是可选的——没有必要将插槽元素中的内容或是默认内容用其他元素包裹起来；                                                        
      你可以使用任何你想要的HTML内容。                                                        
                                                              
    2. 具名插槽                                                         
    具名插槽具有一个名称，它允许你在同一个组件中拥有多个插槽。

      * 假设，有一个简单的博文组件，它有一个头部（通常是一个标题，但也可能是其他东西）和一些文本。                                                       
        * 这个组件的模板可以是下面这样的： 
          ```html                                                     
          <section class="blog-post">                                                   
            <header>                                                  
              <slot name="header"></slot>                                               
              <p>作者{{ author.name }}</p>                                                
            </header>                                                 
            <main>                                                  
              <slot></slot>                                               
            </main>                                                 
          </section>      
          ```                                              
        一个不带 name 的 <slot> 出口会带有隐含的名字“default”。                                                     
        * 然后在模板中引用这个组件时，                                                      
                                                              
          * 在向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称                                                    
          注意 v-slot 只能添加在 <template> 上 (只有一种例外情况)，这一点和已经废弃的 slot attribute 不同。
          ```html
          <blog-post :author="author">                                                    
            <template v-slot:header>博文的标题</template>                                                  
            <template v-slot:default>                                                 
              <p>博文的内容</p>                                                
              <p>更多内容</p>                                               
            </template>                                                 
          </blog-post>                         
          ```                           
            * 现在 <template> 元素中的所有内容都将会被传入相应的插槽。                                                  
            * 任何没有被包裹在带有 v-slot 的 <template> 中的内容都会被视为默认插槽的内容。                                                  
                                                              
          * 自 2.6.0 起有所更新。已废弃的使用 slot attribute 的语法                                                   
          ~~可以使用slot属性来指定某个元素应该被插入名为header的插槽，而其他的HTML将被插入未命名的插槽：~~. 
          ~~`<blog-post :author="author">`~~ 
            ~~`<h2 slot="header">博文的标题</h2>`~~ 
            ~~`<p>博文的内容</p>`~~ 
            ~~`<p>更多内容</p>`~~ 
          ~~`</blog-post>`~~ 
          ~~生成的HTML看起来会是下面这样的：~~ 
          ~~`<section>`~~ 
            ~~`<header>`~~ 
              ~~`<h2>博文的标题</h2>`~~ 
              ~~`<p>作者Callum Macrae</p>`~~ 
            ~~`</header>`~~ 
            ~~`<main>`~~ 
              ~~`<p>博文的内容</p>`~~ 
              ~~`<p>更多内容</p>`~~ 
            ~~`</main>`~~ 
          ~~`</section>`~~. 
                                                              
    3. 作用域插槽                                                          
      [vue.js官网](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)                                                       
      * 可以将数据传回slot组件，使父组件中的元素可以访问子组件中的数据。                                                        
        * 创建一个获取用户信息的组件，而数据的显示则留给父级元素来处理：                                                     
        为了让 user 在父级的插槽内容中可用，我们可以将 user 作为 <slot> 元素的一个 attribute 绑定上去                                                      
        绑定在 <slot> 元素上的 attribute 被称为插槽 prop。
        ```javascript     
        Vue.component('user-data', {                                                      
          template: '<div class="user"><slot :user="user"></slot></div>',                                                   
          data: () => ({                                                    
            user: undefined,                                                  
          }),                                                   
          mounted() {                                                   
            // 设置this.user...                                                 
          }                                                   
        }); 
        ```                                                    
        * 引用这个组件，并用自己编写HMTL来显示用户信息：                                                     
          * 现在在父级作用域中，我们可以使用带值的 v-slot 来定义我们提供的插槽 prop 的名字：
          ```html
          <div>                                                   
            <user-data v-slot:default="slotProps">                                                  
              <p v-if="user">用户名：{{ slotProps.user.name }}</p>                                                
            </user-data>                                                  
          </div>                       
          ```                             
          *  自 2.6.0 起有所更新。已废弃的使用 slot-scope attribute 的语法. 
          ~~`任何传递给<slot>的属性都可以用slot-scope属性中定义的变量来获取。`~~
          ~~`<div>`~~                                                   
            ~~`<user-data slot-scope="user">`~~                                                 
              ~~`<p v-if="user">用户名：{{ user.name }}</p>`~~ 
            ~~`</user-data>`~~                                                  
          ~~`</div>`~~                         
      * 独占默认插槽的缩写语法                                                       
        * 当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。                                                     
        这样我们就可以把 v-slot 直接用在组件上： 
          ```html                                                     
          <current-user v-slot:default="slotProps">                                                   
            {{ slotProps.user.firstName }}                                                  
          </current-user>     
          ```                                              
                                                              
        * 就像假定未指明的内容对应默认插槽一样，不带参数的 v-slot 被假定对应默认插槽：
          ```html
          <current-user v-slot="slotProps">                                                   
            {{ slotProps.user.firstName }}                                                  
          </current-user>              
          ```                                     
                                                              
        * 注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确：
          ```html
          <!-- 无效，会导致警告 -->                                                   
          <current-user v-slot="slotProps">                                                   
             {{ slotProps.user.firstName }}                                                 
              <template v-slot:other="otherSlotProps">                                                  
                slotProps is NOT available here                                                 
              </template>                                                 
          </current-user>     
          ```                                              
        * 只要出现多个插槽，请始终为所有的插槽使用完整的基于 <template> 的语法：
          ```html
          <current-user>                                                    
            <template v-slot:default="slotProps">                                                 
            {{ slotProps.user.firstName }}                                                  
            </template>                                                 
                                                              
            <template v-slot:other="otherSlotProps">                                                  
              ...                                               
            </template>                                                 
          </current-user>            
          ```                                       
                                                              
      * 作用域插槽与具名插槽组合在一起，用来覆盖元素的样式会很有用。                                                        
        * 看一个显示文章摘要列表的组件： 
        ```html                                                    
        <div>                                                     
          <div v-for="post in posts">                                                   
            <h1>{{ post.title }}</h1>                                                 
            <p>{{ post.summary }}</p>                                                 
          </div>                                                    
        </div>      
        ```                                                
        它接收一个文章数组变量posts，然后输出所有的文章标题和摘要                                                     
        可以这样使用它：
        ```html                                                      
        <blog-listing :posts="posts"></blog-listing>   
        ```                                                   
        * 创建该组件的另一个版本。                                                      
          在这个版本中，可以传入自己的HTML，用来显示文章的摘要——或许，举个例子，也有可能我们只想在页面上显示图片。                                                   
          那么在具名插槽元素中，就需要用一个段落元素将摘要信息包裹起来，之后只要愿意，就可以覆盖掉它。
          ```html
          <div>                                                   
            <div v-for="post in posts">                                                 
              <h1>{{ post.title }}</h1>                                               
              <slot name="summary" :post="post">                                                
                <p>{{ post.summary }}</p>                                             
              </slot>                                               
            </div>                                                  
          </div>                         
          ```                           
          * 我们原来使用该组件的方式仍然有效，                                                   
          因为即使没有提供插槽元素，段落元素作为默认的内容仍然可以使用。                                                   
          * 但是如果愿意，可以覆盖掉摘要信息。 
            ```html                                                  
            <blog-listing :posts="posts">                                                 
              <template v-slot:summary="slotProps">                                               
                <img :src="post.image" :alt="post.summary">                                             
              </template>                                               
            </blog-listing>                                                 
            <blog-listing :posts="posts">                                                 
              <img                                                
                slot="summary"                                              
                slot-scope="post"                                             
                :src="post.image"                                             
                :alt="post.summary">                                              
            </blog-listing>     
            ```                                            
            现在文本元素就被图片元素替换了                                                 
            不过我们将文章的摘要作为图片的备用文字。这点很重要，它让使用屏幕阅读器等辅助技术的用户仍然可以读到文章的内容。                                                 
                                                              
      * 插槽作用域解构                                                       
      v-slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。                                                        
        * 所以在支持的环境下 (单文件组件或现代浏览器)，你也可以使用 ES2015 解构来传入具体的插槽 prop                                                     
        这样可以使模板更简洁，尤其是在该插槽提供了多个 prop 的时候。
          ```html
          <current-user v-slot="{ user }">                                                    
          {{ user.firstName }}                                                    
          </current-user>            
          ```                                       
        * 它同样开启了 prop 重命名等其它可能，例如将 user 重命名为 person：

          ```html
          <current-user v-slot="{ user: person }">                                                    
          {{ person.firstName }}                                                    
          </current-user> 
          ```
        * 你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形
          ```html                                                   
          <current-user v-slot="{ user = { firstName: 'Guest' } }">                                                   
          {{ user.firstName }}                                                    
          </current-user>      
          ```                                             
      作为一种简写方式，你可以解构slot-scope的属性，就像解构函数参数一样。                                                       
      用解构重写前面的例子：    
        ```html                                                   
        <blog-listing>                                                      
          <img                                                    
            slot="summary"                                                  
            slot-scope="{ image, summary }"                                                 
            :src="image"                                                  
            :alt="summary">                                                 
        </blog-listing>   
        ```

## 自定义事件
* 除了可以处理原生DOM事件，v-on指令也可以处理组件内部触发的自定义事件。 
  * 调用this.$emit()函数可以触发一个自定义事件，                 
    * 它接收一个事件名称以及其他任何你想要传递的参数。              
  * 然后就可以使用组件上的v-on指令来监听这个事件了。               
* 一个简单的组件，                                                            
  * 每次被单击时，它都会触发一个叫作count的事件：                 
  每次按钮被单击时，它都会触发count事件，参数为被单击的次数。
    ```html        
    <div id="app">                                                        
      <button @click="handleClick">单击了{{ clicks }}次</button>                                                      
    </div>                                                        
    <script>                                                        
      new Vue({                                                     
        el: '#app',                                                   
        data: () => ({                                                    
          clicks: 0                                                 
        }),                                                   
        methods: {                                                    
          handleClick() {                                                 
            this.clicks++;                                                
            this.$emit('count', this.clicks);                                               
          }                                                 
        }                                                   
      });                                                     
    </script>  
    ```                                                     
  * 之后我们使用这个组件时，可以使用v-on指令来监听这个自定义事件，就和使用v-on指令监听click事件一样。                                                         
  下面的示例将接收counter组件中通过事件传递的数字并显示在页面上：
    ```html   
    <div id="app">                                                        
      <counter v-on:count="handleCount"></counter>                                                      
      <p>单击次数 = {{ clicks }}</p>                                                      
    </div>                                                        
    <script>                                                        
      const Counter = {                                                     
        // 这里是组件的定义                                                   
      }                                                     
      new Vue({                                                     
        el: '#app',                                                   
        data: {                                                   
          clicks: 0                                                 
        },                                                    
        methods: {                                                    
          handleCount(clicks) {                                                 
            this.clicks = clicks;                                               
          }                                                 
        },                                                    
        components: {                                                   
          Counter                                                 
        }                                                   
      });                                                     
    </script>        
    ```                                               
                                                            
* 处理事件的方法：                                                            
  1. $on                                                          
  在组件内部代码中，还可以使用$on方法来监听组件自身触发的事件。                                                          
    * 它和任何事件分发器（event dispatcher）的工作原理几乎相同：                                                       
    当使用$emit方法触发一个事件，通过$on方法添加的事件处理函数就会执行。                                                        
      * 监听当前实例上的自定义事件。                                                      
      * 事件可以由 vm.$emit 触发。                                                      
      * 回调函数会接收所有传入事件触发函数的额外参数。
        ```javascript           
        vm.$on('test', function (msg) {                                                   
        console.log(msg)                                                    
        })                                                    
        vm.$emit('test', 'hi')                                                    
        // => "hi"   
        ```                                                 
    * 监听子组件触发的事件                                                        
      * 不过不能使用this.$on方法监听子组件触发的事件；                                                     
      * 如果这么做，                                                      
        * 可以在组件上使用v-on指令，                                                   
        * 或者可以使用组件上的ref属性来调用子组件自身的.$on方法
        ```html   
        <div id="app">                                                    
          <counter ref="counter"></counter>                                                 
        </div>                                                    
        <script>                                                    
          // 为了简单起见，该组件没有写完整                                                  
          new Vue({                                                 
            el: '#app',                                               
            mounted() {                                               
              this.$refs.counter.$on('count', this.handleCount);                                              
            }                                               
          });                                                 
        </script>    
        ```                                               
  2. $once                                                          
  $once的行为和$on一样，但绑定的监听器只会执行一次——在事件第一次被触发时                                                          
  3. $off                                                         
  $off方法则用于移除一个事件监听器                                                          
                                                            
* **事件触发器**（eventemitter）：                                                            
  * Node.js里的EventEmitter模块                                                         
  * jQuery中的.on()、.once()、.off()和.trigger()                                                         
  * 由于Vue内置了完整的**事件触发器**，当你使用Vue时，不需要再引入自己的**事件触发器**了。                                                          
  甚至在开发Vue组件的局部代码时也可以利用Vue的**事件触发器**，只需要用newVue()创建一个实例。
    ```javascript
    const event = new Vue();                                                        
    let count = 0;                                                        
    function logCount() {                                                       
      count++;                                                      
      console.log(`调试函数执行了 ${count} 次`);                                                      
    }                                                       
                                                            
    event.$on('test-event', logCount);                                                        
                                                            
    setInterval(() => {                                                       
      events.$emit('test-event');               // 这段代码每秒会向控制台输出记录                                      
    }, 1000);                                                       
                                                            
    setTimeout(() => {                                                        
      events.$off('test-event');              // 直到10s后.off()方法将事件处理函数移除时终止                                       
    }, 10000);  
    ```                                                      
    这在处理基于Vue的代码与非Vue的代码之间的通信时，极为有用                                                       
    但总的来说，只要情况允许，vuex往往是更好的选择。                                                        
                                                            
## 混入
混入是一种代码组织方式，可以在多个组件间横向复用代码。                                                           
* 例如，假设你有许多用于显示不同类型用户的组件。虽然大部分显示的信息都依赖于用户的类别，但是组件间相当多的逻辑代码是共同的。                                                           
有3种处理方式：                                                            
  1. 为所有的组件编写重复的代码（很明显这不是一个好主意）                                                         
  2. 将共同的代码分离到多个函数中，并存储到util文件里                                                         
  3. 使用混入                                                         
  后两种方式在这个例子中很相似，但是使用混入是一种更加符合Vue习惯的处理方式——在即将介绍的其他诸多示例中，它会更加有用。                                                         
    * 只要将混入对象添加到组件中，那么该组件就可以获取到存储在混入对象中的任何东西。                                                       
      1. 混入方法                                                     
      让我们创建一个混入对象，它会为所在的组件添加一个getUserInformation()方法：
        ```javascript
        const userMixin = {                                                   
          methods: {                                                  
            getUserInformation() {                                                
              return fetch(`/api/user/${userId}`)                                             
                    .then((res) => res.json());                                       
            }                                               
          }                                                 
        };         
        ```                                           
      把它添加到一个组件中并使用它： 
        ```javascript                                                    
        import userMixin from './mixins/user';                                                    
        Vue.component('usr-admin', {                                                    
          mixins: [userMixin],                                                  
          template: '<div v-if="user">姓名：{{ user.name }}</div>,                                                 
          props: {                                                  
            userId: {                                               
              type: Number                                              
            }                                               
          },                                                  
          data: () => ({                                                  
            user: undefined                                               
          }),                                                 
          mounted() {                                                 
            this.getUserInfomation(this.userId)                             //                  
                .then((user) => {                                           
                  this.user = user;                                         
                });                                           
          }                                                 
        });    
        ```                                               
        Vue已经自动将该方法添加到组件中去了——或者说该方法被“混入”组件內了。                                                   
      2. 除了方法，混入对象可以引用几乎任何Vue组件所能引用的东西，就好像它是组件本身的一部分一样。                                                     
      我们来更改示例中的混入对象，让它可以处理数据的存储和mounted钩子
        ```javascript
        const userMixin = {                                                   
          data: () =>({                                                 
            user: undefined                                               
          }),                                                 
          mounted() {                                                 
            fetch(`/api/user/${this.userId}`)                                               
              .then((res) => res.json())                                              
              .then((user) => {                                             
                this.user = user;                                           
              });                                             
          }                                                 
        };  
        ```                                                  
        组件就可以简化为：  
        ```javascript                                                 
        import userMixin from './mixins/user';                                                    
        Vue.component('user-admin', {                                                   
          mixins: [userMixin],                                                  
          template: '<div v-if="user">姓名：{{ user.name }}</div>',                                                  
          props: {                                                  
            userId: {                                               
              type: Number                                              
            }                                               
          }                                                 
        });    
        ```                                               
        虽然混入使组件简化了很多，但是追踪数据的来源变得复杂了。                                                    
        当决定将哪些代码放在混入对象中，哪些代码放入组件中时，你必须衡量这样做的代价与收益。                                                    
* 混入对象和组件的合并                                                            
如果混入对象和组件间有重复的选项，根据它们的类型，Vue会分别对待。                                                            
比如它们都有一个叫作addUser()的方法或者都有一个created()钩子                                                           
  * 对于生命周期钩子——诸如created()和beforeMount()这样的——Vue会将它们添加到一个数组中并全部执行：
    ```javascript
    const loggingMixin = {                                                        
      created() {                                                     
        console.log('mixin中的记录');                                                   
      }                                                     
    };                                                        
    Vue.component('example-component', {                                                        
      mixins: [loggingMixin],                                                     
      created() {                                                     
        console.log('组件中的记录');                                                    
      }                                                     
    });        
    ```                                               
    当组件被创建时，“mixin中的记录”和“组件中的记录”都将会输出到控制台。                                                        
  * 对于重复的方法、计算属性或其他任何非生命周期钩子属性，组件中的属性会覆盖混入对象中的属性
    ```javascript
    const loggingMixin2 = {                                                       
      methods: {                                                      
        log() {                                                   
          console.log('mixin中的记录');                                                 
        }                                                   
      }                                                     
    };                                                        
    Vue.component('example-component', {                                                        
      mixins: [loggingMixin2],                                                      
      created() {                                                     
        this.log();                                                   
      },                                                      
      methods: {                                                      
        log() {                                                   
          console.log('组件中的记录');                                                  
        }                                                   
      }                                                     
    });            
    ```                                           
    当组件被创建时，只有“组件中的记录”会被输出，因为组件中的log()方法覆盖了混入中的log()方法。                                                       
      * 有时候我们有意使用这种合并方式，但也有时候却是碰巧在不同的地方定义了相同名称的方法，如果它们中的某个方法被覆盖，可能会引发一些问题！                                                      
      因此，官方的Vue代码风格指南建议对于混入中的私有属性（不应该在混入之外使用的方法、数据和计算属性），应该在它们的名称前面添加前缀。                                                      
      前面的混入对象的log()方法可以写成$_loggingMixin2_log()。                                                     
      这在开发插件时极为重要，因为用户有可能将你的插件添加到他们自己的代码中去。                                                     
                                                            
## 非Prop属性
* 如果为某个组件设置的属性并不是用作prop，该属性会被添加到组件的HTML**根元素**上。                                                            
这适用于任何HTML属性或特性，而不仅仅是class。                                                           
假设想要给前面的<display-number>组件添加一个class，你可以在引用该组件的地方为它添加class
  ```html
  <display-number class="some-class" :number="4"></display-number>           
  ```                                               
  以下为输出的结果：                  
  ```html                                       
  <p class="some-class">当前数字是4</p>    
  ```                                                      
* 如果我们为组件和组件的**根元素**设置相同的属性，会发生什么呢？                                                           
  * 大部分属性都像这样，会覆盖组件内部模板中的同名属性                                                         
  大多数时候，如果我们为两者设置了相同的属性，组件上的属性会覆盖它内部模板上的属性。
    ```html
    <div id="app">                                                        
      <custom-button type="submit">单击我!</custom-button>                                                     
    </div>                                                        
    <script>                                                        
      const CutomButton = {                                                     
        template: '<button type="button"><slot></slot></button>'                                  // 在我们的组件模板中，将按钮设置为type="button"                  
      };                                                      
      new Vue({                                                     
        el: '#app',                                                   
        components: {                                                   
          CustomButton                                                  
        }                                                   
      });                                                     
    </script>      
    ```                                                 
    在我们的组件模板中，将按钮设置为type="button"，                                                        
    但是在引用组件时，将它设置为type="submit"。                                                        
    设置在组件上的属性（而不是组件内部的属性）会覆盖掉另外的设置。                                                       
    以下为输出：          
    ```html                                              
    <buttonn type="submit">单击我！</button>    
    ```                                                    
                                                            
  * class和style稍微聪明一点，同名的值会被合并
    ```html                   
    <div id="app">                                                        
      <custom-button class="margin-top" style="font-weight: bold; background-color: red">                                                     
        单击我！                                                    
      </custom-button>                                                      
    </div>                                                        
    <script>                                                        
      const CustomButton = {                                                      
        template: `                                                   
          <button                                                 
            class="bustom-button"                                               
            style="color: yellow; background-color: blue"                                               
            <slot></slot>                                               
          </button>`                                                  
      };                                                      
      new Vue({                                                     
        el: '#app',                                                   
        components: {                                                   
          CustomButton                                                  
        }                                                   
      });                                                     
    </script>    
    ```                                                   
      * class将会被合并在一起变成custom-button margin-top                                                     
      * style属性则会被合并为color: yellow; background-color:red; font-weight: bold;                                                      
      组件属性中的background-color样式覆盖掉了内部模板中的background-color样式。                                                     
                                                            
## 组件和v-for指令
当使用v-for指令遍历一个数组或是对象，并且给定的数组或对象改变时，Vue不会再重复生成所有的元素，而是智能地找到需要更改的元素，并且只更改这些元素。                                                            
* 如果有一个作为列表元素输出到页面上的数组，在它的末尾添加一个新元素，那么页面上现有的元素将保持不变，同时在末尾，新的元素会被创建。                                                           
如果数组中间的一个元素改变了，则页面上只有对应的元素会更新。                                                            
* 如果你在数组的中间删除或是添加一个元素，Vue不会知道该元素对应的是页面上哪一个元素，它会更新从删除或是添加元素的位置到列表结尾之间的每一个元素。                                                           
对于复杂的内容和组件，你肯定不希望Vue这么做。                                                            
* 使用v-for指令时可以设置一个key属性，通过它可以告诉Vue数组中的每个元素应该与页面上哪个元素相关联，从而删除正确的元素。                                                            
key属性的值默认为元素在循环时的索引。                                                            
  * 可以通过下面的代码来了解这是如何工作的：
    ```html
    <template>                                                        
      <demo-key v-for="(item, i) in items" @click.native="items.splice(i, 1)".                                                      
        {{ item }}                                                    
      </demo-key>                                                     
    </template>                                                       
    <script>                                                        
      const randomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 75%, 85%)`;                                                      
      const DemoKey = {                                                     
        template: `<p :style="{ backgroundColor: color }"><slot></slot></p>`,                                                   
        data: () => ({                                                    
          color: randomColor()                                                  
        })                                                    
      };                                                      
      export default {                                                      
        data: () => ({                                                    
          items: ['one', 'two', 'three', 'four', 'five']                                                  
        }),                                                   
        components: {                                                   
          DemoKey                                                 
        }                                                   
      };                                                      
    </script>       
    ```
    * click事件的处理函数是通过.native修饰符添加的，因为这就是为组件添加原生DOM事件监听器的方式。                                                       
    没有.native修饰符，事件处理函数将不会被调用。                                                        
  * 上面的示例会输出5个颜色随机的、包含数字1到5的段落元素


    * 单击其中的一个段落元素，会将对应的元素从items数组中删除。                                                       
    如果单击第二个段落元素——即图中标签为two的元素——希望那个元素会被彻底删除，然后标签为three的元素会变成第二个。                                                        
    * 实际上并不会这样！最终你得到的是下面这样的结果：

      * 这是Vue的差异对比机制引起的：                                                      
      删除了数组中的第二个元素，而原本的位置上将会变成第三个元素，于是Vue更新页面上对应元素的文本来反映变化，                                                     
      对于下个元素、下下个元素都是如此，一直到数组的结尾。                                                      
      最终它会删除最后一个元素。                                                     
      不过，这很可能并不是你想要的                                                      
  * 为这个示例添加一个key属性，来告诉Vue应该删除哪个元素：          
    <template>                                                        
      <demo-key v-for="(item, i) in items" :key="item" @click.native="items.splice(i, 1)">
        {{ item }}                                                    
      </demo-key>                                                     
    </template>                                                       
    key属性必须是一个唯一的数字或者字符串，并与数组中的元素相对应。                                                       
    * 我经常看到有人将key设置为数组的下标（例如在前面例子中设置:key="i"）。                                                        
    如果不是什么特殊情况，那么你不会想要这么做的！                                                       
    虽然Vue不会再发出警告，但你会遇到与我刚才向你展示的完全相同的问题，一个并非你期望的元素将被删除。                                                        
  * 现在，单击第二个元素将会把two从数组中删除，同时对应的元素也将被删除，结果如下：
    总之，无论什么情况，只要允许就应该设置一个key。                                                       
* 在组件中使用v-for指令时key属性并不是可选的，正如你在前面的示例中看到的，在那个示例中，Vue将会在控制台中显示一个警告。       

# 第3章 使用Vue添加样式
                              
如何在Vue中使用CSS来定制化网站和应用，以及使用内置的辅助函数来协助你完成这项工作。 
## Vue提供了几种方式来为网站或是应用添加样式
   v-bind:class和v-bind:style两者都有专门的功能，帮助你通过数据设置class属性和内联样式。                                 
### Class绑定                             
   通常使用v-bind绑定class属性，从而可以根据数据的变化添加或删除类名。    
   在使用v-bind设置class属性时，Vue增加了一些简洁的用法，使之更加易于使用。  
   如果使用过React中的classNames工具，那么你将会非常熟悉v-bind语法。    
   v-bind与它基本相似，不同的是v-bind使用一个数组将类名包裹起来，而不是将类名作为函数的参数。                      
   
   如果不需要任何有关数组或是对象的功能                           
#### 将class设置为一个普通的字符串  
 ```html
 <div class="my-class"></div>  
 ```
#### 一个包含类名的变量     
 ```html
 <div :class="classNameVariable"></div>  
 ```      
#### 使用数组                          
如果传递一个数组给v-bind:class，数组中的类名将会被拼接到一起。                       
这在你想要根据数据或是计算属性设置class时非常方便。请看下面的示例：   
```html
  <div id="app">                      
     // div元素会得到一个值为foo bar的class属性                     
     <div v-bind:class="[firstClass, secondClass]">                    
        ...                  
     </div>                     
  </div>                        
  <script>                      
     new Vue({                     
        el: '#app',                
        data: {                 
           firstClass: 'foo'             
        },                
        computed: {                
           secondClass() {               
              return 'bar';           
           }              
        }                 
     });                     
  </script>         
```               
                      
#### 使用对象                          
* 对象会根据条件把它的键名作为class添加到元素上，这取决于键名所对应的值： 
 * 如果值为真，那么键名会作为class被添加                     
 * 否则，如果是假，就不会被添加                   
假如class绑定的对象为{ 'my-class':shouldAddClass }，那么元素会在shouldAddClass执行结果为真时，拥有my-class这个类名。                      
* 也可以在对象中指定多个class。
 ```html                      
 <div id="app">                   
    <!-- class为foo bar -->                 
    <div v-bind:class="classes"></div>                 
 </div>                     
 <script>                   
    new Vue({                  
       el: '#app',             
       data: {              
          shouldBeBar: true          
       },             
       computed: {             
          classes() {          
             return {       
                foo: true,     
                bar: this.shouldBar,    
                hello: false      
             }        
          }           
       }              
    });                  
 </script>    
 ```                 
 * 尽管我使用的是计算属性返回的对象，但这完全是可选的，                   
    这只是一个很好的方式来避免代码在有很多class时变得太长。                  
 * 也可以使用内联的方式设置这个对象。  
                  
#### 当你想要同时使用变量和条件判断来添加class时，也可以将数组和对象混合在一起使用，只需将对象放在数组中  
```javascript                
<div v-bind:class="[                      
 'my-class',                   
 classFromVariable,                     
 { 'conditional-class': hasClass }                     
]"></div>                        
```                        
     
                              
### 内联样式绑定                              
虽然使用class来设置元素的样式通常会更好，但是内联样式同样有用，特别是使用变量动态设置样式的时候。                           
下面这个例子会渲染出12种不同的颜色，形成一个颜色样板： 
```html
<div id="app">                      
 <div v-for="n in 12" class="color" :style="{ backgroundColor: getColor(n)}">                    
 </div>                     
</div>                        
<script>                      
 new Vue({                     
    el: '#app',                
    methods: {                 
       getColor(n) {              
          return `hsl(${ (n-1) * 30 }, 100%, 75%)`;          
       }              
    }                 
 });                     
</script>       
```      
Vue会自动为你添加浏览器前缀：如果设置的某个样式需要浏览器兼容性前缀，Vue会自动把它加上。                      
                              
#### 为内联样式设置一个对象                         
```javascript
<div v-bind:style="{ fontWeight: 'bold', color: 'red' }"></div>
```
Vue会自动将该对象的属性由驼峰命名转为它们对应的CSS属性，这意味着不用再操心如何转义属性名中的短横杠了。                        
                              
#### 数组语法                          
可以使用一个数组来指定多个样式对象：                        
```javascript
<div :style="[baseStyle, moreStyles]">                      
   ...                     
</div>     
```                   
两个对象中的样式都会应用到元素上                       
如果有相同的样式名，那么moreStyles中的样式会覆盖baseStyle中的同名样式。                        
                              
#### 多重值                           
还可以使用数组提供多个值，来设置浏览器最终支持的值：                      
```javascript
<div :style="{ display: ['-webkit-box', '-ms-flexbox-', 'flex']}"></div>
```
如果浏览器支持，结果将会是display:flex，否则会尝试-ms-flexbox，再是-webkit-box。  
                                    
### 用vue-loader实现Scoped CSS                               
* 当结合vue-loader使用组件时，可以使用scoped CSS来添加样式，并且只在该CSS所在的组件中有效。                            
除了`<template>`和`<script>`标签，也可以在该文件中使用`<style>`标签
   * 它将会在之后被输出到页面上
   * 或者还可以设置webpack将样式提取到一个外部的CSS文件中                             
      想要为前面的例子添加样式，来让数字变为粗体： 
      ```html                         
      <template>                          
         <p>当前数字是<span class="number"> {{ number }}</span></p>                      
      </template>                         
      <script>                         
         export default {                       
            props: {                   
               number: {                  
                  type: Number,              
                  required: true             
               }                 
            }                    
         }; 
      </script>                     
      <style>                          
         .number {                        
            font-weight: bold;                     
         }                       
      </style>                         
      ```                 
* Vue有一种方式可以修复这个问题：scoped CSS。                             
   与JavaScript不同，组件中的CSS不仅会影响自身，还会影响到页面上所有的HTML元素。  
   如果我们在style标签上添加了scoped特性，Vue就会自动处理关联的CSS与HTML，使编写的CSS只影响到该组件中的HTML。
   ```html                          
   <style scoped>
      .number {
         font-weight: bold;
      }                    
   </style>
   ``` 
   输出的HTML：    
  ```html                     
  <p data-v-e0e8ddca>当前数字是<span data-v-e0e8ddca class="number">10</span></p>                      
  <style>                       
     .number[data-v-e0e8ddca] {                   
        font-weight: bold;                  
     }                    
  </style> 
  ```                     
                                 
### 用vue-loader实现CSS Modules                                 
   作为scoped CSS的替代方案，可以用vue-loader实现CSS Modules   
   ```html
   <template>                             
      <p>当前数字是<span :class="$style.number">{{ number }}</span></p>                           
   </template>                            
   <style module>                            
      .number {                           
         font-weight: bold;                        
      }                          
   </style>
   ```                            
   .number样式会被一个随机的样式名称所替换，可以通过$style.number来引用这个名称
                                    
## 预处理器
可以设置vue-loader来让预处理器处理CSS、JavaScript和HTML。    
想要使用SCSS，可以通过两个步骤来实现：                                 
* 首先通过npm安装sass-loader和node-sass                              
* 然后在style标签上添加lang="scss" 
    ```css                          
    <style lang="scss" scoped>                            
     $color: red;                           
     .number {                           
        font-weight: bold;                        
        color: $color;                      
     }                          
    </style>   
    ```                         

# 第4章 render函数和JSX

## 让vue知道应该在页面显示什么内容的方式

* 使用模板

### 使用template属性设置组件的HTML
?? 除了使用挂载元素中的HTML，还可以在Vue实例中使用template属性。它将会被自动添加到你指定为Vue挂载点的元素中。  


### 使用vue-loader在<template>标签中编写组件的HTML

### 使用render函数

```javascript
new Vue({
    el: '#app',
    render(createElement) {
        return createElement('h1', 'Hello world!');
    }
})
```

#### createElement接收3个参数：
1. 标签名称  
    将要生成的元素的标签名称
    标签名称是必需的  
    * 它可以是一个字符串
    * 或是一个返回字符串的函数
    * render函数中也可以访问this，所以可以将标签名称设置为data对象的某个属性、prop、计算属性或是任何类似的东西  
    在template中动态设置标签名称并不是那么容易的，并且代码可读性也不好。<{{ tagName }}>写法是无效的（而且依然不易于阅读！）。
    ```javascript
    new Vue({
        el: '#app',
        render(createElement) {
            return createElement(this.tagName, 'Hello world!');
        },
        data: {
            tagName: 'h1'
        }
    });
    ```
2. ? 数据对象  
    包含配置信息的数据对象（诸如HTML特性、属性、事件侦听器以及要绑定的class和style等）  
    这些属性会影响生成的组件或元素。  
    如果是在编写template，那么它就是包括出现在标签名称与闭合尖括号>之间的所有东西  
    ```<custom-button type="submit" v-bind:text="buttonText">```
        * type是传递给组件的一个普通的HTML属性 
        * 而text是一个组件prop，与变量buttonText绑定。
    ```javascript
    new Vue({
        el: '#app',
        render(createElement){
            return createElement('custom-button', {
                attrs: {
                    type: 'submit'
                },
                props: {
                    text: this.buttonText
                }
            });
        }
    });    
    ```
    * 由于this.buttonText是render函数的一个依赖，无论何时只要buttonText更新，render函数就会被再次调用，然后DOM也会自动更新，就和template一样。  
    * 列出了所有的选项，这些选项是实现到目前为止在本书中学习到的所有东西所必需的：  
    {
        // HTML特性
        attrs: {
            type: 'submit'
        },
        
        // 传递给组件的prop
        props: {
            text: '单击我！'
        },
        
        // DOM属性，比如innerHTML（而不是v-html)
        domProps: {
            innerHTML: '一些HTML'
        }，
        
        // 事件侦听器
        on: {
            click: this.handleClick
        },
        
        // 与slot="exampleSlot"相同——当组件是某个组件的子组件时使用
        slot: 'exampleSlot',
        
        // 与key="exampleKey"相同——用于某个循环产生的组件
        key: 'exampleKey',
        
        // 与ref="exampleRef"相同
        ref: 'exampleRef',
        
        // 与v-bind:class="['example-class', {'conditional-class':true}]"相同
        class: ['example-class', {'conditional-class':true}],
        
        // 与v-bind:style="{ backgroundColor: 'red'}"相同
        style: {backgroundColor: 'red'}  
        
    }
    * class和style并没有在attrs属性中，它们是单独设置的。  
    这是因为v-bind指令的特性；如果仅仅将class或者style设置为attrs对象的一个属性，就不能将class设置为数组或是对象，或者将style设置为对象。  

3. ? 子节点  
    一个子节点或是包含子节点的数组。
    另外两个是可选的（如果不需要指定数据对象，可以让子节点作为第二个参数）。  
    * 它可以是一个数组  
    如果是一个数组，可以在数组中再次调用createElement函数，来构建一个复杂的DOM树。
    * 也可以是一个字符串  
    如果是一个字符串，那么它的值会作为元素的文本内容被输出  
    
    * 以前面一节中的模板为例：  
    ```javascript
    <div>
       <button v-on:click="count++">单击增加计数</button>
       <p>你已经单击了按钮{{counter}}次</p>
    </div>
    ```
    用createElement来编写同样的模板:
    ```javascript
    render(createElement) {
    
        return createElement(
            'div',
            [
                createElement(
                    'button',
                    {
                        on: {
                            click: () => this.count++,
                        }
                    },
                    '单击增加计数'
                ),
                createElement(
                    'p',
                    `你已经单击了按钮${tihs.counter}次。`
                )
            ]
        );
    }
    ```

#### JSX
可以使用JSX替代createElement函数调用，这需要用到babel-plugin-transform-vue-jsx插件。
在babel-plugin-transform-vue-jsx插件的帮助下，可以使用JSX来编写render函数，Babel插件会将JSX语法编译成Vue能理解的createElement函数调用形式。  

注意，在Vue内部（以及在整个JSX生态系统中）,createElement函数通常会有个较短的别名，h。  
在安装了Babel插件之后，前面的代码可以改写成这样：  
```javascript
render(){
    return (
        <div>
            <button onClick={this.clickHandler}>单击增加计数</button>
            <p>你已经单击了按钮{counter}次</p>
        </div>
    
    );
}
```
* 除了像在模板中那样，可以导入并使用组件——只要将组件的名称设置为标签的名称——还可以像React那样导入组件。  
如果导入的组件存储在首字母大写的变量中，则不需要在components对象中指定或是使用Vue.component()函数注册，就可以使用该组件。  

```javascript
import MyComponent from './components/MyComponent.vue';
new Vue({
    el: '#app',
    render(){
        return (
            <MyComponent />
        );
    }
});
```

* JSX的展开操作符也同样得到支持。就和React一样，可以在属性对象上使用展开操作符，它会与其他已经设置的属性相合并，一起应用到元素上：  

```javascript
render(){
    const props = {
        class: 'world',
        href: 'https://www.oreilly.com'
    };
    return (
        <a class="hello" {...props}>O'Reilly Media</a>
    );
}
```



# 第5章 使用vue-router实现客户端路由（client-side routing）
vue-router作为Vue的一个库，旨在让我们能够在客户端，而非服务端来处理一个应用的路由。																													
路由就是取一个路径（如users/12345/ports）来确定应该在页面上显示什么内容的行为。																													
vue-router用于路由控制——根据应用的不同URL来显示不同的内容。																													
Vue本身只是一个视图层。																													
要创建一个具有多个页面且无须新的额外请求即可访问的应用程序（单页应用），需要将vue-router添加到网站中，可以使用它来处理客户端路由																													
请求指定的路径时，代码如何执行和展示数据																													
																													
## 安装vue-router
1. 添加如下代码来使用它的一个CDN	
	```javascript																											
	<script src="https://unpkg.com/vue-router"></script>																			
	```								
2. 如果用的是npm，还可以通过npm install --save vue-router来安装它																												
3. 如果用的是诸如webpack的打包工具，那么就要调用Vue.use(VueRouter)来安装vue-router																												
	这一步往应用中添加了一些组件		
	```javascript																									
	import Vue from 'vue';																											
	import VueRouter from 'vue-router';																											
	Vue.use(VueRouter);		
		```																									
																													
## 基本用法
为了对该路由器进行设置，需要赋予它一组路径，以及对应的组件：路径被匹配到时，就会显示对应的组件。																													
* 创建一个简单的包含两个路径的路由器：			
```javascript																										
import PageHome from './components/pages/Home';																													
import PageAbout from './components/pages/About';																													
const router = new VueRouter({																													
	routes: [				// 为了对该路由器进行设置，需要赋予它一组路径，以及对应的组件																								
		{																											
			path: '/',							// 路径被匹配到时，就会显示对应的组件																			
			component: PageHome																										
		},																											
		{																											
			path: '/about',																										
			component: PageAbout																										
		}																											
	]																												
});				
```																									
* 为了使用这个路由器，需要做两件事。																													
	1. 首先，当应用初始化时，要把它传入到Vue实例中。																												
		为了把路由器传入Vue实例中，可以在初始化Vue的时候，通过router属性把路由器传进去：	
		```javascript																										
		import router from './router';																											
		new Vue({																											
			el: '#app',																										
			router: router																										
		});				
		```																							
																													
	2. 然后，为了让它显示到页面上，需要添加一个特殊的组件<span class="s1">`<router-view />`</span>。																												
		在模板中，将<span class="s1">`<router-view />`</span>放到任何你想让路由所返回的组件被显示的地方。																											
																													
		* 例5-1是一份完整的基本设置，它基于所请求的路径显示出不同的内容			
			```html																										
			<div id="app">																												
				<h1>Site title</h1>																											
				<main>																											
					<router-view />																										
				</main>																											
				<p>Page footer</p>																											
			</div>																												
			<script>																												
				const PageHome = {																											
					template: '<p>This is the home page</p>'																										
				};																											
				const PageAbout = {																											
					template: '<p>This is the about page</p>'																										
				};																											
				const router = new VueRouter({																											
					routes: [																										
						{ path: '/', component: PageHome },																									
						{ path: '/about', component: PageAbout }																									
					]																										
				});																											
				new Vue({																											
					el: '#app',																										
					router,																										
				});																											
			</script>	
			```																											
			待设置完路由器以及添加样式之后																												
			* 访问根路径																											
			* 访问/about																											
																													
* 路由模式																													
	* URL hash																												
	vue-router默认使用URL hash来存储路径																												
	以前，为了访问<你的网站>.com上的/about路由，你得跳转到http://<你的网站>.com/#about																												
	* HTML5 History模式																												
	如今几乎每个浏览器都已经支持HTML5 <span class="s7">history</span> API，这使得开发者无须跳转到一个新的页面就能更新页面的URL																												
	可以让vue-router使用这种HTML5 <span class="s7">history</span> API，通过将路由器的mode改为<span class="s7">history</span>的方式：
		```javascript																												
		const router = new VueRouter({																											
			mode: 'history',																										
			routes: [																										
				{ path: '/', component: PageHome },																									
				{ path: '/about', component: PageAbout }																									
			]																										
		});																
		```											
		* 如果再跳转到http://<你的网站>.com/about，你会得到……一个404页面。																											
			* 除了要告诉客户端代码去观察整个路径，而不是它的hash，																										
			* 你还得告诉服务端去对每一个它不能识别的请求做出响应，并返回你所依赖的HTML页面（但请求诸如CSS等其他静态文件时则不用）																										
				许多静态网站的主机都有一个SPA模式，可以开启它来实现这个需求。所以先检查这个模式是否已经开启，再去考虑服务端的配置。																									
				如何配置服务器取决于服务器所使用的框架，但通常来说都很简单——vue-router文档对于几种常用服务器的配置还专门增加了一节。																									
																													
																													
## 动态路由
对于简单的网站而言，前面的例子已经很棒了。																													
但如果想要做点更复杂的事情会怎样呢，比如：匹配用户的ID作为路径的一部分？																													
* vue-router支持动态路径匹配，也就是说可以通过使用一种专门的语法来指定路径规则，而所有匹配到该规则的路由下的组件都能被访问到。																													
例如，假设我们想要让组件在路径是/user/1234时被显示，而其中1234可以是任何内容			
	```javascript																										
	const router = new VueRouter({																												
		routes: [																											
			{ 																										
				path: '/user/:userId',																									
				component: PageUser																									
			}																										
		]							
	```																				
	* 这样，任何匹配/user/:userId的路径都会渲染出PageUser组件。																												
	* vue-router使用path-to-regexp库来实现这项功能																												
	同一个库也被用在Express和Koa（其中官方的和非官方的路由），以及react-router。			

	
### [**路由对象**](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
* 在组件实例中，可以通过使用属性<span class="object">this.$route</span>来获取当前的**路由对象**。	
这个对象包括了一些有用的属性，诸如																													
	* 当前被访问的完整路径、																												
	* URL的查询参数（例如：? lang=en）等。
* 一个**路由对象** (route object) 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 (route records)。

* **路由对象**是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。
* **路由对象**出现在多个地方:

    1. 在组件内，即 <span class="object">this.$route</span>
    
    2. 在 <span class="object">$route</span> 观察者回调内
    
    3. <span class="object">router</span>.match(location) 的返回值	
    4. 导航守卫的参数：
    ```javascript
    router.beforeEach((to, from, next) => {
    	// `to`和`from`都是路由对象	
  	})
    ```
    5. scrollBehavior 方法的参数:
    ```javascript
    const router = new VueRouter({
    	scrollBehavior(to, from, savePosition){
    		// `to`和`from`都是路由对象
    	}	
  	})
    ```

#### **路由对象**属性
##### <span class="object">$route</span>.path

类型: string

字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。

##### <span class="object">$route</span>.params

类型: Object  
一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。
* 获取路由参数																													
	1. 在组件中使用<span class="object">this.$route</span>.params																												
	就本例而言，最有用的属性莫过于params，它包含了被动态匹配的URL的各个部分。																												
		* 在本例中，如果访问/user/1234，那么params就等于：	
			```javascript																										
			{																										
				"userId": "1234"																									
			}						
			```																				
		你可能以为userId会是一个数值，然而vue-router是把它从一个路径里拽出来的（而这个路径是一个字符串），它也无从知晓它该不该是一个数值，所以userId实际上就保留成一个字符串。																											
		如果你想将它用作数值，就必须使用parseFloat或Number自行转换。																											
		* 以如下组件为例：		
			```javascript																									
			const PageUser = {																										
				template: '<p>User ID: {{ $route.params.userId }}</p>'																									
			};																										
			const router = new VueRouter({																										
				routes: [																									
					{																								
						path: '/user/:userId',																							
						component: PageUser																							
					}																								
				]																									
			});		
			```																								
			当导航至/user/1234的时候，“User ID:1234”就会被输出到页面上。																										
	2. 路由参数作为组件属性传入																												
	让vue-router将params作为路由组件的props传入，你可以在路由中指定props:true		
		```javascript																										
		const PageUser = {																											
			props: ['userId'],																										
			template: '<p>User ID: {{ userId }}</p>'																										
		};																											
		const router = new VueRouter({																											
			routes: [																										
				{																									
					path: '/user/:userId',																								
					component: PageUser,																								
					props: true																								
				}																									
			]																										
		});				
		```																							
		使用<span class="object">$route</span>.params代替props的好处是：组件与vue-router不再紧密耦合。																											
        * 使用第一个例子的代码就会很棘手，																										
        * 但使用第二个例子的代码就会变得很简单，因为只要在另一个页面调用该组件就好了，就像它是一个与路由无关的通用组件那样。																										
																													
* 注意到URL的动态部分并不一定要在URL的末尾
    * 也就是说：/usr/1234/post也完全能够被匹配到。																													
    * 你也可以设置多段动态部分，如：/user/1234/posts/2 与 /user/:userId/posts/:pageNumber相匹配时会生成如下params：		
	```javascript																											
	{																												
		"userId": "1234",																											
		"pageNumber": "2"																											
	}																												
	```	


##### <span class="object">$route</span>.query

类型: Object

一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 <span class="object">$route</span>.query.user == 1，如果没有查询参数，则是个空对象。

##### <span class="object">$route</span>.hash

类型: string

当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串。

##### <span class="object">$route</span>.fullPath

类型: string

完成解析后的 URL，包含查询参数和 hash 的完整路径。

##### <span class="object">$route</span>.matched

类型: Array`<RouteRecord>`  
一个数组，包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 routes 配置数组中的对象副本 (还有在 children 数组)。
```javascript
const router = new VueRouter({
	routes: [
		// 下面的对象就是路由记录
		{
			path: '/foo',
			component: Foo,
			children: [
				// 这也是个路由记录
				{
					path: 'bar',
					component: Bar
				}
			]
		}
	]
})
```

当 URL 为 /foo/bar，<span class="object">$route</span>.matched 将会是一个包含从上到下的所有对象 (副本)。
##### <span class="object">$route</span>.name

当前路由的名称，如果有的话。(查看命名路由)

##### <span class="object">$route</span>.redirectedFrom

如果存在重定向，即为重定向来源的路由的名字。(参阅重定向和别名)																											

	
### 响应路由变化
* 当/user/1234与/user/5678相互切换时，其中相同的组件会被重用，于是第一章所涉及到的生命周期钩子，诸如<span class="event">mounted</span>，都不会被调用。																													
#### 可以使用<span class="method">beforeRouteUpdate</span>导航守卫（guard）在URL动态部分变化时运行一些代码
<span class="method">beforeRouteUpdate</span>新增于Vue 2.2，所以它并不适用于之前的版本。																													
* 创建一个PageUser组件，它在挂载的时候会调用一次API，并且在路由变化时还会再调用一次：

```html
<template>																											
    <div v-if="state === 'loading'">																										
        Loading user...																									
    </div>																										
    <div>																										
        <h1>User: {{ userInfo.name }}</h1>																									
    </div>																										
</template>																											
<script>																											
    export default {																										
        data: () => ({																									
            state: 'loading',																								
            userInfo: undefined																								
        }),																									
        mouted() {																									
            this.init();																								
        },																									
        beforeRouteUpdate(to, from, next) {																									
            this.state = 'loading';																								
            this.init();																								
            next();																								
        },																									
                                                                                                            
                                                                                                            
        methods: {																									
            init() {																								
                fetch(`/api/user/${this.$route.params.userId}`)																							
                    .then((res) => res.json())																						
                    .then((data) => {																						
                        this.userInfo = data;																					
                    });																						
            }																								
        }																									
    };																										
</script>		
```		
* 从API中加载了第一个用户的数据，显示其相关信息																											
* 然后如果路由发生变化（比如，用户单击了某个链接，从一个用户跳转到另一个用户），它就会再次调用API，以获取第二个用户的数据。																											
* 注意，我们把通常位于<span class="event">mounted</span>内部的逻辑移动到了一个方法下面（译注：即init()方法），在																										
    * <span class="event">mounted</span>钩子和																									
    * <span class="method">beforeRouteUpdate</span>守卫里																									
都会调用这个方法。																										
这就避免了重复的代码——我们几乎总是会想要在这两个地方做些相同的事。																										
* 在本章的后面会再进一步探究守卫，包括为什么要在函数的末尾调用<span class="method">next</span>()。		
            																				
#### 在2.2版本之前，必须监听<span class="object">$route</span>对象的变化
```javascript																										
const PageUser = {																												
    template: '<div>...user page ...</div>',																											
    watch: {																											
        '$route'() {																										
            console.log('Route updated');																									
        }																										
    }																											
};		
```																										
																													
## 嵌套路由 <span class="s1">`<router-view />`</span>
* 在构建了一个足够复杂的应用之后，会发现在你的网站中有这么一部分，你想让其中的每一个页面都拥有普遍的样式或内容。																													
	* 例如，可能会有一个管理区，而你想要在网站的常规头部底下添加另一个头部，用作管理区内的导航；																												
	对于一些场景而言，比如增设管理区头部这个例子，可以很简单地将这个头部存放在组件中，然后手动引用到每一个单页上。																												
	* 又比如，有一个用于展示产品的页面，而你想要添加一个页签组件，用来切换URL等。																												
	而对于另一些场景，比如产品页面，它只有一小部分内容会变化，你肯定不想让这个独立的页签也负责展示整个页面的其余部分——此时使用嵌套路由反而会好得多。																												
* 嵌套路由允许指定子路由，并且用另一个<span class="s1">`<router-view />`</span>来显示其内容。																													
以构建一个网站的设置部分为例，																													
	* 它带有一个侧边栏，用于设置页面之间的导航。																												
		* 其中/settings/profile页面用于用户修改其资料，																											
		* 而/settings/email则允许他们修改自己的邮件偏好。		
	* 两个页面共用了一个头部和侧边栏。																												
		* 头部以常规方式处理（它会位于根级<span class="s1">`<router-view />`</span>之外），																											
		* 侧边栏我们则希望它只出现在设置页面，而非所有页面。																											
	* 先创建一个/settings路由，然后赋予它两个子路由：profile和email																												
	下面就是这个路由器的配置：				
		```javascript																								
		import PageSettings from './components/pages/Settings';																											
		import PageSettingsProfile from './components/pages/SettingsProfile';																											
		import PageSettingsEmail from './components/pages/SettingsEmail';																											
		const router = new VueRouter({																											
			routes: [																										
				{																									
					path: '/settings',																								
					component: PageSettings,																								
					children: [																								
						{																							
							path: 'profile',																						
							component: PageSettingProfile,																						
						},																							
						{																							
							path: 'email',																						
							component: PageSettingEmail																						
						}																							
					]																								
				}																									
			]																										
		});		
		```																									
	* 在PageSettings组件中，可以使用另一个<span class="s1">`<router-view />`</span>组件					
		```html																							
		<div>																											
			<sidebar></sidebar>																										
			<router-view />																										
		</div>					
		```																						
	* 访问/settings/profile会出现如下HTML：
        ```html    																												
		<div id="app">																											
			<h1>Site title</h1>																										
			<main>																										
				<div>																									
					<div class="sidebar">																								
					...sidebar HTML...																								
					</div>																								
				</div>																									
				<div class="page-profile">																									
					...profile settings page HTML...																								
				</div>																									
			</main>																										
			<p>Page footer</p>																										
		</div>	
		```																										
		这个页面的头部和页脚位于根级<span class="s7"><router-view /></span>之外，这个<span class="s1">`<router-view />`</span>就取自我们在本章第一节中所举的例子（译注：即例5-1）																											
		它的侧边栏则位于设置页面内部，但在第二个<span class="s1">`<router-view />`</span>组件及其用户资料设置页面的内容之外																											
																													
## 重定向和别名
* 有些时候，比如说你已经决定要把/settings重命名为/preference，就会想要将一个网页重定向到另一个网页。																													
	* 在这种情况下，你肯定不希望习惯了前往/settings访问的用户看到一个错误页面，																												
	* 也不会希望搜索引擎链接到一堆不存在的页面上。																												
* 为了解决这个问题			
																										
### 指定一个redirect属性，用于替代component
```javascript																										
const router = new VueRouter({																											
    routes: [																										
        {																									
            path: '/settings',																								
            redirect: '/preference'																								
        }																									
    ]																										
});						
```																					
任何对/settings的访问都会被重定向到/preferences
																											
### 另一种重定向的方法是，给组件取一个别名
如果你想让设置页面从/settings和/preferences都可被访问，可以给/settings路由取一个叫/preferences的别名
```javascript																												
import PageSettings from './components/pages/Settings';																											
const router = new VueRouter({																											
    routes: [																										
        {																									
            path: '/settings',																								
            alias: '/preferences',																								
            component: PageSettings																								
        }																									
    ]																										
});								
```																			
在过往的实践中发现，当我想让/user和/user/:userId都指向同一个组件时，路由别名就很有用。																											
																													
## 那么如何让用户在不同的路由之间遨游呢？
### 1. 链接导航——通过链接的方式来为用户提供<span class="s1">`<router-link>`</span>
* 最显而易见的答案——`<a>`标签——当然不是最好的。																												
使用锚点来链接页面虽然在技术上行得通，但是如果你用的是HTML5 History模式，页面会在每次单击链接后重载，就跟在一个传统的网站里一样没区别。																												
											
* 鉴于现在一切都由客户端掌控，在页面之间导航是可以做到不必重载页面的，路由甚至还会替你更新URL。																											
    * 不强制刷新页面的导航控制																										
    单击该链接，它就会直接将你带往/user/1234，而无须加载一个新的页面。																										
    这大幅度提升了网站性能。																										
    只要首页加载完毕，在不同页面之间的导航就会变得飞快，因为所有的HTML、Javascript以及CSS都已经被下载下来了。																										
    * vue-router还能替你自动打理路由模式：																										
        * 在hash模式下，前面的链接会带你前往#/user/1234																									
        * 使用<span class="s7">history</span>模式的话，则会带你去向/user/1234																									
* <span class="s1">`<router-link>`</span>几个重要的属性列表：																											
    * <span class="key">to属性</span>	
        * 使用<span class="s1">`<router-link>`</span>来代替`<a>`标签。																												
        它用起来与传统的锚定标签类似																												
        ```html
        <router-link to="/user/1234">Go to user #1234</router-link>																
        ```				
   * 在默认情况下，使用<span class="s1">`<router-link>`</span>会在页面上渲染出`<a>`标签。																									
   上一节例子渲染的结果就是：																									
   ```html
   <a href="/user/1234">Go to user #1234</a>																						
   ```			
       * 当单击该链接时，href不会起作用，因为Vue已经在上面添加了一个事件监听器，它取消了单击事件产生的处理自身导航的默认行为。																								
       * 尽管如此，出于一些原因，保留它仍然不失用处，																								
           * 比如在上面悬停就可以看到这个链接会跳转到哪里，																							
           * 或者能让你在新窗口中打开页面（这个vue-router就鞭长莫及了）。																						
    * <span class="key">tag属性</span>																										
        * 有些时候你可能会需要渲染除了锚点以外的元素，																									
        比如导航栏的列表元素。																									
        这时就可以使用<span class="key">tag属性</span>来做到：	
        ```html																								
        <router-link to="/user/1234" tag="li">Go to user #1234</router-link>								
        ```

        这会在页面上渲染出如下结果：		
        ```html																							
        <li>Go to user #1234</li>																									
        ```
        然后Vue会往这个元素添加一个事件监听器，以监测它被单击的时机，从而处理导航。																									
            * 然而，这还不是最优解——																								
                * 因为我们就此失去了锚点标签以及它的href属性，																							
                * 同时也失去了几个重要的原生浏览器行为：																							
                    * 浏览器这下就不知道这个列表项是一个链接，由此在它上面悬停也就不会给你带来任何关于这个链接的信息；																						
                    * 也不能通过鼠标右键在新窗口打开这个链接；																						
                    * 还有，一些诸如屏幕阅读器的辅助技术也不会把这个元素认为是一个链接了。																						
        * 为了解决这个问题，可以在<span class="s1">`<router-link>`</span>元素里面加上锚点标签：															
        ```html										
        <router-link to="/user/1234" tag="li"><a>Go to user #1234</a></router-link>					
        ```																				
        现在，渲染出来的HTML就是下面这样的：																									
        ```html
        <li><a href="/user/1234">Go to user #1234</a></li>																	
        ```

        vue-router掌控着它力所能及的路由，而我们仍然拥有我们所期待链接能带来的常规行为。																									
                                                                                                            
    * <span class="key">active-class属性</span>																										
    当<span class="s1">`<router-link>`</span>组件的<span class="key">to属性</span>中的路径与当前页面的路径相匹配时，链接就被激活了（active）。																										
    假如处在/user/1234，那么该链接就是激活的。																										
        * 当链接被激活时，vue-router会自动为生成的元素赋予一个类（class）。																									
            * 在默认情况下，这个类是router-link-active，																								
            * 不过你可以通过使用<span class="key">active-class属性</span>来配置这个类。																								
            这很有用，特别是当你正在使用一个UI库，或者基于已有的代码时，而其中的链接激活类已经被设置成了其他名称。																								
            比如，你正在使用Bootstrap制作一个导航栏（navbar），就可以设置当前被激活的链接的类名为active。																								
        * 用Vue实现一个简单的Bootstrap导航栏吧																									
            * 以下是我们的目标：										
            ```html														
            <ul class="nav navbar-nav">																								
                <li class="active"><a href="/blog">Blog</a></li>																							
                <li><a href="/user/1234">User #1234</a></li>																							
            </ul>													
            ```											
            * 要改两个地方。																								
                1. active类要被添加到li元素，而不是a元素，于是我们要让vue-router渲染出一个li元素而不是默认的a元素。																							
                2. 添加的类名应该是active，而不是router-link-active，所以这个也要改。										
                ```html													
                <ul class="nav navbar-nav">																							
                    <router-link to="/blog" tag="li" active-class="active">																						
                        <a>Blog</a>																					
                    </router-link>																						
                    <router-link to="/user/1234" tag="li" active-class="active">																						
                        <a>User #1234</a>																					
                    </router-link>																						
                </ul>										
                ```													
                                                                                                            
    * 原生事件																										
        如果想给某个<span class="s1">`<router-link>`</span>添加一个事件处理器（eventhandler），可以用@click。																									
        但是像下面这样可不行：		
        ```html																							
        <!-- 这样不行 -->																									
        <router-link to="/blog" @click="handleClick">Blog</router-link>											
        ```

        * 在默认情况下，在组件上使用v-on就可以监听该组件触发的自定义事件，这个在第2章已经见过了。																									
        * 而对于原生事件，就可代之以.native修饰符来监听：																					
        ```html				
        <router-link to="/blog" @click.native="handleClick">Blog</router-link>							
        ```																		
        现在，当单击这个链接时，handleClick就会被调用。																									

### 2. 编程式导航——运用路由器的一些实例方法来实现编程式导航
这些方法效仿浏览器原生的<span class="s7">history</span>方法																													
* 如<span class="s7">history</span>.<span class="method">pushState()</span>——用<span class="object">router</span>.<span class="method">push()</span>（或组件实例中的<span class="object">this.$router</span>.<span class="method">push()</span>）来进行路径跳转：														
    ```javascript														
    router.push('/user/1234');																											
    ```
    这与单击一个<span class="key">to属性</span>为/user/1234的<span class="s1">`<router-link>`</span>组件完全等效																											
    事实上，当你单击<span class="s1">`<router-link>`</span>时，vue-router内部用的就是<span class="object">router</span>.<span class="method">push()</span>方法。																											
* <span class="s7">history</span>.<span class="method">replaceState()</span>——<span class="object">router</span>.<span class="method">replace()</span>																												
它与<span class="object">router</span>.<span class="method">push()</span>的表现类似：都是将你导航至指定的路由。																												
    * 不同之处在于，<span class="object">router</span>.<span class="method">push()</span>会向<span class="s7">history</span>栈添加一个新的记录——因此，如果用户按下返回键，路由器就会跳转到上一个路由																											
    而<span class="object">router</span>.<span class="method">replace()</span>则替换了当前的<span class="s7">history</span>记录，所以返回键只能让你回到之前的路由。																											
    * 通常情况下，你需要的都是<span class="object">router</span>.<span class="method">push()</span>，但<span class="object">router</span>.<span class="method">replace()</span>在特定情况下也不乏用处。																											
    例如，维护一个可读的文章URL，像是/blog/hello-world，而一旦用户重命名了这篇文章，可能就要用<span class="object">router</span>.<span class="method">replace()</span>来继续导航至/blog/hello-world，因为没理由在历史记录中同时保留这两个URL。																											
* <span class="s7">history</span>.<span class="method">go()</span>——<span class="object">router</span>.<span class="method">go()</span>																												
它能让你在历史记录中前进和后退，就像按了前进键和后退键。																												
    * 后退一条记录，你就用<span class="object">router</span>.go(-1)																											
    * 前进10条记录，就用<span class="object">router</span>.go(10)。																											
    如果历史中没那么多条记录，函数的调用就会悄悄终止。																											
                                                                                                                
                                                                                                                
                																								
## 导航守卫
假设你想要限制未登录的用户，禁止这些用户访问你应用的某些部分。																													
同时你还有一个userAuthenticated()方法用于当用户登录时返回true。
																													
### 在路由器上定义<span class="method">beforeEach</span>和<span class="method">afterEach</span>守卫

#### <span class="object">router</span>.<span class="method">beforeEach</span>()守卫。
vue-router提供了能让你在导航发生之前运行某些代码的功能，并且遵照你的意愿去取消导航或将用户导航至其他地方。																												
* 该守卫被传入3个参数：																											
    1. <span class="object">to</span>																										
    2. <span class="object">from</span>																										
    其中<span class="object">from</span>和<span class="object">to</span>分别表示导航从哪里来和到哪里去																										
    3. <span class="method">next</span>																										
    <span class="method">next</span>则是一个回调，在里面你可以让vue-router去处理导航、取消导航、重定向到其他地方或者注册一个错误																										
* 一个导航守卫，它阻止未认证用户访问/account路径下的任何内容			
    ```javascript																								
    router.beforeEach((to, from, next) => {																										
        if(to.path.startsWith('/account') && !userAuthenticated()) {																									
            next('/login');																								
        } else {																									
            next();																								
        }																									
    });		
    ```																								
    * 如果被导向的路由的路径以/account开头，而用户还未登录，则该用户会被重定向到/login																										
    * 否则，就调用<span class="method">next</span>()，并且不带任何参数，然后用户就能看到他们所请求的account页面																										
    别忘了调用<span class="method">next</span>()，如若不然，该守卫就永远不会被解析（resolved）了！																										
* **路由元信息**（routemeta fields）																											
在守卫中一个个去检查路径会让程序变得冗长且使人迷惑，特别是当你维护的是一个拥有大量路由的网站，于是会发现另一个很有用的特性，它就是**路由元信息**（routemeta fields）。																											
    * 用户无论在任何时候访问/account，路由器都会检查其requiresAuth属性，如果用户尚未认证，则将其重定向登录页面。																										
        * 在account路由上设置一个requiresAuth属性			
        ```javascript																						
        const router = new VueRouter({																									
            routes: [																								
                {																							
                    path: '/account',																						
                    component: PageAccount,																						
                    meta: {																						
                        requiresAuth: true																					
                    }																						
                }																							
            ]																								
        });		
        ```																							
        * 在守卫中查看该属性			
        ```javascript																						
        router.beforeEach((to, from, next) => {																									
            if(to.meta.requiresAuth && !userAuthenticated()) {																								
                next('/login');																							
            } else {																								
                next();																							
            }																								
        });			
        ```																						
    * 当使用嵌套路由时，<span class="object">to</span>.meta指向的是子路由的元信息，而非其父路由。																										
    如果你在/account上添加了meta对象，而用户访问的是/account/email，则所获得的meta对象是关于该子路由的，而非父路由																										
    * 可以通过遍历<span class="object">to</span>.matched的方式来曲线救国，它同样也包含了父路由的元信息：		
    ```javascript																							
    router.beforeEach((to, from, next) => {																									
        const requiresAuth = to.matched.some((record)=> {																								
            return record.meta.requiresAuth;																							
        }																								
        if(requiresAuth && !userAuthenticated()){																								
            next('/login');																							
        } else {																								
            next();																							
        }																								
    });								
    ```																	
    现在，如果访问/account/email，																									
    而该路由又是/account的一个子路由，meta。																									
    则它们两个的meta对象都会被检查，而不只是/account/email的
																									
#### 运行在导航之后的守卫<span class="method">afterEach</span>
* 这个守卫只被传入两个参数，<span class="object">to</span>和<span class="object">from</span>，																											
因此不会影响导航。																											
* 但对于做些诸如设置页面标题的小事，它也不乏实用之处：		
```javascript																									
const router = new VueRouter({																											
    routes: [																										
        path: '/blog',																									
        component: PageBlog,																									
        meta: {																									
            title: 'Welcome to my blog!'																								
        }																									
    ]																										
});																											
router.afterEach((to) => {																											
    document.title = to.meta.title																										
});								
```																			
以上代码会在每次发生页面导航时观察路由的meta属性，并将页面的标题设置为meta对象的title属性。																											
                    																							
### 路由独享守卫<span class="method">beforeEnter</span>
对每个单独的路由定义<span class="method">beforeEnter</span>守卫		
```javascript																											
const router = new VueRouter({																													
	routes: [																												
		{																											
			path: '/account',																										
			component: PageAccount, 																										
			beforeEnter(to, from, next) {																										
				if(!userAuthenticated()) {																									
					next('/login');																								
				} else {																									
					next();																								
				}																									
			}																										
		}																											
	]																												
});		
```																											
<span class="method">beforeEnter</span>守卫与<span class="method">beforeEach</span>表现完全一致，只不过这种守卫作用于每一个单独的路由而非所有。																													

### 组件内部守卫
* 能使用的守卫有3个：																												
#### 1. <span class="method">beforeRouteEnter</span>
等效于<span class="method">beforeEach</span>																											
#### 2. <span class="method">beforeRouteUpdate</span>
你在响应路由变化一节已与它碰过面																											
#### 3. <span class="method">beforeRouteLeave</span>
在导航离开一个路由时调用																											
* 这3个守卫都接受3个与<span class="method">beforeEach</span>和<span class="method">beforeEnter</span>一样的参数。																												
* 让我们回到前面那个认证的例子，并将相同的逻辑套到组件里：		
```javascript																										
const PageAccout = {																												
    template: `<div>...account page ...</div>`,																											
    beforeRouteEnter(to, from, next){																											
        if(!userAuthenticated()){																										
            next('/login');																									
        }																										
        else {																										
            next();																									
        }																										
    }																											
};						
```																						
注意，在<span class="method">beforeRouteEnter</span>中this是undefined，因为此时组件还尚未被创建。																												
* 但是，可以在<span class="method">next</span>里传一个回调，该回调会被传入组件实例并作为其第一个参数：	
```javascript																											
const PageAccout = {																												
    template: `<div>...account page ...</div>`,																											
    beforeRouteEnter(to, from, next){																											
        next((vm) => {																										
            console.log(vm.$route);																									
        });																										
    }																											
};		
```																										
* 鉴于你在<span class="method">beforeRouteUpdate</span>和<span class="method">beforeRouteLeave</span>里都能使用this，就像在组件内的其他大部分地方一样，因此这两个守卫并不支持在<span class="method">next</span>里传入一个回调。																												
            																									
																													
## 路由顺序
vue-router在内部通过遍历路由数组的方式来挑选被显示的路由，并选取其中匹配到当前URL的第一个。																													
知晓这点很重要——这意味着安排好路由的顺序很重要。以如下路由器为例：		
```javascript																											
const routerA = new VueRouter({																												
    routes: [																											
        {																										
            path: '/user/:userId',																									
            component: PageUser																									
        },																										
        {																										
            path: '/user/me',																									
            component: PageMe																									
        }																										
    ]																											
});																												
                                                                                                                
const routerB = new VueRouter({																												
    routes:[																											
        {																										
            path: '/user/me',																									
            component: PageMe																									
        },																										
        {																										
            path: '/user/:userId',																									
            component: PageUser																									
        }																										
    ]																											
});		
```																										
这两个路由器看起来很像：它们都定义了两个路由，一个让用户访问他们自己的页面/user/me，而另一个用于访问其他用户的页面/user/:userId。																												
但是使用routerA的话，是不可能访问到PageMe的。这是因为使用A路由时，vue-router查看了整个路由器，并测试哪个路径规则与之相匹配，即如果访问/user/me，匹配的就是/user/:userId，所以userId就被设置成了me，从而显示的就是PageUser组件。																												
而对于B路由，先匹配到的是/user/me，所以其对应组件就被启用了，于是任何由PageUser生成的内容也被相应显示。																												
            																									
### 404页面
* 可以利用vue-router会按顺序搜索路由直到与通配符（*）匹配的特点，来渲染一个显示错误页面。像下面这么简单做即可：		
```javascript																											
const router = new VueRouter({																													
	routes: [																												
		// ... 你的其他路由...																											
		{																											
			path: '*',																										
			component: PageNotFound																										
																													
		}																											
	]																												
});						
```																							
当其他路由都匹配不到时，就会显示PageNotFound组件。																													
* 在使用嵌套路由时，如果没有匹配到子路由，则路由器会继续往下对其父路由之外的路由列表进行搜寻，所以通配符路由返回的都是同样的PageNotFound组件。																													
如果想让子路由的错误页面也能在父组件中显示，则需要在子路由数组中添加该通配符路由：												
```javascript																	
const router = new VueRouter({																													
	routes:[																												
		{																											
			path: '/settings',																										
			component: PageSettings,																										
			children:[																										
				{																									
					path: 'profile',																								
					component: PageSettingsProfile																								
				},																									
				{																									
					path: '*',																								
					component: PageNotFound																								
																													
				}																									
			]																										
		},																											
		{																											
			path: '*',																										
			component: PageNotFound																										
		}																											
	]																												
});		
```																											
	现在显示的还是同一个PageNotFound组件，只不过单击PageSettings组件的侧边栏也能显示这个组件。																												
																													
## 路由命名
在本章要说的最后一个vue-router的特性是其命名路由的能力，然后用路由的名称来代替它们的路径。先给路由器的路由加上一个name属性：				
```javascript																									
const router = new VueRouter({																													
	routes:[																												
		{																											
			path: '/',																										
			name: 'home',																										
			component: PageHome																										
		},																											
		{																											
			path: '/user/:userId',																										
			name: 'user',																										
			component: PageUser																										
		}																											
	]																												
});
```

### 现在，可以使用名称来代替路径进行链接了：
```html																												
<router-link :to="{name: 'home'}">Return to home<router-link>																
```													
下面两行代码是等效的：																													
```html
<router-link to="/user/1234">User #1234</router-link>																				

<router-link :to="{path: '/user/1234'}">User #1234<router-link>															```														
只不过第一行比第二行要短。																													
																													
### 可以用<span class="object">router</span>.<span class="method">push()</span>来跳转
```javascript
router.push({ name: 'home' });																													
```
给路由命名，并采取名称而不是路径来标识它们，这意味着路由和路径变得不再那么耦合紧密了：改变路由的路径时，只需要改变路由器中的路径，而不需要再去检查所有现存的链接并对它们做出更新。																													
																													
### 要想像之前的user路由那样把路由与params关联起来，你可以在<span class="object">to</span>对象的params属性中指定：
```html																												
<router-link :to="{name: 'user', params: {userId: 1234}}">																													
	User #1234																												
</router-link>																													
```


# Vuex
> [vue组件间通信六种方式（完整版）](https://segmentfault.com/a/1190000019208626)




# vue写一个组件，需要能替代原生的a标签
`<a  />`
==>
`<A />`

a标签的属性
href
target
a标签的样式
鼠标悬停
点击

> [《Vue.js快跑：构建触手可及的高性能Web应用》](https://weread.qq.com/web/reader/82032410718487828207501kc81322c012c81e728d9d180)  
> [安装·Vue.js官网](https://cn.vuejs.org/v2/guide/installation.html) 

## Vue Devtools
[https://github.com/vuejs/vue-devtools#vue-devtools](https://github.com/vuejs/vue-devtools#vue-devtools])

## 安装Vue
如何安装并将Vue.js引入网页
* 对于简单的页面，安装Vue不需要任何特殊的工具  
    ```html
    // 有一个ID为app的div元素用于初始化Vue——因为多种原因，不能在body元素上进行初始化。
    <div id="app"></div>
    
    // 在页面上引用CDN[插图]版本的Vue文件。当然也可以下载到本地并引用。
    <script>
    new Vue({
        // 运行一些JavaScript代码，创建一个Vue的实例，并将该实例的el属性指向之前提到的div元素。
        el: '#app',
        created() {
            // 这段代码会在应用启动时运行
        }
    });
    </script>
    ```
   * 直接[下载](https://cn.vuejs.org/v2/guide/installation.html)并用 `<script>` 标签引入，Vue 会被注册为一个全局变量。  
     在开发环境下不要使用压缩版本，不然你就失去了所有常见错误相关的警告!
   * CDN
      * 对于制作原型或学习，你可以这样使用最新版本：  
      https://cdn.jsdelivr.net/npm/vue/dist/vue.js
      * 对于生产环境，我们推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏：  
      https://cdn.jsdelivr.net/npm/vue@2.6.11
      * 一个兼容 ES Module 的构建文件:  
      https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js  
      * 在 unpkg 和 cdnjs 上获取 (cdnjs 的版本更新可能略滞后)
         
* 对于任何更加复杂的场景，你可能希望使用类似webpack这样的打包工具。
   * 借助它可以：（在第2章中会有详细介绍）

	   * 使用ECMAScript 2015（甚至更高）标准的JavaScript语言
	   * 编写单文件组件
	   * 实现组件的相互引用
	   * 书写作用域为特定组件的CSS等其他特性
vue-loader是一个webpack的加载器，允许你将一个组件的所有HTML、JavaScript和CSS代码编写到同一个文件中。
   * 如何安装vue-loader
      * 如果已经配置好webpack或者有喜爱的webpack配置模板
可以通过npm安装vue-loader，然后将下面的代码添加到webpack配置的loader部分，就可以完成vue-loader的安装
    ```javascript
    module.exports = {				
        // ...			
        module: {			
            rules: [{		
                test: /\.vue$/,	
                use: 'vue-loader'
            }],		
        },			
    };				
    ```

     * 如果还没有配置好webpack或者正在头疼如何添加vue-loader  
可以使用一份现成的模板来初始化vue项目，它使用了webpack并已经安装好了vue-loader。   
你可以通过vue-cli使用它：
    ```
    $ npm install --global vue-cli
    $ vue init webpack
    ```																							

  
# 第6章 使用vuex实现状态管理
  
  
# 第7章 对Vue组件进行测试

