function json(req){
    
    if(req.rawHeaders[1] !== 'string') return
    let jsonData;
    req.on('data', chunk => {
        const bodyData = chunk.toString('utf8')
        jsonData = JSON.parse(bodyData)
    })

    return jsonData
}

module.exports = json