/**
 * mysql
 * @type {Application}
 */

const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const dbTool = require('./dbTools') // 注意路径

// 路由
let router = new Router()

router.get('/users/list', async (ctx, next) => {
    await dbTool(`select * from t_user`).then((res) => {
        console.log(res)
        ctx.body = res // 返回给前端的数据
    })

    await next()
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('server is running at port 3000')

