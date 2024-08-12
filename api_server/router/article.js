const express = require('express')
const router = express.Router()

const article_handler = require('../router_handler/article')

router.post('/addArticle',article_handler.addArticle)

router.post('/getArticle',article_handler.getArticle)

router.post('/getTotal',article_handler.getTotal)

router.post('/getArticleId',article_handler.getArticleId)

router.post('/getArticleById',article_handler.getArticleById)

router.post('/modifyComment',article_handler.modifyComment)

router.post('/showComment',article_handler.showComment)

module.exports = router