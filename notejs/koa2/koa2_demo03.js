/**
 * 多路由
 * @type {Application}
 */

const Koa = require('koa')
// 引入路由
const Router = require('koa-router')

const app = new Koa()

// 子路由
let index = Router()
index.get('/index', async ctx => {
    let html = '<a href="https://www.abc.edu.cn">商贸学院</li>'
    ctx.body = html
})

// 子路由
let error = new Router()
error.get('/error', async ctx => {
    let html = '<h1>Error Page</h1>'
    ctx.body = html
})


// 装载路由
let router = new Router()
router.use(index.routes(), index.allowedMethods()) // 访问路径：/index
router.use('/koa2', error.routes(), error.allowedMethods()) // 访问路径：/koa2/error
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('server is running at port 3000')