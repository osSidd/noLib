const fs = require('fs')

let keyObj = {}

function AddEnv(){

    try{
        const data = fs.readFileSync('./.env', 'utf-8')

        const strArray = data.split('\n')

        strArray.forEach(str => {
            str.trim()
            if(strArray.indexOf(str) === 0) str.slice(-1)
        
            const keyVal = str.split('=')
            keyObj[keyVal[0]] = keyVal[1]
        })

        for(let key in keyObj){
            process.env[key] = keyObj[key]
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = AddEnv