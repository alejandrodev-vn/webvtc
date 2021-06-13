const CTSCaNhanModel = require('../models/ctscanhan.model')
const CTSDoanhNghiepModel = require('../models/ctsdoanhnghiep.model')
//personal
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
//organization
exports.getByTrashUserIdOrg = async (userId) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.findDeleted({createdBy:userId});
        return CTSDoanhNghiep
    }
    catch(err){
        console.log(err)
    }
}
exports.restoreOrg = async (id) => {
    return await CTSDoanhNghiepModel.restore({_id:id},function(err){
        if(err){
            console.log('Restore failed!')
        }else console.log('Restore success!')
    })
}
exports.destroyOrg = async (id) => {
    return await CTSDoanhNghiepModel.deleteOne({_id:id},function(err){
        if(err){
            console.log('Delete failed!')
        }else console.log('Delete success!')
    })
}