# React-wrok-cli

## 目的

为了能够在工作中更加快速的搭建起开发环境，所以在react-cli的基础之上结合自身公司业务和个人
习惯，搭建了个更加方便的cli。

## 技术栈

- react  // mvm框架
- typescipt // 开发语言
- sass // 预编译语言
- anti-mobile // UI框架
- axios // http请求
- react-router-dom // 路由


## 目录结构
    core // 存放一些工具代码和一些服务
    environments  // 存放环境配置文件
    pages // app页面存放文件
    routing // 路由
    components // 公共组件
    
## 搭建过程
1 配置typescript使用环境
首先我打算使用typescript作为开发语言，首先我们是用[create-react-app](https://github.com/wmonk/create-react-app-typescript)
来作为基础的脚手架工具，按照github上面的操作方法，进行如下操作:
```
npm install -g create-react-app

create-react-app my-app --scripts-version=react-scripts-ts
cd my-app/
npm start
```

这样当我们就可以通过`npm start`启动应用了

2 配置scss

[参考链接](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)

`npm install --save node-sass-chokidar`

```
"scripts": {
+    "build-css": "node-sass-chokidar src/ -o src/",
+    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
     "start": "react-scripts-ts start",
     "build": "react-scripts-ts build",
     "test": "react-scripts-ts test --env=jsdom",
```

按照如上操作即可,然后再添加`src/**/*.css`在`.gitignore`文件中。接下来我们希望项目能够监测scss的变化，从而自动去编译scss文件，显然我们要用到`watch-css`和`build-css`这两个任务
我们可以使用`&&`操作符，但是这种跨平台性并不是很好，所以我们采用`npm-run-all`这个工具。

```text
npm install --save npm-run-all
```
然后进行如下修改
```text
   "scripts": {
     "build-css": "node-sass-chokidar src/ -o src/",
     "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
-    "start": "react-scripts-ts start",
-    "build": "react-scripts-ts build",
+    "start-js": "react-scripts-ts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build-js": "react-scripts-ts build",
+    "build": "npm-run-all build-css build-js",
     "test": "react-scripts-ts test --env=jsdom",
     "eject": "react-scripts-ts eject"
   }
```

ok,以上我们就搭建好了scss环境

3 安装anti-mobile

```text
npm install antd-mobile --save
```

```text
npm install react-app-rewired --save-dev
```

```text
"scripts": {
    "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
    "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
    "start-js": "react-app-rewired start --scripts-version react-scripts-ts",
    "start": "npm-run-all -p watch-css start-js",
    "build-js": "react-app-rewired build --scripts-version react-scripts-ts",
    "build": "npm-run-all build-css build-js",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts-ts eject"
  },
```

这里由于我们使用的是typescript，所以`"start-js": "react-app-rewired start --scripts-version react-scripts-ts",`和`"build-js": "react-app-rewired build --scripts-version react-scripts-ts",`
后面要加上`react-scripts-ts`

安装`npm install babel-plugin-import --save-dev` [参考链接](https://ant.design/docs/react/use-in-typescript-cn)

更改`config-overrides.js`文件
```javascript
/* config-overrides.js */
const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");

module.exports = function override(config, env) {
    const tsLoader = getLoader(
        config.module.rules,
        rule =>
            rule.loader &&
            typeof rule.loader === 'string' &&
            rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [ tsImportPluginFactory({
                libraryName: 'antd-mobile',
                libraryDirectory: 'es',
                style: 'css',
            }) ]
        })
    };

    return config;
};
```
这样我们就可以直接引入`import { Button } from 'antd-mobile';`不需要在前面引入`import 'antd-mobile/dist/antd-mobile.css';`

当我们引入antd-mobile后可能会出现下列错误
> E:/MyProjects/frame-work-cli/my-app/node_modules/antd-mobile/lib/picker/PropsType.d.ts
  (7,15): Parameter 'values' implicitly has an 'any' type.
  
找到node_modules/antd-mobile/lib/picker/PropsType.d.ts把`format?: (values) => void;`改成 `format?: (values: any) => void;`即可
当然为了直接省事，直接在tsconfig.json设置"noImplicitAny": false


4 开发环境切换配置
现在公司一般都会有开发环境，预发布环境和正式环境，这些环境所对应的后端地址并不一样，所以我们要来进行一些配置方便切换。
实现的思路就是读取命令行参数，根据参数把不同环境的配置文件的内容复制替换掉environment.js这个文件，这里我们用到了[shelljs]()和[cross-env]()
这两个js库。创建`cp-environment.js`

```javascript
const shell = require('shelljs');

const env = process.env.NODE_ENV;
const src = `src/environments/environment.${env}.ts`;
const to = `src/environments/environment.ts`;

shell.cp('-R', src, to);
```

更改package.json
```
"scripts": {
    "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
    "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
    "start-js": "react-app-rewired start --scripts-version react-scripts-ts",
    "start": "cross-env NODE_ENV=pro npm-run-all cp-environment -p watch-css start-js",
    "startDev": "cross-env NODE_ENV=dev npm-run-all cp-environment -p watch-css start-js",
    "startLocal": "cross-env NODE_ENV=local npm-run-all cp-environment -p watch-css start-js",
    "build-js": "react-app-rewired build --scripts-version react-scripts-ts",
    "build": "cross-env NODE_ENV=pro npm-run-all cp-environment build-css build-js",
    "buildLocal": "cross-env NODE_ENV=Local npm-run-all cp-environment build-css build-js",
    "buildDev": "cross-env NODE_ENV=dev npm-run-all cp-environment build-css build-js",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts-ts eject",
    "cp-environment": "node cp-environment.js"
  }
```
当然我们开发环境上传的代码应该是buildDev后的代码，但是有可能有时进行了误操作，把build后的代码上传上去，我们还可以写一个检测的脚本。
原理就是读取当前分支名，根据分知名和当前的环境变量进行对比。

```javascript
const branchEnvMap = {
  dev: 'dev',
  test: 'test',
  release: 'prod',
};

const shell = require('shelljs');
const branch = shell.exec('git rev-parse --symbolic-full-name --abbrev-ref HEAD', { silent: true }).toString().trim();
const env = process.argv.slice(2).toString().split('=')[1].toString();

if (branchEnvMap[branch] !== env) {
  shell.echo('该分支对应的编译任务不是这个，请检查执行的命令!', branch, env);
  shell.exit(1);
}
```

## Http
用到就是[axios](https://github.com/axios/axios)，至于怎么用直接看github就行，这里进行了一层封装，主要是对返回的结果进行统一的处理。

## 路由
我用到的是[react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom),至于用法还是推荐看github，

## 坑
1 
> E:/MyProjects/frame-work-cli/my-app/node_modules/@types/react-dom/node_modules/@types/react/index.d.ts
  (3631,13): Subsequent property declarations must have the same type.  
  Property 'a' must be of type 'DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>', 
  but here has type 'DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>'.

当我们启动应用的时候可能会出现如上错误，这是由于我们安装的`@types/react`和`@types/react-dom`版本并不怎么一致，[参考链接](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20863)， 力例如下面的版本
```
 "@types/react": "^15.6.7",
 "@types/react-dom": "^16.0.3",
```
所以我们可以换成

```
"@types/react": "^16.0.36", 
"@types/react-dom: "^16.0.3"
```

2
> E:/MyProjects/frame-work-cli/my-app/node_modules/antd-mobile/lib/picker/PropsType.d.ts
  (7,15): Parameter 'values' implicitly has an 'any' type.
  
  在tsconfig.json设置"noImplicitAny": false
3
> error TS1192: Module '"react"' has no default export.
  
 设置 tsconfig.json "allowSyntheticDefaultImports": true,

  4 expected parameter: 'props' to have a typedef
在tslint.json设置typedef: false,这个属于tslint相关配置的问题，具体可以看文档

## 推荐
这里有阿里的一个[脚手架市场](http://scaffold.ant.design/#/)
  





    