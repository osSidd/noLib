class Method{
    constructor(endpoint, method, callbacks){
        this.endpoint = endpoint
        this.method = method
        this.callbacks = callbacks
    }

    matchRequest(req){
        if(req.url === this.endpoint && req.method === this.method)
            return true
        return false
    }

    respond(req, res){
        console.log(req.method, req.url)
    }
}

module.exports = Method