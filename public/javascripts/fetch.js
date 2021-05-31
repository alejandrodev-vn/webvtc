async function fetchAPI(url, options){
    try{
        const res = await fetch(url, options)
        const data = await res.json()
        return data
    }catch(err){
        console.log(err)
    }
}
async function fetchAndShowData(url, options, cb){
    try{
        const res = await fetch(url, options)
        const data = await res.json()
        cb(data)
    }catch(err){
        console.log(err)
    }
}
export{
    fetchAPI,
    fetchAndShowData
}