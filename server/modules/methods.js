class Methods {
    constructor(){
        this.cbArray = []
         //object to store endpoints and callbacks according to http verbs
       this.serverRouter = {
        get: [],
        post: [],
        put: [],
        delete: [],
        patch: [],
       }
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
        for(let key in this.serverRouter){
            this.serverRouter[key].push({endpoint, cb})
        }
    }

    use(...args){
        
        if( typeof(args[0]) !== 'string' ){
            if(!Methods.prototype.isPrototypeOf(args[0])){
                for(let key in this.serverRouter){
                    this.serverRouter[key].unshift({endpoint:'*', cb:args[0]})
                }
            }
        }else{
            if(Methods.prototype.isPrototypeOf(args[1])){
                const route = args[1].serverRouter

                for(let key in args[1].serverRouter){
                    const endpoint = args[0] + 
                    this.serverRouter[key].push({endpoint, cb: route[key].cb})
                }
            }else{
                for(let key in this.serverRouter){
                    this.serverRouter[key].unshift({endpoint:args[0], cb: args[1]})
                }
            }
        }
    }
}

module.exports = Methods