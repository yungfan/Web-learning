/**
 * get与post 原生方式
 * @type {Application}
 */

const Koa = require('koa')
// post需要通过koa-bodyparser解析参数
const bodyParser = require('koa-bodyparser')

const app = new Koa()
// 使用ctx.body解析中间件
app.use(bodyParser())

app.use(async ctx => {
    // GET请求
    if (ctx.url == '/' && ctx.method == 'GET') {
        let html = `
          <form method="POST" action="/">
            用户: <input name="username" /><br/>
            密码: <input name="password" type="password"/><br/>
            <input type="submit"/>
          </form>
            `
        ctx.body = html
    } 
    // POST请求
    else if (ctx.url == '/' && ctx.method == 'POST') {
        let postData = ctx.request.body
        ctx.body = postData
    } 
    else {
        ctx.body = '<h1>404 Page Not Found</h1>'
    }
})

app.listen(3000)
console.log('server is running at port 3000')