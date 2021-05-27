const { log } = require('debug');
const giaodichModel = require('../models/giaodich.model');

exports.getAll = async() =>{
    try{
        const giaoDich = await giaodichModel.find({});
        return giaoDich
    }
    catch(err){
        consolog(err)
    }
}
exports.getById = async(id) =>{
    try{
        const giaoDich = await giaoDich.findById(id)
        return giaoDich
    }
    catch(err){
        console.log(err)
    }
}
exports.creatNew = async(values) =>{
    try{
        let giaoDichNew= new giaodichModel({
            userId: values.userId,
            tenGD: values.tenGD,
            loaiCTSId: values.loaiCTSId,
            goiDichVuId: values.goiDichVuId,
            nguoiThucHien: values.nguoiThucHien
        })
        console.log(giaoDichNew)
        return await giaoDichNew.save((err) => {
            if(err){
                console.log('add giaodich fail!'+ err )
            }else{
                console.log('add giaodich success!')
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
exports.update = async(id, values)=>{
    return await giaoDichModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else{
            console.log('Update success!')
        }
    })
}
exports.delete = async(id)=>{
    return await giaoDichModel.findByIdAndDelete({_id:id}, (err)=>{
        if(err){
            console.log('Delete failed!')
        }else{
            console.log('Delete success!')
        }
    })
}