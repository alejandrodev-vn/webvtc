const giaoDichService = require('../services/giaodich.service')

module.exports.getAll = async (req, res, next)=>{
    try{
        const giaoDich = await giaoDichService.getAll()
        res.json(giaoDich)
    }
    catch(err){
        console.log(err)
    }
}
module.exports.add = async (req, res, next)=>{
    try{
        let values = req.body
        let { userId } = req.session
        values.userId = userId
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