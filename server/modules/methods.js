class Methods {

    constructor(){

        this.verbs = {
            get: 'GET',
            post: 'POST',
            put: 'PUT',
            delete: 'DELETE',
            patch: 'PATCH'
        }
        //object to store endpoints and callbacks according to http verbs
        this.responder = {}

        //verb handlers binding
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.delete = this.delete.bind(this)
        this.patch = this.patch.bind(this)

        // //verb independent method
        // this.all = this.all.bind(this)

        // //verb and route independent method
        // this.use = this.use.bind(this)
    }

     //request handling methods
    get(endpoint, ...args){
        this.addRoutes(this.verbs.get, endpoint, args)
    }

    post(endpoint, ...args){
        this.addRoutes(this.verbs.post, endpoint, args)
    }

    put(endpoint, ...args){
        this.addRoutes(this.verbs.put, endpoint, args)
    }

    delete(endpoint, ...args){
        this.addRoutes(this.verbs.delete, endpoint, args)
    }

    patch(endpoint, ...args){
        this.addRoutes(this.verbs.patch, endpoint, args)
    }

    all(endpoint, ...args){
        this.addToAllMethods(endpoint, args)
    }

    // use(...args){
        
    //     if( typeof(args[0]) !== 'string' ){
    //         if(!Methods.prototype.isPrototypeOf(args[0])){
    //             for(let key in this.serverRouter){
    //                 this.serverRouter[key].unshift({endpoint:'*', cb:args[0]})
    //             }
    //         }
    //     }else{
    //         if(Methods.prototype.isPrototypeOf(args[1])){
    //             const route = args[1].serverRouter

    //             for(let key in args[1].serverRouter){
    //                 const endpoint = args[0] + 
    //                 this.serverRouter[key].push({endpoint, cb: route[key].cb})
    //             }
    //         }else{
    //             for(let key in this.serverRouter){
    //                 this.serverRouter[key].unshift({endpoint:args[0], cb: args[1]})
    //             }
    //         }
    //     }
    // }

    addToAllMethods(endpoint, args){

        this.responder[endpoint] = this.validateEndpointObj(endpoint)
        
        for(let key in this.verbs){

            const method = this.verbs[key]
            const cbArray = this.validateMethodsArray(endpoint, method)
            
            this.responder[endpoint][method] = [...args, ...cbArray]
        }
    }

    addRoutes = (method, endpoint, args) => {

        this.responder[endpoint] = this.validateEndpointObj(endpoint)
        const cbArray = this.validateMethodsArray(endpoint, method)

        this.responder[endpoint] = {...this.responder[endpoint], [method]: [...cbArray, ...args]}
    }

    validateEndpointObj(endpoint){
        return this.responder[endpoint] ? {...this.responder[endpoint]} : {}
    }

    validateMethodsArray(endpoint, method){
        return method in this.responder[endpoint] ? this.responder[endpoint][method] : []
    }
}

module.exports = Methods