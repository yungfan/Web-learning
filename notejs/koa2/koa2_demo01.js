/**
 * 第一个程序
 * @type {Application}
 */

const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    ctx.body = 'Hello Koa2'
})

app.listen(3000)
console.log('server is running at port 3000')