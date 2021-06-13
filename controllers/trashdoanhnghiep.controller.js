const trashDNService =  require('../services/trashdoanhnghiep.service');
module.exports.getTrash = (req, res, next) => {
    try{
        res.render('trash', { title: 'Thùng rác'});
    }catch(err){
        console.log(err)
    }
}
module.exports.restore = async (req, res, next) => {
    try{
        const { id } = req.params
         await trashDNService.restore(id)
         res.redirect('/digital-certificate/trash')
    }catch(err){
        console.log(err)
    }
}
module.exports.destroy = async (req, res, next) => {
    try{
        const { id } = req.params
         await trashDNService.destroy(id)
         res.redirect('/digital-certificate/trash')
    }catch(err){
        console.log(err)
    }
}