const CTSDoanhNghiepModel = require('../models/ctsdoanhnghiep.model')

exports.getAll = async () => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.find({});
        return CTSDoanhNghiep
    }
    catch(err){
        console.log(err)
    }
}
exports.getForAdmin1 = async () => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.find({$or: [
            {trangThai: 1},{trangThai: 2},{trangThai: 3},{trangThai: 4}
        ]});
        return CTSDoanhNghiep
    }
    catch(err){
        console.log(err)    
    }
}

exports.getById= async (id) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.findById(id);
        return CTSDoanhNghiep
    }
    catch(err){
        console.log(err)
    }
}
exports.getByUserId = async (userId) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.find({createdBy:userId});
        return CTSDoanhNghiep
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew= async (values) => {
    try{
        let NewCTSDoanhNghiep = new CTSDoanhNghiepModel(values)
        return NewCTSDoanhNghiep.save((err) => {
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
exports.sendRequest = async (id, values) => {
    return await CTSDoanhNghiepModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}

exports.update = async (id, values) => {
    return await CTSDoanhNghiepModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}


exports.delete = async (id) => {
    return await CTSDoanhNghiepModel.delete({_id: id}, (err) => {
        if(err){
            console.log('Delete fail!');
        }else{
            console.log('Delete success!');
        }
    })
}
exports.sendResponse = async (id, values) => {
    return await CTSDoanhNghiepModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}
