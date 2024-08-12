const db = require('../db/index')

exports.addArticle = (req,res)=>{

    const sql = 'insert into ev_articles ( title , content, username, pub_date, leibie ) values (?, ?, ?, ?, ?)'

    db.query(sql, [req.body.title, req.body.content, req.body.username, req.body.pub_date, req.body.leibie], (err,results)=>{

        if(err){
            return res.cc(err)
        }

        if(results.affectedRows !== 1){
            return res.cc('发送帖子失败')
        }

        return res.cc('成功添加文章信息！', 0)
    })
}

exports.getArticle = (req,res)=>{

    const sql = 'select * from ev_articles where leibie=?'
    db.query(sql, req.body.leibie, (err,results)=>{
        if(err) {
            return res.cc(err)
        }

        res.send({
            status: 0,
            message: '查找对应类别的帖子成功！',
            data: results,
        })
    })
}

exports.getTotal = (req,res)=>{

    const sql = 'select * from ev_articles where username=?'
    db.query(sql, req.body.username, (err,results)=>{
        if(err) {
            return res.cc(err)
        }

        res.send({
            status: 0,
            message: '查找用户发布的帖子总数成功！',
            data: results,
        })
    })
}

exports.getArticleId = (req,res)=>{

    const sql = 'select * from ev_articles where title=?'

    db.query(sql, req.body.title, (err,results)=>{
        if(err) {
            return res.cc(err)
        }

        res.send({
            status: 0,
            message: '查找帖子标题Id成功！',
            data: results,
        })
    })
}

exports.getArticleById = (req,res)=>{

    const sql = 'select * from ev_articles where Id=?'

    db.query(sql, req.body.Id, (err,results)=>{
        if(err) {
            return res.cc(err)
        }

        res.send({
            status: 0,
            message: '查找相应Id的帖子成功！',
            data: results,
        })
    })
}

exports.modifyComment = (req,res)=>{

    const sql1 = 'select * from ev_articles where Id=?'

    db.query(sql1, req.body.Id, (err,results)=>{
        if(err) {
            return res.cc(err)
        }

        var old_comment = results[0].comment
        
        if(!old_comment ){
            var new_comment = req.body.comment
        }else{
            var new_comment = old_comment + '&&&' + req.body.comment
        }

        const sql = 'update ev_articles set comment=? where Id=?'

        db.query(sql, [new_comment, req.body.Id], (err,results)=>{
            if(err) {
                return res.cc(err)
            }

            if(results.affectedRows !== 1) return res.cc('修改帖子评论失败！')

            res.send({
                status: 0,
                message: '修改帖子评论成功！',
            })
        })
    })
    
}

exports.showComment = (req,res)=>{

    const sql = 'select * from ev_articles where Id=?'

    db.query(sql, req.body.Id, (err,results)=>{
        if(err) {
            return res.cc(err)
        }

        res.send({
            status: 0,
            message: '展示评论成功！',
            data: results,
        })
    })
}