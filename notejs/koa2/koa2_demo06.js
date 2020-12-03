/**
 * 静态资源
 * @type {Application}
 */

const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '../static'

app.use(static(
    path.join(__dirname, staticPath)
))

app.use(async ctx => {
    let html = '<a href="https://www.abc.edu.cn">商贸学院</li>'
    ctx.body = html
})

// 访问：http://localhost:3000/iOSer.png  http://localhost:3000/style.css  http://localhost:3000/method.js

app.listen(3000)
console.log('server is running at port 3000')