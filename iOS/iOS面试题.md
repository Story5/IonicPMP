# 一、基础题

## 1.TCP连接过程

![一个TCP连接的生命周期](https://static001.geekbang.org/resource/image/44/44/440ee50de56edc27c6b3c992b3a25844.png)

### (1)三次握手

![三次握手](http://www.ituring.com.cn/figures/2014/PIC%20HTTP/05.d01z.009.png)

* 客户端首先发送一个**SYN标志的数据包**给服务器
* 当服务器收到后,回传一个带有**SYN/ACK的标志的数据包**已表示确认信息
* 最后,客户端再回传一个带**ACK的标志的数据**包,表示握手结束

### (2)四次挥手

![四次挥手](https://pics5.baidu.com/feed/48540923dd54564e5260495ce0006487d0584fb6.jpeg?token=c3a743af38e25ff66deb6a07891be58e&s=C584FC1A71CFF4EE1A75A45203007073)

## 2.HTTP1/2/3

### (1)HTTP/1.1主要问题

**对带宽利用率不理想**

* TCP**慢启动**,设计如此,为了减少网络阻塞的一种策略(TCP本身机制)
* 同时开启多条 TCP 连接会竞争固定的带宽(TCP本身机制)
* **队头阻塞**问题,一个TCP管道同一时刻只能处理一个请求,其他等待

### (2)HTTP2的多路复用(解决队头阻塞问题)

* HTTP/2 的思路就是一个域名只使用一个 TCP 长连接来传输数据(解决慢启动和多条TCP竞争带宽问题)
* 多路复用(引入二进制分帧层),请求进入二进制分帧层被转换待ID编号帧
* 可以设置请求的优先级

### (3)HTTP3

![HTTP2和HTTP3协议栈](https://static001.geekbang.org/resource/image/0b/c6/0bae470bb49747b9a59f9f4bb496a9c6.png)



## 3.HTTPS和HTTP

### (1)HTTP缺点

* **认证**:不验证通信方的身份,任何人都可以发送请求,服务器只要接收到请求就返回响应,有可能被伪装
* **加密**:HTTP本身,通信使用明文传输,不加密,内容可能被窃听(wireshark抓包)
* **完整性**:无法验证报文的完整性,所以有可能被篡改

### (2)HTTPS = HTTP + 认证 + 加密 + 完整性

![HTTP和HTTPS](https://static001.geekbang.org/resource/image/9e/cf/9e99f797de30a15a11b0e4b4c8f810cf.png)

* 引入SSL(Secure Socket Layer)安全层,对数据加密解密
* 在传输数据阶段依然使用**对称加密**，但是对称加密的密钥我们采用**非对称加密来传输**
* 向CA机构申请**数字证书**(一是验证服务器身份,二是包含服务器公钥)

## 4.内存划分

![内存划分](https://img-blog.csdn.net/20160512152821802)

# 二、iOS层面

## 1.UIKit结构

![UIKit结构](https://mmbiz.qpic.cn/mmbiz_jpg/foPACGrddJ0YQLeK0eqUxEyJCWJWQVt4JpnZzHHNdWfJLW0S44N27bnyibVrU0jecxDlc35vgTYTVtPGvsFicjJQ/640.jpeg?tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 2.Objective-C优缺点

### (1)优点

* Cateogies 
* 动态识别 
* 弹性讯息传递 
* 不是一个过度复杂的 C 衍生语言 
* Objective-C 与 C++ 可混合编程 

### (2)缺点

* 不支援命名空间 
* 不支持运算符重载 
* 不支持多重继承 
* 使用动态运行时类型，所有的方法都是函数调用，所以很多编译时优化方法都用不到。（如内联函数等），性能低劣。 

## 3.属性关键字assign、retain、weak、copy

- assign：用于基本数据类型和结构体。如果修饰对象的话，当销毁时，属性值不会自动置nil，可能造成野指针。
- weak：对象引用计数为0时，属性值也会自动置nil
- retain：强引用类型，ARC下相当于strong，但block不能用retain修饰，因为等同于assign不安全。
- strong：强引用类型，修饰block时相当于copy。

## 4.weak属性如何自动置nil的？

Runtime会对weak属性进行内存布局，构建hash表：以weak属性对象内存地址为key，weak属性值(weak自身地址)为value。当对象引用计数为0 dealloc时，会将weak属性值自动置nil。

## 5.block和函数指针的理解

### (1)相似点

都可以实现回调的操作

### (2)不同点

* **函数指针**只能指向预先定义好的函数代码块,在编译链接阶段就已经确定好的
* **Block**本质是OC对象,是NSObject的子类,可以接受消息
* 函数里面只能访问全局变量,而Block代码块不光能访问全局变量,还拥有当前栈内存和堆内存变量的可读性,通过__block修饰的局部变量还可以在block代码块里进行修改
* 从内存角度看,函数指针只是指向代码区的一段可执行代码,而block实际上是程序运行过程中在栈内存动态创建的对象,可以向其发从copy消息来将其拷贝到堆内存,以延长生命周期

## 6.KVO底层实现原理？手动触发KVO？swift如何实现KVO？

- KVO原理：当观察一个对象时，runtime会动态创建继承自该对象的类，并重写被观察对象的setter方法，重写的setter方法会负责在调用原setter方法前后通知所有观察对象值得更改，最后会把该对象的isa指针指向这个创建的子类，对象就变成子类的实例。
- 如何手动触发KVO：在setter方法里，手动实现NSObject两个方法：willChangeValueForKey、didChangeValueForKey
- swift的kvo：继承自NSObject的类，或者直接willset/didset实现。

## 7.OC与Swift混编

- OC调用swift：import "工程名-swift.h” @objc
- swift调用oc：桥接文件

## 8.并发编程

**一个进程(App)至少包含一个线程(UI主线程,网络其他线程)**

### (1)GCD

- 两种队列开箱即用：`main` 和 `global`。
- 可以创建更多的队列（使用 `dispatch_queue_create`）

### (2)NSThread

- 低级别构造，最大化控制。
- 应用创建并管理线程。
- 应用创建并管理线程池。
- 应用启动线程。
- 线程可以拥有优先级，操作系统会根据优先级调度它们的执行。
- 无直接 API 用于等待线程完成。需要使用互斥量（如 `NSLock`）和自定义代码。

### (3)NSOperation和NSOperationQueue

- 应用管理自己创建的队列。
- 队列是优先级队列。
- 操作可以有不同的优先级（使用 `queuePriority` 属性）。
- 使用 `cancel` 方法可以取消操作。注意，`cancel` 仅仅是个标记。如果操作已经开始执行，则可能会继续执行下去。
- 可以等待某个操作执行完毕（使用 `waitUntilFinished` 消息）。

### (4)nonatomic原子属性

可以阻止两个线程同时更新一个值，正在修改属性的线程必须处理完毕后，其他线程才能开始处理。

## 9.runtime

### (1)OC 的消息机制

- OC中的方法调用其实都是转成了**objc_msgSend**函数的调用，给receiver（方法调用者）发送了一条消息（selector方法名）
- objc_msgSend底层有3大阶段，消息发送（当前类、父类中查找）、动态方法解析、消息转发

### (2)runtime的具体应用

- 利用关联对象（AssociatedObject）给分类添加属性
- 遍历类的所有成员变量（修改textfield的占位文字颜色、字典转模型、自动归档解档）
- 交换方法实现（交换系统的方法）
- 利用消息转发机制解决方法找不到的异常问题
- KVC 字典转模型

### (3)Objective-C中调用方法的过程

Objective-C是动态语言，每个方法在运行时会被动态转为消息发送，即：objc_msgSend(receiver, selector)，整个过程介绍如下：

- objc在向一个对象发送消息时，runtime库会根据对象的isa指针找到该对象实际所属的类
- 然后在该类中的方法列表以及其父类方法列表中寻找方法运行
- 如果，在最顶层的父类（一般也就NSObject）中依然找不到相应的方法时，程序在运行时会挂掉并抛出异常unrecognized selector sent to XXX
- 但是在这之前，objc的运行时会给出三次拯救程序崩溃的机会，这三次拯救程序奔溃的说明见问题《什么时候会报unrecognized selector的异常》中的说明。

### (4)什么时候会报unrecognized selector错误？iOS有哪些机制来避免走到这一步？

* resolveInstanceMethod
* forwardingTargetForSelector

### (4)常用方法

* **class_copyMethodList** 枚举类的方法列表
* **class_copyPropertyList** 枚举类的属性列表
* **class_copyIvarList** 枚举类的成员变量列表
* **class_copyProtocolList **枚举类实现的协议列表

### (5)id和instancetype区别

* id 能作为返回值,参数, instancetype只能作为返回值
* instancetype是类型相关的,如果把instancetype的对象赋值给另外的类会报错,id不会

### (6)@property 的本质

> @property = ivar + getter + setter

### (7)objc对象的isa指针指向什么?

**指向他的类对象,从而可以找到对象上的方法**

## 10.NSTimer准吗?

### (1)不准

### (2)原因

* NSTimer加在main runloop中，模式是NSDefaultRunLoopMode，main负责所有主线程事件，例如UI界面的操作，复杂的运算，这样在同一个runloop中timer就会产生阻塞。

* 模式的改变。主线程的 RunLoop 里有两个预置的 Mode：kCFRunLoopDefaultMode 和 UITrackingRunLoopMode。

* 当你创建一个 Timer 并加到 DefaultMode 时，Timer 会得到重复回调，但此时滑动一个ScrollView时，RunLoop 会将 mode 切换为 TrackingRunLoopMode，这时 Timer 就不会被回调，并且也不会影响到滑动操作。所以就会影响到NSTimer不准的情况。

> DefaultMode 是 App 平时所处的状态，rackingRunLoopMode 是追踪 ScrollView 滑动时的状态。

### (3)解决

* 在主线程中进行NSTimer操作，但是将NSTimer实例加到main runloop的特定mode（模式）中。避免被复杂运算操作或者UI界面刷新所干扰。

  ```objective-c
  self.timer = [NSTimer timerWithTimeInterval:1 target:self selector:@selector(showTime) userInfo:nil repeats:YES];
  [[NSRunLoop currentRunLoop] addTimer:self.timer forMode:NSRunLoopCommonModes];
  ```

* 在子线程中进行NSTimer的操作，再在主线程中修改UI界面显示操作结果

  ```objective-c
  - (void)timerMethod2 {
  	NSThread *thread = [[NSThread alloc] initWithTarget:self selector:@selector(newThread) object:nil];
  	[thread start];
  }
  
  
  - (void)newThread{
  	@autoreleasepool{
  	[NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(showTime) userInfo:nil repeats:YES];
  	[[NSRunLoop currentRunLoop] run];
  	}
  }
  ```

* 直接用`gcd`

## 11.UITableView优化方法

### (1)cell复用机制

### (2)避免cell重新布局

* cell的布局填充等操作 比较耗时，一般创建时就布局好

* 如可以将cell单独放到一个自定义类，初始化时就布局好

### (3)提前计算并缓存cell的属性和内容

* 当我们创建cell的数据源方法时，编译器并不是先创建cell 再定cell的高度

* 而是先根据内容一次确定每一个cell的高度，高度确定后，再创建要显示的cell
* 滚动时，每当cell进入屏幕都会计算高度，提前估算高度告诉编译器，编译器知道高度后，紧接着就会创建cell，这时再调用高度的具体计算方法，这样可以避免浪费时间去计算显示以外的cell

### (4)减少cell中控件的数量

* 尽量使cell得布局大致相同，不同风格的cell可以使用不用的重用标识符，初始化时添加控件

### (5)不要使用ClearColor,无背景色,透明度也不要设置0

* 渲染耗时比较长

### (6)使用局部更新

如果只是更新某组的话,使用`reloadRowsAtIndexPaths`或`reloadSections`代替`reloadData`进行局部更新

### (7)加载网络数据,下载图片,使用异步加载,并缓存

### (8)少使用`addSubview`给cell动态添加view

### (9)按需加载cell,cell滚动很快时,只加载范围内cell

```objective-c
//按需加载 - 如果目标行与当前行相差超过指定行数，只在目标滚动范围的前后指定3行加载。
- (void)scrollViewWillEndDragging:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset{
    NSIndexPath *ip = [self indexPathForRowAtPoint:CGPointMake(0, targetContentOffset->y)];
    NSIndexPath *cip = [[self indexPathsForVisibleRows] firstObject];
    NSInteger skipCount = 8;
    if (labs(cip.row-ip.row)>skipCount) {
        NSArray *temp = [self indexPathsForRowsInRect:CGRectMake(0, targetContentOffset->y, self.width, self.height)];
        NSMutableArray *arr = [NSMutableArray arrayWithArray:temp];
        if (velocity.y<0) {
            NSIndexPath *indexPath = [temp lastObject];
            if (indexPath.row+33) {
                [arr addObject:[NSIndexPath indexPathForRow:indexPath.row-3 inSection:0]];
                [arr addObject:[NSIndexPath indexPathForRow:indexPath.row-2 inSection:0]];
                [arr addObject:[NSIndexPath indexPathForRow:indexPath.row-1 inSection:0]];
            }
        }
        [needLoadArr addObjectsFromArray:arr];
    }
}
```

记得在tableView:cellForRowAtIndexPath:方法中加入判断：

```objective-c
if (needLoadArr.count>0&&[needLoadArr indexOfObject:indexPath]==NSNotFound) {
    [cell clear];
    return;
}
```

### (10)缓存高度

**estimatedHeightForRow**不能和**HeightForRow里面的layoutIfNeed**同时存在，这两者同时存在才会出现“窜动”的bug。

* 只要是**固定行高**就写**预估行高**来减少行高调用次数提升性能。
* 如果是**动态行高**就不要写预估方法了，用一个行高的缓存字典来减少代码的调用次数即可

## 12.category同名方法调用

- Category 实际上是 Category_t的结构体，在运行时，新添加的方法，都被以倒序插入到原有方法列表的最前面，所以不同的Category，添加了同一个方法，执行的实际上是最后一个。
- Category 在刚刚编译完的时候，和原来的类是分开的，只有在程序运行起来后，通过 Runtime ，Category 和原来的类才会合并到一起。

## 13.AFNetworking证书

`AFSecurityPolicy`**类配置**

* ```objective-c
  typedef NS_ENUM(NSUInteger, AFSSLPinningMode) {
      AFSSLPinningModeNone,
      AFSSLPinningModePublicKey,
      AFSSLPinningModeCertificate,
  };
  ```

* **allowInvalidCertificates** 是否允许无效证书

* **validatesDomainName** 是否验证域名

## 14.SDWebImage原理

从内存中（字典）找图片（当这个图片在本次程序加载过），找到直接使用； 

从沙盒中找，找到直接使用，缓存到内存。 

从网络上获取，使用，缓存到内存，缓存到沙盒。

## 15.点击一个button的响应链

* 设备将touch到的UITouch和UIEvent对象打包, 放到当前活动的Application的事件队列中

* 单例的UIApplication会从事件队列中取出触摸事件并传递给单例UIWindow

* UIWindow使用`hitTest:withEvent:`方法查找touch操作的所在的视图view

## 11.内存五大区域

![内存五大区域](http://api.cocoachina.com/uploads//20171129/1511922840354986.jpg)

![执行顺序](http://api.cocoachina.com/uploads//20171129/1511922856231877.jpg)

# 三、Swift

## 1.struct和class的区别

### (1)类型不同

**swift**中，**class是引用类型，struct是值类型**。值类型在**传递**和**赋值**时将进行复制，而引用类型则只会使用引用对象的一个"指向"。swift中 string,array,dictionary都是struct

### (2)class有这几个功能struct没有的：

- class可以继承，这样子类可以使用父类的特性和方法
- 类型转换可以在runtime的时候检查和解释一个实例的类型
- 可以用deinit来释放资源
- 一个类可以被多次引用

### (3)struct也有这样几个优势：

- 结构较小，适用于复制操作，相比于一个class的实例被多次引用更加安全。
- 无须担心内存memory leak或者多线程冲突问题

# 四、Flutter层面

## 1.跨平台开发三个时代

* Web容器时代 - Cordova, Ionic, 微信小程序

![Hybrid开发框架](https://static001.geekbang.org/resource/image/6d/79/6d4035e44b4af68b7588a750fec06c79.png)

* 泛Web容器时代 - React Native

![泛Web容器时代](https://static001.geekbang.org/resource/image/3a/0b/3af2c590f42c0b924a22bb135134380b.png)

* 自绘引擎时代 - Flutter

![自绘引擎开发框架](https://static001.geekbang.org/resource/image/85/2c/85dfb3f8a803a0bf573f3fce63ddc92c.png)

## 2.`JIT`和`AOT`编译实现

## 3.oc与js交互

- 拦截url
- JavaScriptCore(只适用于UIWebView)
- WKScriptMessageHandler(只适用于WKWebView)
- WebViewJavaScriptBridge(第三方框架)