const server = require('./modules/liteServer')

// const indexRouter = require('./routes/index')
const app = new server()

app.get('/', (req, res) => {console.log(req.method, req.url)}, (req, res) => {res.end('Hala Madrid!')})
app.all('/', (req,res) => {console.log('all cb 1')}, (req,res) => {console.log('all cb 2')})
app.post('/', (req,res) => {console.log('from', req.method)}, (req,res) => {res.end('From post')})
app.put('/', (req,res) => {console.log('from', req.method)}, (req,res) => {res.end('From put')})


// app.post('/', (req, res) => {
//     res.end('hala madrid')
// })

module.exports = app
