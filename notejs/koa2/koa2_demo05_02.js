/**
 * 获取参数
 * @type {Application}
 */

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

const app = new Koa()
// 路由
let router = Router()

// 使用ctx.body解析中间件
app.use(bodyParser())

// get
router.get('/get', async ctx => {
    // http://localhost:3000/get?username=admin&password=123
    let url = ctx.url
    let ctx_query = ctx.query
    let username = ctx.query.username // 必须带一个username参数
    let password = ctx.query.password // 必须带一个username参数
    let ctx_querystring = ctx.querystring

    /**
    ctx.body = {
        url,
        ctx_query,
        username,
        password,
        ctx_querystring
    }*/

    let html = `
          <form method="POST" action="/post">
            用户: <input name="username" type="text"/><br/>
            密码: <input name="password" type="password"/><br/>
            <input type="submit"/>
          </form>
            `
    ctx.body = html
})

// post
router.post('/post', async ctx => {
    let url = ctx.url
    let ctx_body = ctx.request.body // 必须通过body拿到参数
    let username = ctx_body.username
    let password = ctx_body.password

    ctx.body = {
        url,
        ctx_body,
        username,
        password,
    }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('server is running at port 3000')