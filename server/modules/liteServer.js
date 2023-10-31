const http = require('node:http')
const Methods = require('./methods')

class LiteServer extends Methods{
    
    constructor(){
       super()
       //core function bindings
       this.createServer = this.createServer.bind(this)
       this.matchRouteMethod = this.matchRouteMethod.bind(this)
       this.listen = this.listen.bind(this)
       LiteServer.createServer()
    }

    //creates the server
    static createServer(){
       const server = http.createServer()
       server.on('request', this.requestListener)
       server.on('listening', 3000, 'localhost', () => {console.log('listening on port 3000')})
    }

    requestListener(req, res){
        console.log(req.method, req.url)
        res.end("Hi there")
    }



    call(req, res, args){
        args.forEach(cb => {
            cb(req, res)
        })
    }

    callAll(req, res){
        req.url in this.responder.all && this.call(req, res, this.responder.all[req.url])
    }

    callUse(req, res){
        this.call(req, res, this.responder.use)
    }

    matchRouteMethod(req, res){
        const args = this.responder[req.url]?.[req.method] ? this.responder[req.url][req.method] : null
        if(args) this.call(req, res, args)
    }   
    
    //start to listen for request
    listen(port, hostname, cb){
        this.createServer().listen(port, hostname, cb)
    }
}

module.exports = LiteServer