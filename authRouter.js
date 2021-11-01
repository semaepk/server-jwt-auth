const Router = require('express')
const { model } = require('mongoose')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const authMiddleware = require('./middlewareGroup/middleware')
const roleMiddleware = require('./middlewareGroup/roleMeddleware')

router.post('/registration', check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть длинее 4 символов").isLength({ min: 4 }),
    authMiddleware.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['USER']), controller.getUsers)

module.exports = router