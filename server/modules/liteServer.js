const http = require('node:http')
const Methods = require('./methods')

class LiteServer extends Methods{
    
    constructor(){
       super()
       //core function bindings
       this.createServer = this.createServer.bind(this)
       this.matchRouteMethod = this.matchRouteMethod.bind(this)
       this.listen = this.listen.bind(this)
    }

    //creates the server
    createServer(){
       return http.createServer((req,res) => {

            if(req.url !== '/favicon.ico'){
                this.callUse(req, res)
                this.callAll(req, res)
                this.matchRouteMethod(req, res)
            }
        })
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