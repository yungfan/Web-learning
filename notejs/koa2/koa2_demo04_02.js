/**
 * get与post 路由方式
 * @type {Application}
 */

const Koa = require('koa')
const Router = require('koa-router')
// post需要通过koa-bodyparser解析参数
const bodyParser = require('koa-bodyparser')

const app = new Koa()
// 路由
let router = Router()

// 使用ctx.body解析中间件
app.use(bodyParser())

// get
router.get('/get', async ctx => {
    let html = `
          <form method="POST" action="/post">
            用户: <input name="username" /><br/>
            密码: <input name="password" type="password"/><br/>
            <input type="submit"/>
          </form>
            `
    ctx.body = html
})

// post
router.post('/post', async ctx => {
    let postData = ctx.request.body
    ctx.body = postData
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('server is running at port 3000')