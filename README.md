## 一个立创商城用的专用tool domo


### 已辞职，不再更新。
### 声明：内无公司任何隐私。
#### 1.环境依赖
python 3.6

├─pyperclip			//用于剪切板的模块

├─BeautifulSoup4	//用于网页编码提取

├─lxml				//解析编码库

├─requests			//网页获取库。（自带的url库不支持中文，就很气）

#### 2.intall
1. 到python官方安装3.6版本python
2. 运行安装依赖库.cmd脚本
3. 最后运行源目录下的py文件即可

#### 3.使用说明
![rd01](/image/rd01.jpg)



文本框输入搜索，回车或点击查找商品即可打开浏览器

#### 4.目录结构描述（待更新）
├── Readme.md   		  // help

├── text				  //单功能测试

├── xxx.py                             //emmm目前就一个程序

#### 5.更新日志

2018年4月6日下午：更新以下功能：

1. 搜索到器件后，会同时弹出该器件的datasheet的PDF。

2018年4月4日下午：更新以下功能：

1. 增加器件编号进入网页。
2. 回车键后，如果搜索页面有且只有一个搜索结果，则自动进入该页面

2018年4月4日：更新源文件，增加以下功能。

1. 查找商品。
2. 新后台链接（仅限内部用，外网无法访问）



####※需求备注：

1. 对比功能

   ​	同页面同时显示俩个页面

2. 证书搜索功能

    	1. 批量根据编号搜索厂家，并复制到同一目录下，同时提示无编号的厂家。
   	2. 型号和时间录入功能。自带时间戳。过期自动提醒。

3. QA收集功能：

   1. 数据库结构，具体为编号，厂家，型号，类似型号，问题。
