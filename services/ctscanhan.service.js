const CTSCaNhanModel = require('../models/ctscanhan.model')

exports.getAll = async () => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({});
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
exports.getByUserId = async (userId) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({createdBy:userId});
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

exports.delete = async (id) => {
    return await CTSCaNhanModel.findByIdAndDelete({_id: id}, (err) => {
        if(err){
            console.log('Delete fail!');
        }else{
            console.log('Delete success!');
        }
    })
}