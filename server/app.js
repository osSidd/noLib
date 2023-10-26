const server = require('./modules/liteServer')

const indexRouter = require('./routes/index')
const app = new server()

app.all('/', (req, res) => {
    console.log('for all methods')
})

app.use((req, res) => {
    console.log('called for every method and verb')
})

app.get('/', (req, res) => {
    res.end('hi there')
})

app.delete('/', (req, res) => {
    res.end('delete')
})

// app.use('/api', indexRouter)

module.exports = app
