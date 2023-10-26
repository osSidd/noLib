const app = require('../app')

const router = app.router()

router.get('/', (req, res) => {
    res.end('Hi from liteServer!, I am a server made using nodeJS without any libraries. A lite alternative to express and any other lib or framework')
})

module.exports = router
