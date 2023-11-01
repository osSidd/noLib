const json = require('./modules/bodyParser')

const http = require('http')

class MyServer{
  constructor(){
   this.obj = {}
   this.verbsObj = {
    'GET': [],
    'POST': [],
    'PUT': [],
    'DELETE': [],
   }
 }

 get(endpoint, ...args){
  this.verbsObj['GET'].push(...args)
  this.obj[endpoint] = {...this.verbsObj}
 }

 post(endpoint, ...args){
    this.verbsObj['POST'].push(...args)
    this.obj[endpoint] = {...this.verbsObj}
   }
  
 addRoute(endpoint, ...args){
    this.obj[endpoint] = endpoint in this.obj 
 }
 
 createServer(){
  const server = http.createServer()
  server.on('request', (req, res) => {
    
    req.body = json(req)
    const myPromise = this.obj[req.url] ?  Promise.resolve(this.obj[req.url][req.method][0]) : Promise.reject('404 error')
    
    myPromise
      .then(mdwr => mdwr(req, res))
      .catch(err => {console.log(err); res.end(err)})
  })

  server.on('error', (err) => {
      console.log(err)
  })

  return server
 }

 listen(port, hostname, cb){
  this.createServer().listen(port, hostname, cb)
 }
}

const app = new MyServer()

app.get('/cats', async (req, res) => {
  console.log(req.method, req.url);
  try{
    const response = await fetch('https://catfact.ninja/fact')
    const data = await response.json()
      
    res.end(data.fact);
  }catch(err){
    res.end(err.message)
  }
})

app.post('/', async (req, res) => {
    console.log(req.url, req.method, req.body)
    res.end('/ => POST')
})

app.listen(3000, 'localhost', () => {console.log('server running')})
