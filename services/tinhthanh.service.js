const { log } = require('debug');
const tinhThanhModel = require('../models/provinces.model')

exports.getAll = async () => {
    try{
        const tinhThanh = await tinhThanhModel.find({});
        return tinhThanh
    }
    catch(err){
        console.log(err)
    }
}

exports.getTinhThanhById = async (id) => {
    try{
        const tinhThanh = await tinhThanhModel.findById(id);
        return tinhThanh
    }
    catch(err){
        console.log(err)
    }
}

exports.addTinhThanh = async (name) => {
    try{
        let tinhMoi = new tinhThanhModel({
            TenTinhThanh: name
        })
    
        return await tinhMoi.save((err) => {
            if(err){
                console.log('Add province fail!');
            }else{
                console.log('Add province success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
exports.updateTinhThanhById = async (id, values) => {
    await tinhThanhModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}


exports.deleteTinhThanhById = async (id) => {
    await tinhThanhModel.findByIdAndDelete({_id: id}, (err) => {
        if(err){
            console.log('Delete fail!');
        }else{
            console.log('Delete success!');
        }
    })
}