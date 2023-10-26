const Router = require('../modules/router')

const router = new Router()

router.get('/', (req, res) => {
    res.end('Hi from liteServer!, I am a server made using nodeJS without any libraries. A lite alternative to express and any other lib or framework')
})

router.get('/all', (req, res) => {
    res.end('Hala Madrid')
})

router.post('/', (req, res) => {
    res.end('post called on route')
})

router.delete('/delete', (req, res) => {
    res.end('delete called on route')
})

router.patch('/patch', (req, res) => {
    res.end('Patch called on route')
})

router.put('/put', (req, res) => {
    res.end('put called on route')
})

module.exports = router
