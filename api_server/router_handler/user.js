//导入数据库操作模块
const db = require('../db/index')
//导入bcrypt
const bcrypt = require('bcryptjs')
//导入生成token的包
const jwt = require('jsonwebtoken')
const config = require('../config')

//注册新用户
exports.regUser = (req,res) => {
    const userinfo = req.body
    console.log(req.body)
    if(!userinfo.username || !userinfo.password){
        res.cc('用户名或密码不合法！')
    }

    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err){
            return res.cc(err)
        }

        if(results.length>0){
            return res.cc('用户名被占用，请更换其他用户名！')
        }
    })

    //对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    //插入用户
    const sql = 'insert into ev_users set ?'
    db.query(sql, {username: userinfo.username, password:userinfo.password, email:userinfo.email }, (err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows !== 1){
            return res.cc('注册用户失败，请稍后重试！')
        }

        res.cc('注册成功！', 0)
    })
}

//登录
exports.login = (req,res) => {
    const userinfo = req.body

    const sql = 'select * from ev_users where username=?'
    db.query(sql,userinfo.username,(err,results)=>{
        if(err) {
            return res.cc(err)
        }
        if(results.length !== 1){
            res.cc('登录失败！')
        }

        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        if(!compareResult){
            
            return res.cc('登陆失败！')
        }
        
        //在服务器端生成token
        const user = { ...results[0], password: '', user_pic: ''}
        //对用户信息进行加密，生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        //相应给客户端
        res.send({
            status: 0,
            message: '登陆成功！',
            username: req.body.username,
            token: 'Bearer ' + tokenStr
        })
    })
}