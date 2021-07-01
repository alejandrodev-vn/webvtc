const CTSCaNhanModel = require('../models/ctscanhan.model')

exports.getAll = async () => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({
        });
        return CTSCaNhan
    }
    catch(err){
        console.log(err)    
    }
}
exports.getAllPending = async () => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({$or: [
            {trangThai: 0},{trangThai: 1},{trangThai: 2},{trangThai: 3},{trangThai: 4}
        ]});
        return CTSCaNhan
    }
    catch(err){
        console.log(err)    
    }
}
exports.getAllApproved = async () => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({$or: [
            {trangThai: 5},{trangThai: 6}
        ]});
        return CTSCaNhan
    }
    catch(err){
        console.log(err)    
    }
}

exports.getForAdmin1 = async () => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({$or: [
            {trangThai: 1},{trangThai: 2},{trangThai: 3},{trangThai: 4}
        ]});
        return CTSCaNhan
    }
    catch(err){
        console.log(err)    
    }
}
exports.getApprovedForAdmin1 = async () => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({$or: [
            {trangThai: 5},{trangThai: 6}
        ]});
        return CTSCaNhan
    }
    catch(err){
        console.log(err)    
    }
}


exports.getById = async (id) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.findById(id);
        return CTSCaNhan
    }
    catch(err){
        console.log(err)
    }
}
exports.getPendingByUserId = async (userId) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({createdBy:userId,$or: [
            {trangThai: 0},{trangThai: 1},{trangThai: 2},{trangThai: 3},{trangThai: 4}
        ]});
        // console.log(values)
        return CTSCaNhan
    }
    catch(err){
        console.log(err)
    }
}
exports.getApprovedByUserId = async (userId) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({createdBy:userId,$or: [
            {trangThai: 5},{trangThai: 6}
        ]});
        return CTSCaNhan
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew = async (values) => {
    try{
        let NewCTSCaNhan = new CTSCaNhanModel(values)
        return NewCTSCaNhan.save((err) => {
            if(err){
                console.log('Add CTS failed! b:' + err);
            }else{
                console.log('Add CTS success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
exports.update = async (id, values) => {
    return await CTSCaNhanModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}
exports.delete = async (id) => {
    return await CTSCaNhanModel.delete({_id:id},function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}
exports.sendRequest = async (id, values) => {
    return await CTSCaNhanModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}
exports.sendResponse = async (id, values) => {
    return await CTSCaNhanModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}
