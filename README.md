# webpack（0~1）搭建React脚手架：React-Custom-Cli

## 分支说明
- 主分支为`TS`版本

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
web.jairwin.cn:8088
```

## TODO
- [ ] docker
- [ ] Eslint完善
- [ ] Update Webpack 5
- [ ] CI

### less配置

yarn add less-loader style-loader css-loader -D

### FAQ
- Q：No module factory available for dependency type: CssDependency
- A：https://github.com/webpack-contrib/mini-css-extract-plugin/issues/493#issuecomment-603038616
