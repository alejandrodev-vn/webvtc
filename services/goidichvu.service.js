const { log } = require('debug');
const goidichvuModel = require('../models/goidichvu.model')

exports.getAll = async () => {
    try{
        const goidichvu = await goidichvuModel.find({});
        return goidichvu
    }
    catch(err){
        console.log(err)
    }
}

exports.getgoidichvuById = async (id) => {
    try{
        const goidichvu = await goidichvuModel.findById(id);
        return goidichvu
    }
    catch(err){
        console.log(err)
    }
}

exports.addgoidichvu = async (name, gia, time) => {
    try{
        let dichvuMoi = new goidichvuModel({
            tenGoiDichVu: name,
            gia: gia,
            thoiHan: time   
            //gia: gia
        })
    
        return await dichvuMoi.save((err) => {
            if(err){
                console.log('Add gói dịch vụ fail!');
            }else{
                console.log('Add gói dịch vụ success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
exports.updategoidichvuById = async (id, values) => {
    await goidichvuModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}


exports.deletegoidichvuById = async (id) => {
    await goidichvuModel.findByIdAndDelete({_id: id}, (err) => {
        if(err){
            console.log('Delete fail!');
        }else{
            console.log('Delete success!');
        }
    })
}