const http = require('node:http')
const Methods = require('./methods')

class LiteServer extends Methods{
    
    constructor(){
       super()
       //core function bindings
       this.createServer = this.createServer.bind(this)
       this.responseMethod = this.responseMethod.bind(this)
       this.listen = this.listen.bind(this)
    }

    //creates the server
    createServer(){
       return http.createServer((req,res) => {

            if(req.url !== '/favicon.ico'){

                const routes = this.responseMethod(req.url, req.method)

                // this.cbArray.forEach(obj => {
                //     obj?.cb(req, res)
                // })

                routes.forEach(route => {
                    route.cb(req, res)
                })
            }
        })
    }

    //finds the appropriate callback functions to handle request
   responseMethod(url, method){
        const route = this.serverRouter[method.toLowerCase()].filter(route => route.endpoint === url || route.endpoint === '*')
        return route
    }   
    
    //start to listen for request
    listen(port, hostname, cb){
        this.createServer().listen(port, hostname, cb)
    }
}

module.exports = LiteServer