const CTSCaNhanModel = require('../models/ctscanhan.model')

exports.getByTrashUserId = async (userId) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.findDeleted({createdBy:userId});
        return CTSCaNhan
    }
    catch(err){
        console.log(err)
    }
}
exports.restore = async (id) => {
    return await CTSCaNhanModel.restore({_id:id},function(err){
        if(err){
            console.log('Restore failed!')
        }else console.log('Restore success!')
    })
}
exports.destroy = async (id) => {
    return await CTSCaNhanModel.deleteOne({_id:id},function(err){
        if(err){
            console.log('Delete failed!')
        }else console.log('Delete success!')
    })
}