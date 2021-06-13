const CTSDoanhNghiepModel = require('../models/ctsdoanhnghiep.model')

exports.getByTrashUserId = async (userId) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.findDeleted({createdBy:userId});
        return CTSDoanhNghiep
    }
    catch(err){
        console.log(err)
    }
}
exports.restore = async (id) => {
    return await CTSDoanhNghiepModel.restore({_id:id},function(err){
        if(err){
            console.log('Restore failed!')
        }else console.log('Restore success!')
    })
}
exports.destroy = async (id) => {
    return await CTSDoanhNghiepModel.deleteOne({_id:id},function(err){
        if(err){
            console.log('Delete failed!')
        }else console.log('Delete success!')
    })
}