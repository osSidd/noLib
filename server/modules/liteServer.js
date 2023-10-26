const http = require('node:http')

class liteServer{
    
    constructor(){
        //object to store endpoints and callbacks according to http verbs
       this.serverRouter = {
        all:[],
        get: [],
        post: [],
        put: [],
        delete: [],
        patch: [],
       }
       //core function bindings
       this.createServer = this.createServer.bind(this)
       this.responseMethod = this.responseMethod.bind(this)
       this.listen = this.listen.bind(this)
    //    this.router = this.router.bind(this)
       //verb handlers binding
       this.get = this.get.bind(this)
       this.post = this.post.bind(this)
       this.put = this.put.bind(this)
       this.delete = this.delete.bind(this)
       this.patch = this.patch.bind(this)
       //verb independent method
       this.all = this.all.bind(this)
       //verb and route independent method
       this.use = this.use.bind(this)
    }

    //request handling methods
    get(endpoint, cb){
        this.serverRouter.get.push({endpoint, cb})
    }

    post(endpoint, cb){
        this.serverRouter.post.push({endpoint, cb})
    }

    put(endpoint, cb){
        this.serverRouter.put.push({endpoint, cb})
    }

    delete(endpoint, cb){
        this.serverRouter.delete.push({endpoint, cb})
    }

    patch(endpoint, cb){
        this.serverRouter.patch.push({endpoint, cb})
    }

    all(endpoint, cb){
        this.serverRouter.all.push({endpoint, cb})
    }

    use(obj){
        return obj
    }

    //creates the server
    createServer(){
       return http.createServer((req,res) => {

            if(req.url !== '/favicon.ico'){
                const cbs = this.responseMethod(req.url, req.method)
                                
                cbs.forEach(cb => {
                    cb(req, res)
                })
            }
        })
    }

    //finds the appropriate callback functions to handle request
   responseMethod(url, method){
        const cbs = []
        this.serverRouter.all.forEach(obj => {
            obj.endpoint === url
            cbs.push(obj.cb)
        })
        const route = this.serverRouter[method.toLowerCase()].find(route => route.endpoint === url)
        cbs.push(route.cb)

        return cbs
    }   
    
    //start to listen for request
    listen(port, hostname, cb){
        this.createServer().listen(port, hostname, cb)
    }

    // router(){
    //     const verbs = ['get', 'post', 'put', 'delete', 'patch']
    //     const routerObj = {}

    //     verbs.forEach(verb => {
    //         routerObj[verb] = (endpoint, cb) => {
    //             this.serverRouter[verb].push({endpoint, cb})
    //         }
    //     })
    //     return routerObj
    // }
}

module.exports = liteServer