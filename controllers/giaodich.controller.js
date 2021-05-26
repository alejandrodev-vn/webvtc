const giaoDichService = require('../services/giaodich.service')

module.exports.add = async (req, res, next)=>{
    try{
        let values = req.body
        await giaoDichService.creatNew(values)
        res.redirect('/giaodich')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.update = async (req, res, next)=>{
    try{
        const id = req.params.id;
        let values = req.body
        await giaoDichService.update(id, values)
        res.redirect('/giaodich')

    }
    catch(err){
        console.log(err)
    }
}
module.exports.delete = async (req, res, next)=>{
    try{
        const id = req.params.id
        await giaoDichService.delete(id)
        res.redirect('/giaodich')
    }
    catch(err){
        console.log(err)
    }
}