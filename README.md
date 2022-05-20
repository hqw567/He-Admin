## He-Admin 后台管理系统

包含数据统计、商品管理、订单管理、规格参数、个人中心、错误页等等信息。

## 技术栈

    Vue2.x + Vue-router  + Vuex + Element-ui + Axios  + Echarts + 其他三方库等

## 项目搭建

1. vue create He-Admin(Vue2.x)
2. vue-router
3. vuex
4. axios
5. vue add element --(按需)
6. Echarts
7. ...

## 后台服务

1. node.js 服务
2. express
3. jwt（生成 token）jsonwebtoken 解析 token: 安装： jwt-decode
4. mysql
5. mockjs -- 模拟数据

   1. 安装： cnpm i mockjs -S
   2. 引入：
      node.js: const Mock = require('mockjs')
      前端 js: import Mock from 'mockjs'

   3. 语法：
      Mock.mock()
      [Mock 官方文档](http://mockjs.com/)


## axios 二次封装 步骤

1. 导入 axios 模块
2. 创建 axios 实例
3. 请求拦截 config 处理
4. 响应拦截 error 处理

## 上传图片

1. upload 图片上传
2. 后台配置
   1. 后台安装 multer 模块 同时引入 fs 模块
   2. router.js 入口文件导入模块
      const fs=require('fs')
      const multer=require('multer')
   3. 上传图片 配置 upload

## 富文本编辑

1. 百度编译器
2. wangEditor

wangEditor 使用步骤：

1. 官网网址：https://www.wangeditor.com/doc/
2. 基本使用

   1. 安装：npm i wangeditor --save
   2. 引入模块：
      import E from "wangeditor"
   3. 使用 wangeditor
      const editor = new E("#div1")
      editor.create()

3. 常用配置

   1. 清空内容
      editor.txt.clear() 清空编辑器内容。

   2. 设置内容
      editor.txt.html('') 获取 html

   3. 配置菜单

      1. 配置菜单使用 editor.config.menus 定义显示哪些菜单和菜单的顺序

   4. 配置 onchange 回调函数
      配置 onchange 函数之后，用户操作（鼠标点击、键盘打字等）导致的内容变化之后，会自动触发 onchange 函数执行

## 国际化

### vuei8n

1. 介绍：
   Vue I18n 是 Vue.js 的国际化插件。它可以轻松地将一些本地化功能集成到你的 Vue.js 应用程序中。

2. 安装

   1. npm install vue-i18n
   2. main.js 导入或者是单独的文件
      import Vue from 'vue'
      import VueI18n from 'vue-i18n'

      Vue.use(VueI18n)

3. 使用步骤

   1. 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用
      ```
      Vue.use(VueI18n)。
      // import Vue from 'vue'
      // import VueI18n from 'vue-i18n'
      //
      // Vue.use(VueI18n)
      ```
   1. 准备翻译的语言环境信息

      ```
      const messages = {
              en: {// 英文
                  home: {
                      hello: 'hello world',
                      xx:xx,
                      ...
                  },
                  goods:{

                  }
              },
              zh: {// 中文
                  home: {
                      hello: '你好 世界',
                      xx:xx,
                      ...
                  },
                  goods:{
                  }
              }
          }
      ```

   1. 通过选项创建 VueI18n 实例
      const i18n = new VueI18n({
      locale: 'en', // 设置地区
      messages, // 设置地区信息
      })

   1. 通过 `i18n` 选项创建 Vue 实例
      new Vue({ i18n }).$mount('#app')

   1. 使用语法：
      `<p>{{ $t("home.hello") }}</p>`

### element 国际化

1. 导入
   import Element from 'element-ui'

2. 导入语言环境
   import enLocale from 'element-ui/lib/locale/lang/en'
   import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

   目前 Element 内置了以下语言：
   简体中文（zh-CN）
   英语（en）
   德语（de）
   葡萄牙语（pt）
   西班牙语（es）
   丹麦语（da）
   法语（fr）
   ...

3. 配置语言环境
   const messages = {
   en: {
   message: 'hello',
   ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
   },
   zh: {
   message: '你好',
   ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
   }
   }

4. 配置使用
   Vue.use(Element, {
   i18n: (key, value) => i18n.t(key, value)
   })

## 登录--路由拦截

## echarts

1. 安装：npm install echarts -S
2. 使用方式

   1. 导入 echarts 在组件内使用
   2. 导入全局 挂载原型上 全局使用
   3. 开发成 vue 插件

3. 使用 -main.js

   1. import \* as echarts from 'echarts'
      Vue.prototype.$echarts = echarts;

   2. 直接使用
      this.$echarts.xxx

## vue-PDF

参考：gitHub： https://github.com/FranckFreiburger/vue-pdf

步骤：

1. npm install --save vue-pdf
2. import pdf from 'vue-pdf'
3. components: {
   pdf
   }
4. `<pdf src="./static/relativity.pdf"></pdf>`

问题：
pdf 打印的时候 看到视图 乱码的中文

vue-pdf 网址:https://github.com/FranckFreiburger/vue-pdf/pull/130/commits/253f6186ff0676abf9277786087dda8d95dd8ea7

## 下载图片

1. window.location.href='url' (下载文件)

2. 下载图片

   ```
       down() {
           var alink = document.createElement("a");
           alink.href = this.imgUrl;
           console.log(this.imgUrl);
           alink.download = "pic"; //图片名
           alink.click();
       },

   ```

## VUE 项目实现表格导出 EXCEL 表格

1. 安装 -- 使用 npm 安装：
   npm install file-saver xlsx -S
   npm install script-loader -D

2. 在/src 目录下新建一个 excel（名字也可自取）文件夹，存入 Blob.js 和 Export2Excel.js 文件
3. 在 common 文件夹里新建 js 文件夹再新建 util.js

   ```
     export function export2Excel(columns,list){
        require.ensure([], () => {
            const { export_json_to_excel } = require('../../excel/Export2Excel');
            let tHeader = []
            let filterVal = []
            console.log(columns)
            if(!columns){
                return;
            }
            columns.forEach(item =>{
                tHeader.push(item.title)
                filterVal.push(item.key)
            })
            const data = list.map(v => filterVal.map(j => v[j]))
            export_json_to_excel(tHeader, data, '数据列表');
        })
    }
   ```

4. 在 vue 项目中的使用 --- 在需要的页面 import 引入
   import { export2Excel } from '../../common/js/util'

5. 表头初始化
6. 点击导出

## 项目启动

1. 下载项目到本地 下载命令：git clone
2. 下载依赖：cnpm i
3. 安装[xampp](https://www.apachefriends.org/zh_cn/index.html)，并启动Apache和MySQL服务，打开http://localhost/phpmyadmin/
   新建he_admin数据库，导入he_admin.sql文件
4. 项目运行： npm run serve
5. 在server路径下运行： nodemon
