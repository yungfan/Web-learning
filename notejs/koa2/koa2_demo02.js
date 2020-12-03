/**
 * 路由
 * @type {Application}
 */

const Koa = require('koa')
// 引入路由
const Router = require('koa-router')

const app = new Koa()
// 使用路由
let router = Router({
    prefix : '/nodejs'
})

// get路由
router
    .get('/index', async ctx => {
    let html = '<a href="https://www.abc.edu.cn">商贸学院</li>'
    ctx.body = html
})

// 装载路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('server is running at port 3000')