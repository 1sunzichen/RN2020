# RN2020
## Number 代表章节
## Number1 分支 就代表第一章节 依次类推
# 代码思路
## 先写action 
#### 类型文件(请求中 请求成功 请求失败)
#### action方法( 首次请求,请求更多数据)
#### 聚合 提取 action/index 提取方法
## 再写reducer 
#### 判断类型 (刷新；下拉：成功，失败；上拉：成功，失败 )
#### 聚合 提取 reducer/index 提取方法
## 最后写组件 串起来
#### 组件介绍
#### react-native-htmlview HTML标签识别组件
#### DeviceInfo 设备是否运行在iphoneX 上

### 7-8 详情页开发

##### 打开详情页 detailPage  
###### 先设计 头部  （引入类似 popular的页面）
###### 然后

###### issue 汇总 
###### 1.react native AsyncStorage firebase JSON value '<null>' of type NSNull cannot be converted to NSString3
###### 原因（漏传参数）

### 8-5 跳转组件通信    详情页 和 列表页 状态的同步
##### 第一步 在跳转 到 组件之前 在跳转方法中 设置 传递 的 回调函数
###### js/page/PopularPage.js    onSelect 中 传入 callback 函数
##### 第二步 列表的子组件 点击本身 的时候 传入 具体的回调函数 
###### js/common/PopularItem.js  在 TouchableOpacity组件的 onItemClick 方法 
###### 以及 js/common/BaseItem.js  中 onItemClick 的具体实现
##### 第三步 路由跳转 将 方法传入
##### 第四步 在 页面需要同步的 方法中 进行调用 
###### js/page/detailPage.js 同步方法 onFavoriteButtonClick 调用 callback(isFavorite);

### 8-6 先建立一个页面
#### 1增加 action 类型
#### 2创建 相关reducer 
### eventBus

### 9 我的页面 -关于页面
##### 1 关于页面 复用 进行封装 组装者模式 9-6
##### 2 新建关于页面  9-7

### 10 创建最热模块 自定义选项卡（语言）
##### 