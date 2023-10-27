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

                const callbacks = this.matchRouteMethod(req.url, req.method)
                
                callbacks.forEach(cb => {
                    cb(req, res)
                })
                // this.cbArray.forEach(obj => {
                //     obj?.cb(req, res)
                // })

                // routes.forEach(route => {
                //     route.cb(req, res)
                // })
            }
        })
    }

    //finds the appropriate callback functions to handle request
    matchRouteMethod(url, method){
        return this.responder[url][method]
    }   
    
    //start to listen for request
    listen(port, hostname, cb){
        this.createServer().listen(port, hostname, cb)
    }
}

module.exports = LiteServer