const trashService =  require('../services/trash.service');
module.exports.getTrash = (req, res, next) => {
    try{
        res.render('trash', { title: 'Thùng rác'});
    }catch(err){
        console.log(err)
    }
}
//personal
module.exports.restore = async (req, res, next) => {
    try{
        const { id } = req.params
         await trashService.restore(id)
         res.redirect('/digital-certificate/trash')
    }catch(err){
        console.log(err)
    }
}
module.exports.destroy = async (req, res, next) => {
    try{
        const { id } = req.params
         await trashService.destroy(id)
         res.redirect('/digital-certificate/trash')
    }catch(err){
        console.log(err)
    }
}
//organization
module.exports.restoreOrg = async (req, res, next) => {
    try{
        const { id } = req.params
         await trashService.restoreOrg(id)
         res.redirect('/digital-certificate/trash')
    }catch(err){
        console.log(err)
    }
}
module.exports.destroyOrg = async (req, res, next) => {
    try{
        const { id } = req.params
         await trashService.destroyOrg(id)
         res.redirect('/digital-certificate/trash')
    }catch(err){
        console.log(err)
    }
}