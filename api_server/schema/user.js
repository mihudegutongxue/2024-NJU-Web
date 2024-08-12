const joi = require('joi')

const username = joi.string().alphanum().min(4).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

const id = joi.number().integer().min(1).required()
const email = joi.string().email().required()

const avatar = joi.string().dataUri().required()

//验证规则对象
exports.reg_reguser_schema = {
    //表示需要对req.body中的数据进行验证
    body:{
        username,
        password,
        email
    }
}

exports.reg_login_schema = {
    //表示需要对req.body中的数据进行验证
    body:{
        username,
        password,
    }
}

exports.update_userinfo_schema = {
    body: {
        id,
        email,
    }
}

exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}

exports.update_avatar_schema = {
    body:{
        avatar,
    }
}