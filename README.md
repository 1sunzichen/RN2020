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
###### 1.react native AsyncStorage firebase JSON value '<null>' of type NSNull cannot be converted to NSString
###### 原因（漏传参数）