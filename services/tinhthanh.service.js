const tinhThanhModel = require('../models/tinhThanh.model')

exports.getAll = async () => {
    return await tinhThanhModel.find({});
}

exports.getTinhThanhByID = async (id) => {
    return await tinhThanhModel.findById(id);
}

exports.addTinhThanh = (name) => {
    let tinhMoi = new tinhThanhModel({
        TenTinhThanh: name
    })

    tinhMoi.save((err) => {
        if(err){
            console.log('Add province fail!');
        }else{
            console.log('Add province success!');
        }
    })
}

exports.deleteTinhThanhById = (id) => {
    tinhThanhModel.findByIdAndDelete({_id: id}, (err) => {
        if(err){
            console.log('Delete fail!');
        }else{
            console.log('Delete success!');
        }
    })
}