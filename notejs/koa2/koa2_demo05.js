/**
 * 获取参数
 * @type {Application}
 */

const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    // GET请求
    let url = ctx.url
    let ctx_query = ctx.query
    let username = ctx.query.username // 必须带一个username参数
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        ctx_query,
        username,
        ctx_querystring
    }
})

app.listen(3000)
console.log('server is running at port 3000')