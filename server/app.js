const server = require('./modules/liteServer')

// const indexRouter = require('./routes/index')
const app = new server()

app.use(() => {console.log('hello world'); setTimeout(() => {console.log('timeout')},3000)})
app.use('/', (req, res) => console.log(req.method, req.url) )
app.get('/get', (req, res) => {console.log('hi'); res.end('Hi there')})
app.get('/', (req, res) => {console.log('hi'); res.end('Hi there, how are you')})
app.all('/', () => console.log('hala madrista'))
app.all('/get', () => {console.log('barcelona')})

module.exports = app
