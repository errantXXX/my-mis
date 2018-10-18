项目安装指南
-------------
### 目录结构
>server: 提供平台所需要的接口 koa + mongoDB

>client: 平台前端代码使用 umi+dva 参考：https://github.com/zuiidea/antd-admin

>builder: 打包脚本 shell + node 

### 安装mongoDB
https://www.mongodb.com/download-center/v2/community

进入页面后。可以在页面正中央看到 Cloud Servers Tools三个标签

点击 Servers确认 Version,OS,Package信息后点击 Download执行安装

安装完成后，我们可以把 MongoDB 的二进制命令文件目录（安装目录/bin）添加到 PATH 路径中：

export PATH=/mongodb安装目录/mongodb/bin:$PATH

执行 mongod 确认是否安装完成

### 安装 mongoose
npm install mongoose -g

###安装各包依赖启动服务


进入 server目录 执行
npm install 安装依赖
执行 npm run init 初始化数据库
执行 npm run start 开启接口服务


进入client 
npm install 安装依赖
（因为有些插件我是全局装的，其他人可能需要手动装几个依赖，提示缺什么一般使用 npm install xxx --save-dev）
npm run start 开启配置平台服务
初始进入用户名密码为
admin
admin

使用adminMongo管理数据库

https://github.com/mrvautin/adminMongo

按步骤安装

安装完毕后默认的 Connection string 填写

mongodb://127.0.0.1:27017 即可连接