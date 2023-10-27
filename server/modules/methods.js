class Methods {

    constructor(){

        //objects with all http verbs
        this.verbs = {
            get: 'GET',
            post: 'POST',
            put: 'PUT',
            delete: 'DELETE',
            patch: 'PATCH'
        }

        //object to store endpoints and callbacks according to http verbs
        this.responder = {use: [], all: {}}

        //verb handlers binding
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.delete = this.delete.bind(this)
        this.patch = this.patch.bind(this)
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
       this.responder.all[endpoint] = endpoint in this.responder.all ? [...this.responder.all[endpoint], ...args] : args
    }

    use(...args){
        if(typeof(args[0]) === 'string') this.all(args[0], ...args.slice(1,))
        else this.responder.use.push(...args)
    }

    addRoutes = (method, endpoint, args) => {
        this.responder[endpoint] = {...this.responder[endpoint], [method]: args}
    }
}

module.exports = Methods