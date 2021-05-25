# Rabzit

[Rabzit](https://rabzit.jonbgua.com) 是一个维吉尼亚密码加密器，系《密码学导论》课程的大作业之一。

一些技术经验总结可参见 [手记：开发 Rabzit 过程中的经验总结 | 酱瓜](https://jonbgua.com/developing-rabzit.html)。



## 流程图

Rabzit 可划分为三大功能模块：Vigenère 加密模块、词频统计分析模块和 Kasiski 分析模块。

### 主程序

主程序包括 Vigenère 加密模块和词频统计分析模块。

<img src="docs/img/Rabzit.svg" alt="Rabzit" style="zoom:50%;" />

### Kasiski 分析

<img src="docs/img/Kasiski.svg" alt="Kasiski" style="zoom:50%;" />



## 效果预览

### 主界面

![image-20210429200215276](docs/img/image-20210429200215276.png)



### Vigenère 加密

下例中用到的的明文和密钥可点击网页上的「载入示例」获取并复现加密结果。

#### 密文

![image-20210429200342211](docs/img/image-20210429200342211.png)

#### 统计分析

Rabzit 对密文进行统计分析，词频结果以哈希表（即 JavaScript 对象）的形式存储，统计图表使用了 Apache ECharts 库进行绘制。

##### 单字符频率统计

![image-20210429200503909](docs/img/image-20210429200503909.png)

##### 双字符频率分析

![image-20210429200555992](docs/img/image-20210429200555992.png)



##### 三字符频率分析

![image-20210429200650892](docs/img/image-20210429200650892.png)



## 参考

-  [JavaScript: Find the Greatest Common Divisor or GCD of more than 2 integers - w3resource](https://www.w3resource.com/javascript-exercises/javascript-math-exercise-9.php)

