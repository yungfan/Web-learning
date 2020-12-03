/**
 * 单文件上传 路由方式
 * @type {Application}
 */

const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa()
const koaBody = require('koa-body')
const Router = require('koa-router')

// 路由
let router = Router()

// koaBody 完成上传文件
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 5 * 1024 * 1024    // 设置上传文件大小最大限制，默认20M，这里设置为5M
    }
}))

router.get('/upload', async ctx => {
    let html = `
          <form method="POST" action="/upload" enctype="multipart/form-data">
            <input type="file" name="file" id="file" value=""/><br/>
            <input type="submit"/>
          </form>
            `
    ctx.body = html
})

router.get('/uploads', async ctx => {
    let html = `
          <form method="POST" action="/uploads" enctype="multipart/form-data">
            <input type="file" name="file" id="file" value="" multiple="multiple" /><br/>
            <input type="submit"/>
          </form>
            `
    ctx.body = html
})

router.post('/upload', async ctx => {
    // 上传单个文件
    const file = ctx.request.files.file // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path)
    // 上传路径
    let filePath = path.join(__dirname, '../upload/')
    // 检查路径是否存在
    checkDirExist(filePath)
    // 文件名
    const fileName = `${filePath}/${file.name}`
    // 创建可写流
    const upStream = fs.createWriteStream(fileName)
    // 可读流通过管道写入可写流
    reader.pipe(upStream)

    return ctx.body = "单文件上传成功！"
})

router.post('/uploads', async ctx => {
    // 上传多个文件
    const files = ctx.request.files.file // 获取上传文件
    for (let file of files) {
        // 创建可读流
        const reader = fs.createReadStream(file.path)
        // 上传路径
        let filePath = path.join(__dirname, '../upload/')
        // 检查路径是否存在
        checkDirExist(filePath)
        // 文件名
        const fileName = `${filePath}/${file.name}`
        // 创建可写流
        const upStream = fs.createWriteStream(fileName)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)
    }
    return ctx.body = "多文件上传成功！"
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('server is running at port 3000')

// 判断文件夹是否存在，不存在则创建
function checkDirExist(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}