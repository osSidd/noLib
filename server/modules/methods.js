const Method = require('./method')

class Methods {

    constructor(){

        //objects with all http verbs
        this.verbsObj = {
            'GET': [],
            'POST': [],
            'PUT': [],
            'DELETE': [],
            'PATCH': []
        }

        this.useRouter = false

        //object to store endpoints and callbacks according to http verbs
        this.responder = {use: [], all: {}}

        // //verb handlers binding
        // this.get = this.get.bind(this)
        // this.post = this.post.bind(this)
        // this.put = this.put.bind(this)
        // this.delete = this.delete.bind(this)
        // this.patch = this.patch.bind(this)
    }

     //request handling methods
    get(endpoint, ...args){
        this.addRoutes('GET', endpoint, ...args)
    }

    post(endpoint, ...args){
        this.addRoutes('POST', endpoint, ...args)
    }

    put(endpoint, ...args){
        this.addRoutes('PUT', endpoint, ...args)
    }

    delete(endpoint, ...args){
        this.addRoutes('DELETE', endpoint, ...args)
    }

    patch(endpoint, ...args){
        this.addRoutes('PATCH', endpoint, ...args)
    }

    all(endpoint, ...args){
       this.responder.all[endpoint] = [...this.responder.all[endpoint], ...args]
    }

    use(...args){
        if(typeof(args[0]) === 'string'){
            this.all(args[0], ...args.slice(1,)) 
        } 
        else this.responder.use.push(...args)
    }

    addRoutes = (method, endpoint, args) => {
        this.verbsObj[method].push(...args)
        this.responder[endpoint] = {...this.verbsObj}
    }
}

module.exports = Methods