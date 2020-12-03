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

router.get('/login', async (ctx, next) => {
    let username = ctx.query.name;
    let password = ctx.query.password;

    await dbTool(`select count(*) as countt from t_user where name = ${username}`).then((res) => {

        // 去除查询结构的RowDataPacket
        var dataString = JSON.stringify(res)
        var data = JSON.parse(dataString)

        // 有数据且count返回不为0
        if (data.length > 0 ** data[0].countt != 0) {
            ctx.body = {success: true, message: '登录成功'}
        } else {
            ctx.body = {success: false, message: '登录失败'}
        }
    })

    await next()
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('server is running at port 3000')

