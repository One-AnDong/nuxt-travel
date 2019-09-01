# 前言

这是一个使用 nuxt.js 仿写的 pc 端马蜂窝商城，主要功能页面包括登陆注册，旅游攻略，酒店预定和机票预定等模块，设计地图定位，支付等功能的调用，适合初学者，接下来我将逐步实现所有功能模块，开发流程将写成文档供大家学习交流。

## 技术栈

```
nuxt.js + vue + vuex + axios + element-ui + pug + stylus + es6/7
```

## 项目运行

```
git clone https://github.com/One-AnDong/nuxt-travel
cd nuxt-travel
npm install 或 yarn(推荐)
npm run dev 或 yarn dev（推荐）
```

# 效果演示

> 暂时没有，留个坑位

# 目标功能

- [x] 登陆注册 -- 完成
- [x] 首页搜索 -- 完成

# 开发总结

## 项目结构搭建

> 留坑

# 目录结构

```
.
├── README.md
├── assets
│   ├── images
│   │   └── logo.png
│   ├── stylus
│   │   ├── main.styl
│   │   ├── reset.styl
│   │   └── variables.styl
│   └── utils
├── components
│   ├── README.md
│   ├── common
│   │   ├── Footer.vue
│   │   └── Header.vue
│   ├── hotel
│   ├── strategy
│   ├── ticket
│   └── user
├── layouts
│   ├── README.md
│   └── default.vue
├── middleware
│   └── README.md
├── nuxt.config.js
├── package.json
├── pages
│   ├── README.md
│   ├── hotel
│   │   └── index.vue
│   ├── index.vue
│   ├── strategy
│   │   └── index.vue
│   ├── ticket
│   │   └── index.vue
│   └── user
│       └── login.vue
├── plugins
│   ├── README.md
│   └── element-ui.js
├── static
│   ├── README.md
│   └── favicon.ico
├── store
│   └── README.md
└── yarn.lock
```
