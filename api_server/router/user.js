const express = require('express')
const router = express.Router()

//导入用户路由处理函数
const user_handler = require('../router_handler/user')

//导入验证部分
const expressJoi = require('@escook/express-joi')
const {reg_login_schema, reg_reguser_schema} = require('../schema/user')

//注册新用户
router.post('/reguser',expressJoi(reg_reguser_schema) ,user_handler.regUser)

//登录
router.post('/login',expressJoi(reg_login_schema) ,user_handler.login)


module.exports = router