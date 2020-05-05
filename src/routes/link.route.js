const {Router} = require('express')
const config = require('config')
const shortId = require('shortid')
const Link = require('src/models/Link')
const auth = require('src/middleware/auth.middlleware')

const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')

        const {from} = req.body
        const code = shortId.generate()
        //проверяем через модель, есть ли такая ссылка
        const existing = await Link.finfone({from})
        if (existing) {
            return res.json({link: existing})
        }
        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()
        res.status(201).json({link})
    } catch (e) {
        console.log('ошибка в роуте линк в генерации', e)
        res.status(500).json({message: 'что-то пошло не так снова'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        console.log('ошибка в роуте получения всех ссылок', e)
        res.status(500).json({message: 'что-то пошло не так снова'})
    }
})

router.get('/id:', auth, async (req, res) => {
    try {
        const links = await Link.findById({req.params.id})
        res.json(links)
    } catch (e) {
        console.log('ошибка в роуте динамического id', e)
        res.status(500).json({message: 'что-то пошло не так снова'})
    }
})


mosule.exports = router