const http = require('node:http')

class liteServer{
    
    constructor(){
       this.serverRouter = {
        get: [],
        post: [],
        put: [],
        delete: [],
        patch: [],
       }
    }

    startServer(){
        return this.createServer()
    }

    createServer(){
       return http.createServer((req,res) => {
    
            if(req.url !== '/favicon.ico'){
                this.responseMethod(req.url, req.method)(req, res)                
            }
        })
    }

   responseMethod(url, method){
        const route = this.serverRouter[method.toLowerCase()].find(route => route.endpoint === url)
        return route.cb
    }   
    
    listen(port, hostname, cb){
        this.startServer().listen(port, hostname, cb)
    }

    router(){

        const verbs = ['get', 'post', 'put', 'delete', 'patch']
        const routerObj = {}

        verbs.forEach(verb => {
            routerObj[verb] = (endpoint, cb) => {
                this.serverRouter[verb].push({endpoint, cb})
            }
        })

        return routerObj
    }

    use(){
        console.log(arguments)
    }
}

module.exports = liteServer