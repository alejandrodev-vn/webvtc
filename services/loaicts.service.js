const { log } = require('debug');
const loaiCTSModel = require('../models/loaicts.model')

exports.getAll = async () => {
    try{
        const loaiCTS = await loaiCTSModel.find({});
        return loaiCTS
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const loaiCTS = await loaiCTSModel.findById(id);
        return loaiCTS
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew = async (name) => {
    try{
        let loaiCTSMoi = new loaiCTSModel({
            tenLoaiCTS : name
        })
    
        return await loaiCTSMoi.save((err) => {
            if(err){
                console.log('Add type CTS fail!');
            }else{
                console.log('Add type CTS success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
exports.update = async (id, values) => {
    return await loaiCTSModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}


exports.delete = async (id) => {
    return await loaiCTSModel.findByIdAndDelete({_id: id}, (err) => {
        if(err){
            console.log('Delete fail!');
        }else{
            console.log('Delete success!');
        }
    })
}