
# x.t.ds
[d.ts你知道多少？](https://blog.csdn.net/snsHL9db69ccu1aIKl9r/article/details/87870975)

d.ts大名叫TypeScript Declaration File，存放一些声明，类似于C/C++的.h头文件（#include `<stdio.h>`）
* interface是一种可复用的类型
* type也是一种可复用类型
* 类似于namespace能够组织代码模块（把一组相关代码放在一起），declare namespace能用来组织类型“模块”（把一组相关类型声明放在一起）  

# export as namespace
[TypeScript的d.ts声明文件中的export as namespace语句的作用什么？](https://www.zhihu.com/question/54927323?from=profile_question_card)

```javascript
export as namespace MyFavoriteLibrary;
```
表示可以通过全局变量的形式使用，只能在某个脚本（指不带有模块导入或导出的脚本文件）里使用。  
例如 <script> 引入这个库的话，就需要这样的声明文件来表示可以直接引用该库，如提问所示，该库定义的全局变量名字为 `MyFavoriteLibrary` 那我们就可以这么使用：（注意是在不带模块引入的文件中才可以这么使用）  
```javascript
MyFavoriteLibrary.getPerpetualEnergy()[14]
```

* 像常见的lodash,React都有这样声明文件，标准的编写模板typescript官方已经给出  
[module.d.ts · TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)

* 需要注意与外部命名空间声明的差别，外部命名空间声明：  
```typescript
declare namespace MyLib{
    export interface a {}
    ...
}
declare var myLib: MyLib.a;
```
    * 后者为全局声明一个叫做myLib的变量，在无显式调用import或者export的情况下，可以使用myLib。  
    * 而前者（export as namespace）代表有着该模块的意思。

