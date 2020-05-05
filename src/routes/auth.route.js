const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('src/models/User')
const router = Router()
const config = require('config')

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'некорректный формт почты').isEmail(),
        check('password', 'некорректный пароль - минимальная длина пароля 4 символа')
            .isLength({min: 4}),
        check('nicName', 'никнейм должен содержать хотя бы 1 цифру (или хотя бы 1 букву)')
            .isLength({min: 4}).isAlphanumeric()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({
                    errors: errors.array(),
                    message: 'некорректные данные при регистрации'
                })
            }
            const {email, password, nicName} = req.body
            const candidate = await User.findOne({email})
            const candidateNicName = await User.findOne({nicName})
            if (candidate || candidateNicName) {
                return res.status(400).json({message: "такой пользователь уже есть"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword, nicName})

            await user.save()

            res.status(201).json({message: 'пользователь создан!'})

        } catch (e) {
            console.log('ошибка в auth post register', e)
            res.status(500).json({message: 'что-то пошло не так снова'})
        }
    }
)
// /api/auth/login
router.post('/login',
    [
        check('email', 'введите корректный Email').normalizeEmail().isEmail(),
        check('password', 'введите корректный пароль').exists(),
        check('nicName', 'введите корректный никнейм').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'некорректные данные логина'
                })
            }

            const {email, password, nicName} = req.body
            const user = await User.findOne({email, nicName})
            if (!user) {
                return res.status(400).json({
                        message: 'такого пользователя не существует'
                    }
                )
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                res.status(400).json({message: 'неправильный пароль. попробуйте еще раз'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})


        } catch (e) {
            console.log('ошибка в роуте-логине', e)
            res.status(500).json({message: 'что-то пошло не так снова'})
        }
    })



module.exports = router