const { log } = require('debug');
const goiDichVuModel = require('../models/goidichvu.model')

exports.getAll = async () => {
    try{
        const goiDichVu = await goiDichVuModel.find({});
        return goiDichVu
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const goiDichVu = await goiDichVuModel.findById(id);
        return goiDichVu
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew = async (name, gia, time) => {
    try{
        let dichVuMoi = new goiDichVuModel({
            tenGoiDichVu: name,
            gia: gia,
            thoiHan: time   
        })
    
        return await dichVuMoi.save((err) => {
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
exports.update = async (id, values) => {
    try{
        return await goiDichVuModel.findByIdAndUpdate({_id:id},values, function(err){
            if(err){
                console.log('Update failed!')
            }else console.log('Update success!')
        })        
     
    }
    catch(err){
        console.log(err)
    }

}


exports.delete = async (id) => {
    try{
        return await goiDichVuModel.findByIdAndDelete({_id: id}, (err) => {
            if(err){
                console.log('Delete fail!');
            }else{
                console.log('Delete success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }
  
}