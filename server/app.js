const server = require('./modules/liteServer')

const app = new server()

// app.all('/', (req, res) => {
//     console.log(req.method, req.url, 'for all')
// })

app.get('/', (req, res) => {
    console.log(req.method, req.url)
    res.end('Hala Madrid!')
})

module.exports = app
