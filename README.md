# webpack（0~1）搭建React脚手架：React-Custom-Cli

## 运行项目

安装依赖
```
yarn
```
运行项目
```
yarn start
```
绑定`hosts`

- Mac：`sudo vim /etc/hosts`
- Windows：打开电脑文件夹，按照如下路径，找到`hosts`文件（C:\Windows\System32\drivers\etc）
- 然后复制如下

```
127.0.0.1 web.jairwin.cn
```

访问

```
web.jairwin.cn:8080
```

> 分支
```
react
ts
```

> 脚手架使用`yarn`进行依赖安装
```
yarn
yarn add 依赖名
yarn add 依赖名 -D
```

### less配置

yarn add less-loader style-loader css-loader -D

### FAQ
- TS Hmr：https://github.com/webpack-contrib/webpack-hot-middleware/issues/89#issuecomment-389158559
