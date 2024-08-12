const express = require('express')
const app = express()
const joi = require('joi')

//导入并配置cors中间件
const cors = require('cors')
app.use(cors())

//配置解析表单数据的中间件----application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended: false}))

//封装res.cc函数
app.use(function(req,res,next) {
    res.cc = function(err,status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err ,
        })
    }
    next()
})

//在路由之前，配置解析token的字符串
const config = require('./config')
const expressJWT = require('express-jwt')

app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/api/,/^\/my\/article/,/^\/my/]}))

//导入并使用注册登录路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//导入并使用用户信息模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

//导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter )

//导入并使用文章内容路由模块
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter )

//定义错误级别中间件
app.use((err,req,res,next)=>{
    //验证失败导致的错误
    if(err instanceof joi.ValidationError){
        return res.cc(err)
    }

    //捕获身份认证失败的错误
    if(err.name === 'UnauthorizedError'){
        return res.cc('身份认证失败！')
    }
    //未知的错误
    res.cc(err)
})


app.listen(3007,()=>{
    console.log('api server running at http://127.0.0.1:3007')
})